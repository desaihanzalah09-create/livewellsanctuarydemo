const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = [...document.querySelectorAll(".site-nav a, .footer-links a, .quick-link-band a")];
const sectionLinks = [...document.querySelectorAll(".site-nav a")];
const sections = [...document.querySelectorAll(".section-page[id]")];
const progress = document.querySelector(".scroll-progress");
const contactForm = document.querySelector("[data-contact-form]");

const closeMenu = () => {
    document.body.classList.remove("menu-open");
    nav?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    const icon = menuToggle?.querySelector("i");
    icon?.classList.remove("fa-xmark");
    icon?.classList.add("fa-bars");
};

menuToggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", Boolean(isOpen));
    menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
    const icon = menuToggle.querySelector("i");
    icon?.classList.toggle("fa-bars", !isOpen);
    icon?.classList.toggle("fa-xmark", Boolean(isOpen));
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

const updateChrome = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    header?.classList.toggle("is-scrolled", scrollTop > 18);
    if (progress) progress.style.width = `${percent}%`;
};

const setActiveSection = () => {
    const current = sections.reduce((active, section) => {
        const top = section.getBoundingClientRect().top;
        return top <= 130 ? section.id : active;
    }, sections[0]?.id);

    sectionLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
    });
};

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll("[data-reveal]").forEach((element) => {
    revealObserver.observe(element);
});

window.addEventListener("scroll", () => {
    updateChrome();
    setActiveSection();
}, { passive: true });

window.addEventListener("resize", () => {
    if (window.innerWidth > 1080) closeMenu();
}, { passive: true });

contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const service = formData.get("service");
    const message = formData.get("message");
    const whatsappMessage = encodeURIComponent(
        `Counselling appointment request - ${service}\n\nName: ${name}\nEmail: ${email}\nService needed: ${service}\n\nMessage:\n${message}`
    );

    window.location.href = `https://wa.me/27792590006?text=${whatsappMessage}`;
});

updateChrome();
setActiveSection();
