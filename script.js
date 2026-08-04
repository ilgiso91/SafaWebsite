const projects = [
    {
        id: "safa",
        title: "Safa",
        tagline: "Prayer Times, Quran & Muslim Guide",
        description: "A calm, ad-free Islamic companion for accurate prayer times, missed prayer tracking, Quran reading, Qibla direction, dhikr, and AI-guided reflection.",
        image: "images/hero-home.webp",
        featured: true,
        features: ["Prayer Times", "Qada Tracking", "Qibla Compass", "Ad-free"],
        tech: ["Prayer", "Quran", "Qibla", "Daily Worship"],
        details: [
            "Accurate prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha.",
            "Resume Quran reading with saved progress in one tap.",
            "Ask Al Imam for thoughtful, guided Islamic prompts.",
            "Qibla, dhikr, and missed prayer tools in one calm home screen."
        ]
    },
    {
        id: "missed-prayers",
        title: "Missed Prayers",
        tagline: "Keep track of Qada",
        description: "Organize outstanding Qada prayers and follow your progress with clarity, day by day and prayer by prayer.",
        image: "images/missed-prayers.webp",
        featured: false,
        features: ["Qada Count", "Daily Marking", "Prayed/Missed/Exempt", "Outstanding by Prayer"],
        tech: ["Tracking", "Prayer"],
        details: [
            "See total outstanding Qada at a glance.",
            "Mark each daily prayer as prayed, missed, or exempt.",
            "Historical backlog combined with newly missed days.",
            "Outstanding count broken down by individual prayer."
        ]
    },
    {
        id: "prayer-guide",
        title: "Prayer Guide",
        tagline: "Master the art of prayer",
        description: "Follow visual, step-by-step guidance for every rak'ah, with posture detail and recitation for beginners and reminders alike.",
        image: "images/prayer-guide.webp",
        featured: false,
        features: ["Step-by-Step", "Visual Posture", "Recitation", "Beginner Friendly"],
        tech: ["Guide", "Reflection"],
        details: [
            "Clear visual steps for every rak'ah.",
            "Detailed posture guidance for hands, back, and head.",
            "Recitation text alongside each step.",
            "Swipe or use buttons to move step by step."
        ]
    },
    {
        id: "quran",
        title: "Quran",
        tagline: "Read, listen, reflect",
        description: "Experience the Quran with translations, verse-by-verse recitation, Mushaf pages, and a daily verse to reflect on.",
        image: "images/quran.webp",
        featured: false,
        features: ["Translations", "Recitations", "Daily Verse", "Khatm Plan"],
        tech: ["Reading", "Audio"],
        details: [
            "Switch between Mushaf pages and verse-by-verse reading.",
            "Listen to every ayah with adjustable speed and repeat.",
            "Set a Quran khatm date for an automatic daily juz plan.",
            "A new verse of the day, selected for reflection."
        ]
    },
    {
        id: "qibla",
        title: "Qibla",
        tagline: "Find the Qibla anywhere",
        description: "Live compass guidance helps you face the Qibla wherever you are, with a precise angle and current location.",
        image: "images/qibla.webp",
        featured: false,
        features: ["Live Compass", "Qibla Angle", "Location Aware", "Works Anywhere"],
        tech: ["Compass", "Location"],
        details: [
            "Live location-based Qibla direction.",
            "Precise Qibla angle for your current city.",
            "Clear alignment confirmation when facing Qibla.",
            "Simple, calm compass interface."
        ]
    },
    {
        id: "dhikr",
        title: "Dhikr",
        tagline: "Guided with purpose",
        description: "Stay focused with guided remembrance, tactile counting, and a curated morning adhkar routine with progress tracking.",
        image: "images/dhikr.webp",
        featured: false,
        features: ["Guided Remembrance", "Tactile Counter", "Morning Adhkar", "Progress Tracking"],
        tech: ["Dhikr", "Routine"],
        details: [
            "Arabic, transliteration, and translation views.",
            "Source-anchored dhikr with a tactile bead counter.",
            "Curated Morning Adhkar routine with a daily target.",
            "Track completed dhikr and resume where you left off."
        ]
    },
    {
        id: "ai-imam",
        title: "Ask Al Imam",
        tagline: "Ask, learn, find guidance",
        description: "Get thoughtful AI guidance for everyday Islamic questions, from beginner prayer basics to deeper understanding of Islam.",
        image: "images/ai-imam.webp",
        featured: false,
        features: ["AI Guidance", "Starter Questions", "Calm Space", "Everyday Islam"],
        tech: ["AI Guide", "Learning"],
        details: [
            "Ask questions in a calm, guided chat space.",
            "Starter questions for beginners to Islam and prayer.",
            "Thoughtful, respectful AI-guided answers.",
            "Designed to encourage further learning and reflection."
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
