(function () {
  const data = window.SITE_DATA;

  function qs(selector, scope = document) {
    return scope.querySelector(selector);
  }

  function qsa(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
  }

  function formatHref(href) {
    return href.startsWith("http") ? href : href;
  }

  function renderShell() {
    const current = document.body.dataset.page;
    const header = qs("#site-header");
    const footer = qs("#site-footer");
    if (header) {
      header.innerHTML = `
        <div class="topbar">
          <div class="container topbar-inner">
            <div class="topbar-links">
              <a href="tel:${data.company.phonePrimaryLink}">${data.company.phonePrimary}</a>
              <a href="mailto:${data.company.email}">${data.company.email}</a>
            </div>
          </div>
        </div>
        <div class="navbar-shell">
          <div class="container navbar">
            <a class="brand" href="index.html" aria-label="${data.company.name}">
              <img src="assets/images/branding/logo-mark.svg" alt="${data.company.name} logo">
              <span>
                <strong>${data.company.name}</strong>
                <small>${data.company.tagline}</small>
              </span>
            </a>
              <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </button>
            <nav id="site-nav" class="site-nav">
              ${data.nav
          .map(
            (item) => `
                    <a class="${current === item.key ? "active" : ""}" href="${item.href}">${item.label}</a>
                  `
          )
          .join("")}
            </nav>
          </div>
        </div>
      `;
    }

    if (footer) {
      footer.innerHTML = `
        <div class="container footer-grid">
          <div>
            <div class="brand footer-brand">
              <img src="assets/images/branding/logo-mark.svg" alt="${data.company.name} logo">
              <span>
                <strong>${data.company.name}</strong>
              </span>
            </div>
            <p class="footer-copy">
              ${data.company.name} builds residential, commercial and government-grade work with a practical engineering mindset.
            </p>
          </div>
          <div>
            <h3>Pages</h3>
            <ul class="footer-links">
              ${data.nav
          .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
          .join("")}
              <li><a href="resources.html">Resources</a></li>
              <li><a href="careers.html">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul class="footer-links">
              <li><a href="tel:${data.company.phonePrimaryLink}">${data.company.phonePrimary}</a></li>
              <li><a href="tel:${data.company.phoneSecondaryLink}">${data.company.phoneSecondary}</a></li>
              <li><a href="mailto:${data.company.email}">${data.company.email}</a></li>
              <li><a href="${data.company.mapsOfficeLink}" target="_blank" rel="noreferrer">Open Office Location</a></li>
            </ul>
          </div>
          <div>
            <h3>Trust</h3>
            <ul class="footer-links">
              <li><a href="privacy.html">Privacy Policy</a></li>
              <li><a href="terms.html">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <div class="container footer-base">
          <p>&copy; <span data-current-year></span> ${data.company.name}. All rights reserved.</p>
          <p>Crafted with <span style="color: #ff0000;">❤️</span> by <a href="https://nexvoraweb.in" target="_blank" rel="noopener"><strong>NexvoraWeb</strong></a></p>
        </div>
      `;
    }

    qsa("[data-current-year]").forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
  }

  function initFloatingButtons() {
    if (qs(".floating-actions")) return; // already exists

    const wa  = data.company.whatsappLink;
    const tel = data.company.phonePrimaryLink;

    const wrap = document.createElement("div");
    wrap.className = "floating-actions";
    // Inline style as ultimate override — nothing can touch these
    wrap.setAttribute("style", [
      "position:fixed",
      "right:24px",
      "bottom:30px",
      "left:auto",
      "z-index:999999",
      "display:flex",
      "flex-direction:column",
      "gap:14px",
      "align-items:flex-end",
      "pointer-events:auto"
    ].join(";"));

    wrap.innerHTML = `
      <a class="floating-btn wa-btn" href="${wa}" target="_blank" rel="noreferrer" aria-label="WhatsApp Us">
        <span class="fb-icon">
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.997 2C6.477 2 2 6.477 2 12c0 1.797.484 3.504 1.406 4.997L2 22l5.085-1.394A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.52 2 11.997 2z"/></svg>
        </span>
        <span class="fb-label">WhatsApp</span>
      </a>
      <a class="floating-btn call-btn" href="tel:${tel}" aria-label="Call Now">
        <span class="fb-icon">
          <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.26a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </span>
        <span class="fb-label">Call Us</span>
      </a>
    `;

    document.body.appendChild(wrap);
  }

  function initTheme() {
    const root = document.documentElement;
    const stored = localStorage.getItem("kuber-theme");
    if (stored) {
      root.dataset.theme = stored;
    }

    document.addEventListener("click", (event) => {
      const button = event.target.closest(".theme-toggle");
      if (!button) return;
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      localStorage.setItem("kuber-theme", next);

      // Update toggle icon
      button.innerHTML = next === "dark" ? "☀️" : "🌙";
    });

    // Set initial icon
    const themeToggle = qs(".theme-toggle");
    if (themeToggle) {
      themeToggle.innerHTML = root.dataset.theme === "dark" ? "☀️" : "🌙";
      themeToggle.style.display = "inline-flex";
    }

    // Scroll Progress Bar & Sticky Nav Integration
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.appendChild(progressBar);

    const navOverlay = document.createElement("div");
    navOverlay.className = "nav-overlay";
    document.body.appendChild(navOverlay);

    const navShell = qs(".navbar-shell");

    window.addEventListener("scroll", () => {
      // Progress calculation
      const scrollTotal = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollAmount = (scrollTotal / height) * 100;
      progressBar.style.width = `${scrollAmount}%`;

      // Sticky Header Shrink
      if (navShell) {
        if (scrollTotal > 50) {
          navShell.classList.add("stuck");
        } else {
          navShell.classList.remove("stuck");
        }
      }
    });
  }

  function initHeroEffects() {
    const hero = qs(".hero-masterpiece");
    if (hero) {
      hero.addEventListener("mousemove", (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty("--mouse-x", `${x}%`);
        hero.style.setProperty("--mouse-y", `${y}%`);
      });
    }
  }

  function initNavToggle() {
    document.addEventListener("click", (event) => {
      const toggle = event.target.closest(".nav-toggle");
      const nav = qs("#site-nav");
      const overlay = qs(".nav-overlay");
      
      if (toggle && nav) {
        const isOpen = nav.classList.toggle("open");
        if (overlay) overlay.classList.toggle("active", isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "";
        toggle.setAttribute("aria-expanded", String(isOpen));
      } else if (nav && nav.classList.contains("open") && !event.target.closest("#site-nav")) {
        nav.classList.remove("open");
        if (overlay) overlay.classList.remove("active");
        document.body.style.overflow = "";
        const toggleBtn = qs(".nav-toggle");
        if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function renderStats() {
    const mainIcons = [
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>`
    ];

    qsa('[data-render="stats-main"]').forEach((container) => {
      container.innerHTML = data.stats.slice(0, 2)
        .map(
          (item, index) => `
            <article class="achievement-card reveal">
              <div class="achievement-icon-box">${mainIcons[index]}</div>
              <strong class="stat-number" data-target="${item.value}" data-suffix="${item.suffix || ""}">0</strong>
              <h3>${item.label}</h3>
              ${index === 1 ? '<div class="achievement-short-line"></div>' : ""}
              <p>${item.detail.replace('2012', '<span class="highlight-red">2012</span>')}</p>
            </article>
            ${index === 0 ? '<div class="achievement-divider"><div class="divider-glow"></div></div>' : ""}
          `
        )
        .join("");
    });

    const pillars = [
      { label: "Client Focused", icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>` },
      { label: "Trust & Transparency", icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>` },
      { label: "Quality Execution", icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>` },
      { label: "On Time Delivery", icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>` }
    ];

    qsa('[data-render="trust-pillars"]').forEach((container) => {
      container.innerHTML = pillars.map(p => `
        <div class="pillar-item">
          <div class="pillar-circle">${p.icon}</div>
          <span>${p.label}</span>
        </div>
      `).join("");
    });
  }

  function renderServices() {
    qsa('[data-render="services"]').forEach((container) => {
      container.innerHTML = data.services
        .map(
          (service) => `
            <article class="card service-card">
              <div class="card-kicker">${service.title.split(" ")[0]}</div>
              <h3>${service.title}</h3>
              <p>${service.summary}</p>
              <ul class="feature-list">
                ${service.points.map((point) => `<li>${point}</li>`).join("")}
              </ul>
            </article>
          `
        )
        .join("");
    });
  }

  function renderProjects() {
    qsa('[data-render="projects"]').forEach((container) => {
      const scope = container.dataset.scope || "all";
      let projects = data.projects;
      if (scope === "featured") {
        projects = projects.filter((project) => project.homeFeatured);
      }
      if (scope === "completed") {
        projects = projects.filter((project) => project.status === "Completed");
      }
      container.innerHTML = projects
        .map(
          (project) => `
            <article class="project-card" data-category="${project.category}">
              <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                  <span style="color: #fff; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                    View Case Study
                  </span>
                </div>
                <div class="project-status-badge">${project.status}</div>
              </div>
              <div class="project-body">
                <div class="project-meta">
                  <span class="pill">${project.category}</span>
                  <span class="pill">${project.year}</span>
                </div>
                <h3>${project.title}</h3>
                <p>${project.summary}</p>
                <strong>${project.highlight}</strong>
                <a class="btn-project" href="${project.slug}">View Project Details</a>
              </div>
            </article>
          `
        )
        .join("");
    });
  }

  function renderMachinery() {
    qsa('[data-render="machinery"]').forEach((container) => {
      container.innerHTML = data.machinery
        .map(
          (item) => `
            <article class="machine-card card">
              <div class="machine-image">
                <img src="${item.image}" alt="${item.title}">
                ${item.isRentalAvailable ? '<span class="rental-badge">Available for Rent</span>' : ""}
              </div>
              <div class="machine-body">
                <span class="pill">${item.metric}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <a class="btn btn-sm btn-wa" href="https://wa.me/919113925265?text=Hello%2C%20I%20am%20enquiring%20about%20the%20${encodeURIComponent(item.title)}" target="_blank" rel="noreferrer">Enquire Now</a>
              </div>
            </article>
          `
        )
        .join("");
    });
  }

  function renderProcess() {
    const processIcons = [
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>`
    ];

    qsa('[data-render="process"]').forEach((container) => {
      container.innerHTML = data.process
        .map(
          (item, index) => `
            <article class="process-card reveal">
              <div class="process-icon-outer">
                <div class="process-icon-circle">${processIcons[index]}</div>
                ${index < data.process.length - 1 ? '<div class="process-line-dashed"></div>' : ""}
              </div>
              <div class="process-content">
                <span class="step-label">0${index + 1}</span>
                <h3>${item.step}</h3>
                <div class="process-accent-line"></div>
                <p>${item.detail}</p>
              </div>
              <div class="process-sketch sketch-${index + 1}"></div>
            </article>
          `
        )
        .join("");
    });
  }

  function renderBlogCards() {
    qsa('[data-render="blogs"]').forEach((container) => {
      container.innerHTML = data.blogPosts
        .map(
          (post) => `
            <article class="card blog-card">
              <span class="pill">${post.category}</span>
              <h3>${post.title}</h3>
              <p>${post.summary}</p>
              <a class="text-link" href="blog.html#${post.id}">Read Article</a>
            </article>
          `
        )
        .join("");
    });
  }

  function renderFaqs() {
    qsa('[data-render="faqs"]').forEach((container) => {
      container.innerHTML = data.faqs
        .map(
          (faq, index) => `
            <article class="faq-item ${index === 0 ? "open" : ""}">
              <button type="button" class="faq-question">
                <span>${faq.question}</span>
                <strong>${index === 0 ? "−" : "+"}</strong>
              </button>
              <div class="faq-answer">
                <p>${faq.answer}</p>
              </div>
            </article>
          `
        )
        .join("");
    });
  }

  function renderResources() {
    qsa('[data-render="resources"]').forEach((container) => {
      container.innerHTML = data.resources
        .map(
          (resource) => `
            <article class="card download-card">
              <div class="download-head">
                <span class="pill">${resource.type}</span>
                <span class="status-badge ${resource.status.toLowerCase()}">${resource.status}</span>
              </div>
              <h3>${resource.title}</h3>
              <p>${resource.note}</p>
              <a class="btn btn-secondary" href="${resource.href}">${resource.status === "Available" ? "Download" : "Open"}</a>
            </article>
          `
        )
        .join("");
    });
  }

  function renderCertifications() {
    qsa('[data-render="certifications"]').forEach((container) => {
      container.innerHTML = data.certifications
        .map(
          (item) => `
            <article class="card certification-card">
              <h3>${item.title}</h3>
              <p>${item.detail}</p>
            </article>
          `
        )
        .join("");
    });
  }

  function renderRoles() {
    qsa('[data-render="roles"]').forEach((container) => {
      container.innerHTML = data.openRoles
        .map(
          (role) => `
            <article class="card role-card">
              <span class="pill">${role.type}</span>
              <h3>${role.title}</h3>
              <p>${role.summary}</p>
            </article>
          `
        )
        .join("");
    });
  }

  function animateCounters() {
    const counters = qsa(".stat-number");
    if (!counters.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target;
          const target = Number(node.dataset.target || 0);
          const suffix = node.dataset.suffix || "";
          const duration = 1400;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            node.textContent = `${Math.floor(progress * target)}${suffix}`;
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              node.textContent = `${target}${suffix}`;
            }
          };

          requestAnimationFrame(tick);
          observer.unobserve(node);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function initAccordion() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest(".faq-question");
      if (!button) return;
      const item = button.closest(".faq-item");
      if (!item) return;
      item.classList.toggle("open");
      const symbol = qs("strong", button);
      if (symbol) {
        symbol.textContent = item.classList.contains("open") ? "−" : "+";
      }
    });
  }

  function initFilters() {
    const shell = qs("[data-filter-shell]");
    if (!shell) return;
    const cards = qsa(".project-card", shell);
    const selects = qsa("[data-filter]", shell);
    const empty = qs("[data-filter-empty]", shell);

    function apply() {
      let visible = 0;
      cards.forEach((card) => {
        const matches = selects.every((select) => {
          const value = select.value;
          if (!value) return true;
          return (card.dataset[select.dataset.filter] || "").toLowerCase() === value.toLowerCase();
        });
        card.classList.toggle("hidden", !matches);
        if (matches) visible += 1;
      });
      if (empty) {
        empty.hidden = visible !== 0;
      }
    }

    selects.forEach((select) => select.addEventListener("change", apply));
    apply();
  }

  function initSlider() {
    qsa("[data-slider]").forEach((shell) => {
      const track = qs("[data-slider-track]", shell);
      if (!track) return;
      qsa("[data-slider-action]", shell).forEach((button) => {
        button.addEventListener("click", () => {
          const direction = button.dataset.sliderAction === "next" ? 1 : -1;
          track.scrollBy({ left: direction * 360, behavior: "smooth" });
        });
      });
    });
  }

  function initCalculator() {
    const form = qs("[data-cost-calculator]");
    if (!form) return;
    const result = qs("[data-calculator-result]");
    const rates = {
      residential: { economy: 2200, standard: 2750, premium: 3500 },
      commercial: { economy: 2600, standard: 3200, premium: 4000 },
      government: { economy: 2400, standard: 3000, premium: 3600 },
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const type = qs('[name="buildingType"]', form).value;
      const area = Number(qs('[name="area"]', form).value || 0);
      const floors = Number(qs('[name="floors"]', form).value || 1);
      const budget = qs('[name="budget"]', form).value;
      const baseRate = rates[type][budget];
      const multiplier = 1 + Math.max(0, floors - 1) * 0.03;
      const estimate = Math.round(area * baseRate * multiplier);
      const low = Math.round(estimate * 0.92);
      const high = Math.round(estimate * 1.1);
      result.innerHTML = `
        <strong>Estimated planning range:</strong>
        <span>INR ${low.toLocaleString("en-IN")} - INR ${high.toLocaleString("en-IN")}</span>
        <small>This is an indicative planning range only. Final costs depend on structure, soil condition, finish level and project scope.</small>
      `;
      result.hidden = false;
    });
  }

  function initForms() {
    qsa("[data-mail-form]").forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const honey = qs('[name="company_name"]', form);
        if (honey && honey.value) return;

        const submitBtn = qs('button[type="submit"]', form);
        let originalText = 'Submit';
        if (submitBtn) {
          originalText = submitBtn.textContent;
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }

        const formData = new FormData(form);
        formData.append("access_key", "2972fada-14ec-47b4-8549-1bc9a7728850");
        
        const type = form.dataset.mailForm;
        const subjectMap = {
          contact: "Website Enquiry",
          visit: "Book Free Site Visit",
          careers: "Career Application",
        };
        formData.append("subject", subjectMap[type] || "Website Enquiry");

        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
          });

          const data = await response.json();
          if (data.success) {
            let modal = qs('.success-modal');
            if (!modal) {
              modal = document.createElement('div');
              modal.className = 'success-modal';
              modal.innerHTML = `
                <div class="success-content">
                  <div class="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h2>Request Submitted</h2>
                  <p>Your request has been successfully submitted. Our team will review it and get back to you shortly.</p>
                  <button class="btn btn-primary" onclick="this.closest('.success-modal').classList.remove('active')">Continue</button>
                </div>
              `;
              document.body.appendChild(modal);
            }
            
            // Trigger animation
            setTimeout(() => {
              modal.classList.add('active');
            }, 10);
            
            form.reset();
          } else {
            alert("Something went wrong! Please try again.");
          }
        } catch (error) {
          console.error(error);
          alert("Something went wrong check your connection! Please try again.");
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      });
    });
  }

  function initAIFleet() {
    const form = qs("#ai-fleet-form");
    if (!form) return;
    const loader = qs("#ai-fleet-loader");
    const result = qs("#ai-fleet-result");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Hide result, show loader
      result.hidden = true;
      loader.hidden = false;

      const type = qs('[name="project_type"]', form).value;
      const scale = Number(qs('[name="project_scale"]', form).value || 0);

      setTimeout(() => {
        let recommendation = "";
        if (type === "road") {
          recommendation = "<li>1x 60/90 THP Hot Mix Plant</li><li>2x Sensor Pavers</li><li>3x Tandem Rollers</li><li>1x Catonic Sprayer</li>";
        } else if (type === "residential") {
          recommendation = "<li>2x JCB Backhoe Loaders</li><li>1x Concrete Batch Mixer 505</li><li>3x Portable Concrete Mixers</li><li>4x Tipper Trucks</li>";
        } else if (type === "commercial") {
          recommendation = "<li>3x JCB Backhoe Loaders</li><li>2x Concrete Batch Mixers 505</li><li>5x Tipper Trucks</li><li>3x Portable Concrete Mixers</li>";
        } else {
          recommendation = "<li>1x JCB Backhoe Loader</li><li>1x Concrete Batch Mixer 505</li><li>2x Tipper Trucks</li>";
        }

        const efficiency = Math.min(98, 85 + Math.floor(Math.random() * 10));

        result.innerHTML = `
          <h3 style="color: var(--brand-gold); margin-bottom: 12px; font-size: 1.1rem;">AI Deployment Strategy Optimized</h3>
          <p style="margin-bottom: 16px; color: #ececec;">Based on your parameters (Scale: ${scale.toLocaleString()}), the following equipment configuration yields an estimated ${efficiency}% execution efficiency:</p>
          <ul class="detail-list" style="margin-bottom: 0;">
            ${recommendation}
          </ul>
        `;

        loader.hidden = true;
        result.hidden = false;
      }, 1500); // Simulate AI delay
    });
  }

  function initLightbox() {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close">×</button><img alt=""><p></p>';
    document.body.appendChild(lightbox);
    const lightboxImage = qs("img", lightbox);
    const caption = qs("p", lightbox);

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-lightbox]");
      if (trigger) {
        lightbox.classList.add("open");
        lightboxImage.src = trigger.getAttribute("href") || trigger.dataset.lightbox;
        lightboxImage.alt = trigger.dataset.caption || "";
        caption.textContent = trigger.dataset.caption || "";
        event.preventDefault();
      }
      if (
        event.target === lightbox ||
        event.target.closest(".lightbox-close")
      ) {
        lightbox.classList.remove("open");
        lightboxImage.src = "";
      }
    });
  }

  function initReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    qsa(".reveal").forEach((item) => observer.observe(item));
  }

  function initRipple() {
    qsa('.btn, .btn-outline, .btn-secondary').forEach(button => {
      button.addEventListener('click', function (e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  /* 82. Lazy Image Fade-In with IntersectionObserver */
  function initLazyImages() {
    const lazyImages = qsa("img[data-src]");
    if (!lazyImages.length) return;

    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
            imgObserver.unobserve(img);
          }
        });
      },
      { rootMargin: "100px" }
    );

    lazyImages.forEach((img) => imgObserver.observe(img));

    // Also fade-in already-loaded images
    qsa("img:not([data-src])").forEach((img) => {
      if (img.complete) {
        img.classList.add("loaded");
      } else {
        img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
      }
    });
  }

  /* 83. Smooth Anchor Scroll (JS enhancement for precision) */
  function initSmoothScroll() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = qs(hash);
      if (!target) return;
      e.preventDefault();
      const navHeight = qs(".navbar-shell")?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", hash);
    });
  }

  /* 88. Toast Notification System */
  function showToast(message, type = "success", duration = 4000) {
    // Remove existing toast
    const existing = qs(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <button class="toast-close" aria-label="Close">&times;</button>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.add("show");
      });
    });

    // Auto-dismiss
    const timer = setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 500);
    }, duration);

    // Manual close
    qs(".toast-close", toast).addEventListener("click", () => {
      clearTimeout(timer);
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 500);
    });
  }

  /* 90. Form Error Shake */
  function shakeField(field) {
    field.classList.add("field-error");
    field.addEventListener("animationend", () => {
      field.classList.remove("field-error");
    }, { once: true });
  }

  /* Enhanced Form Validation with Shake + Toast */
  function initFormValidation() {
    qsa("[data-mail-form]").forEach((form) => {
      const inputs = qsa("input[required], textarea[required], select[required]", form);
      inputs.forEach((input) => {
        input.addEventListener("invalid", (e) => {
          e.preventDefault();
          shakeField(input);
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Logo Micro Pulse
    const brandImg = qs(".brand img");
    if (brandImg) brandImg.classList.add("pulsed");

    renderShell();
    initTheme();
    initNavToggle();
    initHeroEffects();
    initFloatingButtons();
    renderStats();
    renderServices();
    renderProjects();
    renderMachinery();
    renderProcess();
    renderBlogCards();
    renderFaqs();
    renderResources();
    renderCertifications();
    renderRoles();
    animateCounters();
    initAccordion();
    initFilters();
    initSlider();
    initCalculator();
    initForms();
    initAIFleet();
    initLightbox();
    initRipple();
    initReveal();
    initLazyImages();
    initSmoothScroll();
    initFormValidation();
  });
})();
