document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Modals
    const rulebtns = document.querySelectorAll('.btn-rulebook');
    const closeBtns = document.querySelectorAll('.close-btn');

    rulebtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).style.display = 'block';
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Custom Cursor logic
    const cursor = document.querySelector('.custom-cursor');
    const cursorOutline = document.querySelector('.custom-cursor-outline');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Background Parallax
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        const bg = document.querySelector('.bg-overlay');
        if (bg) {
            bg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        }
    });

    function animateCursor() {
        // Lerp for smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;

        const isHovering = document.body.classList.contains('cursor-hover');

        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            // Base transform for centering
            let transform = `translate(-50%, -50%)`;
            if (isHovering) {
                // Add jitter and scale if hovering
                const jitterX = (Math.random() - 0.5) * 5;
                const jitterY = (Math.random() - 0.5) * 5;
                transform += ` scale(1.5) translate(${jitterX}px, ${jitterY}px)`;
            }
            cursor.style.transform = transform;
        }

        if (cursorOutline) {
            const dx = cursorX - outlineX;
            const dy = cursorY - outlineY;
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            let transform = `translate(-50%, -50%) rotate(${angle + 90}deg)`;
            if (isHovering) {
                transform += ` scale(0.8)`;
            }
            cursorOutline.style.transform = transform;
        }

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Meteor Generation
    const meteorsContainer = document.querySelector('.meteors-container');
    function createMeteor() {
        if (!meteorsContainer) return;
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');

        // Random position and timing
        const startX = Math.random() * window.innerWidth + 200;
        const startY = Math.random() * window.innerHeight - 200;
        const delay = Math.random() * 5;
        const duration = 2 + Math.random() * 3;

        meteor.style.left = `${startX}px`;
        meteor.style.top = `${startY}px`;
        meteor.style.animationDelay = `${delay}s`;
        meteor.style.animationDuration = `${duration}s`;

        meteorsContainer.appendChild(meteor);

        // Remove after animation
        setTimeout(() => {
            meteor.remove();
        }, (delay + duration) * 1000);
    }

    // Spawn meteors periodically
    setInterval(createMeteor, 2000);
    for (let i = 0; i < 5; i++) createMeteor(); // Initial batch

    // Dust Generation
    const dustContainer = document.querySelector('.dust-container');
    function createDust() {
        if (!dustContainer) return;
        const dustCount = 80;
        for (let i = 0; i < dustCount; i++) {
            const dust = document.createElement('div');
            dust.classList.add('dust');

            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = 15 + Math.random() * 20;
            const size = 1 + Math.random() * 3;

            dust.style.left = `${startX}%`;
            dust.style.top = `${startY}%`;
            dust.style.width = `${size}px`;
            dust.style.height = `${size}px`;
            dust.style.animationDelay = `-${delay}s`;
            dust.style.animationDuration = `${duration}s`;

            dustContainer.appendChild(dust);
        }
    }
    createDust();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .event-card, .btn-rulebook');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Magnetic effect for buttons
    const magneticBtns = document.querySelectorAll('.btn, .btn-rulebook');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });

    // Scroll Animations (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });
});
