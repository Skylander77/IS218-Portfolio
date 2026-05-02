// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
let menuOpen = false;

// Initialize menu state
function initializeMenu() {
    if (window.innerWidth > 768) {
        // Desktop view - always show menu
        if (navMenu) {
            navMenu.style.display = 'flex';
            navMenu.style.position = 'static';
        }
        menuOpen = false;
    } else {
        // Mobile view - hide menu initially
        if (navMenu) {
            navMenu.style.display = 'none';
            navMenu.style.position = 'absolute';
        }
        menuOpen = false;
    }
}

// Initialize on load
initializeMenu();

// Handle window resize
window.addEventListener('resize', () => {
    initializeMenu();
});

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        menuOpen = !menuOpen;
        
        if (menuOpen) {
            navMenu.style.display = 'flex';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '60px';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.flexDirection = 'column';
            navMenu.style.gap = '1rem';
            navMenu.style.padding = '1rem';
            navMenu.style.background = 'linear-gradient(135deg, #0f1419, #1a2332)';
            navMenu.style.zIndex = '999';
            navMenu.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            navMenu.style.display = 'none';
        }
    });
}

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.innerWidth <= 768 && navMenu) {
            navMenu.style.display = 'none';
            menuOpen = false;
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && menuOpen && navMenu && 
        !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.style.display = 'none';
        menuOpen = false;
    }
});

// Smooth scroll for navigation links with history management
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const href = this.getAttribute('href');
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update browser history
            window.history.pushState({ section: href }, '', href);
            
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navMenu && menuOpen) {
                navMenu.style.display = 'none';
                menuOpen = false;
            }
        }
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.section) {
        const target = document.querySelector(event.state.section);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    } else {
        // If no state, scroll to top (home)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', {
            name: this.elements[0].value,
            email: this.elements[1].value,
            subject: this.elements[2].value,
            message: this.elements[3].value
        });
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #007bff, #0056b3);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for reveal animation
document.querySelectorAll('.project-card, .award-card, .education-card, .skill-category').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section comes into view
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat h3');
                stats.forEach(stat => {
                    const number = parseInt(stat.textContent);
                    animateCounter(stat, number);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    });
    statsObserver.observe(statsSection);
}

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.style.color = 'white');
                navLink.style.color = '#007bff';
            }
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.innerWidth <= 768 && navMenu && menuOpen) {
        navMenu.style.display = 'none';
        menuOpen = false;
    }
});

// Copy email to clipboard
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const email = this.getAttribute('href').substring(7);
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email copied to clipboard!');
        });
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `0% ${scrollPosition * 0.5}px`;
    }
});

// Lazy load images (if any images are added in the future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Initialize
console.log('Portfolio initialized successfully!');
console.log('AI Cyber Security Engineer Portfolio - NJIT Graduate');

// Dark mode toggle (optional enhancement)
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}