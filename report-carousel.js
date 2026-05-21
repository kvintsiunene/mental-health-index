/* Пример отчёта — карусель (6 слайдов, стиль карточек 3–5) */
(() => {
  const MATRIX_COLS = [
    { label: 'Россия\nв целом', bench: true },
    { label: 'Низкий\nиндекс' },
    { label: 'Средний\nиндекс' },
    { label: 'Высокий\nиндекс' }
  ];

  const reportExample = {
    indexRegion: 'России',
    index: 30,
    subindices: [
      { label: 'Ментальное состояние', value: 26 },
      { label: 'Внутренние факторы индекса', value: 36 },
      { label: 'Внешние факторы индекса', value: 28 }
    ],
    indicators: [
      { label: 'Стресс-статус работников', value: 3 },
      { label: 'Выраженность симптомов ментального неблагополучия', value: 49 },
      { label: 'Психологический профиль работников', value: 34 },
      { label: 'Психологическая устойчивость работников', value: 39 },
      { label: 'Состояние профессиональных факторов ментального благополучия', value: 47 },
      { label: 'Состояние личностных факторов ментального благополучия', value: 43 },
      { label: 'Состояние социальных факторов ментального благополучия', value: -6 }
    ],
    stressBlocks: [
      {
        question: 'За последний месяц у Вас бывали стрессы?',
        legend: [
          { cls: 'yes', text: 'да, стрессы бывали' },
          { cls: 'no', text: 'нет, стрессов не было' },
          { cls: 'dk', text: 'затрудняюсь ответить' }
        ],
        cells: [
          { yes: 77, no: 17, dk: 6 },
          { yes: 94, no: 2, dk: 4 },
          { yes: 77, no: 14, dk: 9 },
          { yes: 35, no: 59, dk: 6 }
        ]
      },
      {
        question: 'А в целом насколько часто у Вас случаются стрессы?',
        legend: [
          { cls: 'yes', text: 'практически постоянно или скорее часто' },
          { cls: 'no', text: 'скорее редко или практически никогда' },
          { cls: 'dk', text: 'затрудняюсь ответить' }
        ],
        cells: [
          { yes: 54, no: 42, dk: 4 },
          { yes: 87, no: 10, dk: 3 },
          { yes: 30, no: 64, dk: 6 },
          { yes: 7, no: 93, dk: 0 }
        ]
      }
    ],
    symptomsRows: [
      { label: 'Измотанность, упадок сил', cells: [{ yes: 46 }, { yes: 73 }, { yes: 26 }, { yes: 7 }] },
      { label: 'Сложности с расслаблением, не удаётся отключаться от забот', cells: [{ yes: 46 }, { yes: 70 }, { yes: 31 }, { yes: 7 }] },
      { label: 'Апатия в начале рабочего дня, нежелание приступать к работе', cells: [{ yes: 41 }, { yes: 69 }, { yes: 15 }, { yes: 4 }] },
      { label: 'Бессонница, нарушения сна', cells: [{ yes: 40 }, { yes: 67 }, { yes: 16 }, { yes: 2 }] },
      { label: 'Раздражительность, сложно сдерживать эмоции', cells: [{ yes: 38 }, { yes: 62 }, { yes: 12 }, { yes: 12 }] },
      { label: 'Тревога, нервозность, сильное беспокойство', cells: [{ yes: 33 }, { yes: 52 }, { yes: 18 }, { yes: 5 }] },
      { label: 'Подавленность, плохое настроение', cells: [{ yes: 30 }, { yes: 54 }, { yes: 7 }, { yes: 2 }] },
      { label: 'Мало что радует, не хочется ничего делать', cells: [{ yes: 30 }, { yes: 48 }, { yes: 13 }, { yes: 8 }] },
      { label: 'Трудности с концентрацией внимания, рассеянность', cells: [{ yes: 27 }, { yes: 40 }, { yes: 16 }, { yes: 6 }] },
      { label: 'Ощущение одиночества, покинутости', cells: [{ yes: 24 }, { yes: 39 }, { yes: 8 }, { yes: 4 }] },
      { label: 'Панические атаки (сердцебиение, нехватка воздуха и т.д.)', cells: [{ yes: 12 }, { yes: 22 }, { yes: 2 }, { yes: 0 }] },
      { label: 'Ничего не получается, всё валится из рук', cells: [{ yes: 11 }, { yes: 20 }, { yes: 2 }, { yes: 0 }] }
    ],
    professionalRows: [
      { label: 'Рабочая нагрузка, объём обязанностей', cells: [{ yes: 75, no: 23 }, { yes: 63, no: 33 }, { yes: 83, no: 15 }, { yes: 93, no: 6 }] },
      { label: 'Содержание, суть работы', cells: [{ yes: 86, no: 12 }, { yes: 77, no: 20 }, { yes: 96, no: 2 }, { yes: 96, no: 3 }] },
      { label: 'Эффективность организации рабочих процессов', cells: [{ yes: 65, no: 33 }, { yes: 51, no: 46 }, { yes: 77, no: 21 }, { yes: 84, no: 15 }] },
      { label: 'Уровень заработной платы', cells: [{ yes: 52, no: 46 }, { yes: 40, no: 59 }, { yes: 63, no: 35 }, { yes: 70, no: 25 }] },
      { label: 'Должность, позиция на работе', cells: [{ yes: 81, no: 17 }, { yes: 78, no: 20 }, { yes: 82, no: 16 }, { yes: 89, no: 10 }] },
      { label: 'Возможности профессионального роста', cells: [{ yes: 64, no: 28 }, { yes: 54, no: 36 }, { yes: 70, no: 25 }, { yes: 79, no: 13 }] },
      { label: 'Отношения с коллегами', cells: [{ yes: 94, no: 4 }, { yes: 89, no: 8 }, { yes: 100, no: 0 }, { yes: 100, no: 0 }] },
      { label: 'Отношения с руководством', cells: [{ yes: 91, no: 7 }, { yes: 85, no: 12 }, { yes: 97, no: 1 }, { yes: 100, no: 0 }] },
      { label: 'Рабочее место, физические условия труда', cells: [{ yes: 92, no: 6 }, { yes: 88, no: 10 }, { yes: 96, no: 3 }, { yes: 99, no: 1 }] }
    ],
    personal: {
      sectionTitle: 'Личные установки',
      question: 'Применимы ли к вам приведённые ниже высказывания?',
      legend: [
        { cls: 'yes', text: 'это точно про меня или скорее про меня' },
        { cls: 'no', text: 'это точно не про меня или скорее не про меня' },
        { cls: 'dk', text: 'затрудняюсь ответить' }
      ],
      rows: [
        { label: 'Моя жизнь находится под моим контролем', cells: [{ yes: 73, no: 26 }, { yes: 64, no: 34 }, { yes: 79, no: 18 }, { yes: 92, no: 6 }] },
        { label: 'У меня есть долгосрочные планы, и мне удаётся им следовать', cells: [{ yes: 71, no: 27 }, { yes: 59, no: 38 }, { yes: 82, no: 16 }, { yes: 87, no: 11 }] }
      ]
    },
    socialRows: [
      { label: 'Я сильно переживаю, нервничаю по поводу сегодняшней ситуации в России', cells: [{ yes: 46, no: 47 }, { yes: 32, no: 61 }, { yes: 53, no: 38 }, { yes: 71, no: 23 }] },
      { label: 'Я сильно переживаю, нервничаю по поводу СВО и конфликта России с Западом', cells: [{ yes: 45, no: 48 }, { yes: 30, no: 64 }, { yes: 51, no: 42 }, { yes: 68, no: 27 }] },
      { label: 'Я сильно переживаю, нервничаю по поводу состояния экономики страны', cells: [{ yes: 44, no: 49 }, { yes: 28, no: 66 }, { yes: 49, no: 44 }, { yes: 65, no: 30 }] },
      { label: 'Я сильно переживаю, нервничаю по поводу положения дел, условий жизни в моей области (крае, республике)', cells: [{ yes: 41, no: 52 }, { yes: 26, no: 68 }, { yes: 44, no: 49 }, { yes: 59, no: 36 }] },
      { label: 'Я сильно переживаю, нервничаю по поводу положения дел, условий жизни в моём районе', cells: [{ yes: 38, no: 55 }, { yes: 24, no: 71 }, { yes: 40, no: 53 }, { yes: 55, no: 40 }] }
    ],
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function colLabelHtml(label) {
    return String(label)
      .split('\n')
      .map((line) => esc(line))
      .join('<br>');
  }

  function stackBar(cell) {
    let yes = Number(cell.yes) || 0;
    let no = Number(cell.no) || 0;
    let dk = Number(cell.dk) || 0;
    const sum = yes + no + dk;
    if (sum > 0 && Math.abs(sum - 100) > 0.5) {
      const k = 100 / sum;
      yes = Math.round(yes * k);
      no = Math.round(no * k);
      dk = Math.max(0, 100 - yes - no);
    }
    const parts = [
      { v: yes, cls: 'yes' },
      { v: no, cls: 'no' },
      { v: dk, cls: 'dk' }
    ].filter((p) => p.v > 0);
    return `<div class="matrix-bar matrix-bar--stacked" role="img"><div class="matrix-bar__track">${parts
      .map(
        (p) =>
          `<span class="matrix-bar__seg matrix-bar__seg--${p.cls}" style="width:${p.v}%"><span class="matrix-bar__pct">${p.v >= 5 ? `${p.v}%` : ''}</span></span>`
      )
      .join('')}</div></div>`;
  }

  /** Симптомы: одна доля на ячейку, длина бара = % (как в отчёте ФОМ) */
  function singleMetricBar(cell, colIndex) {
    const v = Math.max(0, Math.min(100, Number(cell.yes) || 0));
    const col = Number(colIndex) || 0;
    if (v === 0) {
      return `<div class="metric-bar metric-bar--c${col}" role="img"><span class="metric-bar__val metric-bar__val--zero">0</span></div>`;
    }
    return `<div class="metric-bar metric-bar--c${col}" role="img">
      <div class="metric-bar__track"><span class="metric-bar__fill" style="width:${v}%"></span></div>
      <span class="metric-bar__val">${v}</span>
    </div>`;
  }

  function renderMatrixChart(opts) {
    const barFn = opts.singleBar ? singleMetricBar : stackBar;
    const cols = opts.columns || MATRIX_COLS;
    const head = cols
      .map((c, i) => {
        const bench = c.bench ? ' matrix-chart__h--bench' : '';
        return `<div class="matrix-chart__h${bench}" style="grid-column:${i + 2}">${colLabelHtml(c.label)}</div>`;
      })
      .join('');

    const renderRow = (row) => {
      const cells = row.cells
        .map((cell, i) => {
          const bench = cols[i].bench ? ' matrix-chart__cell--bench' : '';
          return `<div class="matrix-chart__cell${bench}" style="grid-column:${i + 2}">${barFn(cell, i)}</div>`;
        })
        .join('');
      return `
        <div class="matrix-chart__row">
          <div class="matrix-chart__label">${esc(row.label)}</div>
          ${cells}
        </div>`;
    };

    let body = '';
    if (opts.blocks) {
      body = opts.blocks
        .map((block, bi) => {
          const legend = block.legend
            .map((item) => `<span><i class="matrix-legend__dot matrix-legend__dot--${item.cls}"></i>${esc(item.text)}</span>`)
            .join('');
          const rows = block.rows
            ? block.rows.map(renderRow).join('')
            : `<div class="matrix-chart__row matrix-chart__row--cols-only"><div class="matrix-chart__label matrix-chart__label--empty" aria-hidden="true"></div>${block.cells
                .map((cell, i) => {
                  const bench = cols[i].bench ? ' matrix-chart__cell--bench' : '';
                  return `<div class="matrix-chart__cell${bench}" style="grid-column:${i + 2}">${barFn(cell, i)}</div>`;
                })
                .join('')}</div>`;
          const q = block.question
            ? `<p class="matrix-chart__question">${esc(block.question)}</p>`
            : '';
          const section = block.sectionTitle
            ? `<div class="matrix-chart__section-title">${esc(block.sectionTitle)}</div>`
            : '';
          return `
          <div class="matrix-chart__block${bi > 0 ? ' matrix-chart__block--spaced' : ''}">
            ${section}
            ${q}
            <div class="matrix-chart__legend">${legend}</div>
            <div class="matrix-chart__rows">${rows}</div>
          </div>`;
        })
        .join('');
    } else if (opts.rows) {
      const legend = (opts.legend || [])
        .map((item) => `<span><i class="matrix-legend__dot matrix-legend__dot--${item.cls}"></i>${esc(item.text)}</span>`)
        .join('');
      body = `
        ${opts.sectionTitle ? `<div class="matrix-chart__section-title">${esc(opts.sectionTitle)}</div>` : ''}
        ${opts.question ? `<p class="matrix-chart__question">${esc(opts.question)}</p>` : ''}
        ${legend ? `<div class="matrix-chart__legend">${legend}</div>` : ''}
        <div class="matrix-chart__rows">${opts.rows.map(renderRow).join('')}</div>`;
    }

    return `
      <div class="factor-chart factor-chart--matrix${opts.extraClass || ''}">
        ${opts.tag ? `<div class="factor-chart__tag">${esc(opts.tag)}</div>` : ''}
        <div class="matrix-chart__table">
          <div class="matrix-chart__head">
            <span class="matrix-chart__corner"></span>
            ${head}
          </div>
          <div class="matrix-chart__body">${body}</div>
        </div>
        ${opts.note ? `<div class="factor-chart__note">${esc(opts.note)}</div>` : ''}
        ${opts.footnote ? `<div class="factor-chart__note factor-chart__note--foot">${esc(opts.footnote)}</div>` : ''}
      </div>`;
  }

  const SCALE_TICKS = [-100, -50, 0, 50, 100];

  function valueToBottomPercent(value) {
    return ((Number(value) + 100) / 200) * 100;
  }

  function vbarFillStyle(value) {
    const pos = valueToBottomPercent(value);
    return `bottom:0%;height:${pos}%`;
  }

  function vbarGridLines() {
    return SCALE_TICKS.map((t) => {
      const bottom = valueToBottomPercent(t);
      const zero = t === 0 ? ' imb-grid-line--zero' : '';
      return `<span class="imb-grid-line imb-grid-line--h${zero}" style="bottom:${bottom}%"></span>`;
    }).join('');
  }

  function vdotplotGridLines() {
    return SCALE_TICKS.map((t) => {
      const bottom = valueToBottomPercent(t);
      const zero = t === 0 ? ' imb-vdotplot__hline--zero' : '';
      return `<span class="imb-vdotplot__hline${zero}" style="bottom:${bottom}%"></span>`;
    }).join('');
  }

  function renderVdotColumn(label, value, compact) {
    const bottom = valueToBottomPercent(value);
    return `<div class="imb-vdotplot__col">
      <div class="imb-vdotplot__col-plot" role="img" aria-label="${esc(label)}: ${value}">
        <div class="imb-vdotplot__marker" style="bottom:${bottom}%">
          <i class="imb-vdotplot__dot" aria-hidden="true"></i>
          <span class="imb-vdotplot__val">${value}</span>
        </div>
      </div>
      <div class="imb-vdotplot__cat${compact ? ' imb-vdotplot__cat--compact' : ''}">${esc(label)}</div>
    </div>`;
  }

  function renderVdotplot(rows, compact) {
    const cols = rows.map((r) => renderVdotColumn(r.label, r.value, compact)).join('');
    return `<div class="imb-vdotplot${compact ? ' imb-vdotplot--inds' : ''}">
      <div class="imb-vdotplot__yaxis" aria-hidden="true">${SCALE_TICKS.slice()
        .reverse()
        .map((t) => `<span>${t}</span>`)
        .join('')}</div>
      <div class="imb-vdotplot__main">
        <div class="imb-vdotplot__grid" aria-hidden="true">${vdotplotGridLines()}</div>
        <div class="imb-vdotplot__cols">${cols}</div>
      </div>
    </div>`;
  }

  function renderChart1(d) {
    const region = d.indexRegion || 'России';
    const idx = Number(d.index);
    return `
      <div class="imb-dashboard" role="img" aria-label="Индекс, субиндексы и индикаторы по ${region}">
        <div class="imb-dashboard__top">
          <div class="imb-panel imb-panel--main-index">
            <div class="imb-panel__head">
              <h3 class="imb-panel__title">Значение индекса ментального благополучия по ${esc(region)}</h3>
              <span class="imb-panel__unit">в баллах</span>
            </div>
            <div class="imb-index-block">
              <div class="imb-index-num">${idx}</div>
              <div class="imb-vbar">
                <div class="imb-vbar__track">
                  <span class="imb-vbar__fill" style="${vbarFillStyle(idx)}"></span>
                  ${vbarGridLines()}
                </div>
                <div class="imb-vbar__axis" aria-hidden="true">${SCALE_TICKS.slice()
                  .reverse()
                  .map((t) => `<span>${t}</span>`)
                  .join('')}</div>
              </div>
            </div>
          </div>
          <div class="imb-panel imb-panel--subs">
            <div class="imb-panel__head">
              <h3 class="imb-panel__title">Значение субиндексов индекса по ${esc(region)}</h3>
              <span class="imb-panel__unit">в баллах</span>
            </div>
            ${renderVdotplot(d.subindices, false)}
          </div>
        </div>
        <div class="imb-panel imb-panel--inds">
          <div class="imb-panel__head">
            <h3 class="imb-panel__title">Значение индикаторов индекса по ${esc(region)}</h3>
            <span class="imb-panel__unit">в баллах</span>
          </div>
          ${renderVdotplot(d.indicators, true)}
        </div>
      </div>`;
  }

  function renderAll() {
    const d = reportExample;
    const charts = [
      { id: 'repChart1', html: renderChart1(d) },
      {
        id: 'repChart2',
        html: renderMatrixChart({
          tag: 'Стресс-статус',
          blocks: d.stressBlocks,
          note: 'в % от типов индекса ментального благополучия',
          footnote: '* Данные 5% и менее на графиках не подписаны',
          extraClass: ' factor-chart--stress'
        })
      },
      {
        id: 'repChart3',
        html: renderMatrixChart({
          tag: 'Симптомы ментального неблагополучия',
          question: 'Как часто за последний месяц бывали перечисленные состояния?',
          legend: [
            { cls: 'yes', text: 'часто / постоянно' },
            { cls: 'no', text: 'реже' },
            { cls: 'dk', text: 'затрудняюсь ответить' }
          ],
          rows: d.symptomsRows,
          singleBar: true,
          note: 'суммарная доля ответов «часто» и «постоянно», % от типов',
          extraClass: ' factor-chart--symptoms'
        })
      },
      {
        id: 'repChart4',
        html: renderMatrixChart({
          tag: 'Профессиональные факторы',
          question: 'Удовлетворены ли перечисленные аспекты вашей работы?',
          legend: [
            { cls: 'yes', text: 'полностью или скорее удовлетворен (-а)' },
            { cls: 'no', text: 'полностью или скорее неудовлетворен (-а)' },
            { cls: 'dk', text: 'затрудняюсь ответить' }
          ],
          rows: d.professionalRows,
          note: 'в % от типов',
          extraClass: ' factor-chart--professional'
        })
      },
      {
        id: 'repChart5',
        html: renderMatrixChart({
          tag: 'Личностные факторы',
          sectionTitle: d.personal.sectionTitle,
          question: d.personal.question,
          legend: d.personal.legend,
          rows: d.personal.rows,
          note: 'в % от типов',
          extraClass: ' factor-chart--personal'
        })
      },
      {
        id: 'repChart6',
        html: renderMatrixChart({
          tag: 'Социальные факторы',
          question: 'Приведённые высказывания применимы к вам?',
          legend: [
            { cls: 'yes', text: 'это точно про меня или скорее про меня' },
            { cls: 'no', text: 'это точно не про меня' },
            { cls: 'dk', text: 'затрудняюсь ответить' }
          ],
          rows: d.socialRows,
          note: 'в % от типов',
          extraClass: ' factor-chart--social'
        })
      }
    ];

    charts.forEach(({ id, html }) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    });
  }

  renderAll();

  const reportCarousel = document.getElementById('reportCarousel');
  const reportTrack = document.getElementById('reportCarouselTrack');
  const reportCounter = document.getElementById('reportCarouselCounter');
  const reportPrev = document.getElementById('reportCarouselPrev');
  const reportNext = document.getElementById('reportCarouselNext');
  if (!reportTrack) return;

  const reportSlides = [...reportTrack.querySelectorAll('.report-slide')];
  const slideLabels = ['Индекс', 'Стресс', 'Симптомы', 'Профессиональные', 'Личностные', 'Социальные'];
  let reportIndex = 0;

  function syncCarouselHeight() {
    if (!reportCarousel) return;
    const top = reportCarousel.getBoundingClientRect().top;
    const counterH = (reportCounter?.offsetHeight || 16) + 14;
    const available = window.innerHeight - top - counterH - 12;
    const h = Math.round(Math.max(260, Math.min(available, 640)));
    reportCarousel.style.setProperty('--report-carousel-h', `${h}px`);
  }

  function goReportSlide(i) {
    reportIndex = Math.max(0, Math.min(reportSlides.length - 1, i));
    reportTrack.style.transform = `translate3d(-${reportIndex * 100}%, 0, 0)`;
    const label = slideLabels[reportIndex];
    if (reportCounter) {
      reportCounter.textContent = `${reportIndex + 1} / ${reportSlides.length} · ${label}`;
    }
    if (reportCarousel) {
      reportCarousel.setAttribute('aria-label', `Пример отчёта, слайд ${reportIndex + 1} из ${reportSlides.length}: ${label}`);
    }
    reportSlides.forEach((slide, j) => {
      slide.setAttribute('aria-hidden', j === reportIndex ? 'false' : 'true');
    });
    if (reportPrev) reportPrev.disabled = reportIndex === 0;
    if (reportNext) reportNext.disabled = reportIndex === reportSlides.length - 1;
  }

  if (reportPrev) reportPrev.addEventListener('click', () => goReportSlide(reportIndex - 1));
  if (reportNext) reportNext.addEventListener('click', () => goReportSlide(reportIndex + 1));

  if (reportCarousel) {
    reportCarousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goReportSlide(reportIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goReportSlide(reportIndex + 1);
      }
    });
    reportCarousel.setAttribute('tabindex', '0');
  }

  syncCarouselHeight();
  window.addEventListener('resize', syncCarouselHeight);
  window.addEventListener('scroll', syncCarouselHeight, { passive: true });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncCarouselHeight);
  }

  goReportSlide(0);
})();
