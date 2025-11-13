function isDarkMode() {
  return document.body.classList.contains("darkmode");
}

// Detectar si es dispositivo móvil para optimizar rendimiento
function isMobileDevice() {
  return window.innerWidth < 768;
}

const togglemode = document
  .querySelector(".theme-toggle")
  .querySelector("input");

togglemode.addEventListener("click", () => {
  updateTheme();
});

function updateTheme() {
  const configPaths = isDarkMode()
    ? {
        about: "assets/js/lib/particles-dark-about.json",
      }
    : {
        about: "assets/js/lib/particles-light-about.json",
      };

  // En móviles, no cargar partículas para mejor rendimiento
  if (!isMobileDevice()) {
    particlesJS.load("particles-aboutme", configPaths.about);
  } else {
    // Limpiar partículas si existen
    const particlesContainer = document.getElementById("particles-aboutme");
    if (particlesContainer && window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window.pJSDom = [];
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateTheme();

  // Reinicializar al cambiar tamaño de ventana
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateTheme();
    }, 250);
  });

  // Manejar envío del formulario de contacto
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector(".form-btn-submit");
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          // Mostrar mensaje de éxito
          showMessage(
            "Message sent successfully! I'll get back to you soon.",
            "success"
          );
          contactForm.reset();
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        // Mostrar mensaje de error
        showMessage(
          "Oops! There was a problem sending your message. Please try again.",
          "error"
        );
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  function showMessage(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement("div");
    notification.className = `contact-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      background: ${type === "success" ? "#4caf50" : "#f44336"};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-size: 14px;
      font-weight: 500;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remover después de 5 segundos
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
});

updateTheme();
