"use client";

import { useEffect, useRef } from "react";
import "./Ecosystem.module.scss";

export default function Ecosystem() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    initEcosystemReveal();
  }, []);

  return (
    <section className="ecosystem-section" id="ecosystem">
      <div className="ecosystem-glow ecosystem-glow-1"></div>
      <div className="ecosystem-glow ecosystem-glow-2"></div>

      <div className="container ecosystem-inner">
        <span className="ecosystem-tag">The Ecosystem</span>
        <h2 className="ecosystem-title">Moving Beyond the LMS: <br /><span
            className="ecosystem-title-accent animate-text-gradient">A Next-Generation LXP.</span></h2>
        <p className="ecosystem-lead">Traditional LMS platforms act as static filing cabinets for content. <strong>Brevv is a
            dynamic Learning Experience Platform (LXP)</strong>, an active partner throughout the learning journey.</p>
        <p className="ecosystem-lead ecosystem-lead-2">While a standard LMS focuses on administration, Brevv is built around
          the learner. Powered by <span className="eco-hl">Generative AI</span>, <span className="eco-hl">live collaboration</span>,
          and <span className="eco-hl">blockchain security</span>, it bridges the gap between digital learning and verified
          career success.</p>
      </div>
    </section>
  );
}

// ─── Section-local interaction logic (ported verbatim from lib/effects) ───

function initEcosystemReveal() {
  const section = document.querySelector<HTMLElement>('.ecosystem-section');
  if (!section) return;

  const targets = section.querySelectorAll<HTMLElement>('.ecosystem-tag, .ecosystem-title, .ecosystem-lead');

  // Pause the entrance animations until the section scrolls into view
  // (same progressive-enhancement pattern as the other reveals)
  targets.forEach(el => { el.style.animationPlayState = 'paused'; });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        targets.forEach(el => { el.style.animationPlayState = 'running'; });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
}