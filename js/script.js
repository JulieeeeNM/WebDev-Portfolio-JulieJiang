// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const closeModal = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');
const learnMoreBtn = document.getElementById('learnMoreBtn');
const sdgModal = document.getElementById('sdgModal');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const viewDetailsButtons = document.querySelectorAll('.view-details');
const projectModal = document.getElementById('projectModal');
const accessibilityForm = document.getElementById('accessibilityForm');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('show'));
});

// Contact Modal
contactBtn.addEventListener('click', () => {
    contactModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// SDG Modal
learnMoreBtn.addEventListener('click', () => {
    sdgModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// Close Modals
closeModal.addEventListener('click', () => {
    contactModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

document.querySelectorAll('.modal .close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.closest('.modal').classList.remove('show');
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Portfolio Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Project Details Modal
viewDetailsButtons.forEach(button => {
    button.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const projectContent = document.getElementById('projectContent');
        
        // In a real app, you might fetch this data from an API
        const projects = {
            1: {
                title: "E-commerce Site",
                description: "A full-stack e-commerce platform built with React for the frontend and Node.js with Express for the backend. Features include product catalog, shopping cart, user authentication, and payment processing.",
                technologies: "React, Node.js, Express, MongoDB, Stripe API",
                image: "https://via.placeholder.com/800x500",
                link: "#"
            },
            2: {
                title: "Fitness App UI",
                description: "Mobile application design for a fitness tracking app. Created user flows, wireframes, and high-fidelity prototypes in Figma. Focused on creating an intuitive interface for tracking workouts and nutrition.",
                technologies: "Figma, Adobe XD, Illustrator",
                image: "https://via.placeholder.com/800x500",
                link: "#"
            },
            3: {
                title: "Photography Portfolio",
                description: "Personal photography portfolio showcasing landscape and portrait photography. Designed to highlight visual content with minimal distraction. Features a responsive gallery with filtering options.",
                technologies: "HTML, CSS, JavaScript, Lightbox",
                image: "https://via.placeholder.com/800x500",
                link: "#"
            },
            4: {
                title: "Weather App",
                description: "Real-time weather application that fetches data from a weather API. Displays current conditions, 5-day forecast, and allows users to search by location. Includes temperature unit switching.",
                technologies: "JavaScript, Weather API, Geolocation API",
                image: "https://via.placeholder.com/800x500",
                link: "#"
            },
            5: {
                title: "Brand Identity",
                description: "Complete brand package for a startup company including logo design, color palette, typography system, and brand guidelines. Created visual assets for both print and digital media.",
                technologies: "Illustrator, Photoshop, InDesign",
                image: "https://via.placeholder.com/800x500",
                link: "#"
            },
            6: {
                title: "Travel Blog",
                description: "Personal travel blog featuring stories, photos, and guides from around the world. Built with a custom CMS for easy content management. Includes interactive maps and location tagging.",
                technologies: "WordPress, PHP, JavaScript, Google Maps API",
                image: "https://via.placeholder.com/800x500",
                link: "#"
            }
        };
        
        const project = projects[projectId];
        
        projectContent.innerHTML = `
            <h3>${project.title}</h3>
            <img src="${project.image}" alt="${project.title} screenshot" class="project-modal-img">
            <p>${project.description}</p>
            <h4>Technologies Used:</h4>
            <p>${project.technologies}</p>
            <a href="${project.link}" class="btn" target="_blank">View Project</a>
        `;
        
        projectModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

// Form Validation
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // In a real app, you would send the form data to a server here
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
    contactModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

accessibilityForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const message = document.getElementById('feedback-message').value.trim();
    
    if (message === '') {
        alert('Please describe the accessibility issue');
        return;
    }
    
    // In a real app, you would send the form data to a server here
    alert('Thank you for your feedback! I will review the accessibility issue you reported.');
    this.reset();
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Reduce motion preference
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reduceMotion.matches) {
    document.querySelectorAll('[class*="animation"], [class*="transition"]').forEach(element => {
        element.style.animation = 'none';
        element.style.transition = 'none';
    });
}

// Keyboard navigation for modal
document.addEventListener('keydown', function(e) {
    const openModal = document.querySelector('.modal.show');
    
    if (openModal && e.key === 'Escape') {
        openModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Trap focus inside modal
    if (openModal && e.key === 'Tab') {
        const focusableElements = openModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Set aria-current for current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.setAttribute('aria-current', 'page');
        }
    });
});