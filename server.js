const fs = require('fs');
const path = require('path');
const express = require('express');

const root = __dirname;
const htmlEntry = fs
  .readdirSync(root)
  .find((f) => f.endsWith('.html') && !f.startsWith('.'));

if (!htmlEntry) {
  throw new Error('В корне проекта не найден ни один .html файл.');
}

const app = express();

app.get('/', (_req, res) => {
  res.sendFile(path.join(root, htmlEntry));
});

app.use(express.static(root));

const port = Number(process.env.PORT) || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`http://0.0.0.0:${port} → / → ${htmlEntry}`);
});
