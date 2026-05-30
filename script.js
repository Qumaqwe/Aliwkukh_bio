const yearElement = document.getElementById("year");
const scrollButtons = document.querySelectorAll(".js-scroll");
const copyButton = document.getElementById("copy-contact");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

for (const button of scrollButtons) {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = button.getAttribute("href");
    if (!targetId) {
      return;
    }

    const targetSection = document.querySelector(targetId);
    if (!targetSection) {
      return;
    }

    for (const item of scrollButtons) {
      item.classList.remove("is-active");
    }
    button.classList.add("is-active");

    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const email = copyButton.getAttribute("data-email");
    if (!email) {
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = "Email скопирован";
      setTimeout(() => {
        copyButton.textContent = "Скопировать email";
      }, 1800);
    } catch {
      copyButton.textContent = "Не удалось скопировать";
      setTimeout(() => {
        copyButton.textContent = "Скопировать email";
      }, 1800);
    }
  });
}
