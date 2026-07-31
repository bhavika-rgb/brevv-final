"use client";

import { useEffect, useRef, type ReactNode } from "react";
import "./CoreFoundations.module.scss";

const coreCards: Array<{
  number: string;
  title: string;
  description: ReactNode;
  icon: ReactNode;
}> = [
  {
    number: "01 | Generative Intelligence",
    title: "Generative Intelligence",
    description: (
      <>
        <strong>Stop building from scratch.</strong> Why spend months on a syllabus? Use Brevv AI to transform raw PDFs, videos,
        or curricula into structured, interactive learning paths tailored to how each student actually learns.
      </>
    ),
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#008CFF" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z"></path>
      </svg>
    ),
  },
  {
    number: "02 | Immutable Veracity",
    title: "Immutable Veracity",
    description: (
      <>
        <strong>Move beyond paper.</strong> In a world of deepfakes and fraud, trust is everything. We issue secure,
        blockchain-backed digital credentials that give your learners a permanent, unhackable edge in the global job
        market.
      </>
    ),
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#008CFF" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
  },
  {
    number: "03 | Unified Connectivity",
    title: "Unified Connectivity",
    description: (
      <>
        <strong>Eliminate tool fatigue.</strong> Stop jumping between Zoom, Moodle, and WhatsApp. Brevv brings live sessions, course
        management, skill mapping, and community engagement into one single, beautiful command center.
      </>
    ),
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#008CFF" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
      </svg>
    ),
  },
];

export default function CoreFoundations() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    initCoreReveal();
    initCoreCardBounce();
  }, []);

  return (
    <section className="trust-badges" id="partners" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="container">

        <div style={{ marginBottom: '4rem' }}>
          <span className="section-tag core-anim-tag" style={{ color: 'var(--primary-color)' }}>Core Foundations</span>
          <h2 className="core-anim-title"
            style={{ fontSize: 'clamp(1.9rem, 6vw, 2.8rem)', fontWeight: '800', color: '#111827', letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
            Built for Intelligence and Trust.</h2>
          <p className="core-anim-sub" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px' }}>The Brevv
            architecture is defined by three fundamental principles:</p>
        </div>

        <div className="triple-core-grid">
          {coreCards.map((item) => (
            <div className="core-card core-card-bounce" key={item.number}>
              <div className="core-card-icon"
                style={{ background: 'none', width: 'auto', height: 'auto', marginBottom: '1.25rem', display: 'flex', justifyContent: 'flex-start' }}>
                {item.icon}
              </div>
              <h3
                style={{ fontSize: '1.35rem', fontWeight: '700', color: '#0F172A', display: 'flex', alignItems: 'flex-start', gap: '0.1rem', lineHeight: '1.3' }}>
                {item.number}</h3>
              <p style={{ marginTop: '1rem', lineHeight: '1.6', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section-local interaction logic (ported verbatim from lib/effects) ───

function initCoreReveal() {
  const section = document.querySelector<HTMLElement>('.trust-badges');
  if (!section) return;

  const title = section.querySelector<HTMLElement>('.core-anim-title');

  // Split the heading into per-word mask spans (each word rises from
  // behind its own overflow-hidden clip, staggered)
  if (title && title.dataset.split !== 'true') {
    const words = title.textContent!.trim().split(/\s+/);
    title.innerHTML = '';
    words.forEach((word, i) => {
      const outer = document.createElement('span');
      outer.className = 'core-word';
      const inner = document.createElement('span');
      inner.textContent = word;
      inner.style.transitionDelay = (0.15 + i * 0.08) + 's';
      outer.appendChild(inner);
      title.appendChild(outer);
      title.appendChild(document.createTextNode(' '));
    });
    title.dataset.split = 'true';
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('core-in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
}

// Triple-Core Advantage: bounce-in animation on scroll
// (originally part of letterReveal — kept here because it only targets
// this section's .core-card elements)
function initCoreCardBounce() {
  const coreCards = document.querySelectorAll<HTMLElement>('.core-card');
  if (coreCards.length > 0) {
    const coreObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          coreObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    coreCards.forEach(card => coreObserver.observe(card));
  }
}