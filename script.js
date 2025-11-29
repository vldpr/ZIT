// load shared components
async function loadComponent(componentName) {
    try {
        const response = await fetch(`components/${componentName}.html`);
        return await response.text();
    } catch (error) {
        console.error(`Failed to load ${componentName}:`, error);
        return '';
    }
}

async function initializeComponents() {
    const header = document.getElementById('header-placeholder');
    const footer = document.getElementById('footer-placeholder');

    if (header) {
        header.innerHTML = await loadComponent('header');
    }
    if (footer) {
        footer.innerHTML = await loadComponent('footer');
    }

    // Initialize the toggle button after components are loaded
    // This ensures we can find the #theme-toggle button in the DOM
    setupThemeToggle();
}

// load components when DOM is ready
document.addEventListener('DOMContentLoaded', initializeComponents);

// --- Dark Mode Logic ---

function applyTheme(isDark) {
    const html = document.documentElement;
    if (isDark) {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}

function setupThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle');
    
    // If the button isn't on this page (and wasn't loaded), do nothing
    if (!toggleButton) return;
    
    // Prevent attaching multiple listeners if this runs twice
    if (toggleButton.dataset.hasListener) return;

    toggleButton.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        applyTheme(!isDark);
    });

    // Mark as attached
    toggleButton.dataset.hasListener = 'true';
}

(function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }
})();

tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            }
        }
    }
}
