// Modern Portfolio JavaScript with Enhanced Features

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
    initializeAll();
});

// Initialize All Features
function initializeAll() {
    initMobileMenu();
    initNavbarScroll();
    initActiveNavigation();
    initSmoothScrolling();
    initContactForm();
    initIntersectionObserver();
    initParallaxEffects();
    initSkillsAnimation();
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenu = $('#mobile-menu');
    const navMenu = $('#nav-menu');
    const navLinks = $$('.nav-link');

    if (!mobileMenu || !navMenu) return;

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || mobileMenu.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Enhanced Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = $('#navbar');
    if (!navbar) return;

    const handleScroll = throttle(() => {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '1px solid rgba(99, 102, 241, 0.2)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
            navbar.style.boxShadow = 'none';
        }
    }, 10);

    window.addEventListener('scroll', handleScroll);
}

// Active Navigation Link Highlighting
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

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Contact Form
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
        
        // Enhanced validation
        if (!validateForm(data)) return;
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Send email via mailto link
        const mailtoLink = `mailto:amalanpubh@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Hi Idhaya Amalan,\n\nName: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
        
        window.location.href = mailtoLink;
        
        // Reset form after a short delay
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Notification System
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    $$('.notification').forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-message">${message}</div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Enhanced styling
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
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(10px)'
    });
    
    const content = notification.querySelector('.notification-content');
    Object.assign(content.style, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem'
    });
    
    const closeBtn = notification.querySelector('.notification-close');
    Object.assign(closeBtn.style, {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '1.5rem',
        cursor: 'pointer',
        padding: '0',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'background 0.2s ease'
    });
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'none';
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove
    const autoRemove = setTimeout(() => removeNotification(notification), duration);
    
    // Manual close
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(450px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 400);
}

// Skills Animation
function initSkillsAnimation() {
    const skillItems = $$('.skill-item');
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
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => observer.observe(element));
}

// Parallax Effects
function initParallaxEffects() {
    const hero = $('.hero');
    if (!hero) return;

    const handleScroll = throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        if (scrolled < hero.offsetHeight) {
            const heroContent = hero.querySelector('.hero-container');
            if (heroContent) {
                heroContent.style.transform = `translateY(${rate}px)`;
            }
        }
    }, 16);

    window.addEventListener('scroll', handleScroll);
}

// Intersection Observer for General Animations
function initIntersectionObserver() {
    const elementsToAnimate = $$('.about-content, .contact-info, .contact-form, .section-title, .timeline-item, .education-card, .project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.filter = 'blur(0px)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elementsToAnimate.forEach(element => {
        // Check if element is already in the viewport on page load
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
            // Already visible — show immediately
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
            element.style.filter = 'blur(0px)';
        } else {
            // Below the fold — catchy blur + scale reveal on scroll
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px) scale(0.96)';
            element.style.filter = 'blur(4px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease';
            observer.observe(element);
        }
    });
}

// Page Load Performance
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Console Message
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

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
@keyframes slideInFromRight {
    0% {
        transform: translateX(100px);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fadeInUp {
    0% {
        transform: translateY(30px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

.fade-in-up {
    animation: fadeInUp 0.8s ease forwards;
}
`;

document.head.appendChild(style);