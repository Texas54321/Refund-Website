// ====== GSAP-STYLE ANIMATIONS (NO LIBRARY REQUIRED) ======

// Stagger animation class
class StaggerAnimation {
    constructor(selector, options = {}) {
        this.elements = document.querySelectorAll(selector);
        this.options = {
            delay: 0.1,
            duration: 0.6,
            ...options
        };
    }

    animate() {
        this.elements.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, i * this.options.delay * 1000);
        });
    }
}

// Initialize stagger animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Stagger stat animations
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, i) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = `all 0.6s ease-out ${i * 0.15}s`;
    });

    setTimeout(() => {
        stats.forEach((stat) => {
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        });
    }, 100);

    // Step card entrance animation
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${i * 0.2}s`;
    });

    setTimeout(() => {
        stepCards.forEach((card) => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 100);
});

// ====== COUNTER ANIMATION ======
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animations when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const number = entry.target.querySelector('.stat-number');
            if (number && !isNaN(number.textContent)) {
                const value = parseInt(number.textContent.replace(/[^0-9]/g, ''));
                animateCounter(number, value);
                entry.target.dataset.animated = 'true';
            }
            statsObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ====== MOUSE FOLLOW ANIMATION ======
function initMouseFollowAnimation() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const cubes = document.querySelectorAll('.floating-cube');
        cubes.forEach((cube, i) => {
            const speed = 5 + i * 2;
            const x = (mouseX - window.innerWidth / 2) / speed;
            const y = (mouseY - window.innerHeight / 2) / speed;

            cube.style.transform += ` translateX(${x}px) translateY(${y}px)`;
        });
    });
}

// Only enable on desktop
if (window.innerWidth > 768) {
    initMouseFollowAnimation();
}

// ====== GLOW EFFECT ON HOVER ======
function initGlowEffect() {
    const interactiveElements = document.querySelectorAll('.btn, .bento-item, .step-card, .security-item');

    interactiveElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            el.style.setProperty('--mouse-x', x + 'px');
            el.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

// Add glow effect CSS
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    .bento-item,
    .step-card,
    .security-item {
        position: relative;
        --mouse-x: 0px;
        --mouse-y: 0px;
    }

    .bento-item::before,
    .step-card::before,
    .security-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        opacity: 0;
        background: radial-gradient(
            600px at var(--mouse-x) var(--mouse-y),
            rgba(0, 255, 136, 0.1),
            transparent 80%
        );
        pointer-events: none;
        transition: opacity 0.3s ease;
    }

    .bento-item:hover::before,
    .step-card:hover::before,
    .security-item:hover::before {
        opacity: 1;
    }
`;
document.head.appendChild(glowStyle);

initGlowEffect();

// ====== WORD-BY-WORD ANIMATION FOR TITLES ======
function animateTextReveal(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(el => {
        const text = el.textContent;
        const words = text.split(' ');
        el.innerHTML = words
            .map(
                (word, i) =>
                    `<span style="opacity: 0; display: inline-block; animation: fadeInWord 0.6s ease-out ${i * 0.1}s forwards; margin-right: 0.3em;">${word}</span>`
            )
            .join('');
    });
}

// Add word animation CSS
const wordAnimStyle = document.createElement('style');
wordAnimStyle.textContent = `
    @keyframes fadeInWord {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(wordAnimStyle);

document.addEventListener('DOMContentLoaded', () => {
    animateTextReveal('.hero-title');
});

// ====== SCROLL PROGRESS BAR ======
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00ff88 0%, #4f46e5 100%);
        width: 0%;
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercentage =
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });
}

initScrollProgress();

// ====== FOCUS ANIMATION ON FORM INPUTS ======
function initFormAnimations() {
    const inputs = document.querySelectorAll('input[type="email"], input[type="text"], textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = '#00ff88';
            this.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2)';
        });

        input.addEventListener('blur', function () {
            this.style.borderColor = 'rgba(0, 255, 136, 0.3)';
            this.style.boxShadow = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', initFormAnimations);

// ====== BENTO GRID ITEM ANIMATIONS ======
function initBentoAnimations() {
    const bentoItems = document.querySelectorAll('.bento-item');
    let animationStarted = false;

    const bentoObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !animationStarted) {
                    bentoItems.forEach((item, i) => {
                        item.style.animation = `slideUp 0.6s ease-out ${i * 0.1}s both`;
                    });
                    animationStarted = true;
                }
            });
        },
        { threshold: 0.2 }
    );

    if (bentoItems.length > 0) {
        bentoObserver.observe(bentoItems[0].parentElement);
    }
}

// Add slide-up animation
const bentoAnimStyle = document.createElement('style');
bentoAnimStyle.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(bentoAnimStyle);

document.addEventListener('DOMContentLoaded', initBentoAnimations);

// ====== NOTIFICATION PING EFFECT ======
function addNotificationPing() {
    const notificationIcon = document.querySelector('.notification-icon');
    if (!notificationIcon) return;

    const pingStyle = document.createElement('style');
    pingStyle.textContent = `
        .notification-icon {
            position: relative;
            animation: ping-animation 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping-animation {
            75%,
            100% {
                transform: scale(1.2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(pingStyle);
}

document.addEventListener('DOMContentLoaded', addNotificationPing);

// ====== HOVER LIFT EFFECT ======
function initHoverLiftEffect() {
    const liftableElements = document.querySelectorAll('.step-card, .bento-item, .security-item');

    liftableElements.forEach((el) => {
        el.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-12px)';
        });

        el.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

document.addEventListener('DOMContentLoaded', initHoverLiftEffect);

console.log('✨ Quick Refund animations initialized');
