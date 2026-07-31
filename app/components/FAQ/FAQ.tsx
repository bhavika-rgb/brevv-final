"use client";

import { useEffect, useRef } from "react";
import "./FAQ.module.scss";

const faqItems = [
  {
    number: "01.",
    question: "How is Brevv different from other platforms?",
    answer:
      "Traditional systems (LMS) are essentially digital storage units; they host files but don't do much else. Brevv is an active participant. We use AI to help you generate content, identify exactly where a learner is struggling, and provide immediate support. We don't just store learning; we help drive it.",
  },
  {
    number: "02.",
    question: "Is our institutional data safe and private?",
    answer:
      "Data security is our top priority. We are fully compliant with global standards like GDPR and FERPA, as well as India's Digital Personal Data Protection (DPDP) Act. We use high-level encryption to ensure that your data is private, secure, and belongs only to you.",
  },
  {
    number: "03.",
    question: "Can we move our existing courses and students to Brevv?",
    answer:
      "Yes, and we make it easy. We offer a \"White-Glove\" migration service, meaning our team handles the heavy lifting. We can move your data from Moodle, Canvas, Blackboard, or D2L seamlessly, ensuring you don't lose any progress or records during the switch.",
  },
  {
    number: "04.",
    question: "What exactly is a \"Blockchain-Verified Credential\"?",
    answer:
      "Think of it as a digital certificate with a permanent, unhackable fingerprint. Unlike a PDF that can be edited or faked, our certificates are stored on a secure digital ledger. This allows employers to verify a student's skills instantly without needing to call your office for confirmation.",
  },
  {
    number: "05.",
    question: "Does Brevv work on mobile devices or slow internet?",
    answer:
      "Yes. We built Brevv to be mobile-first. It is designed to work smoothly on smartphones and can handle low-bandwidth (slow internet) situations, making it accessible for learners no matter where they are located.",
  },
  {
    number: "06.",
    question: "Do we need to be tech experts to manage the platform?",
    answer:
      "Not at all. We designed Brevv to be as simple as using your favorite social media app. Our dashboard is clean and intuitive, and we provide full training and support to make sure your team feels confident using every feature.",
  },
];

export default function FAQ() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    initFaq();
  }, []);

  return (
    <section className="faq-section" id="faq">
      <div className="pricing-container">
        <div className="faq-grid-container">
          <div className="faq-left-col">
            <div className="faq-title-serif">Questions?</div>
            <div className="faq-title-sub">We're here to help</div>
            <div className="faq-title-underline"></div>
          </div>

          <div>
            <div className="faq-list-clean">
              {faqItems.map((item) => (
                <div className="faq-item" key={item.number}>
                  <button className="faq-question">
                    <span className="faq-question-text">
                      <span className="faq-number">{item.number}</span>
                      <span>{item.question}</span>
                    </span>
                    <span className="faq-icon-circle">
                      <svg className="faq-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="3">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section-local interaction logic (ported verbatim from lib/effects) ───

function initFaq() {
  // Draw the separator lines left→right when the list scrolls into view
  const faqList = document.querySelector<HTMLElement>('.faq-list-clean');
  if (faqList) {
    const lineObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('faq-in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    lineObserver.observe(faqList);
  }

  const faqQuestions = document.querySelectorAll<HTMLElement>('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close other FAQ items for clean focus
      document.querySelectorAll<HTMLElement>('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });
}