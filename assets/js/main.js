// ===== Thiru Aavinan Technologies — page behaviour (loaded at the end of index.html) =====

// Tell the CSS that JavaScript is running (turns on the scroll-in animations)
document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = ms => new Promise(r => setTimeout(r, reduceMotion ? 0 : ms));

// ---------- Header background on scroll + back-to-top button ----------
const header = document.getElementById('header');
const toTop = document.getElementById('toTop');
function onScroll() {
  header.classList.toggle('scrolled', scrollY > 20);
  toTop.classList.toggle('show', scrollY > 600);
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

// ---------- Mobile menu ----------
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menuBtn');
function setMenu(open) {
  menu.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
}
menuBtn.onclick = () => setMenu(!menu.classList.contains('open'));
menu.querySelectorAll('a').forEach(a => a.onclick = () => setMenu(false));

// ---------- Language switch (English / Tamil) ----------
// Every element with data-en and data-ta gets its text swapped.
// The choice is saved so the page opens in the same language next time.
function setLang(lang) {
  const ta = lang === 'ta';
  document.body.classList.toggle('ta', ta);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerHTML = ta ? el.dataset.ta : el.dataset.en;
  });
  try { localStorage.setItem('lang', lang); } catch (e) { /* storage blocked — ignore */ }
}
document.getElementById('langBtn').onclick = () => setLang(document.documentElement.lang === 'ta' ? 'en' : 'ta');
try { if (localStorage.getItem('lang') === 'ta') setLang('ta'); } catch (e) {}

// ---------- Scroll-in animation ----------
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 80 + 'ms';   // small stagger for cards in a row
  io.observe(el);
});

// ---------- Mouse spotlight on cards ----------
// Tells the CSS where the mouse is inside the card, so the glow follows it.
document.querySelectorAll('.spot').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});

// ---------- Numbers count up when they appear ----------
const counters = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, end = +el.dataset.count, start = performance.now(), dur = 1200;
  counters.unobserve(el);
  if (reduceMotion) return;
  (function step(now) {
    const t = Math.min(1, (now - start) / dur);
    el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));   // eases out at the end
    if (t < 1) requestAnimationFrame(step);
  })(start);
}), { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counters.observe(el));

// ---------- Hero terminal ----------
// Each line is either a command (typed letter by letter), an output line,
// or a progress bar. Colours come from the small class names (see style.css).
const term = document.getElementById('term');
const PROMPT = '<span class="p">student@palani</span> <span class="b">~</span> $ ';
const script = [
  { cmd: 'thiru-ai enroll genai-career' },
  { out: '<span class="c">◆</span> Fetching course details…', pause: 500 },
  { out: '  <span class="g">✓</span> <span class="k">for       </span> <span class="v">college students · job seekers</span>' },
  { out: '  <span class="g">✓</span> <span class="k">language  </span> <span class="v">Tamil + English</span>' },
  { out: '  <span class="g">✓</span> <span class="k">duration  </span> <span class="v">20 days · classroom, Palani</span>' },
  { out: '  <span class="g">✓</span> <span class="k">fee       </span> <span class="v">₹2,000</span>' },
  { out: '  <span class="g">✓</span> <span class="k">starts    </span> <span class="y">19 Nov 2026</span>' },
  { out: '<span class="c">◆</span> Installing: prompting · ai-resume · job-search · english', pause: 300 },
  { bar: true },
  { out: '<span class="g">✔ Career plan ready.</span> Next step → <span class="y">reserve your seat ↓</span>', pause: 300 },
];

async function runTerminal() {
  for (const line of script) {
    const row = document.createElement('div');
    term.appendChild(row);

    if (line.cmd) {
      // type the command one letter at a time
      row.innerHTML = PROMPT;
      const text = document.createElement('span');
      row.appendChild(text);
      for (const ch of line.cmd) { text.textContent += ch; await wait(32); }
      await wait(350);
    } else if (line.bar) {
      // fill a progress bar from 0% to 100%
      for (let i = 0; i <= 20; i++) {
        row.innerHTML = '  <span class="bar">' + '█'.repeat(i) + '</span><span class="k">' + '░'.repeat(20 - i) + '</span> ' + (i * 5) + '%';
        await wait(55);
      }
    } else {
      row.innerHTML = line.out;
      await wait(line.pause || 160);
    }
  }
  // finish with a blinking cursor on a fresh prompt
  const last = document.createElement('div');
  last.innerHTML = PROMPT + '<span class="cursor"></span>';
  term.appendChild(last);
}
runTerminal();

// ---------- Countdown to the first batch (19 Nov 2026, 10:00 AM IST) ----------
const target = new Date('2026-11-19T10:00:00+05:30');
const pad = n => String(n).padStart(2, '0');
function tick() {
  const left = Math.max(0, target - new Date());
  document.getElementById('cd-d').textContent = Math.floor(left / 864e5);
  document.getElementById('cd-h').textContent = pad(Math.floor(left % 864e5 / 36e5));
  document.getElementById('cd-m').textContent = pad(Math.floor(left % 36e5 / 6e4));
  document.getElementById('cd-s').textContent = pad(Math.floor(left % 6e4 / 1e3));
}
tick();
setInterval(tick, 1000);

// ---------- Contact form (demo only — connect to WhatsApp / Google Form / backend later) ----------
document.getElementById('form').onsubmit = e => {
  e.preventDefault();
  document.getElementById('formMsg').classList.add('show');
  const btn = e.target.querySelector('button[type=submit]').getBoundingClientRect();
  confetti(btn.left + btn.width / 2, btn.top + btn.height / 2);   // celebrate!
  e.target.reset();
};

// ---------- Current year in the footer ----------
document.getElementById('yr').textContent = new Date().getFullYear();


// =====================================================================
//  MAGIC TOUCHES  ✨
//  Small visual effects. All of them switch off for people who turn off
//  animations in their device settings, and the mouse ones are skipped
//  on touch screens (phones), where there is no mouse.
// =====================================================================
const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const MAGIC_COLOURS = ['#3b5bfd', '#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b'];
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

// ---------- 1. Scroll progress bar at the top ----------
const progress = document.getElementById('progress');
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
}, { passive: true });

// ---------- 2. Confetti burst (used when the form is sent) ----------
function confetti(x, y) {
  if (reduceMotion) return;
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('i');
    c.className = 'confetti';
    const angle = Math.random() * Math.PI * 2, dist = 80 + Math.random() * 220;
    c.style.cssText = `left:${x}px;top:${y}px;--cc:${pick(MAGIC_COLOURS)};` +
      `--dx:${Math.cos(angle) * dist}px;--dy:${Math.sin(angle) * dist + 160}px;--rot:${Math.random() * 720 - 360}deg`;
    document.body.appendChild(c);
    c.addEventListener('animationend', () => c.remove());
  }
}

if (!reduceMotion) {

  if (hasMouse) {

    // ---------- 3. Hero colour glow that follows the mouse ----------
    // The glow glides smoothly towards the mouse instead of jumping to it.
    const hero = document.getElementById('home');
    const glow = document.getElementById('meshFollow');
    let gx = 0, gy = 0, tx = 0, ty = 0, gliding = false;
    function glide() {
      gx += (tx - gx) * 0.06;
      gy += (ty - gy) * 0.06;
      glow.style.transform = `translate(${gx}px, ${gy}px)`;
      if (Math.abs(tx - gx) > 0.5 || Math.abs(ty - gy) > 0.5) requestAnimationFrame(glide);
      else gliding = false;
    }
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      tx = e.clientX - r.left; ty = e.clientY - r.top;
      if (!glow.classList.contains('on')) { gx = tx; gy = ty; glow.classList.add('on'); }
      if (!gliding) { gliding = true; requestAnimationFrame(glide); }
    });
    hero.addEventListener('pointerleave', () => glow.classList.remove('on'));

    // ---------- 4. Sparkle trail that follows the mouse ----------
    let lastSparkle = 0;
    addEventListener('pointermove', e => {
      const now = performance.now();
      if (now - lastSparkle < 40) return;   // at most ~25 sparkles a second
      lastSparkle = now;
      const s = document.createElement('i');
      s.className = 'sparkle';
      s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;--sc:${pick(MAGIC_COLOURS)};` +
        `--dx:${(Math.random() - .5) * 40}px;--dy:${Math.random() * 30 + 10}px`;
      document.body.appendChild(s);
      s.addEventListener('animationend', () => s.remove());
    });

    // ---------- 5. 3D tilt on the hero terminal ----------
    const tilt = document.getElementById('tilt');
    const tiltArea = tilt.parentElement;
    tiltArea.addEventListener('pointermove', e => {
      const r = tilt.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      tilt.style.setProperty('--ry', ((px - .5) * 12) + 'deg');
      tilt.style.setProperty('--rx', ((.5 - py) * 10) + 'deg');
      tilt.style.setProperty('--gx', (px * 100) + '%');
      tilt.style.setProperty('--gy', (py * 100) + '%');
    });
    tiltArea.addEventListener('pointerleave', () => {
      tilt.style.setProperty('--rx', '0deg');
      tilt.style.setProperty('--ry', '0deg');
    });

    // ---------- 6. Magnetic buttons: they lean towards the mouse ----------
    document.querySelectorAll('.btn-glow, .prompt-box').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * .15}px, ${y * .25}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }
}
