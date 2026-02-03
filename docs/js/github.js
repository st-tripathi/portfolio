/**
 * GitHub API Module
 * Fetches and displays public repositories
 * Reads username from config.json
 */
(function () {
    'use strict';

    const { log, escapeHtml, onReady } = window.PortfolioUtils || {};
    const MAX_REPOS = 6;

    /**
     * Get GitHub username from config
     */
    function getGitHubUsername() {
        const config = window.__portfolioConfig;
        return config?.personal?.github || null;
    }

    /**
     * Fetch repositories from GitHub API
     */
    async function fetchRepos(username) {
        if (!username) {
            if (log) log('No GitHub username configured');
            return null;
        }

        try {
            const apiUrl = `https://api.github.com/users/${encodeURIComponent(username)}/repos`;
            const response = await fetch(`${apiUrl}?sort=updated&per_page=${MAX_REPOS}`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch GitHub repos:', error);
            return null;
        }
    }

    /**
     * Get language color for display
     */
    function getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f1e05a',
            'TypeScript': '#3178c6',
            'Python': '#3572A5',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'Java': '#b07219',
            'C#': '#178600',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Shell': '#89e051',
            'Dockerfile': '#384d54',
            'HCL': '#844FBA',
            'Kotlin': '#A97BFF'
        };
        return colors[language] || '#6e7681';
    }

    /**
     * Format star count
     */
    function formatStars(count) {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'k';
        }
        return count.toString();
    }

    /**
     * Create repository card using DOM APIs (XSS-safe)
     */
    function createRepoCard(repo) {
        const card = document.createElement('a');
        card.className = 'github-card';
        card.href = repo.html_url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        // Header
        const h4 = document.createElement('h4');
        const icon = document.createElement('span');
        icon.textContent = '📁';
        h4.appendChild(icon);
        h4.appendChild(document.createTextNode(' ' + repo.name));

        // Description
        const desc = document.createElement('p');
        desc.textContent = repo.description || 'No description available';

        // Meta
        const meta = document.createElement('div');
        meta.className = 'github-card-meta';

        if (repo.language) {
            const langSpan = document.createElement('span');
            const langDot = document.createElement('span');
            langDot.style.cssText = `display:inline-block;width:12px;height:12px;border-radius:50%;background:${getLanguageColor(repo.language)}`;
            langSpan.appendChild(langDot);
            langSpan.appendChild(document.createTextNode(' ' + repo.language));
            meta.appendChild(langSpan);
        }

        const starsSpan = document.createElement('span');
        starsSpan.textContent = `⭐ ${formatStars(repo.stargazers_count)}`;
        meta.appendChild(starsSpan);

        const forksSpan = document.createElement('span');
        forksSpan.textContent = `🍴 ${repo.forks_count}`;
        meta.appendChild(forksSpan);

        card.appendChild(h4);
        card.appendChild(desc);
        card.appendChild(meta);

        return card;
    }

    /**
     * Create error/empty state
     */
    function createEmptyState(message) {
        const container = document.createElement('div');
        container.className = 'blog-coming-soon';
        const p = document.createElement('p');
        p.textContent = message;
        container.appendChild(p);
        return container;
    }

    /**
     * Render repositories to the page
     */
    async function render() {
        const container = document.getElementById('github-repos');
        if (!container) return;

        const username = getGitHubUsername();
        if (!username) {
            container.innerHTML = '';
            container.appendChild(createEmptyState('GitHub username not configured.'));
            return;
        }

        const repos = await fetchRepos(username);

        // Clear loading skeleton
        container.innerHTML = '';

        if (!repos || repos.length === 0) {
            container.appendChild(createEmptyState('Unable to load repositories. Please visit GitHub directly.'));
            return;
        }

        // Filter out forks and sort by stars
        const filteredRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, MAX_REPOS);

        if (filteredRepos.length === 0) {
            container.appendChild(createEmptyState('No public repositories found.'));
            return;
        }

        filteredRepos.forEach(repo => {
            container.appendChild(createRepoCard(repo));
        });
    }

    /**
     * Initialize GitHub section
     */
    function init() {
        // Use Intersection Observer for lazy loading
        const section = document.getElementById('github');
        if (!section) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Small delay to ensure config is loaded
                    setTimeout(render, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(section);
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
