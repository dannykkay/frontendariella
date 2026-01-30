// ========================================
// Modern Writer Portfolio - JavaScript
// ========================================

// ========================================
// Initialize AOS (Animate On Scroll)
// ========================================

AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 100,
});

// ========================================
// Page Loader
// ========================================

window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 1500);
});

// ========================================
// Floating Particles
// ========================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ========================================
// Navigation Toggle for Mobile
// ========================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========================================
// Enhanced Sticky Navigation
// ========================================

const nav = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow and backdrop blur on scroll
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Work Filters with Smooth Animations
// ========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filter = button.getAttribute('data-filter');
        
        // Filter work items with staggered animation
        let delay = 0;
        workItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                // Show item
                item.classList.remove('hidden');
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, delay);
                
                delay += 50; // Stagger effect
            } else {
                // Hide item
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// ========================================
// Scroll-triggered Fade-in Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for multiple elements
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
    observer.observe(element);
});

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = nav.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Contact Form Handling with Backend API Integration
// ========================================

const contactForm = document.getElementById('contactForm');

// API Configuration
// IMPORTANT: Update this URL for production deployment!
const API_CONFIG = {
    // For local development
    development: 'http://localhost:5000',
    // For production - UPDATE THIS with your Render.com URL
    production: 'https://ariellabackend.onrender.com',
};

// Automatically detect environment
const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';
const API_BASE_URL = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        organization: document.getElementById('organization').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = '📤 Sending...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    try {
        // Send to backend API
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Show success state
            submitButton.textContent = '✓ Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            submitButton.style.transform = 'scale(1.05)';
            submitButton.style.opacity = '1';
            
            // Show success notification
            showNotification(
                data.message || 'Thank you for your message! I\'ll get back to you soon.',
                'success'
            );
            
            // Reset form
            contactForm.reset();
            
        } else if (response.status === 429) {
            // Rate limit exceeded
            showNotification(
                'Too many messages sent. Please try again in a few minutes.',
                'error'
            );
            submitButton.textContent = '⏱️ Please Wait';
            submitButton.style.background = 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)';
            
        } else {
            // Other errors
            throw new Error(data.error || 'Failed to send message');
        }
        
    } catch (error) {
        console.error('Contact form error:', error);
        
        // Show error state
        submitButton.textContent = '✗ Failed to Send';
        submitButton.style.background = 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
        submitButton.style.opacity = '1';
        
        // Show error notification with helpful message
        let errorMessage = 'Failed to send message. ';
        
        if (error.message.includes('fetch')) {
            errorMessage += 'Please check your internet connection and try again.';
        } else if (error.message.includes('CORS')) {
            errorMessage += 'Connection error. Please try again later.';
        } else {
            errorMessage += 'Please try again later.';
        }
        
        showNotification(errorMessage, 'error');
        
    } finally {
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
            submitButton.style.transform = '';
            submitButton.style.opacity = '';
            submitButton.disabled = false;
        }, 3000);
    }
});

// ========================================
// Notification System
// ========================================

function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        line-height: 1.5;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
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
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// ========================================
// Active Section Highlighting
// ========================================

function highlightNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + nav.offsetHeight + 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--color-accent)';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ========================================
// Parallax Effect for Hero Background
// ========================================

const heroBackground = document.querySelector('.hero-background');
const poetryBackground = document.querySelector('.poetry-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (poetryBackground) {
        const poetrySection = document.querySelector('.featured-poetry');
        const poetryTop = poetrySection.offsetTop;
        const poetryScroll = scrolled - poetryTop;
        
        if (poetryScroll > -500 && poetryScroll < 500) {
            poetryBackground.style.transform = `translateY(${poetryScroll * 0.3}px)`;
        }
    }
});

// ========================================
// Enhanced Hover Effects for Work Items
// ========================================

workItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ========================================
// Poem Line Interaction
// ========================================

const poemLines = document.querySelectorAll('.poem-text p');

poemLines.forEach((line, index) => {
    line.addEventListener('mouseenter', function() {
        // Subtle highlight effect on hover
        this.style.transition = 'all 0.3s ease';
    });
});

// ========================================
// Scroll Progress Indicator (Optional)
// ========================================

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // You can add a progress bar element in HTML and update it here
    // document.getElementById('progressBar').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ========================================
// Image Lazy Loading Enhancement
// ========================================

const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ========================================
// Performance Optimization - Debounce
// ========================================

function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedHighlight = debounce(highlightNavigation, 10);
const debouncedProgress = debounce(updateScrollProgress, 10);

window.addEventListener('scroll', debouncedHighlight);
window.addEventListener('scroll', debouncedProgress);

// ========================================
// Theme Items Interaction
// ========================================

const themeItems = document.querySelectorAll('.theme-item');

themeItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.theme-icon');
        if (icon) {
            icon.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }
    });
});

// ========================================
// Publication Items Hover Effect
// ========================================

const publicationItems = document.querySelectorAll('.publication-item');

publicationItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.05}s`;
});

// ========================================
// Accessibility Enhancements
// ========================================

// Skip to main content
document.addEventListener('keydown', (e) => {
    // Alt + 1 to skip to main content
    if (e.altKey && e.key === '1') {
        const mainContent = document.querySelector('main') || document.querySelector('.hero');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Announce page transitions to screen readers
function announcePageSection(sectionName) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Navigated to ${sectionName}`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ========================================
// Back to Top Button
// ========================================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Parallax Effects for Hero Gradient
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const heroGradient = document.querySelector('.hero-gradient-bg');
    if (heroGradient) {
        heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// Initialize Everything
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Trigger initial navigation highlight
    highlightNavigation();
    
    // Add initial animation to hero elements
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('visible');
        }
    }, 200);
    
    // Log successful initialization
    console.log('✨ Modern writer portfolio initialized successfully');
    console.log(`🔌 API configured for: ${isDevelopment ? 'Development' : 'Production'}`);
    console.log(`📡 API URL: ${API_BASE_URL}`);
    
    // Easter egg: Add a subtle message for developers
    console.log('%c👋 Hello, developer! Thanks for checking out the code.', 
        'color: #a67c52; font-size: 14px; font-weight: bold;'
    );
});

// ========================================
// Smooth Entrance Animation on Page Load
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
});
