/**
 * Mudasir Azhar - Futuristic Sided Portfolio
 * Interactive Scripts, Cyber Particles, Sound FX & Terminal
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initMobileDrawer();
  initProjectDeviceToggle();
  initProjectCaseStudyToggle();
  initProjectFilters();
  initImageLightbox();
  initResumeModal();
  initContactForm();
  initStatsCounter();
  initSpotlightEffect();
  initCyberParticles();
  initTerminal();
  initAudioSFX();
  initLiveClock();
  initCardTilt();
});

/* ----------------------------------------------------
   1. Theme Management (Dark & Light Mode)
---------------------------------------------------- */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const themeIcons = document.querySelectorAll('.theme-toggle-icon');
  const themeTexts = document.querySelectorAll('.theme-toggle-text');

  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme ? savedTheme === 'dark' : true; // Default dark futuristic

  setTheme(isDark);

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentIsDark = document.documentElement.classList.contains('dark');
      setTheme(!currentIsDark);
      playSFX('warp');
      showToast(!currentIsDark ? '🌙 Dark Futuristic Mode activated' : '☀️ Clean Light Mode activated');
    });
  });

  function setTheme(dark) {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      themeIcons.forEach(icon => {
        icon.className = 'fa-solid fa-moon text-cyan-400 theme-toggle-icon';
      });
      themeTexts.forEach(txt => txt.textContent = 'Dark Futuristic');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      themeIcons.forEach(icon => {
        icon.className = 'fa-solid fa-sun text-amber-500 theme-toggle-icon';
      });
      themeTexts.forEach(txt => txt.textContent = 'Clean Light');
    }
  }
}

/* ----------------------------------------------------
   2. Scroll Spy & Navigation
---------------------------------------------------- */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const id = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = id;
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => playSFX('click'));
  });
}

/* ----------------------------------------------------
   3. Mobile Drawer Navigation
---------------------------------------------------- */
function initMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const mobileLinks = document.querySelectorAll('#mobile-drawer .nav-link');

  if (!drawer || !openBtn) return;

  function openDrawer() {
    drawer.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    playSFX('pop');
  }

  function closeDrawer() {
    drawer.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    playSFX('click');
  }

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ----------------------------------------------------
   4. Project Device Toggle (Desktop / Mobile Switcher)
---------------------------------------------------- */
function initProjectDeviceToggle() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    const desktopBtn = card.querySelector('.btn-view-desktop');
    const mobileBtn = card.querySelector('.btn-view-mobile');
    const desktopImg = card.querySelector('.img-desktop');
    const mobileImg = card.querySelector('.img-mobile');
    const deviceBadge = card.querySelector('.device-badge');

    if (desktopBtn && mobileBtn && desktopImg && mobileImg) {
      desktopBtn.addEventListener('click', () => {
        playSFX('click');
        desktopBtn.classList.add('active-device');
        mobileBtn.classList.remove('active-device');
        desktopImg.classList.remove('hidden');
        mobileImg.classList.add('hidden');
        if (deviceBadge) deviceBadge.textContent = 'Desktop View (1920×1080)';
      });

      mobileBtn.addEventListener('click', () => {
        playSFX('click');
        mobileBtn.classList.add('active-device');
        desktopBtn.classList.remove('active-device');
        desktopImg.classList.add('hidden');
        mobileImg.classList.remove('hidden');
        if (deviceBadge) deviceBadge.textContent = 'Mobile View (375×812)';
      });
    }
  });
}

/* ----------------------------------------------------
   5. Project Case Study Breakdown Toggle
---------------------------------------------------- */
function initProjectCaseStudyToggle() {
  const toggleBtns = document.querySelectorAll('.btn-toggle-metrics');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playSFX('pop');
      const card = btn.closest('.project-card');
      if (!card) return;
      const metricsBox = card.querySelector('.project-metrics-drawer');
      if (metricsBox) {
        metricsBox.classList.toggle('hidden');
        const isHidden = metricsBox.classList.contains('hidden');
        btn.querySelector('.metrics-btn-text').textContent = isHidden ? 'Case Study & Impact' : 'Hide Breakdown';
      }
    });
  });
}

/* ----------------------------------------------------
   6. Project Category Filtering
---------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playSFX('click');
      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-black', 'font-semibold', 'shadow-md', 'dark:bg-cyan-400');
        b.classList.add('text-slate-600', 'dark:text-slate-400');
      });

      btn.classList.add('bg-cyan-500', 'text-black', 'font-semibold', 'shadow-md', 'dark:bg-cyan-400');
      btn.classList.remove('text-slate-600', 'dark:text-slate-400');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
   7. Image Lightbox Modal
---------------------------------------------------- */
function initImageLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-image');
  const modalTitle = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close');
  const zoomBtns = document.querySelectorAll('.open-lightbox');

  if (!modal || !modalImg) return;

  zoomBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playSFX('warp');
      const card = btn.closest('.project-card');
      if (!card) return;

      const activeDesktop = card.querySelector('.img-desktop:not(.hidden)');
      const activeMobile = card.querySelector('.img-mobile:not(.hidden)');
      const activeImg = activeDesktop || activeMobile;

      if (activeImg) {
        modalImg.src = activeImg.src;
        modalTitle.textContent = card.querySelector('.project-title')?.textContent.trim() || 'Project Screenshot';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    playSFX('click');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-backdrop')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ----------------------------------------------------
   8. Resume Modal
---------------------------------------------------- */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtns = document.querySelectorAll('.btn-open-resume');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  if (!resumeModal) return;

  function openResume() {
    playSFX('warp');
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    playSFX('click');
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openResumeBtns.forEach(btn => btn.addEventListener('click', openResume));
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal || e.target.classList.contains('modal-backdrop')) {
      closeResume();
    }
  });

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      playSFX('click');
      window.print();
    });
  }
}

/* ----------------------------------------------------
   9. Contact Form & Copy Actions
---------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playSFX('pop');
      navigator.clipboard.writeText('mudasirazhar40@gmail.com').then(() => {
        showToast('📋 Email copied to clipboard: mudasirazhar40@gmail.com');
      }).catch(() => {
        showToast('📧 mudasirazhar40@gmail.com');
      });
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      playSFX('warp');

      const name = document.getElementById('sender-name')?.value.trim();
      const email = document.getElementById('sender-email')?.value.trim();
      const service = document.getElementById('service-select')?.value;
      const budget = document.getElementById('budget-select')?.value;
      const message = document.getElementById('sender-message')?.value.trim();

      if (!name || !email || !message) {
        showToast('⚠️ Please fill out all required fields');
        return;
      }

      const encodedMsg = encodeURIComponent(
        `Hello Mudasir,\nMy name is ${name} (${email}).\nI am inquiring about: ${service}.\nBudget: ${budget}.\n\nDetails:\n${message}`
      );

      showToast('🚀 Preparing your inquiry message...');

      setTimeout(() => {
        const mailtoUrl = `mailto:mudasirazhar40@gmail.com?subject=Project Inquiry from ${encodeURIComponent(name)}&body=${encodedMsg}`;
        window.open(mailtoUrl, '_blank');
        form.reset();
        showToast('✅ Inquiry email client opened! You can also reach out on WhatsApp.');
      }, 700);
    });
  }
}

/* ----------------------------------------------------
   10. Live Number Stats Counter
---------------------------------------------------- */
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        stats.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '0', 10);
          const duration = 1400;
          const step = Math.ceil(target / (duration / 25));
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              stat.textContent = target + (stat.getAttribute('data-suffix') || '');
              clearInterval(timer);
            } else {
              stat.textContent = current + (stat.getAttribute('data-suffix') || '');
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-bar');
  if (statsSection) observer.observe(statsSection);
}

/* ----------------------------------------------------
   11. Spotlight Hover Effect (Linear/Vercel Cards)
---------------------------------------------------- */
function initSpotlightEffect() {
  const panels = document.querySelectorAll('.glass-panel');
  panels.forEach(panel => {
    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      panel.style.setProperty('--mouse-x', `${x}px`);
      panel.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ----------------------------------------------------
   12. 3D Tilt Effect on Project Cards
---------------------------------------------------- */
function initCardTilt() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = -(y / rect.height) * 6;
      const rotY = (x / rect.width) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ----------------------------------------------------
   13. Interactive Cyber Particle Background Mesh
---------------------------------------------------- */
function initCyberParticles() {
  const canvas = document.getElementById('cyber-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const numParticles = Math.min(50, Math.floor(window.innerWidth / 25));
  const particles = [];

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 1,
    });
  }

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.documentElement.classList.contains('dark');
    const dotColor = isDark ? 'rgba(0, 242, 254, 0.4)' : 'rgba(37, 99, 235, 0.3)';
    const lineColor = isDark ? 'rgba(0, 242, 254,' : 'rgba(37, 99, 235,';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();

      // Connect to mouse
      const dmx = p.x - mouse.x;
      const dmy = p.y - mouse.y;
      const distMouse = Math.sqrt(dmx * dmx + dmy * dmy);
      if (distMouse < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `${lineColor} ${(1 - distMouse / 130) * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Connect to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `${lineColor} ${(1 - dist / 100) * 0.15})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ----------------------------------------------------
   14. Interactive Cyber Terminal
---------------------------------------------------- */
function initTerminal() {
  const tabs = document.querySelectorAll('.terminal-tab');
  const codeDisplay = document.getElementById('terminal-code-body');
  const copyBtn = document.getElementById('copy-terminal-cmd');

  const scripts = {
    'overview': [
      '<span class="text-cyan-400">const</span> developer = {',
      '  name: <span class="text-emerald-400">"Mudasir Azhar"</span>,',
      '  title: <span class="text-emerald-400">"Full-Stack Architect & UI/UX"</span>,',
      '  status: <span class="text-emerald-400">"Available for Projects"</span>,',
      '  completedProjects: <span class="text-amber-400">150</span>,',
      '  pageSpeedAvg: <span class="text-cyan-400">"99/100"</span>,',
      '  location: <span class="text-emerald-400">"Pakistan (Remote Worldwide)"</span>',
      '};',
      '<span class="text-purple-400">console</span>.log(<span class="text-cyan-400">"Ready to engineer digital assets!"</span>);'
    ].join('\n'),

    'stack': [
      '<span class="text-slate-500"># Production Tech Arsenal</span>',
      '<span class="text-cyan-400">frontend:</span> [React.js, Next.js, Tailwind CSS, TypeScript]',
      '<span class="text-purple-400">backend:</span>  [Node.js, Express, PHP WordPress, Python]',
      '<span class="text-emerald-400">systems:</span>  [Ubuntu Linux, Nginx, Kali Security, Bash CLI]',
      '<span class="text-amber-400">growth:</span>   [Technical SEO, Schema Markup, GoHighLevel JS]',
      '<span class="text-blue-400">design:</span>   [Figma Systems, Glassmorphism, Responsive UI]'
    ].join('\n'),

    'contact': [
      '<span class="text-slate-500"># Fast-Track Direct Endpoints</span>',
      '<span class="text-cyan-400">whatsapp:</span> <a href="https://wa.me/923176981478" target="_blank" class="text-emerald-400 underline">+92 317 6981478</a>',
      '<span class="text-purple-400">email:</span>    <span class="text-emerald-400">mudasirazhar40@gmail.com</span>',
      '<span class="text-blue-400">linkedin:</span> <a href="https://www.linkedin.com/in/mudasir-azhar" target="_blank" class="text-cyan-400 underline">linkedin.com/in/mudasir-azhar</a>',
      '<span class="text-amber-400">github:</span>   <a href="https://github.com/mudasirazhar" target="_blank" class="text-cyan-400 underline">github.com/mudasirazhar</a>'
    ].join('\n')
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playSFX('click');
      tabs.forEach(t => {
        t.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40');
        t.classList.add('text-slate-400', 'border-transparent');
      });

      tab.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/40');
      tab.classList.remove('text-slate-400', 'border-transparent');

      const cmd = tab.getAttribute('data-cmd');
      if (codeDisplay && scripts[cmd]) {
        codeDisplay.innerHTML = scripts[cmd];
      }
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      playSFX('pop');
      navigator.clipboard.writeText('npm i @mudasir/fullstack-solutions').then(() => {
        showToast('📋 Command copied: npm i @mudasir/fullstack-solutions');
      });
    });
  }
}

/* ----------------------------------------------------
   15. Web Audio API Futuristic Sound Effects (SFX)
---------------------------------------------------- */
let audioCtx = null;
let sfxEnabled = false; // Off by default with toggle

function initAudioSFX() {
  const toggleBtn = document.getElementById('sfx-toggle-btn');
  const sfxStatus = document.getElementById('sfx-status');
  const sfxWaves = document.getElementById('sfx-waves');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      sfxEnabled = !sfxEnabled;
      if (sfxEnabled) {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        playSFX('warp');
        if (sfxStatus) sfxStatus.textContent = 'SFX: ON';
        if (sfxWaves) sfxWaves.classList.remove('hidden');
        showToast('🔊 Cyber UI Sound Effects Enabled');
      } else {
        if (sfxStatus) sfxStatus.textContent = 'SFX: MUTE';
        if (sfxWaves) sfxWaves.classList.add('hidden');
        showToast('🔇 Cyber UI Sound Effects Muted');
      }
    });
  }
}

function playSFX(type) {
  if (!sfxEnabled || !audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'pop') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'warp') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.15);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (e) {
    // Ignore audio restrictions
  }
}

/* ----------------------------------------------------
   16. Live Clock & System Status Widget
---------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.getElementById('live-clock');
  const pingEl = document.getElementById('live-ping');

  function update() {
    const now = new Date();
    // Pakistan Time (UTC+5)
    const options = {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString('en-US', options) + ' PKT';
    }
  }

  update();
  setInterval(update, 1000);

  // Random realistic ping between 18ms and 28ms
  if (pingEl) {
    setInterval(() => {
      const ping = Math.floor(Math.random() * 10) + 18;
      pingEl.textContent = `${ping}ms`;
    }, 4000);
  }
}

/* ----------------------------------------------------
   17. Toast Notification Helper
---------------------------------------------------- */
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="font-medium">${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
