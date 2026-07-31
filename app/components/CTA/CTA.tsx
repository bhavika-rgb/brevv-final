"use client";

import { useEffect, useRef } from "react";
import "./CTA.module.scss";

export default function CTA() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    initCtaParticles();
    initCtaReveal();
  }, []);

  return (
    <section className="cta-section" id="cta">
      <div className="cta-particles" aria-hidden="true"></div>
      <div className="cta-container">
        <span className="cta-tag-new cta-anim-tag">The Next Step</span>
        <h2 className="cta-anim-heading">Static learning is over. Lead the future.</h2>
        <p>Staying with an outdated system isn't just a technical problem, it's a missed opportunity for your learners.
          Moving to a modern, AI-powered ecosystem is the most effective way to improve results, save time for your staff,
          and provide certificates that hold real-world value. Whether you are ready to start today or just want to see how
          it works, we are here to help you make the transition.</p>

        <div className="cta-actions">
          <div className="cta-action">
            <a href="#cta" className="cta-btn-primary-new">Start Your Free Trial</a>

          </div>
          <div className="cta-action">
            <button id="book-demo-trigger-cta" className="cta-btn-secondary-new" style={{ cursor: 'pointer' }}>Book a Strategy
              Consultation</button>

          </div>
        </div>
      </div>
    </section>
  );
}



const SHAPES = [
  `<svg width="24" height="15" viewBox="0 0 24 15" fill="none"><path opacity="0.85" d="M23.5862 8.96388L21.4213 14.1377L3.45304e-05 5.17407L2.165 0.00025783L23.5862 8.96388Z" fill="currentColor"/></svg>`,
  `<svg width="22" height="21" viewBox="0 0 22 21" fill="none"><path opacity="0.5" d="M11 18.5C6.19471 18.5 2.5 14.81 2.5 10.5C2.5 6.19005 6.19471 2.5 11 2.5C15.8053 2.5 19.5 6.19005 19.5 10.5C19.5 14.81 15.8053 18.5 11 18.5Z" stroke="currentColor" stroke-width="5"/></svg>`,
  `<svg width="24" height="25" viewBox="0 0 24 25" fill="none"><path opacity="0.85" d="M10.7128 24.2004L16.7438 1.04836L12.7206 0.000320121L6.68957 23.1524L10.7128 24.2004ZM22.4708 16.8755L23.4337 13.1789L0.962622 7.32525L-0.000319689 11.0218L22.4708 16.8755Z" fill="currentColor"/></svg>`,
  `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path opacity="0.85" d="M13.829 13.8572L12.7724 11.4426C11.6002 8.76214 11.6837 5.69815 13.0002 3.08542L14.1869 0.73189C14.2934 0.519253 14.0754 0.289134 13.8581 0.384692L11.4434 1.44148C8.76292 2.61375 5.69893 2.53035 3.08625 1.21401L0.732763 0.0274368C0.52013 -0.0790394 0.290001 0.138884 0.385551 0.356234L1.44224 2.77083C2.61439 5.45129 2.53086 8.51528 1.2144 11.128L0.0277281 13.4815C-0.0787566 13.6942 0.139159 13.9243 0.356512 13.8287L2.77115 12.7719C5.45168 11.5997 8.51567 11.6831 11.1284 12.9994L13.4818 14.186C13.6944 14.294 13.9246 14.0761 13.829 13.8572Z" fill="currentColor"/></svg>`,
  `<svg width="23" height="17" viewBox="0 0 23 17" fill="none"><path opacity="0.85" d="M18.0738 16.7827C18.1976 16.7255 18.2634 16.6004 18.2405 16.4737C18.2405 16.4737 15.7904 10.9487 16.6883 7.52483C17.5862 4.10092 22.4324 0.489368 22.4324 0.489368C22.6164 0.282664 22.3728 -0.0730899 22.0894 0.0127084C22.0894 0.0127084 16.0569 2.02396 12.0438 2.62135C7.48203 3.30042 0.227357 2.94188 0.227357 2.94188C-0.000314236 2.99037 -0.0808826 3.28499 0.0968043 3.43976C0.0968043 3.43976 6.57812 6.72813 10.2238 9.5611C13.4208 12.0453 17.7077 16.7207 17.7077 16.7207C17.8051 16.8144 17.9531 16.8408 18.0738 16.7827Z" fill="currentColor"/></svg>`,
];

// Brand palette (weighted: mostly brevv blue, some lighter tones, a
// few white sparkles for contrast on the black card)
const COLORS = ['#008CFF', '#008CFF', '#008CFF', '#3FA8FF', '#00d2ff', '#ffffff'];

const REPEL_RADIUS = 110;
const REPEL_BASE = 6.0;
const SPRING_K = 0.046;
const DAMPING = 0.80;
const FLOAT_AMP = 9;          // stronger ambient drift so the field reads as alive
const FLOAT_SPEED = 0.0009;
const GRID_CELL = 28;
const DEMO_DURATION = 1900;   // one-time phantom-cursor sweep length (ms)

function initCtaParticles() {
  const section = document.querySelector<HTMLElement>('.cta-section');
  const container = section && section.querySelector<HTMLElement>('.cta-particles');
  if (!section || !container) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mouse = { x: -9999, y: -9999, px: -9999, py: -9999, speed: 0 };
  let rafId = 0;
  let particles = [];
  let inView = false;
  let fieldW = 0, fieldH = 0;
  let demoQueued = false;  // set true once the section is properly in view
  let demoStartT = 0;      // rAF timestamp when the sweep began (0 = pending)

  function waveBoundaryY(x, W, H) {
    const nx = x / W;
    // "W" shape: high at edges & center, valleys at ~0.25 and ~0.75
    const waveTop = H * 0.52;
    const dipDepth = H * 0.18;
    const shape = Math.cos(Math.PI * 2 * nx);
    return waveTop + (1 - shape) * 0.5 * dipDepth;
  }

  function buildParticles() {
    const { width: W, height: H } = section.getBoundingClientRect();
    if (!W || !H) return;
    fieldW = W; fieldH = H;
    container.innerHTML = '';
    particles = [];

    const cols = Math.floor(W / GRID_CELL);
    const rows = Math.floor(H / GRID_CELL);
    let idx = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ox = c * GRID_CELL + GRID_CELL * 0.5 + (Math.random() - 0.5) * GRID_CELL * 0.72;
        const oy = r * GRID_CELL + GRID_CELL * 0.5 + (Math.random() - 0.5) * GRID_CELL * 0.72;
        const waveY = waveBoundaryY(ox, W, H);
        if (oy < waveY) continue;
        const edgeBuffer = 6;
        if (ox < edgeBuffer || ox > W - edgeBuffer || oy > H - edgeBuffer) continue;

        const tDepth = Math.min((oy - waveY) / ((H - waveY) * 0.5), 1.0);
        const opacity = Math.min(0.45 + tDepth * 0.45 + Math.random() * 0.15, 0.92);
        const rot = Math.floor(Math.random() * 360);
        const scale = 0.55 + Math.random() * 0.30;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        const div = document.createElement('div');
        div.style.cssText =
          'position:absolute;top:0;left:0;pointer-events:none;will-change:transform;' +
          `color:${color};` +
          `transform:translate(${ox}px,${oy}px) rotate(${rot}deg) scale(${scale});` +
          `opacity:${opacity.toFixed(2)}`;
        div.innerHTML = SHAPES[idx % SHAPES.length];
        container.appendChild(div);

        particles.push({
          el: div, ox, oy, x: ox, y: oy,
          vx: 0, vy: 0,
          phase: Math.random() * Math.PI * 2,
          scale, rot
        });
        idx++;
      }
    }
  }

  function tick(t) {
    const mvx = mouse.x - mouse.px, mvy = mouse.y - mouse.py;
    mouse.speed = Math.sqrt(mvx * mvx + mvy * mvy);
    mouse.px = mouse.x; mouse.py = mouse.y;

    // One-time phantom-cursor sweep across the field (the "watch me" demo)
    let demoX = -9999, demoY = -9999, demoActive = false;
    if (demoQueued && particles.length) {
      if (demoStartT === 0) demoStartT = t;
      const prog = (t - demoStartT) / DEMO_DURATION;
      if (prog <= 1) {
        demoActive = true;
        const e = prog < 0.5 ? 2 * prog * prog : 1 - Math.pow(-2 * prog + 2, 2) / 2; // easeInOut
        demoX = fieldW * (0.03 + e * 0.94);
        demoY = fieldH * 0.7 + Math.sin(prog * Math.PI * 3) * fieldH * 0.07;
      } else {
        demoQueued = false;
      }
    }

    for (const p of particles) {
      // real cursor repel
      {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0.5) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_BASE * (1 + mouse.speed * 0.1);
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }
      // demo sweep repel (slightly wider + stronger so it reads clearly)
      if (demoActive) {
        const dx = p.x - demoX, dy = p.y - demoY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const dr = REPEL_RADIUS * 1.5;
        if (dist < dr && dist > 0.5) {
          const force = ((dr - dist) / dr) * REPEL_BASE * 1.35;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }
      // continuous ambient drift (x + y) so the field is clearly alive
      const floatY = p.oy + Math.sin(t * FLOAT_SPEED + p.phase) * FLOAT_AMP;
      const floatX = p.ox + Math.cos(t * FLOAT_SPEED * 0.75 + p.phase) * FLOAT_AMP * 0.55;
      p.vx += (floatX - p.x) * SPRING_K;
      p.vy += (floatY - p.y) * SPRING_K;
      p.vx *= DAMPING;
      p.vy *= DAMPING;
      p.x += p.vx;
      p.y += p.vy;
      // gentle rocking rotation for an alive feel
      const dispRot = p.rot + Math.sin(t * 0.0006 + p.phase) * 7;
      p.el.style.transform = `translate(${p.x}px,${p.y}px) rotate(${dispRot}deg) scale(${p.scale})`;
    }
    rafId = requestAnimationFrame(tick);
  }

  function startLoop() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }

  // Static field for reduced-motion users: build once, no physics
  if (reducedMotion) {
    setTimeout(buildParticles, 60);
    return;
  }

  section.addEventListener('mousemove', (e) => {
    const r = section.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  }, { passive: true });
  section.addEventListener('mouseleave', () => {
    mouse.x = mouse.y = -9999;
  });

  // Run the physics loop while any part of the section is on screen
  const viewObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      inView = entry.isIntersecting;
      if (inView && particles.length) {
        startLoop();
      } else {
        cancelAnimationFrame(rafId);
      }
    });
  }, { threshold: 0 });
  viewObserver.observe(section);

  // Fire the one-time demo sweep once the section is clearly visible
  const demoObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        demoQueued = true;
        demoStartT = 0;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  demoObserver.observe(section);

  let resizeTimer;
  const ro = new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildParticles();
      if (inView) startLoop();
    }, 80);
  });
  ro.observe(section);

  setTimeout(() => {
    buildParticles();
    if (inView) startLoop();
  }, 60);
}

function initCtaReveal() {
  const section = document.querySelector<HTMLElement>('.cta-section');
  if (!section) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('cta-reveal-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  observer.observe(section);
}