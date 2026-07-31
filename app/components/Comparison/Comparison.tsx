"use client";

import { useEffect, useRef, useState } from "react";
import { createIcons, icons } from "lucide";
import "./Comparison.module.scss";

const comparisonRows = [
  {
    feature: "Creating Courses",
    icon: "pen-tool",
    brevvLead: "AI-Assisted and Fast.",
    brevvText: "Upload your notes or videos, and the Brevv AI builds the lessons and quizzes for you in minutes.",
    oldLead: "Manual and Time-Consuming.",
    oldText: "You have to type and upload everything yourself. It can take weeks to finish one course.",
  },
  {
    feature: "How Students Learn",
    icon: "route",
    brevvLead: "Personalized and Adaptive.",
    brevvText: "The platform sees how a student is doing and gives them extra help or lets them move ahead faster.",
    oldLead: "One-Size-Fits-All.",
    oldText: "Every student follows the exact same path, even if they already know the topic.",
  },
  {
    feature: "Tracking Progress",
    icon: "activity",
    brevvLead: "Deep Skill Analysis.",
    brevvText: "The Brevv system shows you exactly which topics a student is struggling with so you can help them.",
    oldLead: "Basic Information.",
    oldText: "Reports only show if a student finished a video. You don't know if they truly got it.",
  },
  {
    feature: "Certificates",
    icon: "award",
    brevvLead: "Official & Safe Records.",
    brevvText: "We use secure technology to make certificates official. They can't be faked and are easy to check.",
    oldLead: "Easily Lost or Faked.",
    oldText: "Basic PDFs are easy to lose or fake. It's hard for bosses to check if they are real.",
  },
  {
    feature: "The Technology",
    icon: "layers",
    brevvLead: "One Unified System.",
    brevvText: "Live classes, exams, and certificates all happen in one app. It's simpler and costs less.",
    oldLead: "Many Disconnected Tools.",
    oldText: "You have to pay for and use different apps for video, tests, and student records.",
  },
];

export default function Comparison() {
  const ran = useRef(false);
  const [selectedTab, setSelectedTab] = useState<"brevv" | "old">("brevv");

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    createIcons({ icons }); // render this section's <i data-lucide="..."> icons
    initComparisonReveal();
  }, []);

  return (
    <section className="comparison-section" id="comparison">
      <div className="container">

        <div className="edge-header">
          <span className="comp-anim-tag edge-tag">The Competitive Edge</span>
          <h2 className="comp-anim-heading edge-title">Built for Scale. <span className="edge-title-accent">Designed for
              Simplicity.</span></h2>
          <p className="comp-anim-sub edge-subtitle desktop-only-subtitle">As education and job requirements change, the tools we use to learn must
            change too. Brevv offers a modern approach to learning by fixing the common problems found in older,
            traditional systems.</p>
          <p className="comp-anim-sub edge-subtitle mobile-only-subtitle">Everything you need to move faster, scale smarter, and keep complexity under control.</p>
        </div>

        {/* Mobile-Only Interactive Comparison Switcher */}
        <div className="mobile-comparison-wrapper">
          
          {/* Segmented Switcher Controls */}
          <div className="mobile-switcher-container">
            <div className="mobile-switcher">
              <button 
                className={`switcher-tab tab-brevv ${selectedTab === "brevv" ? "active" : ""}`}
                onClick={() => setSelectedTab("brevv")}
              >
                The Brevv Way
              </button>
              <button 
                className={`switcher-tab tab-old ${selectedTab === "old" ? "active" : ""}`}
                onClick={() => setSelectedTab("old")}
              >
                The Old Way
              </button>
              <div className={`switcher-slider slide-${selectedTab}`}></div>
            </div>
          </div>

          {/* Morphing Row-Cards */}
          <div className="mobile-cards-container">
            {comparisonRows.map((item) => (
              <div className="mobile-comp-card" key={item.feature}>
                
                {/* Card Header (Feature Name) */}
                <div className="mobile-card-header">
                  <div className="mobile-card-title-group">
                    <i data-lucide={item.icon} className="mobile-card-icon"></i>
                    <h3 className="mobile-card-title">{item.feature}</h3>
                  </div>
                </div>

                {/* Card Content (Morphs dynamically depending on active tab) */}
                <div className="mobile-card-body">
                  <div className={`mobile-morph-container active-${selectedTab}`}>
                    
                    {/* The Brevv Way Panel */}
                    <div className="mobile-content-view view-brevv">
                      <div className="mobile-block-header">
                        <span className="mobile-block-badge comp-brevv-badge">
                          <svg className="mobile-check-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          The Brevv Way
                        </span>
                      </div>
                      <h4 className="mobile-block-lead">{item.brevvLead}</h4>
                      <p className="mobile-block-text">{item.brevvText}</p>
                    </div>

                    {/* The Old Way Panel */}
                    <div className="mobile-content-view view-old">
                      <div className="mobile-block-header">
                        <span className="mobile-block-badge comp-old-badge">
                          The Old Way
                        </span>
                      </div>
                      <h4 className="mobile-block-lead">{item.oldLead}</h4>
                      <p className="mobile-block-text">{item.oldText}</p>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Desktop & Tablet Table Presentation */}
        <div className="desktop-tablet-comparison-wrapper">
          <div className="comparison-table-wrapper edge-table">

            <div className="edge-row edge-head-row">
              <div className="edge-col-feature edge-head-cell">Feature</div>
              <div className="edge-col edge-head-cell edge-brevv-head">The Brevv Way</div>
              <div className="edge-col edge-head-cell">The Old Way</div>
            </div>

            {comparisonRows.map((item) => (
              <div className="edge-row" key={item.feature}>
                <div className="edge-col-feature">
                  <i data-lucide={item.icon} className="edge-feature-icon"></i>
                  <span>{item.feature}</span>
                </div>
                <div className="edge-col edge-brevv" data-label="The Brevv Way">
                  <span className="edge-lead">
                    <svg className="edge-mark check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {item.brevvLead}
                  </span>
                  <p>{item.brevvText}</p>
                </div>
                <div className="edge-col edge-trad" data-label="The Old Way">
                  <span className="edge-lead">{item.oldLead}</span>
                  <p>{item.oldText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section-local interaction logic (ported verbatim from lib/effects) ───

function initComparisonReveal() {
  const section = document.querySelector<HTMLElement>('.comparison-section');
  if (!section) return;

  // Header + table card reveal together once the section scrolls in
  const headerTargets = section.querySelectorAll<HTMLElement>(
    '.comp-anim-tag, .comp-anim-heading, .comp-anim-sub, .comparison-table-wrapper'
  );
  headerTargets.forEach(el => { el.style.animationPlayState = 'paused'; });

  const headerObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        headerTargets.forEach(el => { el.style.animationPlayState = 'running'; });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  headerObserver.observe(section);

  // Each comparison row drops in as it individually scrolls into view
  const rows = section.querySelectorAll<HTMLElement>('.edge-table .edge-row:not(.edge-head-row)');
  rows.forEach(row => { row.style.animationPlayState = 'paused'; });

  const rowObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.animationPlayState = 'running';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });
  rows.forEach(row => rowObserver.observe(row));
}