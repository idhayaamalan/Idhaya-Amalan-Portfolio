// ============================================
// Idhaya Amalan Portfolio - Enhanced JavaScript
// ============================================

// Configuration
const CONFIG = {
    typingSpeed: 100,
    erasingSpeed: 50,
    delayBetweenWords: 2000,
    roles: [
        "Sales Intern",
        "Cloud Solutions Specialist",
        "Technology Enthusiast",
        "AWS Practitioner"
    ]
};

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const throttle = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initializeAll();
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = $('#preloader');
    if (!preloader) return;

    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Reveal body
            document.body.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s ease';
            document.body.style.opacity = '1';
            document.body.style.transform = 'scale(1) translateY(0)';
            document.body.style.filter = 'blur(0px)';
            document.body.classList.add('loaded');
            // Start typing animation after reveal
            setTimeout(() => initTypingAnimation(), 800);
        }, 1500);
    });
}

// Initialize All Features
function initializeAll() {
    initCustomCursor();
    initMobileMenu();
    initNavbarScroll();
    initActiveNavigation();
    initSmoothScrolling();
    initContactForm();
    initIntersectionObserver();
    initParallaxEffects();
    initSkillsAnimation();
    initParticles();
    initDarkMode();
    initBackToTop();
    initCounterAnimation();
    initSkillProgress();
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const dot = $('#cursor-dot');
    const ring = $('#cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX - 4 + 'px';
        dot.style.top = mouseY - 4 + 'px';
    });

    // Smooth ring follow
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX - 18 + 'px';
        ring.style.top = ringY - 18 + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects on interactive elements
    const hoverElements = $$('a, button, .btn, .nav-link, .skill-item, .social-link');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('hover');
            dot.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            ring.classList.remove('hover');
            dot.style.transform = 'scale(1)';
        });
    });
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const typingEl = $('#typing-text');
    if (!typingEl) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = CONFIG.roles[roleIndex];

        if (isDeleting) {
            typingEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? CONFIG.erasingSpeed : CONFIG.typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = CONFIG.delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % CONFIG.roles.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// ===== PARTICLE BACKGROUND =====
function initParticles() {
    const canvas = $('#particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        const hero = canvas.parentElement;
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    function initParticleArray() {
        particles = [];
        const count = Math.min(80, Math.floor(canvas.width * canvas.height / 12000));
        for (let i = 0; i < count; i++) {
            particles.push(createParticle());
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[j].x - p.x;
                const dy = particles[j].y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        animationId = requestAnimationFrame(drawParticles);
    }

    resize();
    initParticleArray();
    drawParticles();

    window.addEventListener('resize', () => {
        resize();
        initParticleArray();
    });
}

// ===== DARK MODE =====
function initDarkMode() {
    const toggle = $('#dark-mode-toggle');
    if (!toggle) return;

    const icon = toggle.querySelector('i');
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');

        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const btn = $('#back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, 100));

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
    const counters = $$('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.dataset.target);
                const isDecimal = counter.dataset.decimal === 'true';
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = eased * target;

                    if (isDecimal) {
                        counter.textContent = current.toFixed(1);
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ===== SKILL PROGRESS BARS =====
function initSkillProgress() {
    const fills = $$('.skill-progress-fill');
    if (!fills.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-progress-fill');
                fills.forEach((fill, i) => {
                    setTimeout(() => {
                        fill.style.width = fill.dataset.width + '%';
                    }, i * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const section = $('#skill-progress');
    if (section) observer.observe(section);
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenu = $('#mobile-menu');
    const navMenu = $('#nav-menu');
    const navLinks = $$('.nav-link');

    if (!mobileMenu || !navMenu) return;

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || mobileMenu.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== NAVBAR SCROLL =====
function initNavbarScroll() {
    const navbar = $('#navbar');
    if (!navbar) return;

    const handleScroll = throttle(() => {
        const scrollY = window.scrollY;
        const isDark = document.body.classList.contains('dark-mode');

        if (scrollY > 50) {
            navbar.style.background = isDark ? 'rgba(15, 15, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '1px solid rgba(99, 102, 241, 0.2)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = isDark ? 'rgba(15, 15, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
            navbar.style.boxShadow = 'none';
        }
    }, 10);

    window.addEventListener('scroll', handleScroll);
}

// ===== ACTIVE NAV =====
function initActiveNavigation() {
    const sections = $$('section');
    const navLinks = $$('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const handleScroll = throttle(() => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }, 10);

    window.addEventListener('scroll', handleScroll);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        if (!validateForm(data)) return;

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        const mailtoLink = `mailto:amalanpubh@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Hi Idhaya Amalan,\n\nName: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
        window.location.href = mailtoLink;

        setTimeout(() => {
            showNotification('Opening your email client to send the message!', 'success');
            form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

function validateForm(data) {
    const errors = [];
    if (!data.name.trim()) errors.push('Name is required');
    if (!data.email.trim()) errors.push('Email is required');
    if (!isValidEmail(data.email)) errors.push('Please enter a valid email');
    if (!data.subject.trim()) errors.push('Subject is required');
    if (!data.message.trim()) errors.push('Message is required');

    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info', duration = 5000) {
    $$('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
    };

    notification.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;">
            <div>${message}</div>
            <button style="background:none;border:none;color:white;font-size:1.5rem;cursor:pointer;" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        maxWidth: '400px',
        padding: '1.5rem',
        borderRadius: '12px',
        background: colors[type] || colors.info,
        color: 'white',
        fontWeight: '500',
        fontSize: '0.95rem',
        zIndex: '10000',
        transform: 'translateX(450px)',
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
    });

    document.body.appendChild(notification);
    requestAnimationFrame(() => { notification.style.transform = 'translateX(0)'; });
    setTimeout(() => {
        notification.style.transform = 'translateX(450px)';
        setTimeout(() => notification.remove(), 400);
    }, duration);
}

// ===== SKILLS ANIMATION =====
function initSkillsAnimation() {
    const skillCards = $$('.skill-category');
    const timelineItems = $$('.timeline-item');
    const educationCards = $$('.education-card');
    const projectCards = $$('.project-card');

    const animateElements = [...skillCards, ...timelineItems, ...educationCards, ...projectCards];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(element => observer.observe(element));
}

// ===== PARALLAX =====
function initParallaxEffects() {
    const hero = $('.hero');
    if (!hero) return;

    const handleScroll = throttle(() => {
        const scrolled = window.pageYOffset;
        if (scrolled < hero.offsetHeight) {
            const heroContent = hero.querySelector('.hero-container');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * -0.2}px)`;
            }
        }
    }, 16);

    window.addEventListener('scroll', handleScroll);
}

// ===== INTERSECTION OBSERVER (Blur-to-Focus) =====
function initIntersectionObserver() {
    const elementsToAnimate = $$('.about-content, .contact-info, .contact-form, .section-title, .timeline-item, .education-card, .project-card, .stat-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.filter = 'blur(0px)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elementsToAnimate.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
            element.style.filter = 'blur(0px)';
        } else {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px) scale(0.96)';
            element.style.filter = 'blur(4px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease';
            observer.observe(element);
        }
    });
}

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInUp {
    0% { transform: translateY(30px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
}
.fade-in-up { animation: fadeInUp 0.8s ease forwards; }
`;
document.head.appendChild(style);

// ===== CONSOLE MESSAGE =====
console.log(`
%c🚀 Welcome to Idhaya Amalan's Portfolio!
%c
Interested in cloud solutions or collaboration? Let's connect!
LinkedIn: https://www.linkedin.com/in/idhaya-amalan-20809825b/
Email: amalanpubh@gmail.com

%cBuilt with modern web technologies and passion ❤️
`,
'color: #667eea; font-size: 16px; font-weight: bold;',
'color: #64748b; font-size: 14px;',
'color: #10b981; font-size: 12px; font-style: italic;'
);
