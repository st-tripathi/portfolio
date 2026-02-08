/**
 * Config Loader Module
 * Loads config.json and renders portfolio content dynamically
 */

(function () {
    'use strict';

    const CONFIG_PATH = './config.json';
    const { log, escapeHtml, onReady, validateConfig } = window.PortfolioUtils || {};

    /**
     * Fetch and parse config.json
     */
    async function loadConfig() {
        try {
            const response = await fetch(CONFIG_PATH);
            if (!response.ok) {
                throw new Error(`Failed to load config: ${response.status}`);
            }
            const config = await response.json();

            // Store config globally for other modules (e.g., github.js)
            window.__portfolioConfig = config;

            return config;
        } catch (error) {
            console.error('Config load error:', error);
            return null;
        }
    }

    /**
     * Render personal info (name, title, etc.)
     */
    function renderPersonal(config) {
        const { personal } = config;

        // Hero section - use textContent for safety
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.textContent = personal.name;

        const heroTagline = document.querySelector('.hero-tagline');
        if (heroTagline) heroTagline.textContent = personal.title;

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = personal.tagline;

        // Page title
        document.title = `${escapeHtml(personal.name)} | ${escapeHtml(personal.title)}`;

        // Meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = `${personal.name} - ${personal.title} specializing in ${personal.tagline}`;
        }

        // Contact links - use textContent for display text
        const emailLink = document.querySelector('.contact-link[href^="mailto"]');
        if (emailLink) {
            emailLink.href = `mailto:${encodeURIComponent(personal.email)}`;
            const emailText = emailLink.querySelector('span:last-child');
            if (emailText) emailText.textContent = personal.email;
        }

        const linkedinLink = document.querySelector('.contact-link[href*="linkedin"]');
        if (linkedinLink) {
            linkedinLink.href = `https://linkedin.com/in/${encodeURIComponent(personal.linkedin)}`;
            const linkedinText = linkedinLink.querySelector('span:last-child');
            if (linkedinText) linkedinText.textContent = `linkedin.com/in/${personal.linkedin}`;
        }

        const githubLink = document.querySelector('.contact-link[href*="github"]');
        if (githubLink) {
            githubLink.href = `https://github.com/${encodeURIComponent(personal.github)}`;
            const githubText = githubLink.querySelector('span:last-child');
            if (githubText) githubText.textContent = `github.com/${personal.github}`;
        }
    }

    /**
     * Render about section
     */
    function renderAbout(config) {
        const { about } = config;
        const bioEl = document.querySelector('.about-bio');
        if (bioEl && about) {
            // Create elements safely instead of using innerHTML
            bioEl.innerHTML = '';

            const introP = document.createElement('p');
            introP.className = 'about-intro';
            introP.innerHTML = about.intro; // Allow HTML for <strong> tags in intro

            const focusP = document.createElement('p');
            focusP.textContent = about.focus; // Plain text for focus

            bioEl.appendChild(introP);
            bioEl.appendChild(focusP);
        }
    }

    /**
     * Render skills grid
     */
    function renderSkills(config) {
        const { skills } = config;
        const grid = document.querySelector('.skills-grid');
        if (!grid || !skills) return;

        // Clear and rebuild safely
        grid.innerHTML = '';

        skills.forEach(skill => {
            const item = document.createElement('div');
            item.className = 'skill-item';
            item.dataset.tooltip = skill.description;
            item.dataset.tools = skill.tools;

            const icon = document.createElement('span');
            icon.className = 'skill-icon';
            icon.textContent = skill.icon;

            const name = document.createElement('span');
            name.textContent = skill.name;

            item.appendChild(icon);
            item.appendChild(name);
            grid.appendChild(item);
        });

        // Dispatch event so skills.js can initialize tooltips
        window.dispatchEvent(new CustomEvent('skillsRendered'));
    }

    /**
     * Render experience timeline
     */
    function renderExperience(config) {
        const { experience } = config;
        const timeline = document.querySelector('.timeline');
        if (!timeline || !experience) return;

        // Clear and rebuild safely
        timeline.innerHTML = '';

        experience.forEach(exp => {
            const item = document.createElement('div');
            item.className = 'timeline-item';

            const marker = document.createElement('div');
            marker.className = 'timeline-marker';

            const content = document.createElement('div');
            content.className = 'timeline-content';

            const header = document.createElement('div');
            header.className = 'timeline-header';

            const h3 = document.createElement('h3');
            h3.textContent = exp.company;

            const role = document.createElement('span');
            role.className = 'timeline-role';
            role.textContent = exp.role;

            const date = document.createElement('span');
            date.className = 'timeline-date';
            date.textContent = exp.period;

            header.appendChild(h3);
            header.appendChild(role);
            header.appendChild(date);

            const details = document.createElement('ul');
            details.className = 'timeline-details';

            exp.highlights.forEach(highlight => {
                const li = document.createElement('li');
                li.textContent = highlight;
                details.appendChild(li);
            });

            content.appendChild(header);
            content.appendChild(details);
            item.appendChild(marker);
            item.appendChild(content);
            timeline.appendChild(item);
        });
    }

    /**
     * Render blog section
     */
    function renderBlog(config) {
        const { blog } = config;
        const subtitle = document.querySelector('#blog .section-subtitle');
        if (subtitle && blog?.subtitle) {
            subtitle.textContent = blog.subtitle;
        }
    }

    /**
     * Render contact section
     */
    function renderContact(config) {
        const { contact } = config;
        const intro = document.querySelector('.contact-intro');
        if (intro && contact?.intro) {
            intro.textContent = contact.intro;
        }
    }

    /**
     * Render footer
     */
    function renderFooter(config) {
        const { footer, personal } = config;
        const footerEl = document.querySelector('.footer p');
        if (footerEl) {
            footerEl.textContent = footer?.copyright || `© ${new Date().getFullYear()} ${personal.name}`;
        }
    }

    /**
     * Initialize config-based rendering
     */
    async function init() {
        const config = await loadConfig();
        if (!config) {
            console.warn('Could not load config, using static content');
            return;
        }

        // Validate config schema
        if (validateConfig && !validateConfig(config)) {
            console.warn('Config validation failed, using static content');
            return;
        }

        renderPersonal(config);
        renderAbout(config);
        renderSkills(config);
        renderExperience(config);
        renderBlog(config);
        renderContact(config);
        renderFooter(config);

        if (log) log('Portfolio rendered from config.json');
    }

    // Initialize when DOM is ready
    if (window.PortfolioUtils?.onReady) {
        window.PortfolioUtils.onReady(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
