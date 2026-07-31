"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Footer.module.scss";

const footerColumns = [
  {
    title: "Explore the Platform",
    links: [
      { href: "#why-choose", label: "AI Course Builder" },
      { href: "#why-choose", label: "Verified Credentials" },
      { href: "#why-choose", label: "Skill Mapping" },
      { href: "#faq", label: "Platform Security" },
    ],
  },
  {
    title: "Our Solutions",
    links: [
      { href: "#scale-performance", label: "Higher Education" },
      { href: "#scale-performance", label: "Corporate L&D" },
      { href: "#scale-performance", label: "Vocational & K-12" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#about", label: "About Brevv" },
      { href: "#about", label: "The Foundary DNA" },
      { href: "#", label: "Careers" },
      { href: "#cta", label: "Contact Us" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { href: "#", label: "Help Center" },
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
      { href: "#", label: "DPDP Compliance" },
    ],
  },
];

const socialLinks = [
  { title: "LinkedIn", icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>) },
  { title: "X / Twitter", icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>) },
  { title: "YouTube", icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>) },
];

export default function Footer() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    (window as any).gsap = gsap; // the ported module references global gsap
    initFooterEffects();
  }, []);

  return (
    <footer className="footer">

      <div className="footer-bg-effects">
        <div className="footer-ray footer-ray-1"></div>
        <div className="footer-ray footer-ray-2"></div>
        <div className="footer-ray footer-ray-3"></div>
        <div className="footer-bokeh-container"></div>
      </div>
      <div className="container" style={{ position: 'relative', zIndex: '2' }}>

        <div className="footer-brand-row" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div className="footer-large-brand" style={{ marginBottom: '0' }}>
              <img src="/assets/icons/logo.svg" alt="brevv" />
            </div>
          </div>
          <p style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '600', margin: '1.5rem 0 0', lineHeight: '1.4' }}>AI-Powered
            Learning. Trusted Credentials. One Connected Platform.</p>
        </div>

        <hr className="footer-divider" />

        <div className="footer-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
          {footerColumns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h4>{column.title}</h4>
              <ul className="footer-links">
                {column.links.map((link) => (
                  <li key={link.label}><a href={link.href}>{link.label}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-column">
            <h4>Get In Touch</h4>
            <ul className="footer-links" style={{ marginBottom: '0.75rem' }}>
              <li>📧 <a href="mailto:hello@brevvlms.com">hello@brevvlms.com</a></li>
            </ul>

            <form className="footer-contact-form" onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for reaching out! We'll get back to you shortly.");
            }}>
              <input type="text" placeholder="Your Name" className="footer-contact-input" required />
              <input type="email" placeholder="Your Email" className="footer-contact-input" required />
              <textarea placeholder="Your Message" className="footer-contact-textarea" rows={3} required></textarea>
              <button type="submit" className="footer-contact-btn">Send Message</button>
            </form>

            <div className="social-links" style={{ marginTop: '1.25rem' }}>
              {socialLinks.map((link) => (
                <a href="#" className="social-icon" title={link.title} key={link.title}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>&copy; 2026 Brevv Learning Technologies. All Rights Reserved.</p>
          <p>Forged at the Foundary with Precision<sup>(SM)</sup></p>
        </div>
      </div>
    </footer>
  );
}

// ─── Section-local interaction logic (ported verbatim from lib/effects) ───

function initFooterEffects() {
  if (typeof gsap === "undefined") return;

  const footer = document.querySelector<HTMLElement>(".footer");
  if (!footer) return;

  const container = footer.querySelector<HTMLElement>(".footer-bokeh-container");
  if (!container) return;

  const anims: any[] = [];

  // 1. Three vertical light rays gently pulsing
  const ray1 = footer.querySelector<HTMLElement>(".footer-ray-1");
  const ray2 = footer.querySelector<HTMLElement>(".footer-ray-2");
  const ray3 = footer.querySelector<HTMLElement>(".footer-ray-3");
  if (ray1) anims.push(gsap.fromTo(ray1, { opacity: 0.25 }, { opacity: 0.6, duration: 5.0, ease: "sine.inOut", repeat: -1, yoyo: true }));
  if (ray2) anims.push(gsap.fromTo(ray2, { opacity: 0.25 }, { opacity: 0.55, duration: 6.5, ease: "sine.inOut", repeat: -1, yoyo: true }));
  if (ray3) anims.push(gsap.fromTo(ray3, { opacity: 0.25 }, { opacity: 0.5, duration: 7.5, ease: "sine.inOut", repeat: -1, yoyo: true }));

  // 2. Flowing bubbles — animate transform (y/x), NOT layout props like `bottom`,
  //    so no reflow per frame.
  const riseDistance = (container.getBoundingClientRect().height || 420) + 40;
  const numberOfBokeh = 22;
  for (let i = 0; i < numberOfBokeh; i++) {
    const dot = document.createElement("div");
    dot.classList.add("footer-bokeh-dot");

    const size = gsap.utils.random(4, 12);
    const left = gsap.utils.random(0, 100);
    const maxOpacity = gsap.utils.random(0.15, 0.45);
    const duration = gsap.utils.random(8, 20);
    const delay = gsap.utils.random(0, duration);
    const swayDistance = gsap.utils.random(20, 60);
    const swayDuration = gsap.utils.random(3, 6);

    gsap.set(dot, { width: size, height: size, left: `${left}%`, bottom: 0, opacity: 0, x: 0, y: 0, force3D: true });
    container.appendChild(dot);

    const tl = gsap.timeline({ repeat: -1, delay });
    tl.fromTo(dot, { y: 0 }, { y: -riseDistance, duration, ease: "none" }, 0);
    tl.to(dot, { opacity: maxOpacity, duration: duration * 0.2, ease: "sine.out" }, 0);
    tl.to(dot, { opacity: 0, duration: duration * 0.2, ease: "sine.in" }, duration * 0.8);
    anims.push(tl);

    anims.push(
      gsap.fromTo(dot, { x: -swayDistance / 2 }, { x: swayDistance / 2, duration: swayDuration, ease: "sine.inOut", repeat: -1, yoyo: true })
    );
  }

  // 3. Only run these while the footer is actually on screen (it is off-screen
  //    most of the time) — this is the big perf win.
  let running = true;
  const setRunning = (on: boolean) => {
    if (on === running) return;
    running = on;
    anims.forEach((a) => (on ? a.play() : a.pause()));
  };
  setRunning(false); // start paused

  const io = new IntersectionObserver(
    (entries) => setRunning(entries[0].isIntersecting),
    { threshold: 0 }
  );
  io.observe(footer);
}