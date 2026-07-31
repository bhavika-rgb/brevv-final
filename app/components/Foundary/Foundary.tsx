"use client";

import { useEffect, useRef } from "react";
import "./Foundary.module.scss";

export default function Foundary() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    initLetterReveal();
    initFoundaryReveal();
  }, []);

  return (
    <section className="foundary-section" id="about">
      <div className="foundary-glow"></div>
      <div className="container foundary-grid">
        <div className="foundary-left">
          <span className="foundary-tag">About The Foundary</span>
          <h2 className="foundary-title">Our Mission: Building the Architecture of <span className="letter-reveal-trigger"
              data-delay="0.2" data-speed="0.04">Human Potential.</span></h2>
        </div>
        <div className="foundary-right">
          <p className="foundary-p"><strong>A Collective of Experts:</strong> The Foundary is a global team of educators and AI researchers dedicated to evolving how the world learns through innovation and experience.</p>

          <p className="foundary-p"><strong>Simplified Learning Technology:</strong> We built Brevv to solve the high costs and complexity of traditional tools, replacing disconnected systems with one unified, intelligent platform that works for everyone.

</p>

<p className="foundary-p">
<strong>Our Core Mission:</strong> We provide institutions with the infrastructure needed to deliver a learning experience that is personalized to the individual, verifiable by the world, and accessible to all.
</p>
        </div>
      </div>
    </section>
  );
}

// ─── Section-local interaction logic (ported verbatim from lib/effects) ───

// Letter-by-letter reveal for the ".letter-reveal-trigger" — this trigger
// only appears in this section's "Human Potential." headline.
function initLetterReveal() {
  const letterRevealTargets = document.querySelectorAll<HTMLElement>('.letter-reveal-trigger');
  if (letterRevealTargets.length > 0) {
    letterRevealTargets.forEach(target => {
      const text = target.textContent.trim();
      target.innerHTML = '';
      [...text].forEach(char => {
        const span = document.createElement('span');
        if (char === ' ') {
          span.innerHTML = '&nbsp;';
        } else {
          span.textContent = char;
        }
        span.className = 'reveal-letter';
        target.appendChild(span);
      });
    });

    const letterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const spans = entry.target.querySelectorAll<HTMLElement>('.reveal-letter');
          const baseDelay = parseFloat(entry.target.getAttribute('data-delay') || '0');
          const speed = parseFloat(entry.target.getAttribute('data-speed') || '0.04');
          spans.forEach((span, index) => {
            span.style.animationDelay = `${baseDelay + (index * speed)}s`;
            span.style.animationPlayState = 'running';
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    letterRevealTargets.forEach(target => {
      const spans = target.querySelectorAll<HTMLElement>('.reveal-letter');
      spans.forEach(span => {
        span.style.animationPlayState = 'paused';
      });
      letterObserver.observe(target);
    });
  }
}

function initFoundaryReveal() {
  const section = document.querySelector<HTMLElement>('.foundary-section');
  if (!section) return;

  const targets = section.querySelectorAll<HTMLElement>('.foundary-tag, .foundary-title, .foundary-p');

  // Pause entrance animations until the section scrolls into view
  // (the "Human Potential." letter-reveal is handled by initLetterReveal)
  targets.forEach(el => { el.style.animationPlayState = 'paused'; });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        targets.forEach(el => { el.style.animationPlayState = 'running'; });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(section);
}