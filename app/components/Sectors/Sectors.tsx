"use client";

import { useEffect, useRef } from "react";
import { createIcons, icons } from "lucide";
import "./Sectors.module.scss";

const sectorCards = [
  {
    id: "academic",
    number: "01",
    title: "Academic Institutions",
    tagline: "Modernize your campus and empower your faculty.",
    description: "Designed specifically for schools and universities, this version of Brevv helps you scale your learning reach while protecting your academic reputation.",
    iconName: "graduation-cap",
    ctaText: "Explore Academic Solutions",
    cardClass: "sector-card-academic",
    dataSectorCard: "left",
    features: [
      { title: "Empower Faculty:", text: "Use AI to automate course design and grading." },
      { title: "Engage Students:", text: "Provide a mobile-first, personalized learning journey." },
      { title: "Secure Success:", text: "Issue blockchain-verified degrees that are globally recognized." },
    ],
  },
  {
    id: "enterprise",
    number: "02",
    title: "Enterprise Solutions",
    tagline: "Transform employee training into a growth engine.",
    description: "Built for modern businesses, Brevv helps HR and L&D teams turn workforce development into a measurable competitive advantage.",
    iconName: "briefcase",
    ctaText: "Explore Enterprise Solutions",
    cardClass: "sector-card-enterprise",
    dataSectorCard: "right",
    features: [
      { title: "Scale Onboarding:", text: "Get new hires up to speed in days, not weeks." },
      { title: "Track Skill Growth:", text: "Use data to identify talent and close knowledge gaps." },
      { title: "Ensure Compliance:", text: "Keep verifiable, audit-ready training records in one place." },
    ],
  },
];

export default function Sectors() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    createIcons({ icons }); // render this section's <i data-lucide="..."> icons
    initSectorReveal();
    initPricing();
  }, []);

  return (
    <section className="sector-section" id="pricing">
      <div className="sector-bg-glow sector-bg-glow-1"></div>
      <div className="sector-bg-glow sector-bg-glow-2"></div>

      <div className="container">
        <div className="sector-header">
          <span className="sector-tag">Choose Your Sector</span>
          <h2 className="sector-title">Purpose-Built <span className="sector-title-accent animate-text-gradient">Platforms.</span>
          </h2>
          <p className="sector-subtitle">Tailored for your specific community.</p>
        </div>

        <div className="sector-grid">
          {sectorCards.map((item) => (
            <div className={`sector-card ${item.cardClass}`} data-sector-card={item.dataSectorCard} key={item.id}>
              <div className="sector-card-banner">
                <span className="sector-num">{item.number}</span>
                <span className="sector-icon"><i data-lucide={item.iconName}></i></span>
                <h3 className="sector-card-title">{item.title}</h3>
                <p className="sector-card-tagline">{item.tagline}</p>
              </div>
              <div className="sector-card-body">
                <p className="sector-card-desc">{item.description}</p>
                <ul className="sector-features">
                  {item.features.map((feature) => (
                    <li key={feature.title}>
                      <svg className="sector-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span><strong>{feature.title}</strong> {feature.text}</span>
                    </li>
                  ))}
                </ul>
                <a href="#cta" className="sector-btn">
                  <span>{item.ctaText}</span>
                  <i data-lucide="arrow-right" className="w-4 h-4"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="sector-footer">
          <p className="sector-footer-q">Not sure which path to take?</p>
          <div className="sector-footer-actions">
            <a href="#cta" className="sector-ghost-btn">Talk to a Solutions Expert</a>
            <a href="#cta" className="sector-ghost-btn">Request a Personalized Quote</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section-local interaction logic (ported verbatim from lib/effects) ───

function initSectorReveal() {
  const section = document.querySelector<HTMLElement>('.sector-section');
  if (!section) return;

  const targets = section.querySelectorAll<HTMLElement>(
    '.sector-tag, .sector-title, .sector-subtitle, .sector-footer, .sector-card'
  );

  // Pause the entrance animations until the section scrolls into view
  targets.forEach(el => { el.style.animationPlayState = 'paused'; });

  // Once a card's entrance animation finishes, clear it so the hover
  // lift (a transform) isn't overridden by the animation's forwards fill.
  section.addEventListener('animationend', (e) => {
    const t = e.target as HTMLElement;
    if (t.classList && t.classList.contains('sector-card')) {
      t.classList.add('sector-settled');
    }
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        targets.forEach(el => { el.style.animationPlayState = 'running'; });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);
}

function initPricing() {
  const pricingToggle = document.getElementById('pricing-toggle') as HTMLInputElement | null;
  const priceEssentials = document.getElementById('price-essentials');
  const priceCampus = document.getElementById('price-campus');
  const periodEssentials = document.getElementById('period-essentials');
  const periodCampus = document.getElementById('period-campus');
  const toggleMonthlyLabel = document.getElementById('billing-monthly');
  const toggleAnnuallyLabel = document.getElementById('billing-annually');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      if (pricingToggle.checked) {
        // Annual rates
        if (priceEssentials) priceEssentials.textContent = "₹85";
        if (priceCampus) priceCampus.textContent = "₹145";
        if (periodEssentials) periodEssentials.textContent = "Per user, per month (billed annually)";
        if (periodCampus) periodCampus.textContent = "Per user, per month (billed annually)";
        if (toggleMonthlyLabel) toggleMonthlyLabel.classList.remove('active');
        if (toggleAnnuallyLabel) toggleAnnuallyLabel.classList.add('active');
      } else {
        // Monthly rates
        if (priceEssentials) priceEssentials.textContent = "₹175";
        if (priceCampus) priceCampus.textContent = "₹299";
        if (periodEssentials) periodEssentials.textContent = "Per user, per month";
        if (periodCampus) periodCampus.textContent = "Per user, per month";
        if (toggleMonthlyLabel) toggleMonthlyLabel.classList.add('active');
        if (toggleAnnuallyLabel) toggleAnnuallyLabel.classList.remove('active');
      }
    });

    if (toggleMonthlyLabel) {
      toggleMonthlyLabel.addEventListener('click', () => {
        pricingToggle.checked = false;
        pricingToggle.dispatchEvent(new Event('change'));
      });
    }

    if (toggleAnnuallyLabel) {
      toggleAnnuallyLabel.addEventListener('click', () => {
        pricingToggle.checked = true;
        pricingToggle.dispatchEvent(new Event('change'));
      });
    }
  }
}