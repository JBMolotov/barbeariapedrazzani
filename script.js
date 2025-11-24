document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links li a");

  // Toggle Mobile Menu
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");

    // Animate hamburger icon (optional simple toggle)
    const icon = hamburger.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close menu when clicking a link
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = hamburger.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  // Smooth Scroll for Anchor Links (Polyfill-like behavior if needed, but CSS scroll-behavior handles most)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Account for fixed header height + accessibility bar
        const headerOffset = 120;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Simple Scroll Animation for Elements
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select elements to animate
  const animatedElements = document.querySelectorAll(
    ".service-card, .location-card, .about-text, .promo-content"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });

  // Accessibility Controls
  const btnIncrease = document.getElementById("btn-font-increase");
  const btnDecrease = document.getElementById("btn-font-decrease");
  const btnContrast = document.getElementById("btn-contrast");
  const selectDaltonism = document.getElementById("daltonism-select");
  const html = document.documentElement;
  const body = document.body;

  // Font Size Control
  let currentFontSize = 16; // Default base size
  const maxFontSize = 24;
  const minFontSize = 12;

  if (btnIncrease && btnDecrease) {
    btnIncrease.addEventListener("click", () => {
      if (currentFontSize < maxFontSize) {
        currentFontSize += 2;
        html.style.fontSize = `${currentFontSize}px`;
      }
    });

    btnDecrease.addEventListener("click", () => {
      if (currentFontSize > minFontSize) {
        currentFontSize -= 2;
        html.style.fontSize = `${currentFontSize}px`;
      }
    });
  }

  // High Contrast Control
  if (btnContrast) {
    btnContrast.addEventListener("click", () => {
      body.classList.toggle("high-contrast");
    });
  }

  // Daltonism Control
  if (selectDaltonism) {
    selectDaltonism.addEventListener("change", (e) => {
      // Remove all daltonism classes
      body.classList.remove(
        "protanopia",
        "deuteranopia",
        "tritanopia",
        "achromatopsia"
      );

      // Add selected class if not normal
      if (e.target.value !== "normal") {
        body.classList.add(e.target.value);
      }
    });
  }

  // Booking modal functionality
  const bookingModal = document.getElementById("booking-modal");
  const openBookingBtns = document.querySelectorAll(".open-booking");
  const modalClose = bookingModal
    ? bookingModal.querySelector(".modal-close")
    : null;
  const modalOverlay = bookingModal
    ? bookingModal.querySelector(".modal-overlay")
    : null;

  function openBookingModal() {
    if (!bookingModal) return;
    bookingModal.setAttribute("aria-hidden", "false");
    // set focus to first link
    const firstLink = bookingModal.querySelector(".booking-list a");
    if (firstLink) firstLink.focus();
  }

  function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.setAttribute("aria-hidden", "true");
  }

  openBookingBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openBookingModal();
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeBookingModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeBookingModal);

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeBookingModal();
  });
});
