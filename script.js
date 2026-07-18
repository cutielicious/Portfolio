document.addEventListener('DOMContentLoaded', () => {
    /* 1. LIGHT & DARK MODE CONTROLLER */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeBtnText = document.getElementById('themeBtnText');
    const rootElement = document.documentElement;

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = rootElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        rootElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        if (themeBtnText) themeBtnText.innerHTML = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }

    /* 2. SMOOTH SCROLLING */
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navbarHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    /* 3. CUSTOM CURSOR CONTROLLER - Spring Physics */
    const cursorOuter = document.querySelector('.custom-cursor-outer');
    const cursorInner = document.querySelector('.custom-cursor-inner');

    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let innerX = 0, innerY = 0;
  
    if(cursorInner) { 
        cursorInner.style.left = innerX + 'px'; 
        cursorInner.style.top = innerY + 'px'; 
    }
    if(cursorOuter) { 
        cursorOuter.style.left = outerX + 'px'; 
        cursorOuter.style.top = outerY + 'px'; 
    }
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        // Inner Dot: Snappy
        innerX += (mouseX - innerX) * 0.3;
        innerY += (mouseY - innerY) * 0.3;
        
        // Outer Ring: Lazy/Floaty
        outerX += (mouseX - outerX) * 0.1;
        outerY += (mouseY - outerY) * 0.1;

        if (cursorInner) {
            cursorInner.style.left = `${innerX}px`;
            cursorInner.style.top = `${innerY}px`;
        }
        if (cursorOuter) {
            cursorOuter.style.left = `${outerX}px`;
            cursorOuter.style.top = `${outerY}px`;
        }

        requestAnimationFrame(animateCursor);
    };
    animateCursor();
});