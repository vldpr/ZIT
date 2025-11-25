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
}

// load components when DOM is ready
document.addEventListener('DOMContentLoaded', initializeComponents);
