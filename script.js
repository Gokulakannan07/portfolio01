

const header =
    document.getElementById("header");

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

const navItems =
    document.querySelectorAll(".nav-link");

const scrollProgress =
    document.getElementById("scrollProgress");

const backToTop =
    document.getElementById("backToTop");

const typingText =
    document.getElementById("typingText");

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");

const currentYear =
    document.getElementById("currentYear");


/* =========================================
   MOBILE MENU
========================================= */

function closeMenu() {

    if (!navLinks || !menuBtn) {
        return;
    }

    navLinks.classList.remove("active");

    menuBtn.setAttribute(
        "aria-expanded",
        "false"
    );

    menuBtn.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    menuBtn.innerHTML =
        '<i class="fas fa-bars"></i>';
}


function toggleMenu() {

    if (!navLinks || !menuBtn) {
        return;
    }

    const isOpen =
        navLinks.classList.toggle("active");

    menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuBtn.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

    menuBtn.innerHTML = isOpen
        ? '<i class="fas fa-xmark"></i>'
        : '<i class="fas fa-bars"></i>';
}


if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        toggleMenu
    );

}


navItems.forEach((item) => {

    item.addEventListener(
        "click",
        closeMenu
    );

});


/* Close menu when clicking outside */

document.addEventListener(
    "click",
    (event) => {

        if (!navLinks || !menuBtn) {
            return;
        }

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedButton =
            menuBtn.contains(event.target);

        if (
            navLinks.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedButton
        ) {

            closeMenu();

        }

    }
);


/* Close menu with Escape */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    }
);


/* =========================================
   HEADER + SCROLL PROGRESS
========================================= */

function handleScroll() {

    const scrollTop =
        window.scrollY;

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
            `${Math.min(progress, 100)}%`;

    }


    /* Back To Top */

    if (backToTop) {

        backToTop.classList.toggle(
            "show",
            scrollTop > 500
        );

    }


    updateActiveNav();

}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);


/* =========================================
   ACTIVE NAVIGATION
========================================= */

function updateActiveNav() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    if (!sections.length) {
        return;
    }

    let currentSection =
        sections[0].id;

    const scrollPosition =
        window.scrollY + 200;


    sections.forEach((section) => {

        if (
            scrollPosition >=
            section.offsetTop
        ) {

            currentSection =
                section.id;

        }

    });


    /* Bottom of page */

    const atBottom =
        window.innerHeight +
        window.scrollY >=
        document.documentElement.scrollHeight - 20;


    if (atBottom) {

        currentSection =
            sections[sections.length - 1].id;

    }


    navItems.forEach((item) => {

        const target =
            item.getAttribute("href");

        item.classList.toggle(
            "active",
            target === `#${currentSection}`
        );

    });

}


/* =========================================
   BACK TO TOP
========================================= */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================
   TYPING EFFECT
========================================= */

if (typingText) {

    const roles = [
        "Web Developer",
        "Java Developer",
        "Full Stack Developer",
        "Frontend Developer"
    ];

    let roleIndex = 0;

    let characterIndex = 0;

    let isDeleting = false;


    function typeEffect() {

        const currentRole =
            roles[roleIndex];


        if (!isDeleting) {

            characterIndex++;

            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex ===
                currentRole.length
            ) {

                isDeleting = true;

                setTimeout(
                    typeEffect,
                    1400
                );

                return;
            }

        } else {

            characterIndex--;

            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex
                );


            if (characterIndex === 0) {

                isDeleting = false;

                roleIndex =
                    (roleIndex + 1) %
                    roles.length;

                setTimeout(
                    typeEffect,
                    300
                );

                return;
            }

        }


        const typingSpeed =
            isDeleting
                ? 45
                : 85;


        setTimeout(
            typeEffect,
            typingSpeed
        );

    }


    typeEffect();

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        [
            ".skill-card",
            ".project-card",
            ".certificate-card",
            ".about-content",
            ".about-image",
            ".contact-item",
            ".contact-form"
        ].join(", ")
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    entry.target.classList.add(
                        "visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add(
            "visible"
        );

    });

}


/* =========================================
   CONTACT FORM
========================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const nameInput =
                document.getElementById("name");

            const emailInput =
                document.getElementById("email");

            const messageInput =
                document.getElementById("message");


            const name =
                nameInput?.value.trim() || "";

            const email =
                emailInput?.value.trim() || "";

            const message =
                messageInput?.value.trim() || "";


            /* Empty fields */

            if (
                !name ||
                !email ||
                !message
            ) {

                showFormMessage(
                    "Please fill in all fields.",
                    "error"
                );

                return;
            }


            /* Email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                emailInput?.focus();

                return;
            }


            /* Message validation */

            if (message.length < 10) {

                showFormMessage(
                    "Please enter a message with at least 10 characters.",
                    "error"
                );

                messageInput?.focus();

                return;
            }


            /*
             * Opens the visitor's email application.
             */

            const receiver =
                "kannancse777@gmail.com";


            const subject =
                encodeURIComponent(
                    `Portfolio Contact from ${name}`
                );


            const body =
                encodeURIComponent(
                    `Name: ${name}\n\n` +
                    `Email: ${email}\n\n` +
                    `Message:\n${message}`
                );


            showFormMessage(
                "Opening your email application...",
                "success"
            );


            window.location.href =
                `mailto:${receiver}?subject=${subject}&body=${body}`;


            contactForm.reset();

        }
    );

}


/* =========================================
   FORM MESSAGE
========================================= */

function showFormMessage(
    message,
    type
) {

    if (!formMessage) {
        return;
    }


    formMessage.textContent =
        message;


    formMessage.className =
        `form-message ${type}`;


    clearTimeout(
        showFormMessage.timer
    );


    showFormMessage.timer =
        setTimeout(
            () => {

                formMessage.textContent =
                    "";

                formMessage.className =
                    "form-message";

            },
            5000
        );

}


/* =========================================
   CURRENT YEAR
========================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   SMOOTH ANCHOR LINKS
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({
                    top: Math.max(
                        targetPosition,
                        0
                    ),
                    behavior: "smooth"
                });


                closeMenu();

            }
        );

    });


/* =========================================
   RESIZE
========================================= */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 768) {
            closeMenu();
        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

handleScroll();