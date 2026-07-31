"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProductSuite.module.scss";

const suiteTabs = [
  { tabId: "suite-community", label: "Course Creation", active: true },
  { tabId: "suite-courses", label: "Learner Intelligence" },
  { tabId: "suite-events", label: "Skill Mapping" },
  { tabId: "suite-members", label: "Credentials" },
];

const suitePanels = [
  {
    tabId: "suite-community",
    active: true,
    pill: "Efficiency in Minutes",
    heading: "AI-Powered Course Creation",
    paragraph: "Transition from raw concepts to complete courses instantly. By uploading a document, curriculum, or topic, our AI generates structured modules, interactive quizzes, and concise summaries, reducing development time by up to 60%.",
    image: "/assets/images/lms_how_create.png",
    alt: "AI-Powered Course Creation",
  },
  {
    tabId: "suite-courses",
    pill: "Data with Direction",
    heading: "Real-Time Learner Intelligence",
    paragraph: "Move beyond basic completion rates. Access deep-dive analytics that track actual engagement and mastery, allowing you to understand how learners interact with your content.",
    image: "/assets/images/lms_how_track.png",
    alt: "Real-Time Learner Intelligence",
  },
  {
    tabId: "suite-events",
    pill: "Closing the Gap",
    heading: "Precision Skill Mapping",
    paragraph: "Identify exactly where a learner is struggling. Our platform detects knowledge gaps in real-time and provides AI-driven remedies to help individuals reach their goals before they fall behind.",
    image: "/assets/images/lms_how_improve.png",
    alt: "Precision Skill Mapping",
  },
  {
    tabId: "suite-members",
    pill: "Authority in Every Record",
    heading: "Verified Digital Credentials",
    paragraph: "Issue secure, shareable, and instantly verifiable digital certificates. By using blockchain technology, we ensure that your graduates possess a tamper-proof record of achievement that is recognized globally.",
    image: "/assets/images/lms_how_deliver.png",
    alt: "Verified Digital Credentials",
  },
];

export default function ProductSuite() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    // The ported module references global gsap / ScrollTrigger.
    (window as any).gsap = gsap;
    (window as any).ScrollTrigger = ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    initProductSuite();
  }, []);

  return (
    <section className="product-suite-section" id="why-choose" style={{ paddingTop: '4rem' }}>
      <div className="container">
        <div className="suite-pin-wrap">

          <div className="suite-split-header">
            <div className="suite-header-left">
              <span className="section-tag" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>The All-In-One Suite</span>
              <h2 className="about-title font-bold" style={{ margin: '0', lineHeight: '1.15', fontSize: 'clamp(1.9rem, 6vw, 3rem)', fontWeight: '850' }}>
                Replace Complexity<br />with Clarity.</h2>
            </div>
            <div className="suite-header-right">
              <p className="suite-header-desc">Disconnected tools often lead to data silos and technical friction. Brevv simplifies your infrastructure by consolidating essential learning tools into a unified "Bento-box" ecosystem. Every module is built for harmony, ensuring information flows seamlessly across your entire organization</p>
            </div>
          </div>

          <div className="suite-tabs-wrapper desktop-only">
            <ul className="suite-tabs-pill">
              {suiteTabs.map((item) => (
                <li className="suite-tab-item" key={item.tabId}>
                  <button className={`suite-tab-btn-pill${item.active ? " active" : ""}`} data-suite-tab={item.tabId}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="suite-select-wrapper mobile-only-select-wrapper">
            <div className="suite-mobile-select-nav">
              <button className="suite-select-nav-btn prev-btn-select" aria-label="Previous Slide">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <div className="suite-select-input-container">
                <div className="suite-tabs-scroll-container">
                  <ul className="suite-tabs-pill-mobile">
                    {suiteTabs.map((item) => (
                      <li className="suite-tab-item-mobile" key={item.tabId}>
                        <button className={`suite-tab-btn-pill-mobile${item.active ? " active" : ""}`} data-suite-tab={item.tabId}>
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button className="suite-select-nav-btn next-btn-select" aria-label="Next Slide">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>

          <div className="relative w-full z-10">

            <div
              className="absolute -top-20 -left-20 w-[450px] h-[450px] rounded-full bg-sky-400/35 blur-[100px] pointer-events-none z-0">
            </div>
            <div
              className="absolute -bottom-24 -right-20 w-[500px] h-[500px] rounded-full bg-violet-400/30 blur-[120px] pointer-events-none z-0">
            </div>

            <div className="mockup-browser-window relative z-10">

              <div className="browser-window-header">
                <div className="window-controls">
                  <span className="control-dot close"></span>
                  <span className="control-dot minimize"></span>
                  <span className="control-dot maximize"></span>
                </div>
                <div className="browser-address-bar">
                  <span>https://brevvlms.com</span>
                </div>
              </div>

              <div className="suite-content-stage">
                {suitePanels.map((item) => (
                  <div className={`suite-content-new${item.active ? " active" : ""}`} id={item.tabId} key={item.tabId}>
                    <div className="suite-grid-new">
                      <div className="suite-text-panel">
                        <span className="suite-pill-new">{item.pill}</span>
                        <h3 data-original-text={item.heading}>{item.heading}</h3>
                        <p data-original-text={item.paragraph}>{item.paragraph}</p>
                      </div>
                      <div className="suite-visual-panel">
                        <img src={item.image} alt={item.alt} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section-local interaction logic (ported verbatim from lib/effects) ───

function initProductSuite() {
  const section = document.querySelector<HTMLElement>('.product-suite-section');
  if (!section) return;

  const pinWrap = section.querySelector<HTMLElement>('.suite-pin-wrap');
  const stage = section.querySelector<HTMLElement>('.suite-content-stage');
  const panels = Array.from(section.querySelectorAll<HTMLElement>('.suite-content-new'));
  const pillBtns = Array.from(section.querySelectorAll<HTMLElement>('.suite-tab-btn-pill'));
  const mobilePillBtns = Array.from(section.querySelectorAll<HTMLElement>('.suite-tab-btn-pill-mobile'));
  const suiteSelect = document.getElementById('suite-tab-select') as HTMLSelectElement | null;
  const headingEl = section.querySelector<HTMLElement>('.about-title');
  const descEl = section.querySelector<HTMLElement>('.suite-header-desc');
  if (!panels.length) return;

  let current = 0;
  let scrollActive = false;
  let scrollTrigger = null;
  let activeTabTypewriterTimeouts = [];

  // Extra "hold" (in viewport-heights) kept pinned on the last tab
  // before the whole section releases and scrolls away.
  const HOLD_UNITS = 0.6;
  let snapTotalUnits = panels.length - 1;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- existing typewriter (unchanged logic) ----------
  function restoreAllTabContents() {
    panels.forEach(content => {
      const h3 = content.querySelector<HTMLElement>('.suite-text-panel h3');
      const p = content.querySelector<HTMLElement>('.suite-text-panel p');
      const bullets = content.querySelector<HTMLElement>('.suite-bullets');
      const roiBox = content.querySelector<HTMLElement>('.suite-roi-box');
      if (h3 && h3.hasAttribute('data-original-text')) h3.textContent = h3.getAttribute('data-original-text');
      if (p && p.hasAttribute('data-original-text')) p.textContent = p.getAttribute('data-original-text');
      if (bullets) { bullets.style.opacity = ''; bullets.style.transform = ''; bullets.style.transition = ''; }
      if (roiBox) { roiBox.style.opacity = ''; roiBox.style.transform = ''; roiBox.style.transition = ''; }
      content.querySelectorAll<HTMLElement>('.typewriter-cursor').forEach(c => c.remove());
    });
  }

  function triggerTabTypewriter(targetContent: HTMLElement) {
    activeTabTypewriterTimeouts.forEach(t => clearTimeout(t));
    activeTabTypewriterTimeouts = [];
    restoreAllTabContents();

    const h3 = targetContent.querySelector<HTMLElement>('.suite-text-panel h3');
    const p = targetContent.querySelector<HTMLElement>('.suite-text-panel p');
    if (!h3 || !p) return;
    if (!h3.hasAttribute('data-original-text')) h3.setAttribute('data-original-text', h3.textContent.trim());
    if (!p.hasAttribute('data-original-text')) p.setAttribute('data-original-text', p.textContent.trim());

    const textH3 = h3.getAttribute('data-original-text') || h3.textContent.trim() || '';
    const textP = p.getAttribute('data-original-text') || p.textContent.trim() || '';
    h3.innerHTML = ''; p.innerHTML = '';

    const bullets = targetContent.querySelector<HTMLElement>('.suite-bullets');
    const roiBox = targetContent.querySelector<HTMLElement>('.suite-roi-box');
    if (bullets) { bullets.style.opacity = '0'; bullets.style.transform = 'translateY(10px)'; bullets.style.transition = 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s'; }
    if (roiBox) { roiBox.style.opacity = '0'; roiBox.style.transform = 'translateY(10px)'; roiBox.style.transition = 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s'; }

    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.textContent = '|';
    h3.appendChild(cursor);

    let h3Idx = 0, pIdx = 0;
    function typeH3() {
      if (h3Idx < textH3.length) {
        cursor.before(textH3.charAt(h3Idx)); h3Idx++;
        activeTabTypewriterTimeouts.push(setTimeout(typeH3, 12));
      } else { cursor.remove(); p.appendChild(cursor); typeP(); }
    }
    function typeP() {
      if (pIdx < textP.length) {
        cursor.before(textP.charAt(pIdx)); pIdx++;
        activeTabTypewriterTimeouts.push(setTimeout(typeP, 6));
      } else {
        cursor.remove();
        if (bullets) { bullets.style.opacity = '1'; bullets.style.transform = 'translateY(0)'; }
        if (roiBox) { roiBox.style.opacity = '1'; roiBox.style.transform = 'translateY(0)'; }
      }
    }
    typeH3();
  }

  // ---------- shared helpers ----------
  function setActiveIndex(index) {
    pillBtns.forEach((b, i) => b.classList.toggle('active', i === index));
    mobilePillBtns.forEach((b, i) => b.classList.toggle('active', i === index));
    if (suiteSelect) suiteSelect.selectedIndex = index;
    centerActiveMobileTab(index);
  }

  function centerActiveMobileTab(index) {
    const activeBtn = mobilePillBtns[index];
    const scrollContainer = section.querySelector<HTMLElement>('.suite-tabs-scroll-container');
    if (activeBtn && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const targetScrollLeft = scrollContainer.scrollLeft + (btnRect.left - containerRect.left) - (containerRect.width / 2) + (btnRect.width / 2);
      scrollContainer.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  }

  // ---------- Navigation Buttons State ----------
  const prevBtn = section.querySelector<HTMLButtonElement>('.prev-btn');
  const nextBtn = section.querySelector<HTMLButtonElement>('.next-btn');
  const prevBtnSelect = section.querySelector<HTMLButtonElement>('.prev-btn-select');
  const nextBtnSelect = section.querySelector<HTMLButtonElement>('.next-btn-select');

  function updateNavButtons(index) {
    if (prevBtn) {
      if (index === 0) {
        prevBtn.classList.add('disabled');
        prevBtn.setAttribute('disabled', 'true');
      } else {
        prevBtn.classList.remove('disabled');
        prevBtn.removeAttribute('disabled');
      }
    }
    if (nextBtn) {
      if (index === panels.length - 1) {
        nextBtn.classList.add('disabled');
        nextBtn.setAttribute('disabled', 'true');
      } else {
        nextBtn.classList.remove('disabled');
        nextBtn.removeAttribute('disabled');
      }
    }
    if (prevBtnSelect) {
      if (index === 0) {
        prevBtnSelect.classList.add('disabled');
        prevBtnSelect.setAttribute('disabled', 'true');
      } else {
        prevBtnSelect.classList.remove('disabled');
        prevBtnSelect.removeAttribute('disabled');
      }
    }
    if (nextBtnSelect) {
      if (index === panels.length - 1) {
        nextBtnSelect.classList.add('disabled');
        nextBtnSelect.setAttribute('disabled', 'true');
      } else {
        nextBtnSelect.classList.remove('disabled');
        nextBtnSelect.removeAttribute('disabled');
      }
    }
  }

  // Non-pinned (mobile / reduced-motion) switch: original class-toggle behavior + mobile translate
  function simpleShow(index) {
    if (window.innerWidth <= 1024 && stage) {
      stage.style.transform = `translateX(-${index * 100}%)`;
    }
    panels.forEach((p, i) => p.classList.toggle('active', i === index));
    setActiveIndex(index);
    current = index;
    triggerTabTypewriter(panels[index]);
    updateNavButtons(index);
  }

  // Pinned slide transition: incoming slides in from the right, on top
  function slideTo(index) {
    if (index === current) return;
    const incoming = panels[index];
    const outgoing = panels[current];
    gsap.killTweensOf([incoming, outgoing]);
    gsap.set(outgoing, { zIndex: 1 });
    gsap.set(incoming, { visibility: 'visible', zIndex: 2, xPercent: 100 });
    gsap.to(incoming, {
      xPercent: 0, duration: 0.75, ease: 'power3.out',
      onComplete() { gsap.set(outgoing, { visibility: 'hidden', zIndex: 0 }); }
    });
    setActiveIndex(index);
    current = index;
    triggerTabTypewriter(incoming);
  }

  function scrollToIndex(index) {
    if (!scrollTrigger) return;
    const y = scrollTrigger.start + (index / snapTotalUnits) * (scrollTrigger.end - scrollTrigger.start);
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  // ---------- word split (preserves <br>) ----------
  function splitWords(el: HTMLElement | null) {
    if (!el) return [];
    if (el.dataset.split === 'true') return el.querySelectorAll<HTMLElement>('.suite-word > span');
    const nodes = Array.from(el.childNodes);
    el.innerHTML = '';
    nodes.forEach((node: any) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') { el.appendChild(document.createElement('br')); return; }
      node.textContent.split(/(\s+)/).forEach(chunk => {
        if (chunk === '') return;
        if (chunk.trim() === '') { el.appendChild(document.createTextNode(chunk)); return; }
        const outer = document.createElement('span');
        outer.className = 'suite-word';
        const inner = document.createElement('span');
        inner.textContent = chunk;
        outer.appendChild(inner);
        el.appendChild(outer);
      });
    });
    el.dataset.split = 'true';
    return el.querySelectorAll<HTMLElement>('.suite-word > span');
  }

  // ---------- one-time entrance ----------
  function playEntrance() {
    const words = [...splitWords(headingEl), ...splitWords(descEl)];
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(pinWrap, { xPercent: 8, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.9 });
    tl.fromTo(words, { yPercent: 115, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.025 }, '-=0.5');
  }

  // ---------- measure tallest panel → stage height ----------
  function setStageHeight() {
    let max = 0;
    panels.forEach(p => {
      const prev = p.getAttribute('style') || '';
      p.style.cssText += ';position:relative;visibility:hidden;display:block;transform:none;';
      max = Math.max(max, p.offsetHeight);
      p.setAttribute('style', prev);
    });
    if (stage) stage.style.height = max + 'px';
  }

  // ---------- bindings (bound once) ----------
  pillBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => { scrollActive ? scrollToIndex(index) : simpleShow(index); });
  });
  mobilePillBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => { scrollActive ? scrollToIndex(index) : simpleShow(index); });
  });
  if (suiteSelect) {
    suiteSelect.addEventListener('change', e => {
      const index = (e.target as HTMLSelectElement).selectedIndex;
      scrollActive ? scrollToIndex(index) : simpleShow(index);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (current > 0) {
        scrollActive ? scrollToIndex(current - 1) : simpleShow(current - 1);
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (current < panels.length - 1) {
        scrollActive ? scrollToIndex(current + 1) : simpleShow(current + 1);
      }
    });
  }

  if (prevBtnSelect) {
    prevBtnSelect.addEventListener('click', () => {
      if (current > 0) {
        scrollActive ? scrollToIndex(current - 1) : simpleShow(current - 1);
      }
    });
  }
  if (nextBtnSelect) {
    nextBtnSelect.addEventListener('click', () => {
      if (current < panels.length - 1) {
        scrollActive ? scrollToIndex(current + 1) : simpleShow(current + 1);
      }
    });
  }

  // Swipe gesture support for mobile
  if (stage) {
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;

    stage.addEventListener('touchstart', (e: any) => {
      touchStartX = e.changedTouches[0].screenX;
      isDragging = true;
    }, { passive: true });

    stage.addEventListener('touchend', (e: any) => {
      if (!isDragging) return;
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50; // pixels
      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe Left -> Next
        if (current < panels.length - 1) {
          scrollActive ? scrollToIndex(current + 1) : simpleShow(current + 1);
        }
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe Right -> Prev
        if (current > 0) {
          scrollActive ? scrollToIndex(current - 1) : simpleShow(current - 1);
        }
      }
      isDragging = false;
    }, { passive: true });
  }

  // Initialize nav buttons state
  updateNavButtons(0);

  // initial typewriter for the default active tab
  triggerTabTypewriter(panels[0]);

  // ---------- GSAP orchestration ----------
  if (reduced || !window.gsap || !window.ScrollTrigger) return; // graceful fallback: plain tabs

  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  // Desktop: pin + snap + slide + entrance
  mm.add('(min-width: 1025px)', () => {
    section.classList.add('js-suite-scroll');
    gsap.set(pinWrap, { opacity: 0 }); // hide until the entrance reveals it (no plain-text flash)
    setStageHeight();
    panels.forEach((p, i) => gsap.set(p, {
      xPercent: i === 0 ? 0 : 100,
      visibility: i === 0 ? 'visible' : 'hidden',
      zIndex: i === 0 ? 2 : 0
    }));
    current = 0; setActiveIndex(0); scrollActive = true;

    // Total scroll length = one screen per tab gap + a hold tail. Tabs
    // snap at i/total; the extra point at 1 releases the section.
    const total = (panels.length - 1) + HOLD_UNITS;
    snapTotalUnits = total;
    const snapPoints = [];
    for (let i = 0; i < panels.length; i++) snapPoints.push(i / total);
    snapPoints.push(1);

    scrollTrigger = ScrollTrigger.create({
      trigger: pinWrap,
      start: 'top top',
      end: () => '+=' + total * window.innerHeight,
      pin: true,
      snap: {
        snapTo: snapPoints,
        duration: { min: 0.2, max: 0.5 },
        ease: 'power2.inOut',
        directional: false   // snap to the NEAREST tab, not in the scroll direction —
        // stops momentum from carrying past a tab on its own
      },
      onUpdate: self => {
        const idx = Math.min(Math.round(self.progress * total), panels.length - 1);
        if (idx !== current) slideTo(idx);
      }
    });

    ScrollTrigger.create({ trigger: pinWrap, start: 'top 88%', once: true, onEnter: playEntrance });

    return () => { // leaving desktop → tear down cleanly
      scrollActive = false;
      if (scrollTrigger) { scrollTrigger.kill(); scrollTrigger = null; }
      section.classList.remove('js-suite-scroll');
      panels.forEach(p => gsap.set(p, { clearProps: 'all' }));
      gsap.set(pinWrap, { clearProps: 'opacity' });
      if (stage) stage.style.height = '';
      panels.forEach((p, i) => p.classList.toggle('active', i === current));
    };
  });

  // Mobile: no pin, but still play the header entrance once
  mm.add('(max-width: 1024px)', () => {
    gsap.set(pinWrap, { opacity: 0 }); // hide until entrance reveals it
    ScrollTrigger.create({ trigger: section, start: 'top 88%', once: true, onEnter: playEntrance });
    return () => { gsap.set(pinWrap, { clearProps: 'opacity' }); };
  });
}