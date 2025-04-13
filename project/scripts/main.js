// Main JavaScript for Patagonia Trail Explorers
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const primaryNav = document.getElementById('primary-nav');
    
    if (hamburgerBtn && primaryNav) {
        hamburgerBtn.addEventListener('click', function() {
            primaryNav.classList.toggle('show');
            hamburgerBtn.textContent = primaryNav.classList.contains('show') ? '✕' : '☰';
        });
    }
    
    // Update footer year and last modified date
    const currentYearSpan = document.getElementById('currentyear');
    const lastModifiedP = document.getElementById('lastModified');
    
    if (currentYearSpan) {
        const currentYear = new Date().getFullYear();
        currentYearSpan.textContent = currentYear;
    }
    
    if (lastModifiedP) {
        const lastModified = new Date(document.lastModified);
        lastModifiedP.textContent = `Last Updated: ${lastModified.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`;
    }
    
    // Lazy load images
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.remove('lazy-load');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.classList.remove('lazy-load');
        });
    }
    
    // Home page specific functionality
    if (window.location.pathname.includes('index.html') || document.querySelector('.hero')) {
        setupWeatherWidget();
        setupNewsletterForm();
        
        // Add any featured trail functionality here if needed
        // For example, you could add event listeners for trail card interactions
        setupTrailCardInteractions();
    }
    
    // Setup FAQ accordion if exists
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            
            this.setAttribute('aria-expanded', !isExpanded);
            content.style.maxHeight = isExpanded ? null : content.scrollHeight + 'px';
            icon.textContent = isExpanded ? '+' : '-';
        });
    });
});

// Optional: Trail card interactions function
function setupTrailCardInteractions() {
    const trailCards = document.querySelectorAll('.trail-card');
    
    trailCards.forEach(card => {
        // Example: Add hover effects or click interactions
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
        
        // You could also add click events for mobile devices
        // or other interactive features
    });
}

// Weather Widget
function setupWeatherWidget() {
    const weatherWidget = document.getElementById('weather-widget');
    if (!weatherWidget) return;
    
    // Simulate loading weather data (would be replaced with actual API call)
    setTimeout(() => {
        // Sample weather data for different Patagonia locations
        const weatherData = [
            {
                location: 'El Chaltén',
                temperature: '12°C',
                condition: 'Partly Cloudy',
                windSpeed: '30 km/h',
                icon: '☁️'
            },
            {
                location: 'El Calafate',
                temperature: '15°C',
                condition: 'Sunny',
                windSpeed: '20 km/h',
                icon: '☀️'
            },
            {
                location: 'Bariloche',
                temperature: '14°C',
                condition: 'Light Rain',
                windSpeed: '15 km/h',
                icon: '🌧️'
            }
        ];
        
        let weatherHTML = '<div class="weather-locations">';
        
        weatherData.forEach(data => {
            weatherHTML += `
                <div class="weather-location">
                    <h3>${data.location}</h3>
                    <div class="weather-icon">${data.icon}</div>
                    <div class="weather-temp">${data.temperature}</div>
                    <div class="weather-condition">${data.condition}</div>
                    <div class="weather-wind">Wind: ${data.windSpeed}</div>
                </div>
            `;
        });
        
        weatherHTML += '</div>';
        weatherHTML += '<p class="weather-update">Last updated: ' + new Date().toLocaleString() + '</p>';
        
        weatherWidget.innerHTML = weatherHTML;
    }, 1000);
}

// Newsletter form
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const experienceLevel = document.getElementById('hiking-experience').value;
        
        // Validation
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        
        // Simulate form submission
        const formData = {
            email: email,
            experienceLevel: experienceLevel
        };
        
        console.log('Newsletter subscription:', formData);
        
        // Success message
        newsletterForm.innerHTML = `
            <div class="success-message">
                <h3>Thank you for subscribing!</h3>
                <p>You'll now receive our trail updates and hiking tips.</p>
            </div>
        `;
    });
}