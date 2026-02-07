// ====== HAMBURGER MENU ======
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ====== SCROLL FUNCTIONALITY ======
function scrollToWaitlist() {
    document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
}

function navigateTo(path) {
    // In a real app, this would navigate to the actual page
    if (path === '/signup') {
        alert('Redirecting to signup page...');
        // window.location.href = path;
    }
}

// ====== WAITLIST FORM ======
const waitlistForm = document.getElementById('waitlistForm');
if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('emailInput').value;
        
        try {
            const response = await fetch('http://localhost:5000/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                alert('Thank you for joining our waitlist! Check your email for confirmation.');
                waitlistForm.reset();
            } else {
                alert('Failed to join waitlist. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            // Fallback for when backend is not running
            alert('Thank you for joining our waitlist!');
            waitlistForm.reset();
        }
    });
}

// ====== INTERSECTION OBSERVER FOR ANIMATIONS ======
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.step-card, .bento-item, .security-item, .logo-item').forEach(el => {
    observer.observe(el);
});

// ====== LIVE TICKER ANIMATION ======
function initializeTicker() {
    const tickerScroll = document.querySelector('.ticker-scroll');
    if (!tickerScroll) return;

    // Clone items for seamless loop
    const items = tickerScroll.querySelectorAll('.ticker-item');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        tickerScroll.appendChild(clone);
    });
}

// Initialize ticker on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTicker();

    // Add entrance animations
    document.querySelectorAll('.stat, .feature-icon').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.1}s`;
    });
});

// ====== PARALLAX EFFECT ======
let animationId;

function updateParallax() {
    const scrollY = window.scrollY;
    const floatingCubes = document.querySelectorAll('.floating-cube');
    const glowOrbs = document.querySelectorAll('.glow-orb');

    floatingCubes.forEach((cube, i) => {
        const speed = 0.5 + i * 0.1;
        cube.style.transform = `translateY(${scrollY * speed}px)`;
    });

    glowOrbs.forEach((orb, i) => {
        const speed = 0.3 + i * 0.05;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
    });

    animationId = requestAnimationFrame(updateParallax);
}

window.addEventListener('scroll', updateParallax, { passive: true });

// ====== SMOOTH SCROLL FOR ANCHOR LINKS ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ====== STICKY HEADER EFFECTS ======
let lastScrollTop = 0;
const header = document.querySelector('.sticky-header');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    // Add shadow on scroll
    if (scrollTop > 10) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop;
});

// ====== BUTTON RIPPLE EFFECT ======
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove existing ripple if any
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) existingRipple.remove();

        this.appendChild(ripple);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ====== SCROLL TO TOP BUTTON ======
function createScrollToTopButton() {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'scroll-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00ff88 0%, #00cc6f 100%);
        color: #0f172a;
        border: none;
        cursor: pointer;
        font-size: 24px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 8px 24px rgba(0, 255, 136, 0.3);
    `;

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

createScrollToTopButton();

// ====== PAGE LOAD ANIMATION ======
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.addEventListener('DOMContentLoaded', () => {
    // Fade in page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add fade-in style
const pageStyle = document.createElement('style');
pageStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in;
    }
`;
document.head.appendChild(pageStyle);

// ====== LAZY LOAD IMAGES ======
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

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
