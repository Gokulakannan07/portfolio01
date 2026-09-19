const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const typingText = document.getElementById("typingText");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const currentYear = document.getElementById("currentYear");


/* =========================================
   MOBILE MENU
========================================= */

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuBtn.innerHTML = isOpen
            ? '<i class="fas fa-xmark"></i>'
            : '<i class="fas fa-bars"></i>';

    });


    navItems.forEach((item) => {

        item.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.innerHTML =
                '<i class="fas fa-bars"></i>';

        });

    });

}


/* =========================================
   HEADER + SCROLL PROGRESS
========================================= */

function handleScroll() {

    const scrollTop = window.scrollY;

    /* Header */

    if (header) {

        header.classList.toggle(
            "scrolled",
            scrollTop > 30
        );

    }


    /* Scroll Progress */

    if (scrollProgress) {

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        scrollProgress.style.width =
            `${progress}%`;

    }


    /* Back To Top */

    if (backToTop) {

        backToTop.classList.toggle(
            "show",
            scrollTop > 500
        );

    }


    /* Active Navigation */

    updateActiveNav();

}


window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);


/* =========================================
   ACTIVE NAVIGATION
========================================= */

function updateActiveNav() {

    const sections =
        document.querySelectorAll("main section[id]");

    let currentSection = "home";

    const scrollPosition =
        window.scrollY + 180;

    sections.forEach((section) => {

        const top = section.offsetTop;

        if (scrollPosition >= top) {
            currentSection = section.id;
        }

    });


    /* Bottom of page */

    if (
        window.innerHeight +
        window.scrollY >=
        document.documentElement.scrollHeight - 10
    ) {

        const lastSection =
            sections[sections.length - 1];

        if (lastSection) {
            currentSection = lastSection.id;
        }

    }


    navItems.forEach((item) => {

        item.classList.toggle(
            "active",
            item.getAttribute("href") ===
            `#${currentSection}`
        );

    });

}


/* =========================================
   BACK TO TOP
========================================= */

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   TYPING EFFECT
========================================= */

if (typingText) {

    const roles = [
        "Web Developer",
        "Java Developer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;


    function typeEffect() {

        const currentRole =
            roles[roleIndex];


        if (!deleting) {

            typingText.textContent =
                currentRole.substring(
                    0,
                    charIndex + 1
                );

            charIndex++;


            if (
                charIndex ===
                currentRole.length
            ) {

                deleting = true;

                setTimeout(
                    typeEffect,
                    1400
                );

                return;

            }

        } else {

            typingText.textContent =
                currentRole.substring(
                    0,
                    charIndex - 1
                );

            charIndex--;


            if (charIndex === 0) {

                deleting = false;

                roleIndex =
                    (roleIndex + 1) %
                    roles.length;

            }

        }


        setTimeout(
            typeEffect,
            deleting ? 45 : 80
        );

    }


    typeEffect();

}


/* =========================================
   REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(
        ".skill-card, .project-card, .certificate-card, .about-content, .about-image, .contact-item, .contact-form"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    revealObserver.observe(element);

});


/* =========================================
   CONTACT FORM
========================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document.getElementById("name")?.value.trim();

            const email =
                document.getElementById("email")?.value.trim();

            const message =
                document.getElementById("message")?.value.trim();


            if (!name || !email || !message) {

                showFormMessage(
                    "Please fill in all fields.",
                    "error"
                );

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            showFormMessage(
                "Thank you! Your message is ready to be sent.",
                "success"
            );


            contactForm.reset();

        }
    );

}


function showFormMessage(
    message,
    type
) {

    if (!formMessage) {
        return;
    }

    formMessage.textContent = message;

    formMessage.className =
        `form-message ${type}`;

}


/* =========================================
   CURRENT YEAR
========================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   INITIALIZE
========================================= */

handleScroll();