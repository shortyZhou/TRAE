/* ===========================================================
   三只小猫翻牌冒险记 · game.js
   纯原生 Vanilla JS（ES6+），无依赖
   =========================================================== */

/* ---------- 配置表：三只小猫（严格按 PRD） ---------- */
const CATS = [
  {
    id: 'maodu',
    name: '毛肚',
    emoji: '🐱',
    role: '淘气大王 · 虎斑机灵鬼',
    desc: '美短银虎斑+白腹，大圆深绿眼，粉色小鼻子',
    looks: 'American Shorthair silver tabby cat with white belly and paws, classic black stripes on forehead, big round dark green eyes, pink nose, playful naughty expression, wearing a blue and red plaid harness badge with ribbons, long slender athletic legs, typical cute upright cat sitting pose, legs tucked naturally under body in simple cat loaf sit, single cat with 4 paws and 1 tail only, NO extra paws NO extra tails NO duplicate limbs NO raised paws, clean simple pose',
  },
  {
    id: 'jiaotang',
    name: '焦糖',
    emoji: '😺',
    role: '乖乖小公主 · 乳色大眼萌',
    desc: '乳白/淡金渐层，超大圆祖母绿眼睛，圆脸胖嘟嘟',
    looks: 'British Shorthair golden chinchilla gradient pale cream cat, round face, huge round emerald eyes, serious calm expression, super fluffy fur, sitting upright elegant pose, wearing a blue plaid triangle bandana with a blue rosette badge and red ribbons, long elegant slender legs, graceful pose showing long legs, clean plain white background, NO grey circle NO round mask NO ring shape NO circular halo in background',
  },
  {
    id: 'buding',
    name: '布丁',
    emoji: '😸',
    role: '呆萌短腿橘 · 中分发型',
    desc: '曼康基短腿长毛淡橘，标志性中分淡橘色额头发型',
    looks: 'Munchkin cat, extremely short stubby dwarf munchkin legs, extra long fluffy pale cream-orange coat with prominent long fur tufts on cheeks (fluffy cheek ruffs) and inside ears (lynx-style long ear tufts sticking out from ear tips), very fluffy fur framing the entire face, natural center-parted pale orange fur color division on forehead (just natural cat fur marking split down the middle, NOT a human wig or fake hairstyle, just natural fur pattern), round amber eyes, chubby round face, silly cute confused expression, standing pose showing very clear contrast between extremely short legs and long fluffy body fur',
  },
];

/* ---------- 配置表：关卡主题（3 关 × 每关主题） ---------- */
const THEMES = {
  L1: [
    { id: 'climb-tree', name: '爬树',   icon: '🌳',
      prompt: ' climbing a tall cherry blossom tree, spring pink leaves background, excited gripping branch pose' },
    { id: 'fishing',    name: '钓鱼',   icon: '🎣',
      prompt: ' fishing by a small blue pond with tiny fishing rod, fish jumping out, happy focused expression' },
    { id: 'bathing',    name: '洗澡',   icon: '🛁',
      prompt: ' in a cute bubble bath tiny bathtub, soap foam bubbles all around, pink rubber duck, wet funny face' },
  ],
  L2: [
    { id: 'christmas',  name: '圣诞节', icon: '🎄',
      prompt: ' christmas theme, wearing red santa hat with white fur trim, surrounded by colorful gift boxes and pine tree fairy lights, snowflakes falling' },
    { id: 'olympics',   name: '奥运会', icon: '🏅',
      prompt: ' olympics theme, wearing gold medal around neck, holding mini torch, sporty athletic pose, olympic five rings in soft background' },
    { id: 'easter',     name: '复活节', icon: '🐰',
      prompt: ' easter theme, wearing cute bunny ears headband, sitting inside colorful painted easter eggs basket, pastel yellow spring flowers background' },
    { id: 'worldcup',   name: '世界杯', icon: '⚽',
      prompt: ' world cup soccer theme, wearing mini soccer jersey uniform, standing on green football field with classic black and white ball, cheering pose' },
  ],
  L3: [
    { id: 'spring-festival',  name: '春节', icon: '🧧',
      prompt: ' chinese spring festival theme, wearing red tang suit with golden pattern, holding red lucky envelope, firecrackers and lanterns background' },
    { id: 'dragon-boat',      name: '端午', icon: '🐲',
      prompt: ' dragon boat festival theme, sitting inside mini bamboo steamer next to green rice dumplings zongzi, red sachet hanging, bamboo leaves background' },
    { id: 'mid-autumn',       name: '中秋', icon: '🥮',
      prompt: ' mid autumn festival theme, holding mooncake with lotus seed paste, full moon and starry sky background, osmanthus flowers yellow' },
    { id: 'winter-solstice',  name: '冬至', icon: '🥟',
      prompt: ' winter solstice theme, sitting next to plate of steamed dumplings jiaozi, wearing warm knitted scarf, soft cozy snow outside window' },
  ],
};

/* ---------- 三关配置（严格按 TECH-ARCH §5） ---------- */
const LEVELS = [
  {
    id: 1,
    gridClass: 'level-1',
    title: '第 1 关',
    subtitle: '',
    rows: 3, cols: 4,
    cats: CATS.filter(c => c.id !== 'buding'), themes: THEMES.L1, bombs: 0,
    stepsLimit: 15,
    nextHint: '下一关：国际节日大冒险！🎄🏅🐰⚽',
  },
  {
    id: 2,
    gridClass: 'level-2',
    title: '第 2 关 · 国际节日篇',
    subtitle: '环球节日大冒险！',
    rows: 4, cols: 6,
    cats: CATS, themes: THEMES.L2, bombs: 0,
    stepsLimit: 40,
    nextHint: '下一关：传统节日终极挑战，小心 💣 记忆炸弹哦！🧧🐲🥮🥟',
  },
  {
    id: 3,
    gridClass: 'level-3',
    title: '第 3 关 · 传统节日篇',
    subtitle: '小心记忆炸弹哦！💣',
    rows: 5, cols: 6,
    cats: CATS, themes: THEMES.L3, bombs: 3,
    stepsLimit: 50,
    nextHint: null, // 最终关 → 通关页
  },
];

/* ---------- 共享风格 Prompt（所有图片通用） ---------- */
const BASE_STYLE = 'Cute kawaii chibi cartoon cat, pastel candy color palette, soft claymorphism lighting, playful watercolor 2D flat illustration, thick clean outlines, no text no watermark, white background, square composition, hd quality, highly detailed fluffy fur';

/* ---------- 运行时状态 ---------- */
const STATE = {
  view: 'HOME',
  levelIndex: 0,
  stepsLeft: 0,
  matchedPairs: 0,
  totalPairs: 0,
  firstCard: null,
  lockClicks: false,
  startTs: 0,
  completedLevels: [],
};

/* ---------- DOM 快捷引用 ---------- */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const VIEWS = {
  HOME:       $('#view-home'),
  LEVEL:      $('#view-game'),
  TRANSITION: $('#view-transition'),
  FINALE:     $('#view-finale'),
};

/* ===========================================================
   工具函数
   =========================================================== */

/**
 * 构造卡通图片 URL（TRAE text_to_image API）
 * 若图片加载失败 → 自动 fallback 到 emoji
 */
function buildCatImageUrl(cat, theme, useAvatar = false) {
  const parts = [BASE_STYLE, cat.looks];
  if (!useAvatar && theme) {
    parts.push(theme.prompt || '');
  }
  // 头像：去掉场景，聚焦大头照
  if (useAvatar) {
    parts.length = 2;
    parts.push(' close-up portrait, centered headshot, cute kawaii face focus, soft pastel gradient background');
  }
  const fullPrompt = parts.filter(Boolean).join(', ');
  const encoded = encodeURIComponent(fullPrompt);
  const size = useAvatar ? 'square_hd' : 'square_hd';
  return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encoded}&image_size=${size}`;
}

/**
 * 给 <img> 元素加上错误兜底（API 不通或加载失败时替换为 emoji fallback）
 */
function withFallback(imgEl, cat, theme, useAvatar = false) {
  imgEl.addEventListener('error', function onErr() {
    imgEl.removeEventListener('error', onErr);
    // 替换为 fallback DOM
    const fallback = document.createElement('div');
    fallback.className = 'card-front-fallback';
    if (useAvatar) {
      fallback.innerHTML = `<div class="cat-avatar-fallback" style="font-size:64px">${cat.emoji}</div>`;
    } else if (theme && theme.id === 'bomb') {
      fallback.innerHTML = `
        <div class="emoji-cat">💣</div>
        <div class="emoji-theme">🐾</div>
        <div class="cat-name-mini">记忆炸弹</div>`;
    } else {
      fallback.innerHTML = `
        <div class="emoji-cat">${cat ? cat.emoji : '🐱'}</div>
        <div class="emoji-theme">${theme ? theme.icon : ''}</div>
        <div class="cat-name-mini">${cat ? cat.name : ''}${theme ? '·' + theme.name : ''}</div>`;
    }
    imgEl.replaceWith(fallback);
  }, { once: true });
}

/** Fisher-Yates 洗牌 */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Toast 提示 */
function showToast(msg, dur = 1500) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.add('hidden'), dur);
}

/* ===========================================================
   视图状态机
   =========================================================== */
function setState(nextView) {
  // 先把所有视图隐藏
  Object.values(VIEWS).forEach(v => v && v.classList.remove('active'));
  const target = nextView === 'LEVEL_1' || nextView === 'LEVEL_2' || nextView === 'LEVEL_3'
    ? VIEWS.LEVEL : VIEWS[nextView] || VIEWS.HOME;
  target.classList.add('active');
  STATE.view = nextView;
  // 通关页：自动撒彩纸
  if (nextView === 'FINALE') startConfetti();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===========================================================
   HOME 欢迎页渲染：三只小猫角色卡 + 规则
   =========================================================== */
function renderHomeCats() {
  const wrap = $('#home-cats');
  wrap.innerHTML = '';
  CATS.forEach(cat => {
    const el = document.createElement('div');
    el.className = 'cat-profile';
    el.innerHTML = `
      <div class="cat-avatar" data-cat="${cat.id}"></div>
      <div class="cat-name">${cat.name}</div>`;
    wrap.appendChild(el);
    // 注入图片（或 fallback）
    const avatarSlot = el.querySelector('.cat-avatar');
    const img = document.createElement('img');
    img.alt = `${cat.name} 头像`;
    img.src = buildCatImageUrl(cat, null, true);
    withFallback(img, cat, null, true);
    avatarSlot.appendChild(img);
  });
}

/* ===========================================================
   关卡加载（核心）
   =========================================================== */
function loadLevel(idx) {
  const L = LEVELS[idx];
  STATE.levelIndex = idx;
  STATE.stepsLeft = L.stepsLimit;
  STATE.matchedPairs = 0;
  STATE.firstCard = null;
  STATE.lockClicks = false;
  STATE.startTs = Date.now();

  // 构造配对类型数组（cat+theme 组合 + 炸弹）
  const types = [];
  L.cats.forEach(cat => {
    L.themes.forEach(theme => {
      types.push({
        type: `${cat.id}-${theme.id}`,
        cat, theme,
        isBomb: false,
      });
    });
  });
  // 注入炸弹（每关配置数量）
  for (let b = 0; b < (L.bombs || 0); b++) {
    types.push({
      type: `bomb-${b}`,
      cat: { name: '记忆炸弹', emoji: '💣' },
      theme: { id: 'bomb', name: '炸弹', icon: '💣' },
      isBomb: true,
    });
  }

  // 每种类型 × 2（成对）→ 洗牌
  STATE.totalPairs = types.length;
  const deck = shuffle([...types, ...types]); // 每类型 2 张

  // 顶部栏
  $('#bar-level').textContent = L.title;
  $('#bar-subtitle').textContent = L.subtitle;
  $('#bar-steps').textContent = L.stepsLimit;
  $('#bar-steps').classList.remove('danger');
  $('#bar-matched').textContent = 0;
  $('#bar-total').textContent = STATE.totalPairs;

  // 卡牌网格
  const grid = $('#card-grid');
  grid.className = `card-grid ${L.gridClass}`;
  grid.innerHTML = '';
  deck.forEach((cardData, i) => {
    const card = document.createElement('div');
    card.className = 'card' + (cardData.isBomb ? ' bomb' : '');
    card.dataset.type = cardData.type;
    card.dataset.index = i;
    card.dataset.isBomb = cardData.isBomb ? '1' : '0';

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back" aria-hidden="true"></div>
        <div class="card-face card-front"></div>
      </div>`;

    // 正面注入图片（或 fallback）—— useAvatar=false：保留场景动作（爬树/钓鱼/洗澡）生成全身场景图，
    // 同时 cat.looks 复用与介绍页相同的形象源（毛肚坐姿+长腿、焦糖长腿+坐姿）保持形象匹配
    const front = card.querySelector('.card-front');
    const img = document.createElement('img');
    img.alt = `${cardData.cat.name} · ${cardData.theme.name}`;
    img.src = buildCatImageUrl(cardData.cat, cardData.theme, false);
    withFallback(img, cardData.cat, cardData.theme, false);
    front.appendChild(img);

    // 事件
    card.addEventListener('click', () => onCardClick(card, cardData));
    grid.appendChild(card);
  });

  setState(`LEVEL_${idx + 1}`);
}

/* ===========================================================
   卡牌点击：翻牌 + 配对判定 + 炸弹
   =========================================================== */
function onCardClick(el, data) {
  if (STATE.lockClicks) return;
  if (el.classList.contains('flipped') || el.classList.contains('matched')) return;

  // 第 1 张
  if (!STATE.firstCard) {
    flipCard(el);
    STATE.firstCard = { el, data };
    return;
  }
  // 同一张（点击 2 次）→ 忽略
  if (STATE.firstCard.el === el) return;

  // 第 2 张：开始判定
  flipCard(el);
  spendStep(1);

  const first = STATE.firstCard;
  const second = { el, data };
  STATE.firstCard = null;
  STATE.lockClicks = true;

  const isMatch = first.data.type === second.data.type;

  if (isMatch) {
    // 炸弹匹配（也算"配对"但扣步惩罚）
    if (data.isBomb) {
      // 炸弹配对成功 → 翻回去 + 扣 2 步 + 提示
      setTimeout(() => {
        first.el.classList.remove('flipped');
        second.el.classList.remove('flipped');
        first.el.classList.add('shake');
        second.el.classList.add('shake');
        spendStep(2);
        showToast('⚠️ 哎呀！匹配到了炸弹，扣 2 步～');
        setTimeout(() => {
          first.el.classList.remove('shake');
          second.el.classList.remove('shake');
          STATE.lockClicks = false;
        }, 450);
      }, 650);
      return;
    }
    // ✅ 正常配对成功
    setTimeout(() => {
      markMatched(first.el);
      markMatched(second.el);
      STATE.matchedPairs++;
      $('#bar-matched').textContent = STATE.matchedPairs;
      STATE.lockClicks = false;
      checkLevelComplete();
    }, 420);
  } else {
    // ❌ 不匹配 → 翻回去
    setTimeout(() => {
      first.el.classList.remove('flipped');
      second.el.classList.remove('flipped');
      STATE.lockClicks = false;
      // 若其中一张是炸弹 → 扣 2 步 + 提示
      const hadBomb = first.data.isBomb || second.data.isBomb;
      if (hadBomb) {
        spendStep(2);
        if (first.data.isBomb) first.el.classList.add('shake');
        if (second.data.isBomb) second.el.classList.add('shake');
        showToast('💥 踩到记忆炸弹啦！额外扣 2 步～');
        setTimeout(() => {
          first.el.classList.remove('shake');
          second.el.classList.remove('shake');
        }, 450);
      }
    }, 1000);
  }
}

function flipCard(el) {
  el.classList.add('flipped');
}
function markMatched(el) {
  el.classList.add('matched');
}
function spendStep(n = 1) {
  STATE.stepsLeft = Math.max(0, STATE.stepsLeft - n);
  const stepsEl = $('#bar-steps');
  stepsEl.textContent = STATE.stepsLeft;
  if (STATE.stepsLeft <= 5) {
    stepsEl.classList.add('danger');
  }
  // 步数为 0 且未全部配对 → 重来提示
  if (STATE.stepsLeft <= 0 && STATE.matchedPairs < STATE.totalPairs) {
    setTimeout(() => {
      showToast('😵 步数用光啦～点击右下角「重来本关」再来一次吧！', 3000);
    }, 300);
  }
}

/* ===========================================================
   关卡完成检查 → 过渡页 / 通关页
   =========================================================== */
function checkLevelComplete() {
  if (STATE.matchedPairs < STATE.totalPairs) return;
  const L = LEVELS[STATE.levelIndex];
  const elapsed = Math.max(1, Math.round((Date.now() - STATE.startTs) / 1000));
  const stepsUsed = L.stepsLimit - STATE.stepsLeft;
  STATE.completedLevels[STATE.levelIndex] = { stepsUsed, elapsed };

  // 最后一关 → 通关页
  if (STATE.levelIndex === LEVELS.length - 1) {
    renderFinale();
    setTimeout(() => setState('FINALE'), 350);
    return;
  }

  // 其他关 → 过渡页
  showTransition({
    level: L.id,
    stepsUsed,
    elapsed,
    nextHint: L.nextHint,
  });
}

function showTransition(info) {
  $('#trans-title').textContent = `第 ${info.level} 关通过！🎉`;
  $('#trans-next-hint').textContent = info.nextHint || '';
  $('#trans-stats').innerHTML = `
    <div class="trans-stat">
      <div class="trans-stat-label">使用步数</div>
      <div class="trans-stat-value">${info.stepsUsed}</div>
    </div>
    <div class="trans-stat">
      <div class="trans-stat-label">用时</div>
      <div class="trans-stat-value">${info.elapsed}s</div>
    </div>
    <div class="trans-stat">
      <div class="trans-stat-label">下一关</div>
      <div class="trans-stat-value">${info.level + 1} / 3</div>
    </div>`;
  setTimeout(() => setState('TRANSITION'), 250);
}

/* ===========================================================
   FINALE 通关页：猫咪头像注入 + 彩纸
   =========================================================== */
function renderFinale() {
  // 注入三只猫（左/右/前）的头像或 fallback
  const fill = (slotEl, cat, poseDesc) => {
    slotEl.innerHTML = '';
    const img = document.createElement('img');
    img.alt = `${cat.name} 通关形象`;
    img.src = buildCatImageUrl(cat, {
      id: 'finale-' + poseDesc,
      name: poseDesc,
      prompt: poseDesc,
    }, false);
    withFallback(img, cat, { name: poseDesc, icon: cat.emoji }, false);
    slotEl.appendChild(img);
  };
  fill($('#finale-cat-left .cat-avatar-cute'),  CATS[0], 'climbing cake edge left side, tongue out naughty pose');
  fill($('#finale-cat-right .cat-avatar-cute'), CATS[1], 'sitting elegantly right side, eyes sparkles princess pose');
  fill($('#finale-cat-front .cat-avatar-cute'), CATS[2], 'standing on short tiptoes reaching for top strawberry, super cute');
}

function startConfetti() {
  const layer = $('#confetti-layer');
  if (!layer) return;
  layer.innerHTML = '';
  const COLORS = ['#FF8FB1', '#FFCAD4', '#FFD6A5', '#CAFFBF', '#B5DEFF', '#BDB2FF', '#FFE5EC'];
  const N = 120;
  for (let i = 0; i < N; i++) {
    const p = document.createElement('span');
    p.className = 'confetti-piece';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    const dur = 3.5 + Math.random() * 4.5; // 3.5s - 8s
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = (Math.random() * 1.2) + 's';
    p.style.width = (6 + Math.random() * 8) + 'px';
    p.style.height = (8 + Math.random() * 10) + 'px';
    p.style.opacity = 0.85 + Math.random() * 0.15;
    if (Math.random() > 0.75) {
      p.style.borderRadius = '50%'; // 部分圆形（像糖果）
    }
    layer.appendChild(p);
  }
}

/* ===========================================================
   事件绑定 & 启动
   =========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 渲染 HOME 角色卡
  renderHomeCats();

  // HOME → 开始冒险
  $('#btn-start').addEventListener('click', () => loadLevel(0));

  // 过渡 → 下一关
  $('#btn-next-level').addEventListener('click', () => {
    loadLevel(STATE.levelIndex + 1);
  });

  // 关卡页控制
  $('#btn-back-home').addEventListener('click', () => setState('HOME'));
  $('#btn-reset-level').addEventListener('click', () => loadLevel(STATE.levelIndex));

  // 通关页 → 再玩一次
  $('#btn-replay').addEventListener('click', () => {
    STATE.completedLevels = [];
    setState('HOME');
    setTimeout(() => renderHomeCats(), 50);
  });

  // 默认进入 HOME
  setState('HOME');
});
