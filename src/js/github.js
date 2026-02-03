/**
 * GitHub API Module
 * Fetches and displays public repositories
 */
(function () {
    'use strict';

    const GITHUB_USERNAME = 'st-tripathi';
    const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
    const MAX_REPOS = 6;

    /**
     * Fetch repositories from GitHub API
     */
    async function fetchRepos() {
        try {
            const response = await fetch(`${API_URL}?sort=updated&per_page=${MAX_REPOS}`);

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
     * Create repository card HTML
     */
    function createRepoCard(repo) {
        const card = document.createElement('a');
        card.className = 'github-card';
        card.href = repo.html_url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        card.innerHTML = `
            <h4>
                <span>📁</span>
                ${repo.name}
            </h4>
            <p>${repo.description || 'No description available'}</p>
            <div class="github-card-meta">
                ${repo.language ? `
                    <span>
                        <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${getLanguageColor(repo.language)}"></span>
                        ${repo.language}
                    </span>
                ` : ''}
                <span>⭐ ${formatStars(repo.stargazers_count)}</span>
                <span>🍴 ${repo.forks_count}</span>
            </div>
        `;

        return card;
    }

    /**
     * Create error/empty state
     */
    function createEmptyState(message) {
        const container = document.createElement('div');
        container.className = 'blog-coming-soon';
        container.innerHTML = `<p>${message}</p>`;
        return container;
    }

    /**
     * Render repositories to the page
     */
    async function render() {
        const container = document.getElementById('github-repos');
        if (!container) return;

        const repos = await fetchRepos();

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
                    render();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(section);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
