/* ═══════════════════════════════════════════
   MAIN JAVASCRIPT — Portfolio
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    // Install GA debug loggers (intercept dataLayer pushes and GA network calls)
    installGADebuggers();

    // ── Visitor Counter & Analytics ─────────
    // Wait for Google Analytics to load before tracking
    if (document.readyState === 'loading') {
        document.addEventListener('readystatechange', () => {
            if (document.readyState === 'interactive') {
                setTimeout(() => {
                    initializeVisitorCounter();
                    trackPageView();
                    waitForGtagAndSendConfirm();
                }, 100);
            }
        });
    } else {
        setTimeout(() => {
            initializeVisitorCounter();
            trackPageView();
            waitForGtagAndSendConfirm();
        }, 100);
    }

    // ── Preloader ───────────────────────────
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 800);
    });

    // Fallback: hide preloader after 3s
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 3000);

    // ── Custom Cursor ───────────────────────
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    let cursorX = 0, cursorY = 0;
    let outlineX = 0, outlineY = 0;

    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
        });

        function animateCursor() {
            outlineX += (cursorX - outlineX) * 0.15;
            outlineY += (cursorY - outlineY) * 0.15;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .project-card, .service-card, .skill-card');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });
    }

    // ── Navbar ───────────────────────────────
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    function updateActiveLink() {
        const scrollY = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[data-section="${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink);

    // ── Theme Toggle ────────────────────────
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // ── Typewriter Effect ───────────────────
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        'Full-Stack Developer',
        'UI/UX Enthusiast',
        'Problem Solver',
        'Open Source Contributor',
        'Software Engineer',
        'Creative Thinker'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeWriter() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(typeWriter, typeSpeed);
    }
    typeWriter();

    // ── Scroll Reveal (Intersection Observer) ──
    const fadeElements = document.querySelectorAll('.fade-up');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ── Skill Fill Bars ─────────────────────
    const skillCards = document.querySelectorAll('.skill-card');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillCards.forEach(card => skillObserver.observe(card));

    // ── Skills Tabs ─────────────────────────
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillPanels = document.querySelectorAll('.skill-panel');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            skillPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `panel-${target}`) {
                    panel.classList.add('active');
                    // Re-trigger skill bar animations
                    panel.querySelectorAll('.skill-card').forEach(card => {
                        card.classList.remove('visible');
                        setTimeout(() => card.classList.add('visible'), 100);
                    });
                }
            });
        });
    });

    // ── Counter Animation ───────────────────
    const counterNumbers = document.querySelectorAll('.counter-number');
    let counterStarted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterStarted) {
                counterStarted = true;
                counterNumbers.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    const counterGrid = document.querySelector('.counter-grid');
    if (counterGrid) {
        counterObserver.observe(counterGrid);
    }

    // ── Testimonial Slider ──────────────────
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('testimonialDots');

    if (track && prevBtn && nextBtn && dotsContainer) {
        const cards = track.querySelectorAll('.testimonial-card');
        let currentSlide = 0;
        const totalSlides = cards.length;

        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
        }

        prevBtn.addEventListener('click', () => {
            goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide((currentSlide + 1) % totalSlides);
        });

        // Auto-slide
        let autoSlide = setInterval(() => {
            goToSlide((currentSlide + 1) % totalSlides);
        }, 5000);

        // Pause on hover
        track.addEventListener('mouseenter', () => clearInterval(autoSlide));
        track.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                goToSlide((currentSlide + 1) % totalSlides);
            }, 5000);
        });
    }

    // ── Contact Form ────────────────────────
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Show toast
            showToast('Message sent successfully! 🎉');

            // Reset form
            contactForm.reset();
        });
    }

    function showToast(message) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // ── Back to Top ─────────────────────────
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── Smooth Scroll for all anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ── Tilt Effect on Cards ────────────────
    const tiltCards = document.querySelectorAll('.project-card, .service-card');
    if (window.matchMedia('(hover: hover)').matches) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ── Keyboard Navigation ─────────────────
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ── Page Visibility API ─────────────────
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = 'Come Back! 👋 — Anup Kumar';
        } else {
            document.title = 'Anup Kumar — Portfolio';
        }
    });

    console.log('%c🚀 Anup Kumar Portfolio', 'color: #6c63ff; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with ❤️ using pure HTML, CSS & JS', 'color: #00d4ff; font-size: 12px;');
});

/* ═══════════════════════════════════════════
   VISITOR COUNTER & ANALYTICS
   ═══════════════════════════════════════════ */

/**
* Helper function to send Google Analytics events with retry logic
* Ensures gtag is available before sending
*/
function sendGAEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        try {
            gtag('event', eventName, eventData);
            console.log(`%c📊 Event tracked: ${eventName}`, 'color: #00d4ff; font-size: 11px;');
        } catch (error) {
            console.error('Error sending GA event:', error);
        }
    } else {
        // Retry after a short delay if gtag isn't available yet
        setTimeout(() => {
            if (typeof gtag !== 'undefined') {
                try {
                    gtag('event', eventName, eventData);
                    console.log(`%c📊 Event tracked (retry): ${eventName}`, 'color: #ffaa00; font-size: 11px;');
                } catch (error) {
                    console.error('Error sending GA event on retry:', error);
                }
            }
        }, 500);
    }
}

/**
 * Poll for gtag and send a confirmatory event once available
 */
function waitForGtagAndSendConfirm(maxRetries = 25, interval = 200) {
    let attempts = 0;
    const timer = setInterval(() => {
        attempts++;
        if (typeof gtag !== 'undefined') {
            try {
                const visitorCount = localStorage.getItem('visitorCount') || 0;
                sendGAEvent('page_view_confirm', {
                    source: 'main.js',
                    visitor_count: visitorCount,
                    non_interaction: true
                });
                console.log('%cGA: confirm event sent (page_view_confirm)', 'color: #00d4ff;');
            } catch (err) {
                console.error('GA confirm send error', err);
            }
            clearInterval(timer);
        } else if (attempts >= maxRetries) {
            console.warn('GA not available after retries; confirm event not sent');
            clearInterval(timer);
        }
    }, interval);
}

/**
 * Install debug hooks:
 * - Intercept dataLayer.push to log GA payloads
 * - Intercept fetch/XHR to log network requests to google-analytics endpoints
 */
function installGADebuggers() {
    try {
        // Intercept dataLayer.push
        if (window.dataLayer && !window.__ga_dataLayer_wrapped) {
            const origPush = window.dataLayer.push.bind(window.dataLayer);
            window.dataLayer.push = function() {
                try {
                    console.log('%cGA dataLayer.push ->', 'color: #6c63ff; font-weight: bold;', arguments);
                } catch (e) {}
                return origPush.apply(null, arguments);
            };
            window.__ga_dataLayer_wrapped = true;
        }

        // Intercept fetch to detect GA collect calls
        if (window.fetch && !window.__ga_fetch_wrapped) {
            const origFetch = window.fetch.bind(window);
            window.fetch = async function(resource, init) {
                try {
                    const url = (typeof resource === 'string') ? resource : resource.url;
                    if (url && url.includes('google-analytics.com')) {
                        console.log('%cGA network fetch ->', 'color: #00d4ff; font-weight: bold;', url, init || '');
                    }
                } catch (e) {}
                return origFetch(resource, init);
            };
            window.__ga_fetch_wrapped = true;
        }

        // Intercept XHR send/open
        if (window.XMLHttpRequest && !window.__ga_xhr_wrapped) {
            const XHR = window.XMLHttpRequest;
            const origOpen = XHR.prototype.open;
            const origSend = XHR.prototype.send;

            XHR.prototype.open = function(method, url) {
                this.__ga_url = url;
                return origOpen.apply(this, arguments);
            };

            XHR.prototype.send = function(body) {
                try {
                    if (this.__ga_url && this.__ga_url.includes('google-analytics.com')) {
                        console.log('%cGA network XHR ->', 'color: #00d4ff; font-weight: bold;', this.__ga_url, body || '');
                    }
                } catch (e) {}
                return origSend.apply(this, arguments);
            };

            window.__ga_xhr_wrapped = true;
        }
    } catch (err) {
        console.error('installGADebuggers error', err);
    }
}

/**
 * Initialize visitor counter
 * Uses localStorage to track unique visitors
 */
function initializeVisitorCounter() {
    const counterEl = document.getElementById('visitorCount');
    if (!counterEl) return;

    let visitorCount = localStorage.getItem('visitorCount');
    
    if (!visitorCount) {
        visitorCount = 1;
    } else {
        // Check if visited today, if not increment
        const lastVisit = localStorage.getItem('lastVisitDate');
        const today = new Date().toDateString();
        
        if (lastVisit !== today) {
            visitorCount = parseInt(visitorCount) + 1;
        }
    }
    
    localStorage.setItem('visitorCount', visitorCount);
    localStorage.setItem('lastVisitDate', new Date().toDateString());
    
    // Animate counter display
    animateCounter(counterEl, parseInt(visitorCount));
    
    // Track with Google Analytics if available
    // Track with Google Analytics (with retry)
    sendGAEvent('page_view', {
        'page_title': document.title,
        'page_location': window.location.href,
        'visitor_count': visitorCount
    });
    
    console.log(`%c👥 Total Visitors: ${visitorCount}`, 'color: #00d4ff; font-size: 12px; font-weight: bold;');
}

/**
 * Animate counter number
 */
function animateCounter(element, finalValue) {
    let currentValue = 0;
    const step = Math.ceil(finalValue / 30);
    
    const counter = setInterval(() => {
        currentValue += step;
        if (currentValue >= finalValue) {
            element.textContent = finalValue;
            clearInterval(counter);
        } else {
            element.textContent = currentValue;
        }
    }, 30);
}

/**
 * Track page view and user interactions
 */
function trackPageView() {
    // Track page view with Google Analytics
    sendGAEvent('page_view', {
        'page_title': document.title,
        'page_location': window.location.href
    });

    // Track user interactions
    trackInteractions();
    trackSectionViews();
}

/**
 * Track button clicks and interactions
 */
function trackInteractions() {
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .hero-cta .btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const buttonText = btn.textContent.trim();
            sendGAEvent('engagement', {
                'event_category': 'interaction',
                'event_label': buttonText,
                'value': 1
            });
            console.log(`📊 Event tracked: Button clicked - ${buttonText}`);
        });
    });

    // Track social link clicks
    const socialLinks = document.querySelectorAll('.social-icon, .footer-social-icons a');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            const platform = link.getAttribute('aria-label') || link.href;
            sendGAEvent('social_engagement', {
                'event_category': 'social',
                'event_label': platform,
                'value': 1
            });
            console.log(`📊 Event tracked: Social link clicked - ${platform}`);
        });
    });

    // Track form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'engagement',
                    'event_label': 'contact_form',
                    'value': 1
                });
            }
            console.log('📊 Event tracked: Contact form submitted');
        });
    }

    // Track project card clicks
    const projectCards = document.querySelectorAll('.project-card, .project-link');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectTitle = card.querySelector('h3')?.textContent || 'Unknown Project';
            sendGAEvent('project_view', {
                'event_category': 'engagement',
                'event_label': projectTitle,
                'value': 1
            });
            console.log(`📊 Event tracked: Project viewed - ${projectTitle}`);
        });
    });

    // Track service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const serviceTitle = card.querySelector('h3')?.textContent || 'Unknown Service';
            sendGAEvent('service_hover', {
                'event_category': 'engagement',
                'event_label': serviceTitle,
                'value': 1
            });
        });
    });

    // Track skill tab clicks
    const skillTabs = document.querySelectorAll('.skill-tab');
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const skillType = tab.getAttribute('data-tab');
            sendGAEvent('skill_view', {
                'event_category': 'content_view',
                'event_label': skillType,
                'value': 1
            });
            console.log(`📊 Event tracked: Skill category viewed - ${skillType}`);
        });
    });

    // Track theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            sendGAEvent('theme_toggle', {
                'event_category': 'preference',
                'event_label': theme,
                'value': 1
            });
            console.log(`📊 Event tracked: Theme toggled to ${theme}`);
        });
    }
}

/**
 * Track section views
 */
function trackSectionViews() {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'section_view', {
                        'event_category': 'content_view',
                        'event_label': sectionId,
                        'value': 1
                    });
                }
                console.log(`📊 Event tracked: Section viewed - ${sectionId}`);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/**
 * Utility function to send custom analytics events
 */
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    console.log(`📊 Custom event tracked: ${eventName}`, eventData);
}
