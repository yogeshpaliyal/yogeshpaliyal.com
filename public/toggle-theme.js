const primaryColorScheme = ""; // "light" | "dark"

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");

function getPreferTheme() {
  // return theme value in local storage if it is set
  if (currentTheme) return currentTheme;

  // return primary color scheme if it is set
  if (primaryColorScheme) return primaryColorScheme;

  // return user device's prefer color scheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

let themeValue = getPreferTheme();

function setPreference() {
  localStorage.setItem("theme", themeValue);
  reflectPreference();
}

function changeGiscusTheme() {
  function sendMessage(message) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) {
      setTimeout(() => {
        const iframe2 = document.querySelector("iframe.giscus-frame");
        if (!iframe2) return;
        iframe2.contentWindow.postMessage(
          { giscus: message },
          "https://giscus.app"
        );
      }, 2000);
    } else {
      iframe.contentWindow.postMessage(
        { giscus: message },
        "https://giscus.app"
      );
    }
  }

  sendMessage({
    setConfig: {
      theme: themeValue,
    },
  });
}

function reflectPreference() {
  document.firstElementChild.setAttribute("data-theme", themeValue);

  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);

  // Get a reference to the body element
  const body = document.body;

  // Check if the body element exists before using getComputedStyle
  if (body) {
    // Get the computed styles for the body element
    const computedStyles = window.getComputedStyle(body);

    // Get the background color property
    const bgColor = computedStyles.backgroundColor;

    // Set the background color in <meta theme-color ... />
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);

    // now this script can find and listen for clicks on the control
    document.querySelectorAll('[id^="mermaid-dark-"]')?.forEach(node => {
      node.media = `(prefers-color-scheme: ${themeValue})`;
    });

    changeGiscusTheme();
  }
}

// set early so no page flashes / CSS is made aware
reflectPreference();

window.onload = () => {
  function setThemeFeature() {
    // set on load so screen readers can get the latest value on the button
    reflectPreference();

    // now this script can find and listen for clicks on the control
    document.querySelector("#theme-btn")?.addEventListener("click", () => {
      themeValue = themeValue === "light" ? "dark" : "light";
      setPreference();
    });

    // const observer = new MutationObserver((mutations) => {
    //   mutations.forEach((mutation) => {
    //     if (mutation.type === 'childList') {
    //       const iframe = document.querySelector('iframe.giscus-frame');
    //       if (iframe) {
    //         // Theme-setting logic
    //         changeGiscusTheme()
    //         observer.disconnect(); // Stop observing after the iframe is found
    //       }
    //     }
    //   });
    // });

    // // Start observing the body for changes
    // observer.observe(document.body, { childList: true, subtree: true });
  }

  setThemeFeature();

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", setThemeFeature);
};

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });
