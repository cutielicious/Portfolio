const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 0. PRELOADER: cycles a few playful taglines, then reveals the page */
const taglines = [
    "brewing coffee ☕",
    "writing clean code",
    "chasing a stray semicolon",
    "styling pixels just right",
    "almost there..."
];
const preloaderEl = document.getElementById('preloader');
const taglineEl = document.getElementById('preloaderTagline');
let taglineIndex = 0;
let taglineTimer = null;

function finishPreload() {
    clearInterval(taglineTimer);
    if (preloaderEl) preloaderEl.classList.add('hide');
    document.body.classList.add('loaded');
}

if (reduceMotion) {
    finishPreload();
} else {
    taglineTimer = setInterval(() => {
        taglineIndex = (taglineIndex + 1) % taglines.length;
        if (taglineEl) taglineEl.textContent = taglines[taglineIndex];
    }, 380);
    window.addEventListener('load', () => {
        setTimeout(finishPreload, 1700);
    });
    // Safety net in case 'load' takes a while (slow images etc.)
    setTimeout(finishPreload, 3500);
}

document.addEventListener('DOMContentLoaded', () => {

    /* 1. LIGHT & DARK MODE CONTROLLER */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeBtnText = document.getElementById('themeBtnText');
    const rootElement = document.documentElement;

    function setTheme(theme) {
        rootElement.setAttribute('data-theme', theme);
        if (themeBtnText) themeBtnText.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = rootElement.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    /* 2. MOBILE / TABLET NAV TOGGLE */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* 3. SMOOTH SCROLLING */
    const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"], .hero-buttons a[href^="#"]');
    navAnchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                const navbarHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: reduceMotion ? 'auto' : 'smooth' });
            }
        });
    });

    /* 4. CUSTOM CURSOR CONTROLLER (mouse/trackpad only) */
    const cursorOuter = document.querySelector('.custom-cursor-outer');
    const cursorInner = document.querySelector('.custom-cursor-inner');
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (cursorOuter && cursorInner && hasFinePointer) {
        let mouseX = 0, mouseY = 0;
        let outerX = 0, outerY = 0;
        let innerX = 0, innerY = 0;

        cursorInner.style.left = innerX + 'px';
        cursorInner.style.top = innerY + 'px';
        cursorOuter.style.left = outerX + 'px';
        cursorOuter.style.top = outerY + 'px';

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            innerX += (mouseX - innerX) * 0.3;
            innerY += (mouseY - innerY) * 0.3;
            outerX += (mouseX - outerX) * 0.1;
            outerY += (mouseY - outerY) * 0.1;

            cursorInner.style.left = `${innerX}px`;
            cursorInner.style.top = `${innerY}px`;
            cursorOuter.style.left = `${outerX}px`;
            cursorOuter.style.top = `${outerY}px`;

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .theme-btn, .tech-pill, .contact-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOuter.classList.add('hovered');
                cursorInner.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursorOuter.classList.remove('hovered');
                cursorInner.classList.remove('hovered');
            });
        });
    }
});