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

const hamburger = document.getElementById("hamburger");
const closeBtn = document.getElementById("closeBtn");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.style.display = "none";
  closeBtn.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  closeBtn.style.display = "none";
  hamburger.style.display = "block";
});

// Cerrar menú al hacer clic en cualquier enlace
const navLinksItems = navLinks.querySelectorAll("a");
navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    closeBtn.style.display = "none";
    hamburger.style.display = "block";
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

const languageDropdown = document.querySelector(".custom-dropdown");

languageDropdown.addEventListener("click", (e) => {
  e.stopPropagation();
  languageDropdown.classList.toggle("open");
});

document.addEventListener("click", () => {
  languageDropdown.classList.remove("open");
});

// Sistema de idiomas
const languageOptions = document.querySelectorAll(".options li");
languageOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    e.stopPropagation();
    const lang = option.getAttribute("data-value");
    const flagSrc = option.getAttribute("data-flag");

    // Actualizar el ícono seleccionado
    const selectedOption = document.querySelector(".selected-option");
    const currentIcon = selectedOption.querySelector("svg, img");
    const flagImg = document.createElement("img");
    flagImg.src = flagSrc;
    flagImg.alt = lang;
    flagImg.width = 30;
    if (currentIcon) {
      currentIcon.replaceWith(flagImg);
    } else {
      selectedOption.appendChild(flagImg);
    }

    // Cambiar idioma
    changeLanguage(lang);

    // Cerrar dropdown
    languageDropdown.classList.remove("open");
  });
});

// Inicializar todo al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar idioma
  const currentLang = getCurrentLanguage();
  updatePageLanguage(currentLang);

  // Actualizar el ícono del idioma actual
  const currentOption = document.querySelector(
    `.options li[data-value="${currentLang}"]`
  );
  if (currentOption) {
    const flagSrc = currentOption.getAttribute("data-flag");
    const selectedOption = document.querySelector(".selected-option");
    const currentIcon = selectedOption.querySelector("svg, img");
    const flagImg = document.createElement("img");
    flagImg.src = flagSrc;
    flagImg.alt = currentLang;
    flagImg.width = 30;
    if (currentIcon) {
      currentIcon.replaceWith(flagImg);
    } else {
      selectedOption.appendChild(flagImg);
    }
  }

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
