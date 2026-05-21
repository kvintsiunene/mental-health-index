require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');

const root = __dirname;
const htmlEntry = fs
  .readdirSync(root)
  .find((f) => f.endsWith('.html') && !f.startsWith('.'));

if (!htmlEntry) {
  throw new Error('В корне проекта не найден ни один .html файл.');
}

const app = express();
app.use(express.json({ limit: '32kb' }));

const LEAD_DEFAULT_TO = 'business@prosebya.ru';

function isNonEmptyString(v, maxLen) {
  if (typeof v !== 'string') return false;
  const t = v.trim();
  return t.length > 0 && t.length <= maxLen;
}

function isValidEmail(v) {
  if (typeof v !== 'string') return false;
  const t = v.trim();
  if (!t.length || t.length > 320) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

function isValidPhone(v) {
  if (typeof v !== 'string') return false;
  const t = v.trim();
  if (t.length < 7 || t.length > 32) return false;
  const digits = t.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

app.post('/api/lead', async (req, res) => {
  const gmailUser = (process.env.GMAIL_USER || '').trim();
  const gmailPass = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s/g, '');
  const mailTo = process.env.LEAD_MAIL_TO || LEAD_DEFAULT_TO;

  if (!gmailUser || !gmailPass) {
    return res.status(503).json({
      error: 'Отправка заявок сейчас недоступна. Обратитесь по почте business@prosebya.ru.',
    });
  }

  const body = req.body || {};
  const region = typeof body.region === 'string' ? body.region.trim() : '';
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const position = typeof body.position === 'string' ? body.position.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const consent = body.consent === true || body.consent === 'true' || body.consent === 1;

  if (!consent) {
    return res.status(400).json({ error: 'Нужно согласие на обработку персональных данных.' });
  }
  if (!isNonEmptyString(region, 200) || !isNonEmptyString(name, 200) || !isNonEmptyString(position, 200)) {
    return res.status(400).json({ error: 'Заполните регион, обращение и должность.' });
  }
  const hasEmail = isValidEmail(email);
  const hasPhone = isValidPhone(phone);
  if (!hasEmail && !hasPhone) {
    return res.status(400).json({ error: 'Укажите e-mail или телефон — достаточно одного.' });
  }
  if (email && !hasEmail) {
    return res.status(400).json({ error: 'Укажите корректный e-mail.' });
  }
  if (phone && !hasPhone) {
    return res.status(400).json({ error: 'Укажите корректный телефон.' });
  }

  const contactLines = [];
  if (hasEmail) contactLines.push(`E-mail: ${email}`);
  if (hasPhone) contactLines.push(`Телефон: ${phone}`);

  const text = [
    'Заявка с лендинга «Индекс ментального благополучия для региональных руководителей»',
    '',
    `Регион: ${region}`,
    `Как обращаться: ${name}`,
    `Должность: ${position}`,
    ...contactLines,
    '',
    'Согласие на обработку персональных данных: да (отмечено в форме на сайте).',
    '',
    hasEmail ? `Ответить заявителю: ${email}` : `Связаться с заявителем: ${phone}`,
  ].join('\n');

  const smtpTimeoutMs = 20000;

  function gmailTransport(port, secure) {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port,
      secure,
      requireTLS: port === 587,
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
      connectionTimeout: smtpTimeoutMs,
      greetingTimeout: smtpTimeoutMs,
      socketTimeout: smtpTimeoutMs,
      tls: { minVersion: 'TLSv1.2' },
    });
  }

  const mailPayload = {
    from: `"Лендинг — индекс ментального благополучия" <${gmailUser}>`,
    to: mailTo,
    replyTo: hasEmail ? email : undefined,
    subject: 'Заявка с лендинга — индекс ментального благополучия (региональные руководители)',
    text,
  };

  try {
    console.log('[lead] sending mail to', mailTo, 'from', gmailUser);

    let lastErr;
    for (const { port, secure, label } of [
      { port: 587, secure: false, label: '587+STARTTLS' },
      { port: 465, secure: true, label: '465+SSL' },
    ]) {
      const transporter = gmailTransport(port, secure);
      try {
        await transporter.sendMail(mailPayload);
        console.log('[lead] sent ok via', label);
        return res.json({ ok: true });
      } catch (e) {
        lastErr = e;
        console.error('[lead] failed via', label, e.code || '', e.message, e.response || '');
      }
    }

    throw lastErr;
  } catch (err) {
    const msg = String(err && err.message ? err.message : err);
    const resp = String(err && err.response ? err.response : '');
    const authFail =
      err && (err.code === 'EAUTH' || /535|Invalid login|authentication failed/i.test(msg + resp));
    console.error('[lead] mail error final', err && err.code, msg, resp);

    if (authFail) {
      return res.status(502).json({
        error:
          'Почта Gmail не приняла логин или пароль приложения. В .env проверьте GMAIL_USER (полный адрес) и GMAIL_APP_PASSWORD (16 символов из Google → Пароли приложений, без кавычек вокруг значения).',
      });
    }
    return res.status(500).json({
      error: 'Не удалось отправить заявку. Попробуйте позже или напишите на business@prosebya.ru.',
    });
  }
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(root, htmlEntry));
});

app.use(express.static(root));

const port = Number(process.env.PORT) || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`http://0.0.0.0:${port} → / → ${htmlEntry}`);
});
