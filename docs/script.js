// Display current date as last updated (only on index page)
const lastUpdatedElement = document.getElementById('lastUpdated');
if (lastUpdatedElement) {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    lastUpdatedElement.textContent = `Last updated: ${formattedDate}`;
}

// Replace broken images with default oven icon
document.querySelectorAll('.recipe-link img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'oven.svg';
    });
});

// Select a random recipe
document.querySelectorAll('.random-recipe').forEach(btn => {
    btn.addEventListener('click', function() {
        const recipes = document.querySelectorAll('.recipe-link');
        const random = recipes[Math.floor(Math.random() * recipes.length)];
        window.location.href = random.href;
    });
});

// Show/hide back-to-top button (only on index page)
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top smoothly
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    const body = document.body;
    const darkModeIcon = document.getElementById('darkModeIcon');
    
    // Check if we're on a recipe page or index page
    const isRecipePage = window.location.pathname.includes('/recipes/');

    // Check for saved preference or default to light mode
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
        if (darkModeIcon) {
            darkModeIcon.src = isRecipePage ? '../cookie.svg' : 'cookie.svg';
        }
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Update icon and save preference
        if (body.classList.contains('dark-mode')) {
            if (darkModeIcon) {
                darkModeIcon.src = isRecipePage ? '../cookie.svg' : 'cookie.svg';
            }
            localStorage.setItem('darkMode', 'enabled');
        } else {
            if (darkModeIcon) {
                darkModeIcon.src = isRecipePage ? '../dark-chocolate-cookie.svg' : 'dark-chocolate-cookie.svg';
            }
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}

// Mobile tap-to-toggle recipe descriptions
// First tap: show description, Second tap: navigate to recipe
if ('ontouchstart' in window) {
    const recipeLinks = document.querySelectorAll('.recipe-link');
    
    recipeLinks.forEach(link => {
        // Prevent click events on mobile to avoid navigation
        link.addEventListener('click', function(e) {
            // If not showing description, prevent navigation
            if (!this.classList.contains('show-description')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
        
        link.addEventListener('touchend', function(e) {
            // If this link already shows description, navigate manually
            if (this.classList.contains('show-description')) {
                // Navigate to the href
                window.location.href = this.href;
                return;
            }
            
            // Otherwise, prevent navigation and show description
            e.preventDefault();
            e.stopPropagation();
            
            // Remove show-description from all other links
            recipeLinks.forEach(l => l.classList.remove('show-description'));
            
            // Add show-description to this link
            this.classList.add('show-description');
        });
    });
    
    // Remove show-description when tapping outside recipe links
    document.addEventListener('touchend', function(e) {
        if (!e.target.closest('.recipe-link')) {
            recipeLinks.forEach(l => l.classList.remove('show-description'));
        }
    });
}

