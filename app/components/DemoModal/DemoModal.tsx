"use client";

import { useEffect, useRef } from "react";
import "./DemoModal.module.scss";

export default function DemoModal() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    initModal();
  }, []);

  return (
    <div id="demo-modal" className="modal-overlay" style={{ display: 'none' }}>
      <div className="modal-card">
        <button className="modal-close-btn" id="modal-close-btn">&times;</button>
        <div id="modal-form-content">
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <span className="cta-tag-new"
              style={{ fontSize: '0.75rem', letterSpacing: '0.15em', display: 'block', marginBottom: '0.25rem' }}>Direct
              Access</span>
            <h3
              style={{ fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', fontWeight: '800', color: '#0f172a', margin: '0 0 0.5rem', fontFamily: 'var(--font-heading)' }}>
              Book a Live Demo</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0', lineHeight: '1.4' }}>Schedule a personalized
              walkthrough of the Brevv LXP and AI Tutor.</p>
          </div>

          <form id="modal-demo-form" className="modal-form">
            <div className="form-group-modal">
              <label htmlFor="modal-name">Full Name</label>
              <input type="text" id="modal-name" required placeholder="Dr. Sarah Jenkins" />
            </div>

            <div className="form-group-modal">
              <label htmlFor="modal-email">Work Email</label>
              <input type="email" id="modal-email" required placeholder="sarah@university.edu" />
            </div>

            <div className="form-group-modal">
              <label htmlFor="modal-institution">Institution Type</label>
              <select id="modal-institution" required defaultValue="">
                <option value="" disabled>Select institution type</option>
                <option value="university">Higher Education (University)</option>
                <option value="corporate">Corporate L&D / Enterprise</option>
                <option value="k12">K-12 School / District</option>
                <option value="vocational">Vocational / Skill Academy</option>
              </select>
            </div>

            <button type="submit" className="cta-btn-primary-new"
              style={{ width: '100%', border: 'none', fontSize: '0.95rem', fontWeight: '700', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: '1.5rem' }}>
              <span>Request Demo Slot</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                style={{ marginLeft: '0.5rem' }}>
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </form>
        </div>

        <div id="modal-success-content" style={{ display: 'none', textAlign: 'center', padding: '2.5rem 1rem' }}>
          <div
            style={{ width: '60px', height: '60px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="4">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3
            style={{ fontSize: 'clamp(1.3rem, 5vw, 1.6rem)', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            Slot Requested!</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: '0' }}>Thank you! Our integration
            team will reach out via email within 24 hours to schedule your custom walkthrough.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Section-local interaction logic (ported verbatim from lib/effects) ───

function initModal() {
  const demoModal = document.getElementById('demo-modal');
  const triggerNav = document.getElementById('book-demo-trigger-nav');
  const triggerCta = document.getElementById('book-demo-trigger-cta');
  const triggerMobile = document.getElementById('book-demo-trigger-mobile');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalForm = document.getElementById('modal-demo-form') as HTMLFormElement | null;
  const formContent = document.getElementById('modal-form-content');
  const successContent = document.getElementById('modal-success-content');
  const navMenu = document.querySelector<HTMLElement>('.nav-menu');
  const menuToggle = document.querySelector<HTMLElement>('.menu-toggle');

  const openModal = () => {
    if (demoModal) {
      // Auto-close mobile nav panel on opening modal
      if (navMenu) navMenu.classList.remove('active');
      if (menuToggle) {
        menuToggle.classList.remove('active');
        const spans = menuToggle.querySelectorAll<HTMLElement>('span');
        if (spans.length >= 3) {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }

      demoModal.style.display = 'flex';
      // Reset form view when opening
      if (formContent) formContent.style.display = 'block';
      if (successContent) successContent.style.display = 'none';
      if (modalForm) modalForm.reset();
      document.body.style.overflow = 'hidden'; // Lock page scroll
    }
  };

  const closeModal = () => {
    if (demoModal) {
      demoModal.style.display = 'none';
      document.body.style.overflow = ''; // Unlock page scroll
    }
  };

  const triggerNavMobile = document.getElementById('book-demo-trigger-nav-mobile');
  if (triggerNav) triggerNav.addEventListener('click', openModal);
  if (triggerNavMobile) triggerNavMobile.addEventListener('click', openModal);
  if (triggerCta) triggerCta.addEventListener('click', openModal);
  if (triggerMobile) triggerMobile.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close when clicking outside card (on overlay backdrop)
  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        closeModal();
      }
    });
  }

  // Handle Form Submission
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Submit fade animation
      if (formContent) {
        formContent.style.transition = 'opacity 0.3s ease';
        formContent.style.opacity = '0';

        setTimeout(() => {
          formContent.style.display = 'none';
          formContent.style.opacity = '1'; // Reset for next time

          if (successContent) {
            successContent.style.display = 'block';
            successContent.style.opacity = '0';
            successContent.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
              successContent.style.opacity = '1';
            }, 50);
          }
        }, 300);
      }
    });
  }
}