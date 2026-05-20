// Custom cursor
const dot = document.getElementById("cursor-dot");
const ring = document.getElementById("cursor-ring");
let mouseX = 0,
  mouseY = 0,
  ringX = 0,
  ringY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + "px";
  dot.style.top = mouseY + "px";
});
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + "px";
  ring.style.top = ringY + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

document
  .querySelectorAll(
    "a, button, .skill-tag, .stat-card, .project-card, .cert-card, .exp-card, .form-input, .form-textarea",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      dot.style.width = "14px";
      dot.style.height = "14px";
      ring.style.width = "52px";
      ring.style.height = "52px";
    });
    el.addEventListener("mouseleave", () => {
      dot.style.width = "8px";
      dot.style.height = "8px";
      ring.style.width = "36px";
      ring.style.height = "36px";
    });
  });

// Typed text effect
const phrases = [
  "Software Developer & Machine Learning Enthusiast.",
  "Skilled in Python · Java · ML · Web Dev.",
  "MCA Graduate @ VIT Vellore.",
  "Turning data into solutions.",
];
let phraseIdx = 0,
  charIdx = 0,
  deleting = false;
const el = document.getElementById("typed-text");
function type() {
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    el.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(type, 1600);
      return;
    }
  } else {
    el.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 38 : 68);
}
type();

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(a.getAttribute("href"))
      ?.scrollIntoView({ behavior: "smooth" });
  });
});

const EMAILJS_PUBLIC_KEY = "n2xv-UxV_NIsX-Ss6";
const EMAILJS_SERVICE_ID = "service_he9wmv9";
const EMAILJS_TEMPLATE_ID = "template_830slp6";

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");
const msgSuccess = document.getElementById("form-success");
const msgError = document.getElementById("form-error");

function hideMessages() {
  msgSuccess.style.display = "none";
  msgError.style.display = "none";
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  hideMessages();

  // Disable button while sending
  submitBtn.disabled = true;
  btnText.textContent = "⏳ Sending…";

  const templateParams = {
    name: document.getElementById("cf-name").value.trim(),
    email: document.getElementById("cf-email").value.trim(),
    subject: document.getElementById("cf-subject").value.trim(),
    message: document.getElementById("cf-message").value.trim(),
  };

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      msgSuccess.className = "form-message success";
      contactForm.reset();
    })
    .catch(() => {
      msgError.className = "form-message error";
    })
    .finally(() => {
      submitBtn.disabled = false;
      btnText.textContent = "↗ Send Message";
      // Auto-hide message after 6s
      setTimeout(hideMessages, 6000);
    });
});
// ──────────────────────────────────────────────────────────────────────────
