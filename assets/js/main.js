/**
 * EncodedBytes Website JavaScript
 * Enhanced interactivity and user experience
 */

(function() {
    'use strict';

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // Smooth Scrolling for Navigation Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.nav-menu');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') &&
            !e.target.closest('.nav-menu') &&
            !e.target.closest('.mobile-menu-toggle')) {
            toggleMobileMenu();
        }
    });

    // ===================================
    // Intersection Observer for Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .stat-item, .expertise-category, .contact-item'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // Form Validation and Enhancement
    // ===================================
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all fields');
                return;
            }

            if (!isValidEmail(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return;
            }
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ===================================
    // Active Navigation Link Highlight
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ===================================
    // Tech Tags Animation on Hover
    // ===================================
    const techTags = document.querySelectorAll('.tech-tag');

    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===================================
    // Service Card Tilt Effect
    // ===================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // Lazy Loading for Images
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===================================
    // Performance: Debounce Function
    // ===================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===================================
    // Console Easter Egg
    // ===================================
    console.log('%c👋 Welcome to EncodedBytes!', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
    console.log('%cWe are hiring! Check out our GitHub: https://github.com/encodedbytes', 'font-size: 14px; color: #10b981;');

    // ===================================
    // Stats Counter Animation
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('+')) {
                        const target = parseInt(text.replace('+', ''));
                        animateValue(stat, 0, target, 2000, '+');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    if (document.querySelector('.about-stats')) {
        statsObserver.observe(document.querySelector('.about-stats'));
    }

    function animateValue(element, start, end, duration, suffix = '') {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * (end - start) + start);

            element.textContent = value + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ===================================
    // Mobile Menu Responsive Styles
    // ===================================
    const mediaQuery = window.matchMedia('(max-width: 968px)');

    function handleMobileMenu(e) {
        if (e.matches) {
            mobileMenu.style.cssText = `
                position: fixed;
                top: 60px;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 2rem;
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            `;

            const style = document.createElement('style');
            style.id = 'mobile-menu-styles';
            style.textContent = `
                .nav-menu.active {
                    transform: translateY(0) !important;
                    opacity: 1 !important;
                    display: flex !important;
                }
                body.menu-open {
                    overflow: hidden;
                }
                .mobile-menu-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                .mobile-menu-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                .mobile-menu-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            `;

            if (!document.getElementById('mobile-menu-styles')) {
                document.head.appendChild(style);
            }
        }
    }

    mediaQuery.addListener(handleMobileMenu);
    handleMobileMenu(mediaQuery);

    // ===================================
    // Initialization Complete
    // ===================================
    console.log('EncodedBytes website initialized successfully');

})();
