function parseDob(text) {
  const m = String(text).trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!m) return null;
  const dd = Number(m[1]);
  const mm = Number(m[2]);
  const yyyy = Number(m[3]);
  const d = new Date(yyyy, mm - 1, dd);
  if (Number.isNaN(d.getTime())) return null;
  if (d.getFullYear() !== yyyy || d.getMonth() !== mm - 1 || d.getDate() !== dd) return null;
  return d;
}

function calcAge(dob, now = new Date()) {
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age -= 1;
  return age;
}

(function init() {
  const dobEl = document.getElementById("dob");
  const ageEl = document.getElementById("age");
  if (!dobEl || !ageEl) return;

  const dob = parseDob(dobEl.textContent);
  if (!dob) return;

  ageEl.textContent = String(calcAge(dob));
})();

function isMobileLike() {
  return (
    window.matchMedia &&
    (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches)
  );
}

function showToast(text) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = text;
  toast.classList.add("toast--show");

  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => {
    toast.classList.remove("toast--show");
  }, 1600);
}

const I18N = {
  ru: {
    upload_photo: "Загрузить фото",
    section_contact: "ALOQA",
    section_links: "LINKLAR",
    section_experience: "ISH TAJRIBASI",
    section_education: "TA'LIM",
    section_languages: "TIL",
    label_phone: "Номер телефона:",
    label_email: "Email:",
    label_address: "Адрес:",
    label_telegram: "Telegram:",
    label_instagram: "Instagram:",
    save_contact: "Сохранить контакт",
    share: "Поделиться",
    nav_contact: "Контакты",
    nav_experience: "Опыт",
    nav_education: "Учёба",
    nav_languages: "Языки",
    qr_title: "QR код",
    copy_link: "Копировать ссылку",
    top: "Вверх",
    visits: "Открытий:",
    toast_theme_dark: "Тёмная тема",
    toast_theme_light: "Светлая тема",
    toast_color: "Цвет изменён",
    toast_link_copied: "Ссылка скопирована",
    toast_vcf: "VCF скачан",
    toast_photo: "Фото обновлено",
    toast_choose_img: "Выберите изображение",
  },
  uz: {
    upload_photo: "Rasm yuklash",
    section_contact: "ALOQA",
    section_links: "LINKLAR",
    section_experience: "ISH TAJRIBASI",
    section_education: "TA'LIM",
    section_languages: "TIL",
    label_phone: "Telefon raqami:",
    label_email: "Email:",
    label_address: "Manzil:",
    label_telegram: "Telegram:",
    label_instagram: "Instagram:",
    save_contact: "Kontakt saqlash",
    share: "Ulashish",
    nav_contact: "Aloqa",
    nav_experience: "Ish",
    nav_education: "Ta'lim",
    nav_languages: "Til",
    qr_title: "QR kod",
    copy_link: "Havolani nusxa",
    top: "Yuqoriga",
    visits: "Kirganlar:",
    toast_theme_dark: "Qorong'i tema",
    toast_theme_light: "Yorug' tema",
    toast_color: "Rang o'zgardi",
    toast_link_copied: "Havola nusxalandi",
    toast_vcf: "VCF yuklandi",
    toast_photo: "Rasm yangilandi",
    toast_choose_img: "Rasm tanlang",
  },
  en: {
    upload_photo: "Upload photo",
    section_contact: "CONTACT",
    section_links: "LINKS",
    section_experience: "EXPERIENCE",
    section_education: "EDUCATION",
    section_languages: "LANGUAGES",
    label_phone: "Phone number:",
    label_email: "Email:",
    label_address: "Address:",
    label_telegram: "Telegram:",
    label_instagram: "Instagram:",
    save_contact: "Save contact",
    share: "Share",
    nav_contact: "Contact",
    nav_experience: "Work",
    nav_education: "Education",
    nav_languages: "Languages",
    qr_title: "QR code",
    copy_link: "Copy link",
    top: "Top",
    visits: "Visits:",
    toast_theme_dark: "Dark theme",
    toast_theme_light: "Light theme",
    toast_color: "Color changed",
    toast_link_copied: "Link copied",
    toast_vcf: "VCF downloaded",
    toast_photo: "Photo updated",
    toast_choose_img: "Choose an image",
  },
};

function getLang() {
  const saved = localStorage.getItem("lang");
  if (saved && I18N[saved]) return saved;
  const nav = (navigator.language || "").toLowerCase();
  if (nav.startsWith("uz")) return "uz";
  if (nav.startsWith("ru")) return "ru";
  return "en";
}

function t(key) {
  const lang = getLang();
  return (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || key;
}

function applyLang(lang) {
  const l = I18N[lang] ? lang : "en";
  localStorage.setItem("lang", l);

  const btn = document.getElementById("langBtn");
  if (btn) btn.textContent = l.toUpperCase();

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const k = el.getAttribute("data-i18n");
    if (!k) return;
    el.textContent = t(k);
  });

  const visitsEl = document.getElementById("visits");
  if (visitsEl && visitsEl.dataset && visitsEl.dataset.count) {
    visitsEl.textContent = t("visits") + " " + visitsEl.dataset.count;
  }
}

async function copyText(text) {
  if (!text) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

(function initContactFallback() {
  const links = document.querySelectorAll("a.contact-link[data-copy]");
  if (!links.length) return;

  links.forEach((a) => {
    a.addEventListener("click", async () => {
      if (isMobileLike()) return;

      const value = a.getAttribute("data-copy") || "";
      const ok = await copyText(value);
      if (ok) showToast("Скопировано: " + value);
    });
  });
})();

function applyTheme(theme) {
  const t = theme === "dark" ? "dark" : "light";
  document.body.setAttribute("data-theme", t);

  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.setAttribute("aria-pressed", String(t === "dark"));
    btn.textContent = t === "dark" ? "Light" : "Dark";
  }
}

(function initThemeAndPrint() {
  const saved = localStorage.getItem("theme");
  applyTheme(saved || "light");

  applyLang(getLang());

  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const current = getLang();
      const next = current === "ru" ? "uz" : current === "uz" ? "en" : "ru";
      applyLang(next);
    });
  }

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.body.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
      showToast(next === "dark" ? t("toast_theme_dark") : t("toast_theme_light"));
    });
  }

  const printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
})();

function setAccent(color) {
  document.documentElement.style.setProperty("--accent", color);
  localStorage.setItem("accent", color);
}

(function initAccent() {
  const btn = document.getElementById("accentBtn");
  const palette = ["#2f7cff", "#9b5cff", "#22c55e", "#f97316", "#06b6d4"];

  const saved = localStorage.getItem("accent");
  if (saved) setAccent(saved);

  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    const idx = Math.max(0, palette.indexOf(current));
    const next = palette[(idx + 1) % palette.length];
    setAccent(next);
    showToast(t("toast_color"));
  });
})();

(function initVisits() {
  const el = document.getElementById("visits");
  if (!el) return;

  const key = "visits";
  const v = Number(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, String(v));
  el.dataset.count = String(v);
  el.textContent = t("visits") + " " + v;
})();

(function initRoleRotator() {
  const el = document.getElementById("roleRotator");
  if (!el) return;

  const roles = (el.getAttribute("data-roles") || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!roles.length) return;

  let i = 0;
  el.textContent = roles[i];

  window.setInterval(() => {
    i = (i + 1) % roles.length;
    el.style.opacity = "0";
    window.setTimeout(() => {
      el.textContent = roles[i];
      el.style.opacity = "1";
    }, 180);
  }, 2200);
})();

(function initScrollUi() {
  const bar = document.querySelector(".scroll-progress__bar");
  const topBtn = document.getElementById("toTop");

  function onScroll() {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
    const p = Math.min(1, Math.max(0, doc.scrollTop / max));
    if (bar) bar.style.width = (p * 100).toFixed(2) + "%";
    if (topBtn) topBtn.classList.toggle("to-top--show", doc.scrollTop > 420);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();

(function initHotkeys() {
  window.addEventListener("keydown", (e) => {
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const k = String(e.key || "").toLowerCase();
    if (k === "t") document.getElementById("themeToggle")?.click();
    if (k === "p") document.getElementById("printBtn")?.click();
    if (k === "s") document.getElementById("shareBtn")?.click();
  });
})();

(function initBottomNav() {
  const nav = document.querySelector(".bottom-nav");
  if (!nav) return;

  const items = Array.from(nav.querySelectorAll(".bottom-nav__item[data-target]"));
  if (!items.length) return;

  const targets = items
    .map((a) => document.getElementById(a.getAttribute("data-target") || ""))
    .filter(Boolean);
  if (!targets.length) return;

  function setActive(id) {
    items.forEach((a) => a.classList.toggle("bottom-nav__item--active", a.getAttribute("data-target") === id));
  }

  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
      if (visible && visible.target && visible.target.id) setActive(visible.target.id);
    },
    { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
  );

  targets.forEach((t) => obs.observe(t));

  const initial = targets[0]?.id;
  if (initial) setActive(initial);
})();

(function initQrModal() {
  const btn = document.getElementById("qrBtn");
  const modal = document.getElementById("qrModal");
  const closeBtn = document.getElementById("qrClose");
  const img = document.getElementById("qrImg");
  const linkEl = document.getElementById("qrLink");
  const copyBtn = document.getElementById("qrCopy");

  if (!btn || !modal || !img || !linkEl || !copyBtn) return;

  function open() {
    const url = window.location.href;
    const qrUrl =
      "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" + encodeURIComponent(url);

    img.src = qrUrl;
    linkEl.textContent = url;

    modal.classList.add("modal--open");
    modal.setAttribute("aria-hidden", "false");
  }

  function close() {
    modal.classList.remove("modal--open");
    modal.setAttribute("aria-hidden", "true");
  }

  btn.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);

  modal.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.getAttribute && t.getAttribute("data-close") === "true") close();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("modal--open")) close();
  });

  copyBtn.addEventListener("click", async () => {
    const ok = await copyText(window.location.href);
    if (ok) showToast(t("toast_link_copied"));
  });
})();

(function initAnchorHighlight() {
  function flashTarget() {
    const id = (window.location.hash || "").slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("_flash");
    window.setTimeout(() => el.classList.remove("_flash"), 700);
  }

  window.addEventListener("hashchange", flashTarget);
  flashTarget();
})();

(function initLanguageBars() {
  const items = document.querySelectorAll(".lang__item[data-level]");
  if (!items.length) return;

  items.forEach((item, i) => {
    const levelRaw = Number(item.getAttribute("data-level"));
    const level = Math.max(0, Math.min(100, Number.isFinite(levelRaw) ? levelRaw : 0));
    const fill = item.querySelector(".lang__fill");
    if (!fill) return;

    window.setTimeout(() => {
      fill.style.width = level + "%";
    }, 200 + i * 90);
  });
})();

(function initPhotoUpload() {
  const input = document.getElementById("photoInput");
  const btn = document.getElementById("photoBtn");
  const avatar = document.querySelector(".avatar");
  if (!input || !btn || !avatar) return;

  btn.addEventListener("click", () => input.click());

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;

    if (!file.type || !file.type.startsWith("image/")) {
      showToast(t("toast_choose_img"));
      return;
    }

    const url = URL.createObjectURL(file);

    const existingImg = avatar.querySelector("img.avatar__img");
    const existingSvg = avatar.querySelector("svg.avatar__svg");

    let img = existingImg;
    if (!img) {
      img = document.createElement("img");
      img.className = "avatar__img";
      img.alt = "Фото";
      avatar.appendChild(img);
    }

    img.src = url;
    if (existingSvg) existingSvg.style.display = "none";
    showToast(t("toast_photo"));
  });
})();

function getContactData() {
  const name = (document.querySelector(".hero__name")?.textContent || "").trim();
  const phone = document.querySelector('a.contact-link[href^="tel:"]')?.getAttribute("data-copy") || "";
  const email = document.querySelector('a.contact-link[href^="mailto:"]')?.getAttribute("data-copy") || "";
  return { name, phone, email };
}

function buildVCard({ name, phone, email }) {
  const safe = (s) => String(s || "").replace(/\n/g, " ").trim();
  const n = safe(name);
  const p = safe(phone);
  const e = safe(email);

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    n ? `FN:${n}` : "FN:Contact",
    p ? `TEL;TYPE=CELL:${p}` : "",
    e ? `EMAIL;TYPE=INTERNET:${e}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");
}

function downloadTextFile(filename, text, mime = "text/plain") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

(function initVCardAndShare() {
  const vcardBtn = document.getElementById("vcardBtn");
  const shareBtn = document.getElementById("shareBtn");

  if (vcardBtn) {
    vcardBtn.addEventListener("click", () => {
      const data = getContactData();
      const vcf = buildVCard(data);
      const base = (data.name || "contact").trim().replace(/[^a-z0-9\-_ ]/gi, "").replace(/\s+/g, "_");
      const filename = (base ? base : "contact") + ".vcf";
      downloadTextFile(filename, vcf, "text/vcard");
      showToast(t("toast_vcf"));
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const url = window.location.href;
      const title = document.title || "Resume";

      try {
        if (navigator.share) {
          await navigator.share({ title, url });
          return;
        }
      } catch {
        // ignore
      }

      const ok = await copyText(url);
      if (ok) showToast(t("toast_link_copied"));
    });
  }
})();
