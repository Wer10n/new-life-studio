/* =========================================
   NEW LIFE STUDIO EGER
   SCRIPT.JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       LOADER
    ========================================= */

    const loader = document.getElementById("loader");

    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.classList.add("hide");

                setTimeout(() => {
                    loader.style.display = "none";
                }, 500);

            }, 500);
        });
    }


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navRight = document.querySelector(".nav-right");
    const navMenu = document.querySelector(".nav-links");

    if (menuToggle && navRight) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            navRight.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        });


        /* Close menu after clicking a link */

        if (navMenu) {

            const navItems = navMenu.querySelectorAll("a");

            navItems.forEach(link => {

                link.addEventListener("click", () => {

                    menuToggle.classList.remove("active");
                    navRight.classList.remove("active");
                    document.body.classList.remove("menu-open");

                });

            });

        }

    }


    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    const navbar = document.querySelector("nav");

    if (navbar) {

        const updateNavbar = () => {

            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        };

        window.addEventListener("scroll", updateNavbar);

        updateNavbar();

    }


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const scrollLinks =
        document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            e.preventDefault();

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                navbarHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       SCROLL REVEAL ANIMATION
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".hidden, .latest-card, .review, .faq-item, .about-wrapper, .contact-box, .service-card, .program-card, .gallery-item"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(element => {

            element.classList.add("hidden");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    /* =========================================
       BACK TO TOP BUTTON
    ========================================= */

    const topButton =
        document.getElementById("topButton");


    if (topButton) {

        const updateTopButton = () => {

            if (window.scrollY > 500) {

                topButton.classList.add(
                    "visible"
                );

            } else {

                topButton.classList.remove(
                    "visible"
                );

            }

        };


        window.addEventListener(
            "scroll",
            updateTopButton
        );

        updateTopButton();


        topButton.addEventListener(
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
       FAQ
    ========================================= */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector("h3");

        const answer =
            item.querySelector("p");


        if (!question || !answer) {
            return;
        }


        answer.style.maxHeight = "0";
        answer.style.overflow = "hidden";
        answer.style.opacity = "0";
        answer.style.marginTop = "0";

        answer.style.transition =
            "max-height .35s ease, opacity .35s ease, margin .35s ease";


        item.style.cursor = "pointer";


        question.addEventListener(
            "click",
            () => {

                const isOpen =
                    item.classList.contains("open");


                /* Close every other FAQ */

                faqItems.forEach(otherItem => {

                    if (otherItem !== item) {

                        otherItem.classList.remove(
                            "open"
                        );


                        const otherAnswer =
                            otherItem.querySelector("p");


                        if (otherAnswer) {

                            otherAnswer.style.maxHeight =
                                "0";

                            otherAnswer.style.opacity =
                                "0";

                            otherAnswer.style.marginTop =
                                "0";

                        }

                    }

                });


                /* Open selected FAQ */

                if (!isOpen) {

                    item.classList.add("open");


                    answer.style.maxHeight =
                        answer.scrollHeight + "px";


                    answer.style.opacity = "1";

                    answer.style.marginTop = "12px";

                } else {

                    item.classList.remove("open");

                    answer.style.maxHeight = "0";

                    answer.style.opacity = "0";

                    answer.style.marginTop = "0";

                }

            }
        );

    });


    /* =========================================
       ACTIVE NAV LINK
    ========================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-links a");


    if (sections.length && navLinks.length) {

        const updateActiveNav = () => {

            let currentSection = "";

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop -
                    (navbar
                        ? navbar.offsetHeight
                        : 0) -
                    100;


                const sectionHeight =
                    section.offsetHeight;


                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY <
                    sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            });


            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute("href");


                if (
                    href ===
                    `#${currentSection}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

        };


        window.addEventListener(
            "scroll",
            updateActiveNav
        );

        updateActiveNav();

    }


    /* =========================================
       BUTTON RIPPLE EFFECT
    ========================================= */

    const buttons =
        document.querySelectorAll(
            ".btn, .small-btn, .vinted-nav-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function (e) {

                const ripple =
                    document.createElement("span");


                const rect =
                    this.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                const x =
                    e.clientX -
                    rect.left -
                    size / 2;


                const y =
                    e.clientY -
                    rect.top -
                    size / 2;


                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;

                ripple.style.left =
                    `${x}px`;

                ripple.style.top =
                    `${y}px`;


                ripple.classList.add(
                    "ripple"
                );


                this.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });


    /* =========================================
       FEATURED CARD 3D EFFECT
    ========================================= */

    const featuredCards =
        document.querySelectorAll(
            ".featured-card"
        );


    featuredCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    e.clientX -
                    rect.left;


                const y =
                    e.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - 0.5) * 4;


                const rotateX =
                    ((y / rect.height) - 0.5) * -4;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-6px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =========================================
       IMAGE LAZY LOADING
    ========================================= */

    const images =
        document.querySelectorAll("img");


    images.forEach(img => {

        if (
            !img.hasAttribute("loading")
        ) {

            img.setAttribute(
                "loading",
                "lazy"
            );

        }

    });


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =========================================
       ESC KEY
       CLOSE MOBILE MENU
    ========================================= */

    document.addEventListener(
        "keydown",
        e => {

            if (
                e.key === "Escape" &&
                menuToggle &&
                navRight
            ) {

                menuToggle.classList.remove(
                    "active"
                );

                navRight.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =========================================
       CLOSE MOBILE MENU OUTSIDE
    ========================================= */

    document.addEventListener(
        "click",
        e => {

            if (
                !menuToggle ||
                !navRight
            ) {
                return;
            }


            const clickedInsideMenu =
                navRight.contains(e.target);


            const clickedToggle =
                menuToggle.contains(e.target);


            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navRight.classList.contains(
                    "active"
                )
            ) {

                menuToggle.classList.remove(
                    "active"
                );

                navRight.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =========================================
       PREVENT EMPTY LINKS
    ========================================= */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    emptyLinks.forEach(link => {

        link.addEventListener(
            "click",
            e => {

                e.preventDefault();

            }
        );

    });


    /* =========================================
       CONSOLE MESSAGE
    ========================================= */

    console.log(
        "%cNew Life Studio Eger",
        "font-size:20px;font-weight:bold;"
    );

    console.log(
        "Modern weboldal betöltve."
    );

});
