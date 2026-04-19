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

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.body.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
      showToast(next === "dark" ? "Тёмная тема" : "Светлая тема");
    });
  }

  const printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
})();
