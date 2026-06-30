const projects = [
    {
        id: "safa",
        title: "Safa",
        tagline: "Prayer Times, Quran & Muslim Guide",
        description: "A calm, ad-free Islamic companion for accurate prayer times, Quran reading, Qibla direction, dhikr, Ramadan tools, Jumuah preparation, Yasin Sharif, and guided reflection.",
        image: "images/home.png",
        featured: true,
        features: ["Prayer Times", "Quran Progress", "Qibla Compass", "Ad-free"],
        tech: ["SwiftUI", "Location", "Quran", "Daily Worship"],
        details: [
            "Accurate prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha.",
            "Continue Quran reading with saved progress.",
            "Find Qibla direction with clear angle guidance.",
            "Use dhikr, Ramadan, Jumuah, and prayer guide tools in one place."
        ]
    },
    {
        id: "prayer",
        title: "Prayer Times",
        tagline: "Daily schedule at a glance",
        description: "See the next prayer, daily timing cards, and location-aware calculation methods in a clean interface.",
        image: "images/home.png",
        featured: false,
        features: ["Fajr", "Dhuhr", "Asr", "Isha"],
        tech: ["Notifications", "Location"],
        details: [
            "Live next-prayer state.",
            "Simple daily prayer overview.",
            "Location-aware timing support.",
            "Designed for fast checking throughout the day."
        ]
    },
    {
        id: "quran",
        title: "Quran Reading",
        tagline: "Read and continue easily",
        description: "Return to your last read surah, ayah, and page with a focused Quran reading experience.",
        image: "images/quran.png",
        featured: false,
        features: ["Progress", "Surah", "Page", "Focus"],
        tech: ["Reading", "Bookmarks"],
        details: [
            "Saved reading progress.",
            "Clean Quran reading flow.",
            "Quick resume from the home screen.",
            "Built for calm, focused use."
        ]
    },
    {
        id: "jumuah",
        title: "Jumuah Prep",
        tagline: "Friday preparation flow",
        description: "Follow weekly Friday timing, preparation reminders, and nearby mosque context in one guided view.",
        image: "images/jumuah.png",
        featured: false,
        features: ["Friday", "Mosques", "Timeline", "Prep"],
        tech: ["Maps", "Location"],
        details: [
            "Jumuah preparation timing.",
            "Nearby mosque discovery.",
            "Selected mosque state.",
            "Weekly flow for Friday worship."
        ]
    },
    {
        id: "tools",
        title: "Muslim Tools",
        tagline: "Qibla, Ramadan, dhikr and more",
        description: "A full toolkit including Qibla compass, Ramadan guide, prayer guide, Yasin Sharif, Asma ul Husna, and halal meal ideas.",
        image: "images/more.png",
        featured: false,
        features: ["Qibla", "Dhikr", "Ramadan", "Yasin"],
        tech: ["Guide", "Reflection"],
        details: [
            "Qibla compass with direction and angle.",
            "Ramadan guide for suhoor and iftar rhythm.",
            "Prayer guide from wudu to salam.",
            "Yasin Sharif and Asma ul Husna sections."
        ]
    }
];

const projectsData = Object.fromEntries(projects.map((project) => [project.id, project]));
const grid = document.getElementById("projectsGrid");
const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".modal-close");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

function createProjectCard(project) {
    const card = document.createElement("article");
    card.className = `project-card${project.featured ? " featured" : ""}`;
    card.dataset.project = project.id;
    card.tabIndex = 0;

    const featureItems = project.features
        .map((feature) => `<div class="feature"><span class="feature-mark"></span><span>${feature}</span></div>`)
        .join("");

    const techItems = project.tech
        .map((tech) => `<span class="tech-tag">${tech}</span>`)
        .join("");

    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title} screenshot">
            ${project.featured ? '<span class="project-badge">Featured</span>' : ""}
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-tagline">${project.tagline}</p>
            <p class="project-description">${project.description}</p>
            <div class="project-features">${featureItems}</div>
            <div class="project-tech">${techItems}</div>
            <button class="btn btn-project" type="button">${project.featured ? "Learn More" : "View Details"}</button>
        </div>
    `;

    card.addEventListener("click", () => openProjectModal(project.id));
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProjectModal(project.id);
        }
    });

    return card;
}

function renderProjects() {
    const featuredProjects = projects.filter((project) => project.featured);
    const otherProjects = projects.filter((project) => !project.featured);

    const featuredSection = document.createElement("div");
    featuredSection.className = "featured-project";
    featuredProjects.forEach((project) => featuredSection.appendChild(createProjectCard(project)));

    const otherSection = document.createElement("div");
    otherSection.className = "other-projects";
    otherSection.innerHTML = "<h3>Main Features</h3>";

    const scroller = document.createElement("div");
    scroller.className = "projects-scroll";
    otherProjects.forEach((project) => scroller.appendChild(createProjectCard(project)));
    otherSection.appendChild(scroller);

    grid.appendChild(featuredSection);
    grid.appendChild(otherSection);
    initAutoScroll(scroller);
}

function initAutoScroll(scroller) {
    let paused = false;
    let resumeTimer;

    function tick() {
        if (!paused && scroller.scrollWidth > scroller.clientWidth) {
            scroller.scrollLeft += 0.45;
            if (scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth - 1) {
                scroller.scrollLeft = 0;
            }
        }
        requestAnimationFrame(tick);
    }

    scroller.addEventListener("pointerenter", () => {
        paused = true;
    });

    scroller.addEventListener("pointerleave", () => {
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => {
            paused = false;
        }, 800);
    });

    scroller.addEventListener("scroll", () => {
        paused = true;
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => {
            paused = false;
        }, 1800);
    });

    tick();
}

function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    const details = project.details.map((item) => `<li>${item}</li>`).join("");
    const tags = project.tech.map((tech) => `<span class="tech-tag">${tech}</span>`).join("");

    modalBody.innerHTML = `
        <div class="modal-body">
            <img class="modal-image" src="${project.image}" alt="${project.title} detail screenshot">
            <h2 id="modalTitle">${project.title}</h2>
            <p class="project-tagline">${project.tagline}</p>
            <p>${project.description}</p>
            <div class="project-tech">${tags}</div>
            <ul class="modal-list">${details}</ul>
        </div>
    `;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
}

function closeProjectModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

closeBtn.addEventListener("click", closeProjectModal);

modal.addEventListener("click", (event) => {
    if (event.target === modal) closeProjectModal();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
        closeProjectModal();
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
        }
    });
}, { threshold: 0.12 });

function setupReveal() {
    document.querySelectorAll(".project-card, .achievement-card, .story-card, .contact-card").forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(18px)";
        element.style.transition = "opacity 0.55s ease, transform 0.55s ease";
        observer.observe(element);
    });
}

const style = document.createElement("style");
style.textContent = `
    .is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

renderProjects();
setupReveal();
