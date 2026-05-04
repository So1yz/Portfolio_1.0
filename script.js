const translations = {
  nl: {
    "nav.about":        "Over mij",
    "nav.projects":     "Projecten",
    "nav.skills":       "Skills",
    "nav.ervaringen": "Ervaringen",
    "nav.contact":      "Contact",

    "hero.eyebrow":  "Welkom",
    "hero.title":    "Ik ben Yusuf Simsek",
    "hero.subtitle": "Software Developer",
    "hero.cta":      "Bekijk mijn projecten",

    "about.title": "Over mij",
    "about.body":  "Ik ben Yusuf Simsek, een 17-jarige student aan het Techniek College op de Jan Ligthartstraat, waar ik de opleiding Software Developer volg. Binnen de IT-wereld ligt mijn interesse vooral bij backend development, waar ik mij richt op het bouwen van logische, efficiënte en betrouwbare systemen. Ik hou ervan om dingen uit te zoeken en beter te worden in backend. Vooral databases en logica trekken me. Ik ben gemotiveerd en werk continu aan het verbeteren van mijn technische vaardigheden. Mijn doel is om mij verder te ontwikkelen tot een professionele developer en bij te dragen aan sterke en goed functionerende digitale oplossingen.",

    "projects.title": "Mijn projecten",
    "project.view":   "Bekijk project",
    "project.novatrust": "Mijn eerste schoolproject. Een basis crypto bank met standaard functies en wat gedigitaliseerde elementen. Geen super fancy site, maar netjes en functioneel.",
    "project.lessence": "Een parfumwebsite die ik zelf heb bedacht en gebouwd. Klassiek, mooi design en volledig eigen initiatief.",
    "project.techfix": "Een refurbished/elektronica e-commerce website. Met database structuur, SQL, PHP en alles zelf gecodeerd. Functionele webshop voor elektronische producten.",

    "skills.title":       "Technische skills",
    "ervaringen.title": "Ervaringen",

    "contact.title":         "Contact",
    "contact.emailLabel":    "E‑mail",
    "contact.locationLabel": "Locatie",
    "contact.locationValue": "Rotterdam, Nederland",

    "form.name":    "Naam",
    "form.email":   "E‑mail",
    "form.message": "Bericht",
    "form.send":    "Versturen",

    "footer.copy": "© 2026 Yusuf Simsek. Alle rechten voorbehouden.",
  },

  en: {
    "nav.about":        "About",
    "nav.projects":     "Projects",
    "nav.skills":       "Skills",
    "nav.Experiences": "Experiences",
    "nav.contact":      "Contact",

    "hero.eyebrow":  "Welcome",
    "hero.title":    "I'm Yusuf Simsek",
    "hero.subtitle": "Software Developer",
    "hero.cta":      "View My Projects",

    "about.title": "About Me",
    "about.body":  "I am Yusuf Simsek, a 17-year-old student at the Technical College on Jan Ligthartstraat, where I am studying Software Development. Within the IT world, my interest lies primarily in backend development, where I focus on building logical, efficient, and reliable systems. I enjoy figuring things out and improving my backend skills. Databases and logic, in particular, appeal to me. I am motivated and continuously work on improving my technical skills. My goal is to further develop myself into a professional developer and contribute to strong and well-functioning digital solutions.",

    "projects.title": "My Projects",
    "project.view":   "View Project",
    "project.novatrust": "My first school project. A basic crypto bank with standard functions and some digitalized elements. Not super fancy, but neat and functional.",
    "project.lessence": "A perfume website that I designed and built myself. Classic, beautiful design and completely my own initiative.",
    "project.techfix": "A refurbished/electronics e-commerce website. Database structure, SQL, PHP, everything coded by me. Functional webshop for electronic products.",


    "skills.title":       "Technical Skills",
    "Experiences.title": "Experiences",

    "contact.title":         "Contact Me",
    "contact.emailLabel":    "Email",
    "contact.locationLabel": "Location",
    "contact.locationValue": "Rotterdam, Netherlands",

    "form.name":    "Name",
    "form.email":   "Email",
    "form.message": "Message",
    "form.send":    "Send",

    "footer.copy": "© 2026 Yusuf Simsek. All rights reserved.",
  },
};

// Helpers 

function getHeaderHeight() {
  const header = document.querySelector(".site-header");
  return header ? Math.round(header.getBoundingClientRect().height) : 0;
}

function scrollToTarget(target) {
  if (!target) return;
  const offset = target.getBoundingClientRect().top + window.scrollY - getHeaderHeight();
  window.scrollTo({ top: Math.max(0, offset), behavior: "smooth" });
  target.classList.remove("section-flash");
  setTimeout(() => target.classList.add("section-flash"), 10);
}


function handleAnchorClick(e) {
  const link = e.target.closest("a[href^='#']");
  if (!link) return;
  const hash = link.getAttribute("href");
  if (!hash || hash === "#") return;
  const target = document.querySelector(hash);
  if (!target) return;
  e.preventDefault();
  scrollToTarget(target);
  history.replaceState(null, "", hash);
}

document.addEventListener("click", handleAnchorClick);

// Scroll buttons 

function initScrollButtons() {
  document.querySelectorAll("[data-scroll-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.getAttribute("data-scroll-target") || "");
      scrollToTarget(target);
    });
  });
}

// taal switcher

function setLanguage(lang) {
  const safe = lang === "en" ? "en" : "nl";
  const dict = translations[safe];
  if (!dict) return;

  document.documentElement.lang = safe;
  localStorage.setItem("lang", safe);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const val = dict[el.getAttribute("data-i18n")];
    if (typeof val === "string") el.textContent = val;
  });

  document.getElementById("lang-nl")?.toggleAttribute("aria-current", safe === "nl");
  document.getElementById("lang-en")?.toggleAttribute("aria-current", safe === "en");
}

function initLanguageSwitcher() {
  setLanguage(localStorage.getItem("lang") || "nl");
  document.querySelectorAll(".lang-switch button[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang") || "nl"));
  });
}

// Nav

function initActiveNav() {
  const sections = Array.from(document.querySelectorAll("main > section[id]"));
  const links = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));

  const map = new Map(links.map((a) => [a.getAttribute("href"), a]));

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible?.target?.id) return;
      links.forEach((a) => a.removeAttribute("aria-current"));
      map.get(`#${visible.target.id}`)?.setAttribute("aria-current", "location");
    },
    {
      threshold: [0.2, 0.4, 0.6],
      rootMargin: `-${getHeaderHeight()}px 0px -50% 0px`,
    }
  );

  sections.forEach((s) => observer.observe(s));
}

// Contact

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name    = form.querySelector("#name")?.value?.trim() || "";
    const email   = form.querySelector("#email")?.value?.trim() || "";
    const message = form.querySelector("#message")?.value?.trim() || "";

    if (!name || !email || !message) {
      form.classList.remove("form-shake");
      requestAnimationFrame(() => form.classList.add("form-shake"));
      return;
    }

    const to      = "Yusuf.simsek9080@gmail.com";
    const subject = `Portfolio contact: ${name}`;
    const body    = [`Name: ${name}`, `Email: ${email}`, "", "Message:", message].join("\n");

    window.location.href =
      `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// Mobile menu

function initMobileMenu() {
  const btn = document.querySelector(".menu-btn");
  const nav = document.getElementById("primary-navigation");
  if (!btn || !nav) return;

  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("nav-open", open);
  };

  btn.addEventListener("click", () =>
    setOpen(btn.getAttribute("aria-expanded") !== "true")
  );

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".top-nav")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  nav.querySelectorAll("a[href^='#']").forEach((a) =>
    a.addEventListener("click", () => setOpen(false))
  );
}

initScrollButtons();
initLanguageSwitcher();
initActiveNav();
initContactForm();
initMobileMenu();