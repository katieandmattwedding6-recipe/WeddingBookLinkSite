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
