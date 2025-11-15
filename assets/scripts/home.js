// Page Loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");
  const body = document.body;

  // Ocultar inmediatamente si ya está cargado
  loader.classList.add("hidden");
  body.classList.remove("loading");
});

const palabras = ["Full Stack Dev."];

let letraIndex = 0;
const velocidadEscritura = 30;

function escribir() {
  const escrituraDiv = document.getElementById("escritura");
  escrituraDiv.textContent = palabras[0].substring(0, letraIndex);

  if (letraIndex < palabras[0].length) {
    letraIndex++;
    setTimeout(escribir, velocidadEscritura);
  } else {
    setTimeout(() => {
      escrituraDiv.style.borderRight = "none";
    }, 500);
  }
}

escribir();

// Función para actualizar aria-expanded
const updateAriaExpanded = (isOpen) => {
  const hamburger = document.getElementById("hamburger");
  if (hamburger) {
    hamburger.setAttribute("aria-expanded", isOpen.toString());
  }
};

const hamburger = document.getElementById("hamburger");
const closeBtn = document.getElementById("closeBtn");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  hamburger.style.display = "none";
  closeBtn.style.display = "block";
  updateAriaExpanded(isOpen);
});

closeBtn.addEventListener("click", () => {
  navLinks.classList.remove("active");
  closeBtn.style.display = "none";
  hamburger.style.display = "block";
  updateAriaExpanded(false);
});

// Cerrar menú al hacer clic en cualquier enlace
const navLinksItems = navLinks.querySelectorAll("a");
navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    // Solo cerrar el menú móvil si está visible
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("active");
      closeBtn.style.display = "none";
      hamburger.style.display = "block";
      updateAriaExpanded(false);
    }
  });
});

let darkMode = localStorage.getItem("darkMode");

const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  document.getElementById("toggleMode").checked = true;
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  document.getElementById("toggleMode").checked = false;
  localStorage.setItem("darkMode", null);
};

const darkModeToggle = document
  .querySelector(".theme-toggle")
  .querySelector("input");

darkModeToggle.addEventListener("click", () => {
  updateThem();
});

if (darkMode === "enabled") {
  enableDarkMode();
}

function updateThem() {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

// Language Modal System
const languageTrigger = document.getElementById("languageTrigger");
const languageModal = document.getElementById("languageModal");
const languageModalOverlay = document.getElementById("languageModalOverlay");
const languageModalClose = document.getElementById("languageModalClose");
const languageSearch = document.getElementById("languageSearch");
const languageList = document.getElementById("languageList");
const languageOptions = document.querySelectorAll(".language-list li");

// Open modal
languageTrigger.addEventListener("click", () => {
  languageModal.classList.add("active");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    languageSearch.focus();
  }, 100);
});

// Close modal functions
const closeLanguageModal = () => {
  languageModal.classList.remove("active");
  document.body.style.overflow = "";
  languageSearch.value = "";
  // Show all languages
  languageOptions.forEach((option) => {
    option.classList.remove("hidden");
  });
};

languageModalClose.addEventListener("click", closeLanguageModal);
languageModalOverlay.addEventListener("click", closeLanguageModal);

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && languageModal.classList.contains("active")) {
    closeLanguageModal();
  }
});

// Search functionality
languageSearch.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();

  languageOptions.forEach((option) => {
    const langName = option.getAttribute("data-name").toLowerCase();
    const langText = option.querySelector("span").textContent.toLowerCase();
    const langValue = option.getAttribute("data-value").toLowerCase();

    if (
      langName.includes(searchTerm) ||
      langText.includes(searchTerm) ||
      langValue.includes(searchTerm)
    ) {
      option.classList.remove("hidden");
    } else {
      option.classList.add("hidden");
    }
  });
});

// Language selection
languageOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const lang = option.getAttribute("data-value");
    changeLanguage(lang);
    closeLanguageModal();
  });
});

// Inicializar todo al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar idioma
  const currentLang = getCurrentLanguage();
  updatePageLanguage(currentLang);

  // Animación de skills
  const skills = document.querySelectorAll(".skills-container");

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function animateSkillsIfVisible() {
    skills.forEach((skill) => {
      if (isElementInViewport(skill) && !skill.classList.contains("animate")) {
        skill.classList.add("animate");
      }
    });
  }

  animateSkillsIfVisible();

  window.addEventListener("scroll", animateSkillsIfVisible);
  window.addEventListener("resize", animateSkillsIfVisible);
});

// Configuración del campo de teléfono con validación
const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
  loadUtils: () => import("../js/lib/intl-tel-input@25.2.0-utils.js"),
  initialCountry: "es",
  nationalMode: false,
  formatOnDisplay: true,
  autoPlaceholder: "aggressive",
  separateDialCode: true,
  strictMode: true,
});

// Validación en tiempo real del teléfono
input.addEventListener("input", function () {
  // Formatear automáticamente mientras se escribe
  const currentValue = input.value;

  // Validar el número
  if (iti.isValidNumber()) {
    input.setCustomValidity("");
    input.classList.remove("invalid");
    input.classList.add("valid");
  } else {
    if (currentValue.trim() !== "") {
      input.setCustomValidity("Número de teléfono no válido");
      input.classList.remove("valid");
      input.classList.add("invalid");
    } else {
      input.setCustomValidity("");
      input.classList.remove("valid", "invalid");
    }
  }
});

input.addEventListener("blur", function () {
  if (input.value.trim() !== "" && !iti.isValidNumber()) {
    input.reportValidity();
  }
});

// Validación en tiempo real del email
const emailInput = document.querySelector("#email");
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

emailInput.addEventListener("input", function () {
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    emailInput.setCustomValidity("");
    emailInput.classList.remove("valid", "invalid");
  } else if (emailPattern.test(emailValue)) {
    emailInput.setCustomValidity("");
    emailInput.classList.remove("invalid");
    emailInput.classList.add("valid");
  } else {
    emailInput.setCustomValidity("Por favor, introduce un correo válido");
    emailInput.classList.remove("valid");
    emailInput.classList.add("invalid");
  }
});

emailInput.addEventListener("blur", function () {
  if (emailInput.value.trim() !== "" && !emailPattern.test(emailInput.value)) {
    emailInput.reportValidity();
  }
});

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Navbar scroll effect
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Animated Counter for Stats
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
};

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          if (stat.textContent === "0") {
            animateCounter(stat);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  statsObserver.observe(statsSection);
}
