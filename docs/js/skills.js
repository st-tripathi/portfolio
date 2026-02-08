/**
 * Skills Tooltip Module
 * Shows descriptions and tools when clicking on skill badges
 */

(function () {
    'use strict';

    // Create tooltip overlay element
    function createTooltipOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'skill-tooltip-overlay';
        overlay.id = 'skill-tooltip-overlay';
        overlay.innerHTML = `
            <div class="skill-tooltip-modal">
                <button class="skill-tooltip-close" aria-label="Close">&times;</button>
                <div class="skill-tooltip-header">
                    <span class="skill-tooltip-icon"></span>
                    <h4 class="skill-tooltip-title"></h4>
                </div>
                <p class="skill-tooltip-description"></p>
                <div class="skill-tooltip-tools">
                    <span class="tools-label">Tools & Technologies:</span>
                    <span class="tools-list"></span>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }

    // Initialize tooltips
    function initSkillTooltips() {
        const skillItems = document.querySelectorAll('.skill-item[data-tooltip]');
        if (!skillItems.length) return;

        const overlay = createTooltipOverlay();
        const closeBtn = overlay.querySelector('.skill-tooltip-close');
        const iconEl = overlay.querySelector('.skill-tooltip-icon');
        const titleEl = overlay.querySelector('.skill-tooltip-title');
        const descEl = overlay.querySelector('.skill-tooltip-description');
        const toolsContainer = overlay.querySelector('.skill-tooltip-tools');
        const toolsList = overlay.querySelector('.tools-list');

        // Open tooltip on skill click
        skillItems.forEach(item => {
            item.addEventListener('click', () => {
                const icon = item.querySelector('.skill-icon')?.textContent || '💡';
                const title = item.querySelector('span:last-child')?.textContent || 'Skill';
                const description = item.dataset.tooltip || '';
                const tools = item.dataset.tools || '';

                iconEl.textContent = icon;
                iconEl.style.fontSize = '1.5rem';
                titleEl.textContent = title;
                descEl.textContent = description;

                if (tools) {
                    toolsList.textContent = tools;
                    toolsContainer.style.display = 'block';
                } else {
                    toolsContainer.style.display = 'none';
                }

                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close on button click
        closeBtn.addEventListener('click', closeTooltip);

        // Close on overlay click (outside modal)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeTooltip();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeTooltip();
            }
        });

        function closeTooltip() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSkillTooltips);
    } else {
        initSkillTooltips();
    }
})();
