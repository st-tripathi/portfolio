/**
 * Main Application Entry Point
 * Initializes all modules and handles global functionality
 */
(function () {
    'use strict';

    /**
     * Add smooth reveal animations to elements as they scroll into view
     */
    function initScrollReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        const elementsToReveal = document.querySelectorAll(
            '.section, .timeline-item, .skill-item, .contact-link'
        );

        elementsToReveal.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    /**
     * Add reveal CSS dynamically
     */
    function addRevealStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .reveal {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .reveal.revealed {
                opacity: 1;
                transform: translateY(0);
            }
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Initialize application
     */
    function init() {
        addRevealStyles();
        initScrollReveal();

        // Log initialization (debug mode only)
        if (window.PortfolioUtils?.log) {
            window.PortfolioUtils.log('Portfolio initialized');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
