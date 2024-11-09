document.addEventListener('DOMContentLoaded', () => {
    // Initialize skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const level = bar.dataset.level;
        bar.style.setProperty('--level', `${level}%`);
    });

    // Add this to your existing script.js
    document.querySelectorAll('.edu-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.querySelector('.edu-glow').style.setProperty('--x', `${x}%`);
            card.querySelector('.edu-glow').style.setProperty('--y', `${y}%`);
        });
    });

    // Add menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    const body = document.body;

    // Toggle menu function
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        menuBackdrop.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Event listeners for menu
    menuToggle.addEventListener('click', toggleMenu);
    menuBackdrop.addEventListener('click', toggleMenu);

    // Close menu when clicking on menu links
    document.querySelectorAll('.menu-content a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Add scroll progress functionality
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.transform = `scaleX(${progress / 100})`;
    });

    // Add smooth scroll effect
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Add scroll-triggered animations
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            } else {
                entry.target.style.opacity = "0";
                entry.target.style.transform = "translateY(50px)";
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.transition = "all 1s cubic-bezier(0.4, 0, 0.2, 1)";
        section.style.opacity = "0";
        section.style.transform = "translateY(50px)";
        sectionObserver.observe(section);
    });
}); 