function isDarkMode() {
  return document.body.classList.contains("darkmode");
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

  particlesJS.load("particles-aboutme", configPaths.about);
}

document.addEventListener("DOMContentLoaded", function () {
  updateTheme();
});

updateTheme();
