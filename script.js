const yearElement = document.getElementById("year");
const langSwitch = document.getElementById("lang-switch");
const i18nNodes = document.querySelectorAll("[data-i18n]");
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const translations = {
  ru: {
    pageTitle: "Aliwkukh | AppSec профиль",
    pageDescription: "Личная AppSec-визитка: аудит рисков, secure-by-design подход, контакты и проекты.",
    langLabel: "Язык",
    eyebrow: "application security profile",
    lead: "AppSec-практика с фокусом на безопасную архитектуру, снижение рисков и устойчивость продукта.",
    projectsBtn: "Проекты",
    contactBtn: "Связаться",
    aboutTitle: "Обо мне",
    aboutText:
      "Мне 16 лет, развиваюсь в направлении Application Security: помогаю командам находить уязвимости раньше, выстраивать secure-by-default подход и укреплять процессы разработки.",
    stackTitle: "AppSec стек",
    stack1: "Threat Modeling и security review",
    stack2: "SAST / DAST / dependency scanning",
    stack3: "OWASP Top 10 и secure coding практики",
    stack4: "Hardening CI/CD и базовые security gates",
    stack5: "Документация и security awareness",
    valueTitle: "Ищу напарника для CTF",
    valueLead: "В команду нужен человек для прохождения CTF разного уровня сложности.",
    value1: "Требуется опыт в веб-пентесте",
    value2: "Понимание сетей и протоколов",
    value3: "Уверенная работа в Linux",
    value4: "Плюсом будет стабильное участие и командная коммуникация",
    contactTitle: "Контакты",
    contactLead: "Открыт к задачам в AppSec, security review и техническому консалтингу.",
    openGithub: "Открыть GitHub",
    contactHint: "Основной канал связи: Telegram @luujd.",
  },
  en: {
    pageTitle: "Aliwkukh | AppSec Profile",
    pageDescription: "AppSec profile: risk review, secure-by-design approach, contacts and projects.",
    langLabel: "Language",
    eyebrow: "application security profile",
    lead: "AppSec practice focused on secure architecture, risk reduction, and product resilience.",
    projectsBtn: "Projects",
    contactBtn: "Contact",
    aboutTitle: "About",
    aboutText:
      "I am 16 years old and focused on Application Security: helping teams identify vulnerabilities earlier, implement secure-by-default practices, and strengthen engineering workflows.",
    stackTitle: "AppSec stack",
    stack1: "Threat modeling and security review",
    stack2: "SAST / DAST and dependency scanning",
    stack3: "OWASP Top 10 and secure coding practices",
    stack4: "CI/CD hardening and baseline security gates",
    stack5: "Documentation and security awareness",
    valueTitle: "Looking for a CTF teammate",
    valueLead: "We are looking for a teammate for CTF challenges across different difficulty levels.",
    value1: "Hands-on web pentesting experience is required",
    value2: "Solid understanding of networks and protocols",
    value3: "Confident Linux usage",
    value4: "Reliable participation and clear team communication are a plus",
    contactTitle: "Contact",
    contactLead: "Open to AppSec tasks, security reviews, and technical consulting.",
    openGithub: "Open GitHub",
    contactHint: "Primary contact channel: Telegram @luujd.",
  },
  de: {
    pageTitle: "Aliwkukh | AppSec Profil",
    pageDescription: "AppSec Profil: Risikoanalyse, Secure-by-Design Ansatz, Kontakte und Projekte.",
    langLabel: "Sprache",
    eyebrow: "application security profile",
    lead: "AppSec-Fokus auf sichere Architektur, Risikoreduzierung und Produktresilienz.",
    projectsBtn: "Projekte",
    contactBtn: "Kontakt",
    aboutTitle: "Uber mich",
    aboutText:
      "Ich bin 16 Jahre alt und arbeite im Bereich Application Security: Ich helfe Teams, Schwachstellen fruher zu finden, secure-by-default umzusetzen und Entwicklungsprozesse zu starken.",
    stackTitle: "AppSec Stack",
    stack1: "Threat Modeling und Security Review",
    stack2: "SAST / DAST und Dependency Scanning",
    stack3: "OWASP Top 10 und Secure Coding Praktiken",
    stack4: "CI/CD Hardening und grundlegende Security Gates",
    stack5: "Dokumentation und Security Awareness",
    valueTitle: "Suche einen CTF-Teampartner",
    valueLead: "Wir suchen einen Teampartner fur CTF-Aufgaben mit unterschiedlichem Schwierigkeitsgrad.",
    value1: "Erfahrung im Web-Pentesting ist erforderlich",
    value2: "Gutes Verstandnis von Netzwerken und Protokollen",
    value3: "Sicherer Umgang mit Linux",
    value4: "Zuverlassige Teilnahme und Teamkommunikation sind ein Plus",
    contactTitle: "Kontakt",
    contactLead: "Offen fur AppSec-Aufgaben, Security Reviews und technisches Consulting.",
    openGithub: "GitHub offnen",
    contactHint: "Primarer Kontaktkanal: Telegram @luujd.",
  },
};

function applyLanguage(language) {
  const bundle = translations[language] || translations.ru;

  document.documentElement.lang = language;
  document.title = bundle.pageTitle;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", bundle.pageDescription);
  }

  for (const node of i18nNodes) {
    const key = node.getAttribute("data-i18n");
    if (!key) {
      continue;
    }

    const value = bundle[key];
    if (value) {
      node.textContent = value;
    }
  }
}

function detectBrowserLanguage() {
  const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language || "en"];

  for (const language of browserLanguages) {
    const normalized = String(language).toLowerCase();

    if (normalized.startsWith("ru")) {
      return "ru";
    }
    if (normalized.startsWith("de")) {
      return "de";
    }
    if (normalized.startsWith("en")) {
      return "en";
    }
  }

  return "en";
}

function getBinaryChunk() {
  const length = 4 + Math.floor(Math.random() * 6);
  let chunk = "";

  for (let i = 0; i < length; i += 1) {
    chunk += Math.random() > 0.5 ? "1" : "0";
  }

  return chunk;
}

function getBurstSymbol() {
  const symbols = ["0", "1", "{", "}", "<", ">", "/", "\\", "#", "*", ";", ":"];
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function setupCursorBinaryTrail() {
  if (reduceMotionQuery.matches) {
    return;
  }

  const trailLayer = document.createElement("div");
  trailLayer.className = "cursor-binary-trail";
  document.body.appendChild(trailLayer);

  let lastSpawn = 0;
  const spawnIntervalMs = 26;

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType && event.pointerType !== "mouse") {
      return;
    }

    const now = performance.now();
    if (now - lastSpawn < spawnIntervalMs) {
      return;
    }
    lastSpawn = now;

    const trailBit = document.createElement("span");
    trailBit.className = "trail-bit";
    trailBit.textContent = getBinaryChunk();
    trailBit.style.setProperty("--x", `${event.clientX + 8}px`);
    trailBit.style.setProperty("--y", `${event.clientY + 8}px`);
    trailBit.style.setProperty("--drift-x", `${(Math.random() * 18 - 9).toFixed(1)}px`);
    trailBit.style.setProperty("--drift-y", `${(-8 - Math.random() * 18).toFixed(1)}px`);
    trailLayer.appendChild(trailBit);

    setTimeout(() => {
      trailBit.remove();
    }, 760);
  });

  window.addEventListener("pointerdown", (event) => {
    if (event.pointerType && event.pointerType !== "mouse") {
      return;
    }
    if (event.button !== 0) {
      return;
    }

    const burstCount = 16;
    for (let i = 0; i < burstCount; i += 1) {
      const burstBit = document.createElement("span");
      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random() * 38;
      const driftX = Math.cos(angle) * distance;
      const driftY = Math.sin(angle) * distance;

      burstBit.className = "trail-burst-symbol";
      burstBit.textContent = getBurstSymbol();
      burstBit.style.setProperty("--x", `${event.clientX}px`);
      burstBit.style.setProperty("--y", `${event.clientY}px`);
      burstBit.style.setProperty("--drift-x", `${driftX.toFixed(2)}px`);
      burstBit.style.setProperty("--drift-y", `${driftY.toFixed(2)}px`);
      trailLayer.appendChild(burstBit);

      setTimeout(() => {
        burstBit.remove();
      }, 600);
    }
  });
}

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const savedLanguage = localStorage.getItem("site-lang");
const initialLanguage =
  savedLanguage && translations[savedLanguage]
    ? savedLanguage
    : detectBrowserLanguage();

applyLanguage(initialLanguage);
setupCursorBinaryTrail();

if (langSwitch) {
  langSwitch.value = initialLanguage;
  langSwitch.addEventListener("change", () => {
    const selected = langSwitch.value;
    applyLanguage(selected);
    localStorage.setItem("site-lang", selected);
  });
}
