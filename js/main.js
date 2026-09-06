const header = document.getElementById("header");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id], footer[id]");

function updateNavigation() {
  header.classList.toggle("scrolled", window.scrollY > 20);

  let currentId = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - window.innerHeight / 3) {
      currentId = section.id;
    }
  });

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    currentId = "footer";
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", updateNavigation, { passive: true });
updateNavigation();

const marqueeTrack = document.querySelector(".hero-marquee-track");

if (marqueeTrack) {
  const marqueeItems = Array.from(marqueeTrack.children);

  while (marqueeTrack.scrollWidth < window.innerWidth * 2) {
    marqueeItems.forEach((item) => {
      marqueeTrack.appendChild(item.cloneNode(true));
    });
  }
}

const terminal = document.querySelector(".hero-terminal");

if (terminal) {
  terminal.classList.add("booting");
  requestAnimationFrame(() => terminal.classList.add("booted"));
}

const revealItems = document.querySelectorAll(
  ".section-heading, .about-content, .projects-heading, .project-card, .footer > .container",
);

revealItems.forEach((item) => item.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14 },
);

revealItems.forEach((item) => revealObserver.observe(item));
