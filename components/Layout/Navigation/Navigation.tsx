"use client";

import { useEffect, useRef } from "react";
import { createIcons, icons } from "lucide";
import "./Navigation.module.scss";

export default function Navigation() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // effects run once (matches the original init guard)
    ran.current = true;

    // Expose lucide globally so the mobile-menu toggle can re-render its icon,
    // and render every <i data-lucide="..."> already committed to the DOM.
    (window as any).lucide = { createIcons: () => createIcons({ icons }) };
    createIcons({ icons });

    initMobileMenu();
    initStickyNav();
    initSmoothAnchors();
  }, []);

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 w-full py-5 font-body bg-transparent">
      <div className="flex items-center justify-between px-3 sm:px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full">

        <a href="#" className="flex items-center cursor-pointer z-30" id="logo-link">
          <img src="/assets/images/logo.png" alt="brevv" className="h-7 sm:h-8 block" />
        </a>

        <div className="hidden md:flex items-center gap-7">

          <div className="relative group">
            <button
              className="text-sm text-white/80 group-hover:text-white transition-colors font-medium flex items-center gap-1 cursor-pointer bg-transparent border-none">
              Features
              <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="absolute left-0 top-full pt-3 hidden group-hover:block z-40">
              <div className="bg-white rounded-xl shadow-2xl py-2 min-w-[220px] border border-black/5">
                <a href="#why-choose"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008CFF] transition-colors">AI
                  Course Builder</a>
                <a href="#why-choose"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008CFF] transition-colors">Verified
                  Credentials</a>
                <a href="#why-choose"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008CFF] transition-colors">Skill
                  Gap Analysis</a>
                <a href="#why-choose"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008CFF] transition-colors">Live
                  Learning</a>
                <a href="#why-choose"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008CFF] transition-colors">Proctored
                  Assessments</a>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button
              className="text-sm text-white/80 group-hover:text-white transition-colors font-medium flex items-center gap-1 cursor-pointer bg-transparent border-none">
              Solutions
              <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="absolute left-0 top-full pt-3 hidden group-hover:block z-40">
              <div className="bg-white rounded-xl shadow-2xl py-2 min-w-[220px] border border-black/5">
                <a href="#scale-performance"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008CFF] transition-colors">Higher
                  Education</a>
                <a href="#scale-performance"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008CFF] transition-colors">Corporate
                  L&amp;D</a>
                <a href="#scale-performance"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008CFF] transition-colors">Vocational
                  &amp; K-12</a>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button
              className="text-sm text-white/80 group-hover:text-white transition-colors font-medium flex items-center gap-1 cursor-pointer bg-transparent border-none">
              Resources
              <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="absolute left-0 top-full pt-3 hidden group-hover:block z-40">
              <div className="bg-white rounded-xl shadow-2xl py-2 min-w-[220px] border border-black/5">
                <a href="#about"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008CFF] transition-colors">About
                  Brevv</a>
                <a href="#about"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008CFF] transition-colors">The
                  Foundary DNA</a>
                <a href="#"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008CFF] transition-colors">Documentation</a>
                <a href="#"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008CFF] transition-colors">Support
                  Center</a>
              </div>
            </div>
          </div>

        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <a href="#"
            className="nav-login-btn hidden sm:inline-block px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer">
            Login
          </a>
          <a href="#cta"
            className="nav-trial-btn rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-white text-black transition-all shadow-sm cursor-pointer whitespace-nowrap">
            Start Free Trial
          </a>

          <button id="mobile-menu-toggle"
            className="md:hidden flex items-center justify-center p-2 text-white z-30 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu">
            <i data-lucide="menu" className="w-6 h-6"></i>
          </button>
        </div>
      </div>

      <div id="mobile-menu-drawer"
        className="fixed inset-0 bg-black/95 z-25 flex flex-col items-center justify-center gap-7 md:hidden transition-all duration-300 transform translate-x-full overflow-y-auto py-16">
        <div className="text-center">
          <span className="text-white/40 text-xs uppercase tracking-widest">Features</span>
          <div className="mt-3 flex flex-col gap-2.5">
            <a href="#why-choose"
              className="mobile-nav-link text-lg text-white/80 hover:text-white transition-colors font-medium cursor-pointer">AI
              Course Builder</a>
            <a href="#why-choose"
              className="mobile-nav-link text-lg text-white/80 hover:text-white transition-colors font-medium cursor-pointer">Verified
              Credentials</a>
            <a href="#why-choose"
              className="mobile-nav-link text-lg text-white/80 hover:text-white transition-colors font-medium cursor-pointer">Skill
              Gap Analysis</a>
            <a href="#why-choose"
              className="mobile-nav-link text-lg text-white/80 hover:text-white transition-colors font-medium cursor-pointer">Live
              Learning</a>
            <a href="#why-choose"
              className="mobile-nav-link text-lg text-white/80 hover:text-white transition-colors font-medium cursor-pointer">Proctored
              Assessments</a>
          </div>
        </div>
        <div className="text-center">
          <span className="text-white/40 text-xs uppercase tracking-widest">Solutions</span>
          <div className="mt-3 flex flex-col gap-2.5">
            <a href="#scale-performance"
              className="mobile-nav-link text-lg text-white/80 hover:text-white transition-colors font-medium cursor-pointer">Higher
              Education</a>
            <a href="#scale-performance"
              className="mobile-nav-link text-lg text-white/80 hover:text-white transition-colors font-medium cursor-pointer">Corporate
              L&amp;D</a>
            <a href="#scale-performance"
              className="mobile-nav-link text-lg text-white/80 hover:text-white transition-colors font-medium cursor-pointer">Vocational
              &amp; K-12</a>
          </div>
        </div>
        <div className="text-center">
          <span className="text-white/40 text-xs uppercase tracking-widest">Resources</span>
          <div className="mt-3 flex flex-col gap-2.5">
            <a href="#about"
              className="mobile-nav-link text-lg text-white/80 hover:text-white transition-colors font-medium cursor-pointer">About
              Brevv</a>
            <a href="#about"
              className="mobile-nav-link text-lg text-white/80 hover:text-white transition-colors font-medium cursor-pointer">The
              Foundary DNA</a>
            <a href="#"
              className="mobile-nav-link text-lg text-white/80 hover:text-white transition-colors font-medium cursor-pointer">Documentation</a>
            <a href="#"
              className="mobile-nav-link text-lg text-white/80 hover:text-white transition-colors font-medium cursor-pointer">Support
              Center</a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 mt-2">
          <a href="#"
            className="mobile-nav-link text-white/70 text-base font-medium cursor-pointer">Login</a>
          <a href="#cta"
            className="mobile-nav-link px-7 py-3 bg-white text-black text-sm font-bold rounded-full cursor-pointer">Start
            Free Trial</a>
        </div>
      </div>
    </nav>
  );
}

// ─── Section-local interaction logic (ported verbatim from lib/effects) ───

function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  const mobileNavLinks = document.querySelectorAll<HTMLElement>('.mobile-nav-link');
  const navMenu = document.querySelector<HTMLElement>('.nav-menu');
  const menuToggle = document.querySelector<HTMLElement>('.menu-toggle');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('translate-x-0');
      if (isOpen) {
        mobileDrawer.classList.remove('translate-x-0');
        mobileDrawer.classList.add('translate-x-full');
        mobileToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        mobileToggle.classList.remove('text-white');
        mobileToggle.classList.add('text-[#0F172A]');
      } else {
        mobileDrawer.classList.remove('translate-x-full');
        mobileDrawer.classList.add('translate-x-0');
        mobileToggle.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
        mobileToggle.classList.remove('text-[#0F172A]');
        mobileToggle.classList.add('text-white');
      }
      if ((window as any).lucide) {
        (window as any).lucide.createIcons(); // Refresh Lucide icons in the toggle button
      }
    });

    // Close mobile menu when nav link is clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('translate-x-0');
        mobileDrawer.classList.add('translate-x-full');
        mobileToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        mobileToggle.classList.remove('text-white');
        mobileToggle.classList.add('text-[#0F172A]');
        if ((window as any).lucide) {
          (window as any).lucide.createIcons();
        }
      });
    });
  }

  // Fallback for legacy class toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      const spans = menuToggle.querySelectorAll<HTMLElement>('span');
      if (spans.length >= 3) {
        spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
      }
    });

    const navLinks = navMenu.querySelectorAll<HTMLElement>('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        const spans = menuToggle.querySelectorAll<HTMLElement>('span');
        if (spans.length >= 3) {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    });
  }
}

function initStickyNav() {
  const navElement = document.querySelector<HTMLElement>("nav");
  const sections = document.querySelectorAll<HTMLElement>("section[id]");
  let ticking = false;

  const update = () => {
    ticking = false;
    const scrollY = window.pageYOffset || window.scrollY;

    // Sticky navbar toggle (cheap — no layout reads)
    if (navElement) {
      navElement.classList.toggle("sticky-nav-active", scrollY > 50);
    }

    // Active-link highlighting. The navLink lookup runs BEFORE any offset reads,
    // so if there's no matching link we skip the (layout-thrashing) reads.
    sections.forEach((current) => {
      const sectionId = current.getAttribute("id");
      const navLink =
        document.querySelector(`.nav-menu a[href*="${sectionId}"]`) ||
        document.querySelector(`.mobile-nav-link[href*="${sectionId}"]`);
      if (!navLink) return;
      const sectionTop = current.offsetTop - 100;
      const sectionHeight = current.offsetHeight;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active");
      } else {
        navLink.classList.remove("active");
      }
    });
  };

  const onScroll = () => {
    // ensure full nav is visible while the user is scrolling
    if (navElement && navElement.classList.contains('nav-brand-only')) {
      navElement.classList.remove('nav-brand-only');
    }
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  update();

  // Show only the brand/logo while the hero/video section is visible.
  const videoEl = document.querySelector<HTMLVideoElement>('.solid-direction-sticky video, .solid-direction-section video, #hero-bg-video');
  if (videoEl && navElement) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navElement.classList.add('nav-brand-only');
        } else {
          navElement.classList.remove('nav-brand-only');
        }
      });
    }, { threshold: 0.25 });
    io.observe(videoEl);
  }
}

/**
 * Smooth in-page anchor scrolling.
 *
 * Replaces the global CSS `html { scroll-behavior: smooth }` (removed because it
 * fights GSAP ScrollTrigger's pin/snap positioning). A click-driven, one-shot
 * smooth scroll doesn't interfere with ScrollTrigger's continuous scroll writes,
 * so we get smooth nav-link jumps without the stutter.
 */
function initSmoothAnchors() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return; // "#" is used as a placeholder href

    const dest = document.querySelector<HTMLElement>(hash);
    if (!dest) return;

    e.preventDefault();
    const top = dest.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}