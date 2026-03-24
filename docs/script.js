// Display current date as last updated
const today = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);
document.getElementById('lastUpdated').textContent = `Last updated: ${formattedDate}`;

// Replace broken images with default oven icon
document.querySelectorAll('.recipe-link img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'oven.svg';
    });
});

// Select a random recipe
document.getElementById('randomRecipe').addEventListener('click', function() {
    const recipes = document.querySelectorAll('.recipe-link');
    const random = recipes[Math.floor(Math.random() * recipes.length)];
    globalThis.location.href = random.href;
});

// Show/hide back-to-top button
window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Scroll to top smoothly
document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

