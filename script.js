// 给所有装饰性 SVG 自动标 aria-hidden,防止屏幕阅读器把 icon 读出来
document
  .querySelectorAll("svg:not([aria-label]):not([aria-labelledby]):not([role='img']):not([aria-hidden])")
  .forEach((svg) => svg.setAttribute("aria-hidden", "true"));

const siteHeader = document.querySelector(".site-header");

const syncHeaderState = () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
};

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

// 移动端汉堡菜单
const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.getElementById("site-nav");
const navOverlay = document.querySelector("[data-nav-overlay]");

if (navToggle && siteNav) {
  let overlayHideTimer = null;

  const setNavState = (open) => {
    document.body.classList.toggle("is-nav-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    if (navOverlay) {
      if (overlayHideTimer) {
        clearTimeout(overlayHideTimer);
        overlayHideTimer = null;
      }
      if (open) {
        navOverlay.hidden = false;
      } else {
        overlayHideTimer = setTimeout(() => {
          if (!document.body.classList.contains("is-nav-open")) {
            navOverlay.hidden = true;
          }
          overlayHideTimer = null;
        }, 320);
      }
    }
  };

  const closeNav = () => setNavState(false);
  const toggleNav = () =>
    setNavState(!document.body.classList.contains("is-nav-open"));

  navToggle.addEventListener("click", toggleNav);
  if (navOverlay) navOverlay.addEventListener("click", closeNav);

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (document.body.classList.contains("is-nav-open")) closeNav();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("is-nav-open")) {
      closeNav();
      navToggle.focus();
    }
  });

  const desktopMq = window.matchMedia("(min-width: 901px)");
  const handleMq = (event) => {
    if (event.matches) closeNav();
  };
  if (desktopMq.addEventListener) {
    desktopMq.addEventListener("change", handleMq);
  } else if (desktopMq.addListener) {
    desktopMq.addListener(handleMq);
  }
}

// 案例分类筛选
const caseFilter = document.querySelector("[data-cases-filter]");
const caseGrid = document.querySelector("[data-cases-grid]");
const caseEmpty = document.querySelector("[data-cases-empty]");

if (caseFilter && caseGrid) {
  const cards = Array.from(caseGrid.querySelectorAll(".project-card"));

  caseFilter.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;

    caseFilter
      .querySelectorAll("button")
      .forEach((item) => item.classList.toggle("is-active", item === button));

    const category = button.dataset.category;
    let visibleCount = 0;

    cards.forEach((card) => {
      const match = category === "all" || card.dataset.category === category;
      card.hidden = !match;
      if (match) visibleCount += 1;
    });

    if (caseEmpty) caseEmpty.hidden = visibleCount !== 0;
  });
}

// 资质证书 / 合规文件预览
const PREVIEW_SETS = {
  certificates: {
    title: "资质证书",
    items: [
      { src: "imgs/service/tmp-zizhi.jpg", label: "建筑业企业资质证书 · 建筑/机电工程施工总承包贰级" },
    ],
  },
  compliance: {
    title: "合规文件",
    items: [
      { src: "imgs/service/tmp-anzhi.jpg", label: "安全生产许可证" },
    ],
  },
};

const previewModal = document.querySelector("[data-preview-modal]");
const previewTitle = document.querySelector("[data-preview-title]");
const previewImage = document.querySelector("[data-preview-image]");
const previewLabel = document.querySelector("[data-preview-label]");
const previewPrev = document.querySelector("[data-preview-prev]");
const previewNext = document.querySelector("[data-preview-next]");
const previewStage = document.querySelector("[data-preview-stage]");

let previewItems = [];
let previewIndex = 0;

const renderPreview = () => {
  const item = previewItems[previewIndex];
  if (!item || !previewImage) return;
  previewImage.style.backgroundImage = `url("${item.src}")`;
  const isSingle = previewItems.length <= 1;
  if (previewLabel) {
    previewLabel.textContent = isSingle
      ? item.label
      : `${previewIndex + 1} / ${previewItems.length}  ·  ${item.label}`;
  }
  if (previewPrev) {
    previewPrev.hidden = isSingle;
    previewPrev.disabled = previewIndex === 0;
  }
  if (previewNext) {
    previewNext.hidden = isSingle;
    previewNext.disabled = previewIndex === previewItems.length - 1;
  }
};

const openPreview = (id) => {
  const set = PREVIEW_SETS[id];
  if (!set || !previewModal) return;
  previewItems = set.items;
  previewIndex = 0;
  if (previewTitle) previewTitle.textContent = set.title;
  renderPreview();
  previewModal.classList.add("is-open");
  previewModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("preview-open");
};

const closePreview = () => {
  if (!previewModal) return;
  previewModal.classList.remove("is-open");
  previewModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("preview-open");
  if (previewImage) previewImage.style.backgroundImage = "";
};

const shiftPreview = (delta) => {
  if (!previewItems.length) return;
  previewIndex = Math.max(0, Math.min(previewItems.length - 1, previewIndex + delta));
  renderPreview();
};

document.querySelectorAll("[data-preview-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const id = trigger.dataset.previewId;
    if (id) openPreview(id);
  });
});

if (previewModal) {
  previewModal.querySelectorAll("[data-preview-close]").forEach((el) => {
    el.addEventListener("click", closePreview);
  });
  if (previewPrev) previewPrev.addEventListener("click", () => shiftPreview(-1));
  if (previewNext) previewNext.addEventListener("click", () => shiftPreview(1));

  document.addEventListener("keydown", (event) => {
    if (!previewModal.classList.contains("is-open")) return;
    if (event.key === "Escape") closePreview();
    else if (event.key === "ArrowLeft") shiftPreview(-1);
    else if (event.key === "ArrowRight") shiftPreview(1);
    else if ((event.ctrlKey || event.metaKey) && ["s", "p", "u"].includes(event.key.toLowerCase())) {
      event.preventDefault();
    }
  });

  if (previewStage) {
    ["contextmenu", "dragstart", "selectstart"].forEach((type) => {
      previewStage.addEventListener(type, (event) => event.preventDefault());
    });
  }
}

// 项目卡片「联系我们」弹窗
const contactModal = document.querySelector("[data-contact-modal]");

const openContactModal = () => {
  if (!contactModal) return;
  contactModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("contact-open");
};

const closeContactModal = () => {
  if (!contactModal) return;
  contactModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("contact-open");
};

document.querySelectorAll("[data-contact-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", openContactModal);
});

if (contactModal) {
  contactModal.querySelectorAll("[data-contact-close]").forEach((el) => {
    el.addEventListener("click", closeContactModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("contact-open")) {
      closeContactModal();
    }
  });
}

// 滚动进入视口淡入（全站通用）
if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const revealTargets = new Set();

  // 分组卡片(stagger 依次入场)
  const staggerGroups = [
    ".scope-cards",
    ".capability-grid",
    ".projects-grid",
    ".collaboration-grid",
    ".qualification-list",
    ".qualification-docs",
    ".process-band",
    ".about-stats",
  ];
  staggerGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        child.classList.add("reveal");
        child.style.transitionDelay = `${Math.min(index * 90, 540)}ms`;
        revealTargets.add(child);
      });
    });
  });

  // 独立块(section 标题 / 描述 / 面板等)
  const singleSelectors = [
    ".about-copy",
    ".about-media",
    ".scope-head",
    ".capability-head",
    ".projects-head",
    ".collaboration-head",
    ".qualification-copy",
    ".contact-panel > .eyebrow",
    ".contact-panel > h2",
    ".contact-lead",
    ".contact-actions",
    ".contact-meta",
  ];
  document.querySelectorAll(singleSelectors.join(",")).forEach((el) => {
    el.classList.add("reveal");
    revealTargets.add(el);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
}

// 数字滚动动画（统计卡片）
const countTargets = document.querySelectorAll("[data-count-to]");
if (countTargets.length) {
  const animateCount = (el) => {
    const target = Number(el.dataset.countTo) || 0;
    const suffix = el.dataset.countSuffix || "";
    const duration = 600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = "1";
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    countTargets.forEach((el) => countObserver.observe(el));
  } else {
    countTargets.forEach((el) => animateCount(el));
  }
}

// 典型案例轮播
const projectsCarousel = document.querySelector("[data-projects-carousel]");
if (projectsCarousel) {
  const track = projectsCarousel.querySelector(".projects-track");
  const cards = Array.from(track?.querySelectorAll(".project-card") || []);
  const prevBtn = document.querySelector("[data-carousel-prev]");
  const nextBtn = document.querySelector("[data-carousel-next]");
  const dotsWrap = document.querySelector("[data-carousel-dots]");

  if (track && cards.length && prevBtn && nextBtn) {
    let index = 0;
    const dots = [];

    const getVisible = () =>
      window.matchMedia("(max-width: 768px)").matches ? 1 : 2;

    const getGap = () => {
      const style = getComputedStyle(track);
      return parseFloat(style.columnGap || style.gap) || 0;
    };

    const getMax = () => Math.max(0, cards.length - getVisible());

    const clampIndex = () => {
      const max = getMax();
      if (index > max) index = max;
      if (index < 0) index = 0;
      return max;
    };

    const buildDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      dots.length = 0;
      const total = getMax() + 1;
      for (let i = 0; i < total; i += 1) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "projects-dot";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `切换到第 ${i + 1} 组案例`);
        dot.addEventListener("click", () => {
          index = i;
          render();
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }
    };

    const render = () => {
      const max = clampIndex();
      const cardWidth = cards[0].offsetWidth;
      const gap = getGap();
      const offset = (cardWidth + gap) * index;
      track.style.transform = `translateX(-${offset}px)`;

      const atStart = index === 0;
      const atEnd = index >= max;
      prevBtn.classList.toggle("is-edge", atStart);
      nextBtn.classList.toggle("is-edge", atEnd);
      prevBtn.setAttribute("aria-disabled", atStart ? "true" : "false");
      nextBtn.setAttribute("aria-disabled", atEnd ? "true" : "false");

      dots.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", active ? "true" : "false");
        dot.tabIndex = active ? 0 : -1;
      });
    };

    let bounceTimer = null;
    const bounce = (dir) => {
      const cls = dir === "left" ? "is-bounce-left" : "is-bounce-right";
      track.classList.remove("is-bounce-left", "is-bounce-right");
      void track.offsetWidth;
      track.classList.add(cls);
      clearTimeout(bounceTimer);
      bounceTimer = setTimeout(() => {
        track.classList.remove(cls);
      }, 420);
    };

    const go = (delta) => {
      const max = getMax();
      const next = index + delta;
      if (next < 0) {
        bounce("left");
        return;
      }
      if (next > max) {
        bounce("right");
        return;
      }
      index = next;
      render();
    };

    prevBtn.addEventListener("click", () => {
      stopAutoplay();
      go(-1);
    });
    nextBtn.addEventListener("click", () => {
      stopAutoplay();
      go(1);
    });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const AUTOPLAY_INTERVAL = 5500;
    let autoplayTimer = null;
    const tickAutoplay = () => {
      const max = getMax();
      index = index >= max ? 0 : index + 1;
      render();
    };
    function startAutoplay() {
      if (reducedMotion) return;
      if (getMax() <= 0) return;
      stopAutoplay();
      autoplayTimer = setInterval(tickAutoplay, AUTOPLAY_INTERVAL);
    }
    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    projectsCarousel.addEventListener("mouseenter", stopAutoplay);
    projectsCarousel.addEventListener("mouseleave", startAutoplay);
    projectsCarousel.addEventListener("focusin", stopAutoplay);
    projectsCarousel.addEventListener("focusout", (event) => {
      if (!projectsCarousel.contains(event.relatedTarget)) startAutoplay();
    });
    projectsCarousel.addEventListener(
      "touchstart",
      stopAutoplay,
      { passive: true }
    );
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    projectsCarousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      } else if (event.key === "Home") {
        event.preventDefault();
        index = 0;
        render();
      } else if (event.key === "End") {
        event.preventDefault();
        index = getMax();
        render();
      }
    });

    // 触摸 swipe
    let touchStartX = 0;
    let touchStartY = 0;
    let touchMoved = false;
    projectsCarousel.addEventListener(
      "touchstart",
      (event) => {
        const t = event.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        touchMoved = false;
      },
      { passive: true }
    );
    projectsCarousel.addEventListener(
      "touchmove",
      (event) => {
        const t = event.touches[0];
        const dx = t.clientX - touchStartX;
        const dy = t.clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
          touchMoved = true;
        }
      },
      { passive: true }
    );
    projectsCarousel.addEventListener(
      "touchend",
      (event) => {
        if (!touchMoved) return;
        const t = event.changedTouches[0];
        const dx = t.clientX - touchStartX;
        if (Math.abs(dx) < 40) return;
        go(dx < 0 ? 1 : -1);
      },
      { passive: true }
    );

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildDots();
        render();
      }, 120);
    });

    buildDots();
    render();
    startAutoplay();
  }
}

/* 回到顶部按钮 */
const backToTop = document.querySelector("[data-back-to-top]");
if (backToTop) {
  const threshold = 600;
  const toggleBackToTop = () => {
    backToTop.classList.toggle("is-visible", window.scrollY > threshold);
  };
  toggleBackToTop();
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  backToTop.addEventListener("click", () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  });
}

/* Scroll-Spy:当前 section 对应的 .nav a 高亮 */
const spyLinks = Array.from(
  document.querySelectorAll('.nav a[href^="#"]')
).filter((a) => {
  if (a.classList.contains("nav-cta")) return false;
  const hash = a.getAttribute("href");
  return hash && hash.length > 1 && document.querySelector(hash);
});
if (spyLinks.length && "IntersectionObserver" in window) {
  const sectionMap = new Map();
  spyLinks.forEach((a) => {
    const section = document.querySelector(a.getAttribute("href"));
    if (section) sectionMap.set(section, a);
  });
  const clearActive = () =>
    spyLinks.forEach((a) => a.classList.remove("is-active"));
  const spyObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const link = sectionMap.get(visible[0].target);
      if (!link) return;
      clearActive();
      link.classList.add("is-active");
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );
  sectionMap.forEach((_link, section) => spyObserver.observe(section));
}

// 隐私政策 / 服务条款页顶部"返回上一级"链接
document.querySelectorAll("[data-back-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const sameOrigin =
      document.referrer &&
      (() => {
        try {
          return new URL(document.referrer).origin === window.location.origin;
        } catch (_) {
          return false;
        }
      })();
    if (window.history.length > 1 && sameOrigin) {
      event.preventDefault();
      window.history.back();
    }
  });
});
