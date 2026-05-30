const yearElement = document.getElementById("year");
const langSwitch = document.getElementById("lang-switch");
const i18nNodes = document.querySelectorAll("[data-i18n]");

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
      "Развиваюсь в направлении Application Security: помогаю командам находить уязвимости раньше, выстраивать secure-by-default подход и укреплять процессы разработки.",
    stackTitle: "AppSec стек",
    stack1: "Threat Modeling и security review",
    stack2: "SAST / dependency scanning",
    stack3: "OWASP Top 10 и secure coding практики",
    stack4: "Hardening CI/CD и базовые security gates",
    stack5: "Документация и security awareness",
    valueTitle: "Что делаю",
    valueLead: "Какую ценность могу дать проекту:",
    value1: "Аудит рисков на уровне фич и архитектуры",
    value2: "Выявление уязвимостей до продакшна",
    value3: "Сопровождение remediation и hardening",
    value4: "Поддержка security-культуры внутри команды",
    contactTitle: "Контакты",
    contactLead: "Открыт к задачам в AppSec, security review и техническому консалтингу.",
    openGithub: "Открыть GitHub",
    contactHint: "Основной канал связи: Telegram @luujd.",
    footerTagline: "Crafted with intention.",
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
      "I focus on Application Security: helping teams identify vulnerabilities earlier, implement secure-by-default practices, and strengthen engineering workflows.",
    stackTitle: "AppSec stack",
    stack1: "Threat modeling and security review",
    stack2: "SAST and dependency scanning",
    stack3: "OWASP Top 10 and secure coding practices",
    stack4: "CI/CD hardening and baseline security gates",
    stack5: "Documentation and security awareness",
    valueTitle: "What I do",
    valueLead: "Value I bring to products:",
    value1: "Risk review at feature and architecture levels",
    value2: "Early vulnerability detection before production",
    value3: "Remediation support and hardening guidance",
    value4: "Security culture support across teams",
    contactTitle: "Contact",
    contactLead: "Open to AppSec tasks, security reviews, and technical consulting.",
    openGithub: "Open GitHub",
    contactHint: "Primary contact channel: Telegram @luujd.",
    footerTagline: "Crafted with intention.",
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
      "Ich arbeite im Bereich Application Security: Ich helfe Teams, Schwachstellen fruher zu finden, secure-by-default umzusetzen und Entwicklungsprozesse zu starken.",
    stackTitle: "AppSec Stack",
    stack1: "Threat Modeling und Security Review",
    stack2: "SAST und Dependency Scanning",
    stack3: "OWASP Top 10 und Secure Coding Praktiken",
    stack4: "CI/CD Hardening und grundlegende Security Gates",
    stack5: "Dokumentation und Security Awareness",
    valueTitle: "Was ich mache",
    valueLead: "Welchen Mehrwert ich bringe:",
    value1: "Risikobewertung auf Feature- und Architektur-Ebene",
    value2: "Fruhe Erkennung von Schwachstellen vor Produktion",
    value3: "Unterstutzung bei Remediation und Hardening",
    value4: "Aufbau einer Security-Kultur im Team",
    contactTitle: "Kontakt",
    contactLead: "Offen fur AppSec-Aufgaben, Security Reviews und technisches Consulting.",
    openGithub: "GitHub offnen",
    contactHint: "Primarer Kontaktkanal: Telegram @luujd.",
    footerTagline: "Crafted with intention.",
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

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const savedLanguage = localStorage.getItem("site-lang");
const initialLanguage =
  savedLanguage && translations[savedLanguage]
    ? savedLanguage
    : detectBrowserLanguage();

applyLanguage(initialLanguage);

if (langSwitch) {
  langSwitch.value = initialLanguage;
  langSwitch.addEventListener("change", () => {
    const selected = langSwitch.value;
    applyLanguage(selected);
    localStorage.setItem("site-lang", selected);
  });
}
