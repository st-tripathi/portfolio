/**
 * Utility Functions
 * Shared helpers used across portfolio modules
 */

(function () {
    'use strict';

    /**
     * Debug logging - only logs if debug mode is enabled
     */
    const DEBUG = localStorage.getItem('portfolio-debug') === 'true';

    function log(...args) {
        if (DEBUG) {
            console.log('[Portfolio]', ...args);
        }
    }

    /**
     * Escape HTML to prevent XSS attacks
     * @param {string} str - String to escape
     * @returns {string} - Escaped HTML string
     */
    function escapeHtml(str) {
        if (typeof str !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Initialize module when DOM is ready
     * @param {Function} fn - Initialization function
     */
    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    /**
     * Validate config schema
     * @param {Object} config - Config object to validate
     * @returns {boolean} - True if valid
     */
    function validateConfig(config) {
        if (!config || typeof config !== 'object') {
            log('Invalid config: not an object');
            return false;
        }

        const required = ['personal', 'about', 'skills', 'experience'];
        const missing = required.filter(key => !config[key]);

        if (missing.length > 0) {
            log(`Missing required config fields: ${missing.join(', ')}`);
            return false;
        }

        // Validate personal fields
        const personalRequired = ['name', 'title', 'email', 'github', 'linkedin'];
        const missingPersonal = personalRequired.filter(key => !config.personal[key]);

        if (missingPersonal.length > 0) {
            log(`Missing personal fields: ${missingPersonal.join(', ')}`);
            return false;
        }

        return true;
    }

    // Expose utilities globally for other modules
    window.PortfolioUtils = {
        log,
        escapeHtml,
        onReady,
        validateConfig,
        DEBUG
    };
})();
