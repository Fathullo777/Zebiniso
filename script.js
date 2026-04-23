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
    age_suffix: "ЛЕТ",
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
    status_online: "В сети",
    location: "Ташкент, Узбекистан",

    role_operator: "Оператор",
    role_student: "Студент",
    role_creative: "Креатив",

    job_role_1: "Оператор",
    job_desc_1: "Wellness Group Company / Ташкент / 2025 - 2026",
    job_role_2: "Студент",
    job_desc_2: "Период обучения / 2013 - 2024",

    edu_school: "10-Мактаб",
    edu_years: "2013 - 2024",
    edu_desc: "Училась в University of Science and Technologies<br />Architecture",

    lang_uzbek: "Узбекский",
    lang_russian: "Русский",
    lang_english: "Английский",
    lang_level_native: "Родной",
    lang_level_c1: "C1",
    lang_level_intermediate: "Средний",

    skill_communication: "Коммуникация",
    skill_teamwork: "Командная работа",
    skill_problem: "Решение проблем",
    skill_time: "Тайм-менеджмент",
    skill_office: "MS Office",
    skill_data: "Ввод данных",
    skill_service: "Сервис",
    skill_adaptability: "Адаптивность",
    tip_theme: "Переключить тему",
    tip_lang: "Сменить язык",
    tip_color: "Сменить акцент",
    tip_qr: "Показать QR",
    tip_pdf: "Сохранить PDF",
    hotkeys_title: "Горячие клавиши",
    hk_theme: "Переключить тему",
    hk_pdf: "Сохранить PDF",
    hk_share: "Поделиться",
    hk_lang: "Сменить язык",
    hk_color: "Сменить акцент",
    hk_qr: "QR код",
    hk_help: "Эта панель",
    section_skills: "НАВЫКИ",
    section_highlights: "ДОСТИЖЕНИЯ",
    hl_all: "Все",
    hl_soft: "Софт",
    hl_hard: "Хард",
    hl_cert: "Сертификаты",
    hl_1: "Быстро обучаюсь",
    hl_2: "Стрессоустойчивая",
    hl_3: "Excel / Google Sheets",
    hl_4: "Поддержка клиентов",
    hl_5: "Английский: Intermediate",
    hl_6: "Навыки Office подтверждены",
    nav_skills: "Навыки",
    drop_photo: "Бросить фото",
    profile_complete: "Заполнено",
    tip_tts: "Озвучить",
    tip_music: "Фоновая музыка",
    tip_admin: "Админ панель",
    admin_title: "Админ панель",
    admin_password_label: "Введите пароль:",
    admin_login: "Войти",
    admin_wrong_pass: "Неверный пароль",
    admin_edit_info: "Нажмите на любой текст резюме, чтобы редактировать. Изменения сохраняются автоматически.",
    admin_change_photo: "Изменить фото",
    admin_toggle_edit: "Редактировать анкету",
    admin_save: "Сохранить всё",
    admin_logout: "Выйти",
    admin_saved: "Всё сохранено!",
    admin_mode_on: "Режим редактирования включён",
    admin_mode_off: "Режим редактирования выключен",
    admin_bar_text: "Редактирование",
    admin_bar_save: "Сохранить",
    admin_bar_exit: "Выйти",
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
    age_suffix: "YOSH",
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
    status_online: "Onlayn",
    location: "Toshkent, O'zbekiston",

    role_operator: "Operator",
    role_student: "Talaba",
    role_creative: "Ijodkor",

    job_role_1: "Operator",
    job_desc_1: "Wellness Group Company / Toshkent / 2025 - 2026",
    job_role_2: "Talaba",
    job_desc_2: "O'qish davri / 2013 - 2024",

    edu_school: "10-Maktab",
    edu_years: "2013 - 2024",
    edu_desc: "University of Science and Technologies\nArchitecture",

    lang_uzbek: "O'zbek",
    lang_russian: "Rus",
    lang_english: "Ingliz",
    lang_level_native: "Ona tili",
    lang_level_c1: "C1",
    lang_level_intermediate: "Intermediate",

    skill_communication: "Muloqot",
    skill_teamwork: "Jamoa",
    skill_problem: "Muammo yechish",
    skill_time: "Vaqt boshqarish",
    skill_office: "MS Office",
    skill_data: "Ma'lumot kiritish",
    skill_service: "Xizmat",
    skill_adaptability: "Moslashuvchan",
    tip_theme: "Temani o'zgartirish",
    tip_lang: "Tilni o'zgartirish",
    tip_color: "Rangni o'zgartirish",
    tip_qr: "QR kodni ko'rish",
    tip_pdf: "PDF saqlash",
    hotkeys_title: "Qisqacha tugmalar",
    hk_theme: "Temani o'zgartirish",
    hk_pdf: "PDF saqlash",
    hk_share: "Ulashish",
    hk_lang: "Tilni o'zgartirish",
    hk_color: "Rangni o'zgartirish",
    hk_qr: "QR kod",
    hk_help: "Bu panel",
    section_skills: "KO'NIKMALAR",
    section_highlights: "YUTUQLAR",
    hl_all: "Hammasi",
    hl_soft: "Soft",
    hl_hard: "Hard",
    hl_cert: "Sertifikat",
    hl_1: "Tez o'rganaman",
    hl_2: "Stressga chidamli",
    hl_3: "Excel / Google Sheets",
    hl_4: "Mijozlarga yordam",
    hl_5: "Ingliz tili: Intermediate",
    hl_6: "Office ko'nikmalari tasdiqlangan",
    nav_skills: "Ko'nikma",
    drop_photo: "Rasm tashlang",
    profile_complete: "To'ldirilgan",
    tip_tts: "O'qish",
    tip_music: "Musiqa",
    tip_admin: "Admin panel",
    admin_title: "Admin panel",
    admin_password_label: "Parolni kiriting:",
    admin_login: "Kirish",
    admin_wrong_pass: "Noto'g'ri parol",
    admin_edit_info: "Rezyumedagi istalgan matnni tahrirlash uchun bosing. O'zgarishlar avtomatik saqlanadi.",
    admin_change_photo: "Rasmni o'zgartirish",
    admin_toggle_edit: "Anketani tahrirlash",
    admin_save: "Hammasini saqlash",
    admin_logout: "Chiqish",
    admin_saved: "Hammasi saqlandi!",
    admin_mode_on: "Tahrirlash rejimi yoqildi",
    admin_mode_off: "Tahrirlash rejimi o'chirildi",
    admin_bar_text: "Tahrirlash",
    admin_bar_save: "Saqlash",
    admin_bar_exit: "Chiqish",
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
    age_suffix: "Y.O.",
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
    status_online: "Online",
    location: "Tashkent, Uzbekistan",
    role_operator: "Operator",
    role_student: "Student",
    role_creative: "Creative",
    job_role_1: "Operator",
    job_desc_1: "Wellness Group Company / Tashkent / 2025 - 2026",
    job_role_2: "Student",
    job_desc_2: "Education period / 2013 - 2024",
    edu_school: "School #10",
    edu_years: "2013 - 2024",
    edu_desc: "Studied at the University of Science and Technologies<br />Architecture",
    lang_uzbek: "Uzbek",
    lang_russian: "Russian",
    lang_english: "English",
    lang_level_native: "Native",
    lang_level_c1: "C1",
    lang_level_intermediate: "Intermediate",
    skill_communication: "Communication",
    skill_teamwork: "Teamwork",
    skill_problem: "Problem Solving",
    skill_time: "Time Management",
    skill_office: "MS Office",
    skill_data: "Data Entry",
    skill_service: "Customer Service",
    skill_adaptability: "Adaptability",
    tip_theme: "Toggle theme",
    tip_lang: "Switch language",
    tip_color: "Change accent",
    tip_qr: "Show QR code",
    tip_pdf: "Save as PDF",
    hotkeys_title: "Keyboard shortcuts",
    hk_theme: "Toggle theme",
    hk_pdf: "Save PDF",
    hk_share: "Share",
    hk_lang: "Switch language",
    hk_color: "Change accent",
    hk_qr: "QR code",
    hk_help: "This panel",
    section_skills: "SKILLS",
    section_highlights: "HIGHLIGHTS",
    hl_all: "All",
    hl_soft: "Soft",
    hl_hard: "Hard",
    hl_cert: "Cert",
    hl_1: "Fast learner",
    hl_2: "Stress resistant",
    hl_3: "Excel / Google Sheets",
    hl_4: "Customer support",
    hl_5: "English: Intermediate",
    hl_6: "Office skills certified",
    nav_skills: "Skills",
    drop_photo: "Drop photo",
    profile_complete: "Complete",
    tip_tts: "Read aloud",
    tip_music: "Background music",
    tip_admin: "Admin panel",
    admin_title: "Admin Panel",
    admin_password_label: "Enter password:",
    admin_login: "Login",
    admin_wrong_pass: "Wrong password",
    admin_edit_info: "Click any text on the resume to edit it. Changes are saved automatically.",
    admin_change_photo: "Change photo",
    admin_toggle_edit: "Edit profile",
    admin_save: "Save all",
    admin_logout: "Logout",
    admin_saved: "Everything saved!",
    admin_mode_on: "Edit mode enabled",
    admin_mode_off: "Edit mode disabled",
    admin_bar_text: "Editing",
    admin_bar_save: "Save",
    admin_bar_exit: "Exit",
  },
};

(function initHighlights() {
  const wrap = document.getElementById("highlights");
  if (!wrap) return;
  const filters = wrap.querySelectorAll(".hl-filter");
  const badges = wrap.querySelectorAll(".hl-badge");
  if (!filters.length || !badges.length) return;

  function applyFilter(value) {
    filters.forEach((b) => b.classList.toggle("hl-filter--active", b.dataset.filter === value));
    badges.forEach((badge) => {
      const cat = badge.dataset.cat;
      const show = value === "all" || cat === value;
      badge.classList.toggle("is-hidden", !show);
    });
  }

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyFilter(btn.dataset.filter || "all");
    });
  });

  applyFilter("all");
})();

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
    const value = t(k);
    if (typeof value === "string" && value.includes("<")) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const raw = el.getAttribute("data-i18n-attr") || "";
    raw.split(",").map((s) => s.trim()).filter(Boolean).forEach((pair) => {
      const parts = pair.split(":");
      if (parts.length !== 2) return;
      const attr = parts[0].trim();
      const key = parts[1].trim();
      if (!attr || !key) return;
      el.setAttribute(attr, t(key));
    });
  });

  const roleEl = document.getElementById("roleRotator");
  if (roleEl) {
    const keys = (roleEl.getAttribute("data-roles") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (keys.length) {
      roleEl.setAttribute("data-roles", keys.join(","));
      roleEl.dataset.rolesResolved = keys.map((k) => t(k)).join("||");
    }
  }

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
      document.body.style.transition = "background 400ms ease, color 400ms ease";
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
      fireConfetti();
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
  const palette = ["#2f7cff", "#9b5cff", "#22c55e", "#f97316", "#06b6d4", "#ef4444", "#ec4899"];

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

  let current = 0;
  const duration = 800;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    current = Math.round(eased * v);
    el.textContent = t("visits") + " " + current;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

(function initRoleRotator() {
  const el = document.getElementById("roleRotator");
  if (!el) return;
  function getRoles() {
    const resolved = (el.dataset.rolesResolved || "").split("||").map((s) => s.trim()).filter(Boolean);
    if (resolved.length) return resolved;
    return (el.getAttribute("data-roles") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((k) => t(k));
  }

  let roles = getRoles();
  if (!roles.length) return;

  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pause = 0;

  function type() {
    const nextRoles = getRoles();
    if (nextRoles.join("||") !== roles.join("||")) {
      roles = nextRoles;
      roleIdx = 0;
      charIdx = 0;
      deleting = false;
      pause = 0;
    }
    const role = roles[roleIdx];
    if (pause > 0) { pause--; requestAnimationFrame(type); return; }

    if (!deleting) {
      charIdx++;
      el.textContent = role.slice(0, charIdx);
      if (charIdx >= role.length) {
        deleting = true;
        pause = 50;
      }
    } else {
      charIdx--;
      el.textContent = role.slice(0, charIdx);
      if (charIdx <= 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        pause = 10;
      }
    }
    const speed = deleting ? 28 : 50;
    setTimeout(() => requestAnimationFrame(type), speed);
  }

  el.textContent = "";
  requestAnimationFrame(type);
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
  const modal = document.getElementById("hotkeysModal");
  const closeBtn = document.querySelector("[data-close-hotkeys]");

  function openHelp() {
    if (!modal) return;
    modal.classList.add("modal--open");
    modal.setAttribute("aria-hidden", "false");
  }
  function closeHelp() {
    if (!modal) return;
    modal.classList.remove("modal--open");
    modal.setAttribute("aria-hidden", "true");
  }

  if (closeBtn) closeBtn.addEventListener("click", closeHelp);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target && e.target.getAttribute && e.target.getAttribute("data-close") === "true") closeHelp();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const k = String(e.key || "").toLowerCase();
    if (k === "t") document.getElementById("themeToggle")?.click();
    if (k === "p") document.getElementById("printBtn")?.click();
    if (k === "s") document.getElementById("shareBtn")?.click();
    if (k === "l") document.getElementById("langBtn")?.click();
    if (k === "c") document.getElementById("accentBtn")?.click();
    if (k === "q") document.getElementById("qrBtn")?.click();
    if (k === "?" || (k === "/" && e.shiftKey)) {
      if (modal && modal.classList.contains("modal--open")) closeHelp();
      else openHelp();
    }
    if (e.key === "Escape") closeHelp();
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

(function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let w, h;
  const particles = [];
  const COUNT = 60;

  function resize() {
    const hero = canvas.parentElement;
    if (!hero) return;
    w = canvas.width = hero.offsetWidth;
    h = canvas.height = hero.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.2,
    };
  }

  function init() {
    resize();
    particles.length = 0;
    for (let i = 0; i < COUNT; i++) particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#2f7cff";
    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener("resize", resize);
})();

(function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow || isMobileLike()) return;

  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
})();

(function initScrollReveal() {
  const sections = document.querySelectorAll(".section");
  if (!sections.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section--visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((s, i) => {
    s.style.animationDelay = (i * 80) + "ms";
    obs.observe(s);
  });
})();

function fireConfetti() {
  const canvas = document.getElementById("confetti");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#2f7cff", "#9b5cff", "#22c55e", "#f97316", "#06b6d4", "#ef4444", "#ec4899", "#fbbf24"];
  const pieces = [];
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * -1 - 20,
      w: Math.random() * 8 + 4,
      h: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      dx: (Math.random() - 0.5) * 4,
      dy: Math.random() * 3 + 2,
      rot: Math.random() * 360,
      drot: (Math.random() - 0.5) * 10,
    });
  }

  let frame = 0;
  const maxFrames = 180;

  function draw() {
    if (frame >= maxFrames) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fade = 1 - frame / maxFrames;
    pieces.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.05;
      p.rot += p.drot;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = fade;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

(function initDragDropPhoto() {
  const dropZone = document.getElementById("avatarDrop");
  const input = document.getElementById("photoInput");
  if (!dropZone || !input) return;

  function handleFile(file) {
    if (!file || !file.type || !file.type.startsWith("image/")) {
      showToast(t("toast_choose_img"));
      return;
    }
    const url = URL.createObjectURL(file);
    const avatar = dropZone;
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
  }

  ["dragenter", "dragover"].forEach((ev) => {
    dropZone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropZone.classList.add("avatar--dragover");
    });
  });

  ["dragleave", "drop"].forEach((ev) => {
    dropZone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropZone.classList.remove("avatar--dragover");
    });
  });

  dropZone.addEventListener("drop", (e) => {
    const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleFile(file);
  });
})();

(function initProfileRing() {
  const fill = document.getElementById("profileRingFill");
  const text = document.getElementById("profileRingText");
  if (!fill || !text) return;

  const circumference = 2 * Math.PI * 20;
  const fields = [
    !!document.querySelector(".hero__name-text")?.textContent?.trim(),
    !!document.querySelector('a.contact-link[href^="tel:"]')?.textContent?.trim(),
    !!document.querySelector('a.contact-link[href^="mailto:"]')?.textContent?.trim(),
    !!document.querySelector(".left-value")?.textContent?.trim(),
    !!document.querySelector(".job__role")?.textContent?.trim(),
    !!document.querySelector(".edu__school")?.textContent?.trim(),
    !!document.querySelector(".lang__item"),
    !!document.querySelector(".skill-tag"),
    !!document.querySelector("img.avatar__img"),
  ];
  const filled = fields.filter(Boolean).length;
  const pct = Math.round((filled / fields.length) * 100);
  const offset = circumference - (pct / 100) * circumference;

  setTimeout(() => {
    fill.style.strokeDashoffset = String(offset);
  }, 300);
  text.textContent = pct + "%";
})();

(function initTiltEffect() {
  const card = document.querySelector(".card");
  if (!card || isMobileLike()) return;

  card.classList.add("card--tilt");

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -3;
    const rotateY = ((x - cx) / cx) * 3;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
})();

(function initKonamiCode() {
  const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let idx = 0;

  window.addEventListener("keydown", (e) => {
    if (e.key === code[idx]) {
      idx++;
      if (idx === code.length) {
        idx = 0;
        fireConfetti();
        document.body.style.animation = "rainbow 2s ease";
        setTimeout(() => { document.body.style.animation = ""; }, 2000);
        showToast("🎉 Konami Code!");
      }
    } else {
      idx = 0;
    }
  });
})();

(function initParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY < 600) {
      hero.style.backgroundPositionY = (scrollY * 0.3) + "px";
    }
  }, { passive: true });
})();

(function initTTS() {
  const btn = document.getElementById("ttsBtn");
  if (!btn || !window.speechSynthesis) {
    if (btn) btn.style.display = "none";
    return;
  }

  let speaking = false;
  btn.addEventListener("click", () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      speaking = false;
      btn.textContent = "🔊";
      return;
    }

    const name = document.querySelector(".hero__name-text")?.textContent || "";
    const role = document.getElementById("roleRotator")?.textContent || "";
    const phone = document.querySelector('a.contact-link[href^="tel:"]')?.textContent || "";
    const email = document.querySelector('a.contact-link[href^="mailto:"]')?.textContent || "";

    const text = [name, role, phone, email].filter(Boolean).join(". ");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLang() === "uz" ? "uz-UZ" : getLang() === "ru" ? "ru-RU" : "en-US";
    utterance.rate = 0.9;

    utterance.onend = () => {
      speaking = false;
      btn.textContent = "🔊";
    };

    window.speechSynthesis.speak(utterance);
    speaking = true;
    btn.textContent = "⏹";
  });
})();

(function initSystemDarkMode() {
  if (localStorage.getItem("theme")) return;

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  if (mq.matches) {
    applyTheme("dark");
  }

  mq.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
})();

(function initVisitsBadge() {
  const el = document.getElementById("visits");
  if (!el) return;
  const v = Number(el.dataset.count || "0");
  if (v > 1 && !el.querySelector(".hero__visits-badge")) {
    const badge = document.createElement("span");
    badge.className = "hero__visits-badge";
    badge.textContent = "new";
    el.appendChild(badge);
    setTimeout(() => badge.remove(), 4000);
  }
})();

(function initAdmin() {
  const ADMIN_PASS = "20022006";
  const STORAGE_KEY = "adminData_v2";
  const PHOTO_KEY = "adminPhoto_v2";
  
  const modal = document.getElementById("adminModal");
  const adminBtn = document.getElementById("adminBtn");
  const closeBtn = document.getElementById("adminClose");
  const loginDiv = document.getElementById("adminLogin");
  const panelDiv = document.getElementById("adminPanel");
  const passInput = document.getElementById("adminPass");
  const loginBtn = document.getElementById("adminLoginBtn");
  const errorDiv = document.getElementById("adminError");
  const photoBtn = document.getElementById("adminPhotoBtn");
  const photoInput = document.getElementById("adminPhotoInput");
  const saveBtn = document.getElementById("adminSaveBtn");
  const logoutBtn = document.getElementById("adminLogoutBtn");
  const toggleEditBtn = document.getElementById("adminToggleEditBtn");

  if (!modal || !adminBtn) return;

  let isAdmin = false; // logged in
  let isEditing = false; // contenteditable active
  let adminBar = null;

  const editableSelectors = ".hero__name-text, .hero__subtitle, .hero__meta, .left-value, .job__role, .job__desc, .edu__school, .edu__years, .edu__right, .lang__name, .lang__level, .skill-tag, .contact-link";

  function openModal() {
    modal.classList.add("modal--open");
    modal.setAttribute("aria-hidden", "false");
    if (!isAdmin) {
      if (passInput) passInput.value = "";
      setTimeout(() => passInput?.focus(), 100);
    }
  }

  function closeModal() {
    modal.classList.remove("modal--open");
    modal.setAttribute("aria-hidden", "true");
    if (errorDiv) errorDiv.textContent = "";
  }

  adminBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  
  modal.addEventListener("click", (e) => {
    if (e.target.dataset.close) closeModal();
  });

  function loginSuccess() {
    isAdmin = true;
    if (loginDiv) loginDiv.style.display = "none";
    if (panelDiv) panelDiv.style.display = "block";
    showToast(t("admin_mode_on"));
  }

  function toggleEditMode() {
    isEditing = !isEditing;
    if (isEditing) {
      document.body.classList.add("admin-mode");
      document.querySelectorAll(editableSelectors).forEach(el => {
        el.setAttribute("contenteditable", "true");
      });
      createAdminBar();
      if (toggleEditBtn) toggleEditBtn.textContent = t("admin_save");
      showToast(t("admin_mode_on"));
    } else {
      stopEditing();
    }
  }

  function stopEditing() {
    isEditing = false;
    document.body.classList.remove("admin-mode");
    document.querySelectorAll("[contenteditable]").forEach(el => {
      el.removeAttribute("contenteditable");
    });
    removeAdminBar();
    if (toggleEditBtn) toggleEditBtn.textContent = t("admin_toggle_edit");
    showToast(t("admin_mode_off"));
  }

  function logout() {
    isAdmin = false;
    stopEditing();
    if (loginDiv) loginDiv.style.display = "block";
    if (panelDiv) panelDiv.style.display = "none";
    closeModal();
  }

  function createAdminBar() {
    removeAdminBar();
    adminBar = document.createElement("div");
    adminBar.className = "admin-bar";
    adminBar.innerHTML = `
      <span>${t("admin_bar_text")}</span>
      <button id="barSave">${t("admin_bar_save")}</button>
      <button id="barExit">${t("admin_bar_exit")}</button>
    `;
    document.body.appendChild(adminBar);
    
    document.getElementById("barSave").addEventListener("click", () => {
      saveAll();
    });
    document.getElementById("barExit").addEventListener("click", () => {
      stopEditing();
    });
  }

  function removeAdminBar() {
    if (adminBar) {
      adminBar.remove();
      adminBar = null;
    }
  }

  loginBtn?.addEventListener("click", () => {
    if (passInput.value === ADMIN_PASS) {
      loginSuccess();
    } else {
      if (errorDiv) errorDiv.textContent = t("admin_wrong_pass");
      passInput.value = "";
      passInput.focus();
    }
  });

  passInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") loginBtn.click();
  });

  logoutBtn?.addEventListener("click", logout);
  toggleEditBtn?.addEventListener("click", () => {
    toggleEditMode();
    if (!isEditing) closeModal();
  });

  photoBtn?.addEventListener("click", () => photoInput.click());
  
  photoInput?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      localStorage.setItem(PHOTO_KEY, base64);
      updateAvatarDisplay(base64);
      showToast(t("toast_photo"));
    };
    reader.readAsDataURL(file);
  });

  function updateAvatarDisplay(src) {
    const avatar = document.querySelector(".avatar");
    if (!avatar) return;
    let img = avatar.querySelector("img.avatar__img");
    const svg = avatar.querySelector("svg.avatar__svg");
    
    if (!img) {
      img = document.createElement("img");
      img.className = "avatar__img";
      img.alt = "Avatar";
      avatar.appendChild(img);
    }
    img.src = src;
    if (svg) svg.style.display = "none";
  }

  function saveAll() {
    const data = {};
    document.querySelectorAll(editableSelectors).forEach((el, index) => {
      const key = `el_${index}`;
      data[key] = el.innerHTML;
      
      if (el.classList.contains("contact-link")) {
        data[`href_${index}`] = el.getAttribute("href");
        data[`copy_${index}`] = el.getAttribute("data-copy");
      }
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    showToast(t("admin_saved"));
  }

  function restoreAll() {
    const legacyRaw = localStorage.getItem("adminData");
    if (legacyRaw && !localStorage.getItem(STORAGE_KEY)) {
      localStorage.removeItem("adminData");
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        const nodes = document.querySelectorAll(editableSelectors);
        const savedCount = Object.keys(data).filter((k) => k.startsWith("el_"))
          .length;
        if (savedCount !== nodes.length) {
          return;
        }
        nodes.forEach((el, index) => {
          const key = `el_${index}`;
          if (data[key] !== undefined) el.innerHTML = data[key];
          
          if (el.classList.contains("contact-link")) {
            if (data[`href_${index}`]) el.setAttribute("href", data[`href_${index}`]);
            if (data[`copy_${index}`]) el.setAttribute("data-copy", data[`copy_${index}`]);
          }
        });
      } catch (e) {
        console.error("Failed to restore admin data", e);
      }
    }

    const legacyPhoto = localStorage.getItem("adminPhoto");
    if (legacyPhoto && !localStorage.getItem(PHOTO_KEY)) {
      localStorage.removeItem("adminPhoto");
    }

    const photo = localStorage.getItem(PHOTO_KEY);
    if (photo) updateAvatarDisplay(photo);
  }

  saveBtn?.addEventListener("click", () => {
    saveAll();
    closeModal();
  });

  restoreAll();
})();

(function initHeroTime() {
  const timeEl = document.getElementById("localTime");
  if (!timeEl) return;

  function update() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Tashkent"
    });
  }
  update();
  setInterval(update, 1000 * 60);
})();

(function initSpotlight() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
})();
