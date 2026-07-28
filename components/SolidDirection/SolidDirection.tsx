"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./SolidDirection.module.scss";

export default function SolidDirection() {
  const ran = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener("open-sd-video-modal", handleOpenModal);

    if (!ran.current) {
      ran.current = true;
      initSphereReveal();
    }

    return () => {
      window.removeEventListener("open-sd-video-modal", handleOpenModal);
    };
  }, []);

  return (
    <section className="solid-direction-section" id="solid-direction">
      <div className="solid-direction-container">
        <div className="solid-direction-sticky">

          {/* Video revealed once the sphere collapses into a full-screen circle */}
          <div className="sd-video-layer" id="sd-video-layer">
            <video muted loop playsInline poster="">
              <source src="/assets/videos/main_2.mp4" type="video/mp4" />
            </video>
            <button className="sd-fullscreen-hint" id="sd-fullscreen-btn" aria-label="Tap to view fullscreen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
              <span>Tap to View Full Screen</span>
            </button>
          </div>

          {/* Dark circle mask that grows to cover the screen, then fades to reveal the video */}
          <div className="sd-halo" id="sd-halo"></div>

          {/* three.js network sphere */}
          <canvas className="sd-sphere-canvas" id="sd-sphere-canvas"></canvas>

          {/* Text — unchanged, slides apart to make room for the sphere */}
          <div className="sd-gate">
            <div className="sd-half sd-half-left">
              <h2 className="gate-title text-slate-900" id="sd-left-text">Unlock Your</h2>
            </div>
            <div className="sd-half sd-half-right">
              <h2 className="gate-title text-blue-500" id="sd-right-text">Future Path</h2>
            </div>
          </div>

          <div className="sd-progress-track"><div className="sd-progress-fill" id="sd-progress-fill"></div></div>
        </div>
      </div>

      {isModalOpen && (
        <div className="sd-fullscreen-modal" onClick={() => setIsModalOpen(false)}>
          <button
            className="sd-modal-close-btn"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close Fullscreen"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <video
            className="sd-fullscreen-modal-video"
            src="/assets/videos/main_2.mp4"
            autoPlay
            controls
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

// ─── Sphere → halo → video reveal (ported from the idk2 preview) ───

function initSphereReveal(): (() => void) | void {
  const canvas = document.getElementById("sd-sphere-canvas") as HTMLCanvasElement | null;
  const section = document.getElementById("solid-direction");
  const leftText = document.getElementById("sd-left-text");
  const rightText = document.getElementById("sd-right-text");
  const halo = document.getElementById("sd-halo");
  const videoLayer = document.getElementById("sd-video-layer");
  const progressFill = document.getElementById("sd-progress-fill");
  if (!canvas || !section || !leftText || !rightText || !halo || !videoLayer) return;

  const revealVideo = videoLayer.querySelector("video") as HTMLVideoElement | null;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 6;

  const group = new THREE.Group();
  scene.add(group);

  // Fibonacci-sphere point distribution
  const NUM_POINTS = 140;
  const radius = 1.8;
  const positions: number[] = [];
  const pts: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NUM_POINTS; i++) {
    const y = 1 - (i / (NUM_POINTS - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const v = new THREE.Vector3(x * radius, y * radius, z * radius);
    pts.push(v);
    positions.push(v.x, v.y, v.z);
  }

  const ptGeo = new THREE.BufferGeometry();
  ptGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const ptMat = new THREE.PointsMaterial({ color: 0x6fa1ff, size: 0.045, transparent: true, opacity: 0.95 });
  const pointCloud = new THREE.Points(ptGeo, ptMat);
  group.add(pointCloud);

  // Connect nearby points with thin lines (the "network" web)
  const linePositions: number[] = [];
  const THRESH = 0.62;
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      if (pts[i].distanceTo(pts[j]) < THRESH) {
        linePositions.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
      }
    }
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0x3d7bf5, transparent: true, opacity: 0.35 });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  group.add(lines);

  // Subtle core glow
  const coreGeo = new THREE.SphereGeometry(0.5, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x3d7bf5, transparent: true, opacity: 0.15 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  // Drive canvas size + camera from the STICKY container's actual pixel size, not
  // window.innerWidth. Using the container (via ResizeObserver) keeps the drawing
  // buffer exactly matched to what's on screen through DevTools resizes, mobile
  // address-bar show/hide, and orientation changes — the earlier window-based
  // sizing left a stale, oversized canvas (e.g. 435px on a 375px phone) that
  // overflowed to the right and made the sphere glitch.
  const stickyEl = canvas.parentElement as HTMLElement | null;
  const applyViewport = () => {
    const w = stickyEl?.clientWidth || window.innerWidth;
    const h = stickyEl?.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    const isMobile = w <= 768;
    camera.position.z = isMobile ? 6 : Math.min(40, Math.max(3.5, 6 * (h / Math.min(w, h))));
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };

  let resizeObserver: ResizeObserver | null = null;
  if (typeof ResizeObserver !== "undefined" && stickyEl) {
    resizeObserver = new ResizeObserver(applyViewport);
    resizeObserver.observe(stickyEl);
  }
  const onResize = () => applyViewport();
  window.addEventListener("resize", onResize);
  applyViewport();

  let targetProgress = 0;
  let currentProgress = 0;
  const baseRotSpeed = 0.0015;
  let revealed = false;
  let videoIsPlaying = false;

  const setVideoPlaying = (shouldPlay: boolean) => {
    if (!revealVideo || shouldPlay === videoIsPlaying) return;
    videoIsPlaying = shouldPlay;
    if (shouldPlay) revealVideo.play().catch(() => {});
    else revealVideo.pause();
  };

  const computeProgress = () => {
    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const scrolled = -rect.top;
    return Math.max(0, Math.min(1, scrolled / total));
  };

  const REVEAL_AT = 0.55;

  const onScroll = () => {
    targetProgress = computeProgress();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  let rafId = 0;
  const animate = () => {
    rafId = requestAnimationFrame(animate);

    // Smooth lerp for buttery motion on mobile & desktop
    currentProgress += (targetProgress - currentProgress) * 0.12;
    if (Math.abs(targetProgress - currentProgress) < 0.0001) {
      currentProgress = targetProgress;
    }

    const stacked = window.innerWidth <= 1024;
    const textT = Math.min(currentProgress, 0.4) / 0.4;
    const shift = textT * (stacked ? window.innerHeight : window.innerWidth) * 0.65;
    if (stacked) {
      leftText.style.transform = `translateY(${-shift}px)`;
      rightText.style.transform = `translateY(${shift}px)`;
    } else {
      leftText.style.transform = `translateX(${-shift}px)`;
      rightText.style.transform = `translateX(${shift}px)`;
    }

    let sphereOpacity: number;
    let haloScale: number;
    if (currentProgress < 0.4) {
      sphereOpacity = 1;
      haloScale = 0.02;
    } else if (currentProgress < REVEAL_AT) {
      const t = (currentProgress - 0.4) / (REVEAL_AT - 0.4);
      sphereOpacity = 1 - t;
      haloScale = 0.02 + t * 1.0;
    } else {
      sphereOpacity = 0;
      haloScale = 1.0;
    }

    canvas.style.opacity = String(sphereOpacity);
    halo.style.transform = `translate(-50%,-50%) scale(${haloScale})`;

    const shouldReveal = currentProgress >= REVEAL_AT;
    if (shouldReveal !== revealed) {
      revealed = shouldReveal;
      halo.classList.toggle("revealed", revealed);
      videoLayer.classList.toggle("revealed", revealed);
      setVideoPlaying(revealed);
    }

    if (!revealed) halo.style.opacity = String(Math.min(1, haloScale));

    if (progressFill) progressFill.style.width = currentProgress * 100 + "%";

    const s = 0.4 + Math.min(currentProgress, 0.4) * 3.5;
    group.scale.set(s, s, s);

    const speed = baseRotSpeed + currentProgress * 0.006;
    group.rotation.y += speed;
    group.rotation.x = Math.sin(Date.now() * 0.0002) * 0.15;
    renderer.render(scene, camera);
  };
  animate();

  // Fullscreen video handlers (triggers custom full-screen video lightbox with 90deg mobile rotation)
  const fullscreenBtn = document.getElementById("sd-fullscreen-btn");
  const openFullscreen = () => {
    window.dispatchEvent(new CustomEvent("open-sd-video-modal"));
  };

  const handleVideoClick = (e: MouseEvent) => {
    if (revealed && window.innerWidth <= 768) {
      e.stopPropagation();
      openFullscreen();
    }
  };

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", handleVideoClick);
  }
  videoLayer.addEventListener("click", handleVideoClick);

  const onFullscreenChange = () => {
    const isFS = document.fullscreenElement || (document as any).webkitFullscreenElement;
    if (!isFS && revealVideo) {
      revealVideo.muted = true;
    }
  };
  document.addEventListener("fullscreenchange", onFullscreenChange);
  document.addEventListener("webkitfullscreenchange", onFullscreenChange);
  if (revealVideo) {
    revealVideo.addEventListener("webkitendfullscreen", () => {
      revealVideo.muted = true;
    });
  }

  // Cleanup on unmount
  return () => {
    cancelAnimationFrame(rafId);
    resizeObserver?.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    if (fullscreenBtn) fullscreenBtn.removeEventListener("click", handleVideoClick);
    videoLayer.removeEventListener("click", handleVideoClick);
    document.removeEventListener("fullscreenchange", onFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
    ptGeo.dispose();
    lineGeo.dispose();
    coreGeo.dispose();
    ptMat.dispose();
    lineMat.dispose();
    coreMat.dispose();
    renderer.dispose();
  };
}
