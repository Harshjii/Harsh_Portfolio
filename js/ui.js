/**
 * UI Manager for handling DOM manipulations, animations, and interactivity.
 */

/**
 * Initialize smooth scrolling for all navigation links.
 */
export function initSmoothScrolling() {
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            navLinks.forEach(item =>
                item.parentElement.classList.remove("active")
            );

            this.parentElement.classList.add("active");

            const href = this.getAttribute("href");
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
}

/**
 * Initialize scroll spy to highlight active link in navigation on scroll.
 */
export function initScrollSpy() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.parentElement.classList.remove("active");
            if (link.getAttribute("href") === "#" + currentSection) {
                link.parentElement.classList.add("active");
            }
        });
    });
}

/**
 * Initialize the typing subtitle effect on the Hero section.
 */
export function initTypingAnimation() {
    const text = [
        "Web Developer",
        "App Developer",
        "React Developer",
        "MEAN Stack Developer"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const subtitle = document.querySelector(".hero-subtitle");

    function type() {
        if (!subtitle) return;

        const currentText = text[textIndex];

        if (!isDeleting) {
            subtitle.textContent = currentText.substring(0, charIndex++);
            if (charIndex > currentText.length) {
                isDeleting = true;
                setTimeout(type, 1200);
                return;
            }
        } else {
            subtitle.textContent = currentText.substring(0, charIndex--);
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % text.length;
            }
        }

        setTimeout(type, isDeleting ? 50 : 100);
    }

    if (subtitle) {
        type();
    }
}

/**
 * Initialize the scroll reveal observer for container boxes.
 */
export function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    });

    document.querySelectorAll(".container-box").forEach(section => {
        observer.observe(section);
    });
}

/**
 * Initialize the click handler for the resume download button.
 */
export function initResumeDownload() {
    const downloadBtn = document.querySelector(".download-btn");
    if (downloadBtn) {
        downloadBtn.onclick = (e) => {
            e.preventDefault();
            window.open("resume.pdf");
        };
    }
}

/**
 * Initialize contact form submission handling.
 * Saves messages via the provided storageManager if applicable.
 * @param {Object} storageManager - The storage manager instance.
 */
export function initContactForm(storageManager) {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameEl = document.getElementById("name");
            const emailEl = document.getElementById("email");
            const messageEl = document.getElementById("message");

            const name = nameEl ? nameEl.value.trim() : "";
            const email = emailEl ? emailEl.value.trim() : "";
            const message = messageEl ? messageEl.value.trim() : "";

            if (name === "" || email === "" || message === "") {
                alert("Please fill all fields.");
                return;
            }

            if (storageManager) {
                storageManager.saveMessage({ name, email, message });
            }

            alert("Message Sent Successfully!");
            form.reset();
        });
    }
}

/**
 * Initialize dynamic animated statistics counters.
 */
export function initCounters() {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        const update = () => {
            const target = +counter.dataset.target;
            const count = +counter.innerText;
            const increment = target / 80;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(update, 20);
            } else {
                counter.innerText = target;
            }
        };
        update();
    });
}

/**
 * Track user clicks on projects and persist click event to localStorage.
 * @param {Object} storageManager - The storage manager instance.
 */
export function initProjectTracker(storageManager) {
    if (!storageManager) return;

    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card, index) => {
        const titleEl = card.querySelector(".project-title");
        const title = titleEl ? titleEl.textContent.trim() : `Project-${index + 1}`;

        // Track click when a link inside a project card is clicked
        const links = card.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                const count = storageManager.trackProjectClick(title);
                console.log(`[Metrics] "${title}" clicked. Total clicks registered: ${count}`);
            });
        });
    });
}
