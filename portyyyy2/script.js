/* ==========================================================================
   1. LIGHT & DARK MODE CONTROLLER (With Local Storage Memory)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeBtnText = document.getElementById('themeBtnText');
    const rootElement = document.documentElement;

    // Check if the user has a saved preference, otherwise default to dark mode
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
        
        // Update the button icon and text smoothly
        if (theme === 'dark') {
            themeBtnText.innerHTML = '☀️ Light';
        } else {
            themeBtnText.innerHTML = '🌙 Dark';
        }
    }

    /* ==========================================================================
       2. SMOOTH SCROLLING FOR NAVIGATION LINKS
       ========================================================================== */
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Offset calculation to account for the sticky navbar height
                const navbarHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    /* ==========================================================================
       3. INTERACTIVE SCROLL ANIMATION (Reveal Cards on Scroll)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.project-card, .skills-category, .education-card');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial layout states for scroll reveal animation
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load in case elements are already visible
});
/* ==========================================================================
   CUSTOM CURSOR CONTROLLER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const cursorOuter = document.querySelector('.custom-cursor-outer');
    const cursorInner = document.querySelector('.custom-cursor-inner');

    let mouseX = 0, mouseY = 0; // Actual mouse coordinates
    let outerX = 0, outerY = 0; // Delayed outer circle coordinates

    // 1. Move cursor elements with the mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // The inner pink dot sticks strictly to the mouse position
        cursorInner.style.left = `${mouseX}px`;
        cursorInner.style.top = `${mouseY}px`;
    });

    // 2. Create smooth "lag" animation for the outer black ring
    const animateCursor = () => {
        // Linear interpolation (0.15 controls the smoothness/speed of the lag)
        outerX += (mouseX - outerX) * 0.15;
        outerY += (mouseY - outerY) * 0.15;

        cursorOuter.style.left = `${outerX}px`;
        cursorOuter.style.top = `${outerY}px`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // 3. Hover Effects (Scale and color morphing)
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card');

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
});