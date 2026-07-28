"use client";

import { useEffect, useRef } from "react";
import "./Hero.module.scss";

export default function Hero() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    initTypewriter();
    initHeroSlider();
    initLazyVideo();
    initLoaderGate();
  }, []);

  return (
    <div className="sui-hero-container w-full min-h-screen flex flex-col">

      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video id="hero-bg-video"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-0 transition-opacity duration-1000 ease-in-out hero-video-cinematic"
          autoPlay loop muted playsInline>
          <source data-src="/assets/videos/glass effect main.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Progress/loader bar under the brevv intro — commented out, not removed
      <div id="hero-loader-container" className="hero-loader-container">
        <div id="hero-loader-bar" className="hero-loader-bar"></div>
      </div>
      */}
      <div className="hero-gate hero-gate-top"></div>
      <div className="hero-gate hero-gate-bottom"></div>
      <div className="hero-gate-heading-container">
        {/* Intro: each brevv letter draws its stroke on, then the fill floods in
            (staggered b·r·e·v·v). Replaces the old text headline. */}
        <svg className="hero-brevv-logo" width="204" height="64" viewBox="0 0 204 64" fill="none"
          xmlns="http://www.w3.org/2000/svg" role="img" aria-label="brevv">
          <path className="hero-brevv-letter" pathLength={1}
            d="M14.8626 19.0454C18.7191 16.6721 22.9316 15.4855 27.5002 15.4855C30.7634 15.4855 33.8486 16.1085 36.7559 17.3545C39.6631 18.6004 42.2144 20.321 44.4097 22.5163C46.6049 24.6522 48.3255 27.1738 49.5715 30.0811C50.8175 32.9883 51.4404 36.1032 51.4404 39.4258C51.4404 42.7484 50.8175 45.8633 49.5715 48.7705C48.3255 51.6184 46.6049 54.14 44.4097 56.3353C42.2144 58.5305 39.6631 60.2512 36.7559 61.4971C33.8486 62.7431 30.7634 63.3661 27.5002 63.3661C24.1776 63.3661 21.0627 62.7431 18.1555 61.4971C15.3075 60.2512 12.7859 58.5305 10.5907 56.3353C8.39541 54.14 6.6748 51.6184 5.42884 48.7705C4.18287 45.8633 3.55989 42.7484 3.55989 39.4258V-2.33172e-05H13.3496V39.4258C13.3496 41.3837 13.7056 43.223 14.4176 44.9436C15.1889 46.6049 16.2272 48.0882 17.5325 49.3935C18.8378 50.6988 20.3211 51.7371 21.9823 52.5084C23.703 53.2204 25.5422 53.5764 27.5002 53.5764C29.4581 53.5764 31.2677 53.2204 32.929 52.5084C34.6496 51.7371 36.1626 50.6988 37.4679 49.3935C38.7732 48.0882 39.7818 46.6049 40.4938 44.9436C41.2651 43.223 41.6507 41.3837 41.6507 39.4258C41.6507 37.4678 41.2651 35.6286 40.4938 33.908C39.7818 32.1873 38.7732 30.7041 37.4679 29.4581C36.1626 28.1528 34.6496 27.1442 32.929 26.4322C31.2677 25.6609 29.4581 25.2752 27.5002 25.2752C26.1949 25.2752 24.9489 25.4532 23.7623 25.8092C22.5757 26.1059 21.4484 26.5508 20.3804 27.1442L14.8626 19.0454Z"
            fill="#008CFF" />
          <path className="hero-brevv-letter" pathLength={1}
            d="M54.9697 62.2981V32.84C54.9697 30.4667 55.4147 28.2121 56.3047 26.0762C57.1947 23.9403 58.411 22.101 59.9536 20.5584C61.5555 19.0157 63.3948 17.7994 65.4714 16.9095C67.548 15.9602 69.8026 15.4855 72.2352 15.4855V25.2752C70.1586 25.2752 68.3787 26.0169 66.8954 27.5001C65.4714 28.9834 64.7594 30.7634 64.7594 32.84V62.2981H54.9697Z"
            fill="#008CFF" />
          <path className="hero-brevv-letter" pathLength={1}
            d="M96.6434 25.2752C94.6855 25.2752 92.8462 25.6609 91.1256 26.4322C89.4643 27.1442 87.981 28.1528 86.6757 29.4581C85.3704 30.7634 84.3321 32.2763 83.5608 33.997C82.8488 35.6582 82.4929 37.4678 82.4929 39.4258C82.4929 41.3837 82.8488 43.223 83.5608 44.9436C84.3321 46.6642 85.3704 48.1772 86.6757 49.4825C87.981 50.7284 89.4643 51.7371 91.1256 52.5084C92.8462 53.2204 94.6855 53.5764 96.6434 53.5764C98.6607 53.5764 100.53 53.1907 102.25 52.4194C104.03 51.6481 105.573 50.5801 106.878 49.2155L113.998 55.8903C111.803 58.2042 109.192 60.0435 106.166 61.4081C103.2 62.7134 100.025 63.3661 96.6434 63.3661C93.3209 63.3661 90.206 62.7431 87.2987 61.4971C84.4508 60.2512 81.9292 58.5602 79.7339 56.4243C77.5387 54.229 75.8181 51.6777 74.5721 48.7705C73.3261 45.8633 72.7031 42.7484 72.7031 39.4258C72.7031 36.1626 73.3261 33.0773 74.5721 30.1701C75.8181 27.2628 77.5387 24.7116 79.7339 22.5163C81.9292 20.321 84.4508 18.6004 87.2987 17.3545C90.206 16.1085 93.3209 15.4855 96.6434 15.4855C98.4827 15.4855 100.352 15.6932 102.25 16.1085C104.149 16.5238 105.988 17.1765 107.768 18.0664C109.548 18.9564 111.239 20.143 112.841 21.6263C114.443 23.0503 115.867 24.8302 117.113 26.9662L95.1305 49.2155L87.9217 42.4517L103.318 26.9662C100.945 25.8389 98.72 25.2752 96.6434 25.2752Z"
            fill="#008CFF" />
          <path className="hero-brevv-letter" pathLength={1}
            d="M127.641 16.3755L138.588 44.3206L149.445 16.3755H159.947L142.859 60.0732C142.563 61.0225 142.029 61.7938 141.257 62.3871C140.486 63.0397 139.596 63.3661 138.588 63.3661C137.579 63.3661 136.689 63.0991 135.918 62.5651C135.206 62.0311 134.672 61.3488 134.316 60.5181L117.139 16.3755H127.641Z"
            fill="#008CFF" />
          <path className="hero-brevv-letter" pathLength={1}
            d="M170.447 16.3755L181.393 44.3206L192.251 16.3755H202.753L185.665 60.0732C185.368 61.0225 184.834 61.7938 184.063 62.3871C183.292 63.0397 182.402 63.3661 181.393 63.3661C180.385 63.3661 179.495 63.0991 178.723 62.5651C178.011 62.0311 177.477 61.3488 177.121 60.5181L159.945 16.3755H170.447Z"
            fill="#008CFF" />
        </svg>
      </div>

      <section
        className="hero-content-section relative z-10 flex flex-col items-center justify-start flex-grow w-full px-4 text-center overflow-hidden pb-12">

        <h1 className="hero-headline">The Future of Learning, Architected for Today.</h1>

      </section>
    </div>
  );
}

// ─── Section-local interaction logic (ported verbatim from lib/effects) ───

function initTypewriter() {
  const typewriterSpan = document.getElementById('typewriter-text');
  if (typewriterSpan) {
    const words = ["Intelligent.", "Verified.", "Unstoppable."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typewriterSpan!.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterSpan!.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 120;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 600; // Pause before starting next word
      }

      setTimeout(type, typingSpeed);
    }

    // Start typewriter loop
    setTimeout(type, 800);
  }
}

function initHeroSlider() {
  const heroGrid = document.querySelector<HTMLElement>('.hero-visual-grid');
  const heroDots = document.querySelectorAll<HTMLElement>('.hero-slider-dots .dot');

  if (heroGrid && heroDots.length > 0) {
    let activeIdx = 0;
    let autoScrollInterval: any;

    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        activeIdx = (activeIdx + 1) % 3;
        const cards = heroGrid.querySelectorAll<HTMLElement>('.hero-visual-card');
        if (cards[activeIdx]) {
          const gridWidth = heroGrid.clientWidth || 300;
          heroGrid.scrollTo({
            left: activeIdx * gridWidth,
            behavior: 'smooth'
          });
        }
      }, 4000); // Cycle every 4 seconds
    };

    const stopAutoScroll = () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };

    // Initialize Auto Scroll on mobile screens
    if (window.innerWidth < 768) {
      startAutoScroll();
    }

    heroGrid.addEventListener('scroll', () => {
      const scrollLeft = heroGrid.scrollLeft;
      const width = heroGrid.clientWidth || 300;
      activeIdx = Math.round(scrollLeft / width);

      heroDots.forEach((dot, idx) => {
        if (idx === activeIdx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    });

    // Make Dots clickable
    heroDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        stopAutoScroll();
        const cards = heroGrid.querySelectorAll<HTMLElement>('.hero-visual-card');
        if (cards[idx]) {
          const gridWidth = heroGrid.clientWidth || 300;
          heroGrid.scrollTo({
            left: idx * gridWidth,
            behavior: 'smooth'
          });
        }
        startAutoScroll();
      });
    });

    // Pause on user touch interaction and resume afterwards
    heroGrid.addEventListener('touchstart', () => {
      stopAutoScroll();
    }, { passive: true });

    heroGrid.addEventListener('touchend', () => {
      stopAutoScroll();
      startAutoScroll();
    }, { passive: true });
  }
}

function initLazyVideo() {
  const video = document.getElementById('hero-bg-video') as HTMLVideoElement | null;
  if (!video) return;

  const source = video.querySelector<HTMLSourceElement>('source');
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const isSlowConnection = connection && (connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType));

  const loadVideo = () => {
    if (source && source.dataset.src) {
      source.src = source.dataset.src;
      video.load();
    }
  };

  if (isSlowConnection) {
    video.style.display = 'none';
  } else {
    requestAnimationFrame(() => {
      setTimeout(loadVideo, 100);
    });
  }

  video.addEventListener('playing', () => {
    video.classList.remove('opacity-0');
    video.classList.add('opacity-100');
  });

  video.addEventListener('loadeddata', () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth / 4;
      canvas.height = video.videoHeight / 4;
      const ctx = canvas.getContext('2d');
      ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      video.style.backgroundImage = `url(${dataUrl})`;
      video.style.backgroundSize = 'cover';
      video.style.backgroundPosition = 'center';
    } catch (e) {
      // ignore canvas errors
    }
  });

  video.addEventListener('canplay', () => {
    setTimeout(() => {
      if (video.paused && !isMobile) {
        video.play().catch(() => { });
      }
      video.classList.remove('opacity-0');
      video.classList.add('opacity-100');
    }, 300);
  });
}

function initLoaderGate() {
  const loaderContainer = document.getElementById("hero-loader-container");
  const loaderBar = document.getElementById("hero-loader-bar");
  if (loaderContainer && loaderBar) {
    let progress = 0;
    const duration = 3500;
    const interval = 20;
    const step = 100 / (duration / interval);
    const counter = setInterval(() => {
      progress += step;
      if (progress >= 100) {
        progress = 100;
        clearInterval(counter);
      }
      loaderBar.style.width = progress + "%";
    }, interval);
  }
}