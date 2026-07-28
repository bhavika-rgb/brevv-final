"use client";

import { useEffect, useRef } from "react";
import { createIcons, icons } from "lucide";
import "./Scale.module.scss";

const scaleCards = [
  {
    eyebrow: "HIGHER EDUCATION",
    number: "01",
    heading: "The Modern Campus",
    description: (
      <>
        <strong>Support Faculty, Engage Students:</strong> Modernize your institutional delivery with a mobile-first experience that Gen-Z expects. Brevv reduces the administrative burden on professors by automating course setup and grading, allowing them to focus more on teaching and mentorship.
      </>
    ),
    linkText: "Explore Higher Education",
    image: "/assets/images/image (24).png",
    alt: "Higher Education Platform",
    cardClass: "card-blue",
  },
  {
    eyebrow: "CORPORATE L&D",
    number: "02",
    heading: "Workforce Intelligence",
    description: (
      <>
        <strong>A Strategic Competitive Advantage:</strong> Transform employee training from a requirement into a growth engine. Build onboarding and upskilling programs that employees find valuable, while measuring success through quantifiable skill growth and clear ROI data.
      </>
    ),
    linkText: "Explore Corporate L&D",
    image: "/assets/images/image (25).png",
    alt: "Corporate L&D Platform",
    cardClass: "card-purple",
  },
  {
    eyebrow: "VOCATIONAL & K-12",
    number: "03",
    heading: "Practical Readiness",
    description: (
      <>
        <strong>Skills for the Real World:</strong> Prepare students for immediate success in the workforce or higher exams. Deliver structured learning pathways that lead directly to industry certification and career placement through secure, proctored assessments.
      </>
    ),
    linkText: "Explore Programs",
    image: "/assets/images/image (26).png",
    alt: "K-12 & Vocational Platform",
    cardClass: "card-emerald",
  },
];

export default function Scale() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    createIcons({ icons }); // render this section's <i data-lucide="..."> icons
    initScaleReveal();
  }, []);

  return (
    <section className="new-scale-section" id="scale-performance">
      <div className="scale-container">

        <div className="new-scale-header" style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <span className="scale-tag-glow">THE SOLUTIONS</span>
          <h2 className="new-scale-title">Your Vision, Our Infrastructure.</h2>
          <p className="new-scale-subtitle">No two organizations learn the same way. Brevv offers a flexible platform that
            adapts to the specific goals and administrative needs of different sectors.</p>
        </div>

        <div className="scale-grid-layout">
          {scaleCards.map((item) => (
            <div className={`scale-premium-card ${item.cardClass}`} key={item.number}>
              <div className="card-image-box">
                <img src={item.image} alt={item.alt} />
                <div className="card-image-overlay"></div>
              </div>
              <div className="card-body-box">
                <div className="card-meta">
                  <span className="meta-tag">{item.eyebrow}</span>
                  <span className="meta-num">{item.number}</span>
                </div>
                <h3 className="card-heading-title">{item.heading}</h3>
                <p className="card-short-desc">{item.description}</p>
                <a href="#cta" className="card-arrow-link">
                  <span>{item.linkText}</span>
                  <i data-lucide="arrow-right" className="w-4 h-4 link-arrow"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section-local interaction logic (ported verbatim from lib/effects) ───

function initScaleReveal() {
  const section = document.querySelector<HTMLElement>('.new-scale-section');
  if (!section) return;

  const targets = section.querySelectorAll<HTMLElement>(
    '.scale-tag-glow, .new-scale-title, .new-scale-subtitle, .scale-premium-card, .meta-num'
  );

  // Pause the CSS entrance animations until the section scrolls into view
  // (same progressive-enhancement pattern as letterReveal)
  targets.forEach(el => {
    el.style.animationPlayState = 'paused';
  });

  // Once an entrance animation finishes, mark the element settled:
  // the .scale-settled class clears the animation (so the card/image
  // hover transitions regain control — a forwards-fill would override
  // them) while explicitly locking the visible end-state.
  section.addEventListener('animationend', (e) => {
    if (e.pseudoElement) return; // curtain (::after) manages itself via fill
    if (e.animationName && e.animationName.startsWith('scale-')) {
      (e.target as HTMLElement).classList.add('scale-settled');
    }
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('scale-in-view');
        targets.forEach(el => {
          el.style.animationPlayState = 'running';
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  observer.observe(section);
}