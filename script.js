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

    // Project popup functionality
    const projectsGrid = document.querySelector('.projects-grid');
    const projectCards = document.querySelectorAll('.project-card');
    const projectPopup = document.querySelector('.project-popup');
    let isDragging = false;
    let startX;
    let scrollLeft;

    // Project data with links
    const projectData = {
        patchmyroad: {
            title: 'PatchMyRoad',
            subtitle: 'A User-Driven Road Maintenance Platform',
            description: 'PatchMyRoad empowers citizens to enhance road infrastructure by reporting issues such as potholes and damages through a user-friendly app. I designed the intuitive UI/UX, ensuring seamless navigation and effective communication for users to geotag and submit detailed reports. The platform bridges the gap between citizens and authorities, enabling faster maintenance and safer roads for all. This project showcases expertise in user-centered design and problem-solving for impactful civic solutions.',
            techStack: ['User Experience (UX)', 'User Experience Design (UED)', 'Figma (Software)', 'User Interface Design', 'Mockups', 'Wireframing'],
            duration: 'Aug 2024 - Nov 2024',
            link: 'https://www.figma.com/file/patchmyroad'
        },
        straylink: {
            title: 'UI/UX Design of StrayLink',
            subtitle: 'Mobile App for Stray Animal Reporting',
            description: 'STRAYLINK is a mobile application designed to report stray animals to the nearest NGOs, Bluecross, or government veterinary hospitals, aiming to address issues caused by infections, accidents, or neglect. This initiative seeks to manage the problem of stray cattle in Goa by fostering collaboration among municipalities, panchayats, animal husbandry departments, NGOs, and civic forums. The app aims to bridge the communication gap between civil agencies, the public, and elected representatives by providing a dynamic reporting system that enhances information flow and public involvement, ultimately leading to better governance and effective management of stray animal issues.',
            techStack: ['User Experience (UX)', 'User Experience Design (UED)', 'Figma (Software)', 'User Interface Design', 'Mockups', 'Mobile Application Design', 'Wireframing'],
            duration: 'Aug 2024',
            link: 'https://www.figma.com/file/straylink'
        },
        ikshana: {
            title: 'Frontend UI/UX Design for Website',
            subtitle: 'CVR IKSHANA Website',
            description: 'Designed and developed the frontend UI/UX for a website, focusing on creating an intuitive and visually appealing user experience. Utilized modern design principles and tools to craft responsive, user-friendly interfaces.',
            techStack: ['Prototyping', 'User Experience Design (UED)', 'Figma (Software)', 'User Interface Design', 'Mockups', 'Wireframing'],
            duration: 'Jun 2024 - Jul 2024',
            association: 'Associated with CVR IKSHANA',
            link: 'https://www.figma.com/file/ikshana'
        },
        digiboxx: {
            title: 'UI/UX Design of DigiBoxx',
            subtitle: 'File Management System UI/UX',
            description: 'DIGIBOXX features a sleek, intuitive user interface designed for effortless file management. The app\'s clean and modern design ensures easy navigation and a seamless user experience, with straightforward options for uploading, organizing, and accessing files. Its responsive layout adapts smoothly across devices, providing a consistent and user-friendly experience whether on a desktop, tablet, or smartphone.',
            techStack: ['User Experience (UX)', 'User Experience Design (UED)', 'Figma (Software)', 'User Interface Design', 'Mockups', 'Mobile Application Design', 'Wireframing'],
            duration: 'Jul 2024',
            link: 'https://www.figma.com/file/digiboxx'
        },
        careerclimb: {
            title: 'Logo Design For CareerClimb Consulting',
            subtitle: 'Logo Design Project',
            description: 'For this project, the logo needed to meet several key requirements: people depicted in formal attire to represent professionalism, a clock element to symbolize time and punctuality, the inclusion of the letter \'C\' for CAREERCLIMB CONSULTING, and a design that signifies growth and upward movement. Most importantly, the logo had to convey a sense of helping others climb their career ladders, emphasizing support and mentorship.',
            techStack: ['Graphic Design', 'Logo Design', 'Mockups'],
            duration: 'Jul 2024',
            association: 'Associated with CareerClimb Consulting',
            link: 'https://www.figma.com/file/careerclimb'
        },
        network: {
            title: 'Network Performance Evaluation',
            subtitle: 'Using Packet Tracer Simulation',
            description: 'Led a project focused on the performance evaluation of network infrastructure using PacketTracer simulation tools. Conducted detailed simulations to identify network bottlenecks, analyze data traffic, and optimize configurations. Successfully enhanced overall network efficiency and reliability by implementing strategic improvements based on simulation results.',
            techStack: ['Engineering', 'Packet Tracer'],
            duration: 'Mar 2024 - May 2024',
            association: 'Associated with CVR College of Engineering, Hyderabad',
            link: 'https://www.figma.com/file/network'
        },
        rhs: {
            title: 'UI & UX Design of R.H.S',
            subtitle: 'Hospital Billing Oversight System',
            description: 'R.H.S. is a transformative project aimed at enhancing government oversight of hospital billing practices. This system is designed to ensure transparency and prevent unnecessary or illegal charges during critical times. In this project, I was responsible for designing the User Interface (UI) and User Experience (UX). My approach focused on creating an intuitive and user-friendly design that allows users to easily navigate the system with minimal effort. The goal was to provide clear, accessible information and streamline the process for users to manage and understand hospital fees and billing. By prioritizing simplicity and clarity in the design, I aimed to empower users to make informed decisions and avoid unexpected charges, contributing to a fairer and more regulated healthcare billing environment.',
            techStack: ['User Experience Design (UED)', 'Graphic Design', 'Figma (Software)', 'User Interface Design', 'Mockups', 'Wireframing'],
            duration: 'Jun 2024',
            link: 'https://www.figma.com/file/rhs'
        }
    };

    // 3D scroll effect
    function update3DEffect() {
        projectCards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const distanceFromCenter = (centerX - (window.innerWidth / 2)) / (window.innerWidth / 2);
            
            const rotateY = distanceFromCenter * 30;
            const translateZ = Math.abs(distanceFromCenter) * -200;
            const scale = 1 - Math.abs(distanceFromCenter) * 0.2;
            const opacity = 1 - Math.abs(distanceFromCenter) * 0.5;
            
            card.style.transform = `
                perspective(1000px)
                rotateY(${rotateY}deg)
                translateZ(${translateZ}px)
                scale(${scale})
            `;
            card.style.opacity = opacity;
        });
    }

    // Card click handler
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            const project = projectData[projectId];
            
            if (project) {
                document.querySelector('.popup-title').textContent = project.title;
                document.querySelector('.popup-subtitle').textContent = project.subtitle;
                document.querySelector('.project-description').textContent = project.description;
                
                const techTags = document.querySelector('.tech-tags');
                techTags.innerHTML = project.techStack
                    .map(tech => `<span>${tech}</span>`)
                    .join('');
                
                // Always show external link button with the project link
                const externalLinkButton = document.querySelector('.external-link-button');
                externalLinkButton.href = project.link;
                externalLinkButton.style.display = 'flex';
                
                projectPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close popup handlers
    const closePopup = () => {
        const projectPopup = document.querySelector('.project-popup');
        projectPopup.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Add event listeners for closing popup
    document.querySelector('.close-button').addEventListener('click', closePopup);
    document.querySelector('.popup-overlay').addEventListener('click', closePopup);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    });

    // Horizontal scroll functionality
    projectsGrid.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        // For trackpad horizontal scrolling, use deltaX
        // For vertical scrolling (mouse wheel or trackpad vertical), use deltaY
        const delta = Math.abs(e.deltaX) > 0 ? e.deltaX : e.deltaY;
        
        projectsGrid.scrollLeft += delta;
    }, { passive: false });

    // Initial update
    update3DEffect();

    // Update on scroll
    projectsGrid.addEventListener('scroll', () => {
        requestAnimationFrame(update3DEffect);
    });

    // Update on resize
    window.addEventListener('resize', update3DEffect);

    // Add resize observer for dynamic updates
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            // Update 3D effect for projects
            if (entry.target.classList.contains('projects-grid')) {
                requestAnimationFrame(update3DEffect);
            }
        }
    });

    // Observe elements that need resize handling
    document.querySelectorAll('.projects-grid').forEach(grid => {
        resizeObserver.observe(grid);
    });

    // Add touch handling for projects grid
    let touchStartX;
    let touchEndX;

    projectsGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    projectsGrid.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        
        e.preventDefault();
        const touchX = e.touches[0].clientX;
        const diffX = touchStartX - touchX;
        projectsGrid.scrollLeft += diffX;
        touchStartX = touchX;
    }, { passive: false });

    projectsGrid.addEventListener('touchend', () => {
        touchStartX = null;
    });

    // Update scroll animation based on device capabilities
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable smooth scrolling for users who prefer reduced motion
        lenis.destroy();
    }

    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        // Update layout after orientation change
        setTimeout(() => {
            update3DEffect();
            // Force layout recalculation
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });
}); 