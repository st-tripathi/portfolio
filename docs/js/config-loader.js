/**
 * Config Loader Module
 * Loads config.json and renders portfolio content dynamically
 */

(function () {
    'use strict';

    const CONFIG_PATH = './config.json';

    /**
     * Fetch and parse config.json
     */
    async function loadConfig() {
        try {
            const response = await fetch(CONFIG_PATH);
            if (!response.ok) {
                throw new Error(`Failed to load config: ${response.status}`);
            }
            return await response.json();
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

        // Hero section
        document.querySelector('.hero-title')?.textContent &&
            (document.querySelector('.hero-title').textContent = personal.name);
        document.querySelector('.hero-tagline')?.textContent &&
            (document.querySelector('.hero-tagline').textContent = personal.title);
        document.querySelector('.hero-subtitle')?.textContent &&
            (document.querySelector('.hero-subtitle').textContent = personal.tagline);

        // Page title
        document.title = `${personal.name} | ${personal.title}`;

        // Meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = `${personal.name} - ${personal.title} specializing in ${personal.tagline}`;
        }

        // Contact links
        const emailLink = document.querySelector('.contact-link[href^="mailto"]');
        if (emailLink) {
            emailLink.href = `mailto:${personal.email}`;
            emailLink.querySelector('span:last-child').textContent = personal.email;
        }

        const linkedinLink = document.querySelector('.contact-link[href*="linkedin"]');
        if (linkedinLink) {
            linkedinLink.href = `https://linkedin.com/in/${personal.linkedin}`;
            linkedinLink.querySelector('span:last-child').textContent = `linkedin.com/in/${personal.linkedin}`;
        }

        const githubLink = document.querySelector('.contact-link[href*="github"]');
        if (githubLink) {
            githubLink.href = `https://github.com/${personal.github}`;
            githubLink.querySelector('span:last-child').textContent = `github.com/${personal.github}`;
        }
    }

    /**
     * Render about section
     */
    function renderAbout(config) {
        const { about } = config;
        const bioEl = document.querySelector('.about-bio');
        if (bioEl && about) {
            bioEl.innerHTML = `
                <p class="about-intro">${about.intro}</p>
                <p>${about.focus}</p>
            `;
        }
    }

    /**
     * Render skills grid
     */
    function renderSkills(config) {
        const { skills } = config;
        const grid = document.querySelector('.skills-grid');
        if (!grid || !skills) return;

        grid.innerHTML = skills.map(skill => `
            <div class="skill-item" 
                 data-tooltip="${skill.description}" 
                 data-tools="${skill.tools}">
                <span class="skill-icon">${skill.icon}</span>
                <span>${skill.name}</span>
            </div>
        `).join('');
    }

    /**
     * Render experience timeline
     */
    function renderExperience(config) {
        const { experience } = config;
        const timeline = document.querySelector('.timeline');
        if (!timeline || !experience) return;

        timeline.innerHTML = experience.map(exp => `
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h3>${exp.company}</h3>
                        <span class="timeline-role">${exp.role}</span>
                        <span class="timeline-date">${exp.period}</span>
                    </div>
                    <ul class="timeline-details">
                        ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
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

        renderPersonal(config);
        renderAbout(config);
        renderSkills(config);
        renderExperience(config);
        renderBlog(config);
        renderContact(config);
        renderFooter(config);

        console.log('Portfolio rendered from config.json');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
