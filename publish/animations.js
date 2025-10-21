// ============================================
// FUTURISTIC ORGANIC ANIMATIONS SYSTEM
// ============================================

/**
 * Advanced Animation Controller for Futuristic Design
 */

class FuturisticAnimations {
    constructor() {
        this.isInitialized = false;
        this.particles = [];
        this.observers = [];
        this.scrollY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.config = {
            particlesEnabled: true,
            scrollAnimationsEnabled: true,
            mouseEffectsEnabled: true,
            reducedMotion: false
        };
    }

    /**
     * Initialize all animation systems
     */
    init() {
        if (this.isInitialized) return;
        
        // Check for reduced motion preference
        this.config.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!this.config.reducedMotion) {
            this.initScrollAnimations();
            this.initMouseEffects();
            this.initParticleSystem();
            this.initRippleEffects();
            this.initParallaxEffects();
            this.initIntersectionObservers();
        }
        
        this.isInitialized = true;
        console.log('🚀 Futuristic animations initialized');
    }

    /**
     * Scroll-based animations with parallax
     */
    initScrollAnimations() {
        let ticking = false;
        
        const updateScrollAnimations = () => {
            this.scrollY = window.pageYOffset;
            
            // Parallax effects for different elements
            this.applyParallax('.header-card', 0.5);
            this.applyParallax('.title-card', 0.3);
            this.applyParallax('.contact-card', 0.2);
            this.applyParallax('.company-card', 0.4);
            
            // Floating particles movement
            this.updateParticlesOnScroll();
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    /**
     * Apply parallax effect to elements
     */
    applyParallax(selector, speed) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + this.scrollY;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            // Only apply if element is in view
            if (elementTop < this.scrollY + windowHeight && 
                elementTop + elementHeight > this.scrollY) {
                
                const yPos = -(this.scrollY - elementTop) * speed;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    /**
     * Mouse-following effects and interactive elements
     */
    initMouseEffects() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Glow effect following mouse
            this.updateMouseGlow(e);
            
            // Interactive card tilting
            this.updateCardTilt(e);
        });
    }

    /**
     * Create mouse glow effect
     */
    updateMouseGlow(e) {
        const glow = document.querySelector('.mouse-glow');
        if (!glow) {
            const glowElement = document.createElement('div');
            glowElement.className = 'mouse-glow';
            glowElement.style.cssText = `
                position: fixed;
                width: 400px;
                height: 400px;
                background: radial-gradient(circle, rgba(0, 201, 255, 0.1) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(glowElement);
        }
        
        const glowElement = document.querySelector('.mouse-glow');
        glowElement.style.left = `${e.clientX}px`;
        glowElement.style.top = `${e.clientY}px`;
    }

    /**
     * Interactive card tilting based on mouse position
     */
    updateCardTilt(e) {
        const cards = document.querySelectorAll('.header-card, .contact-card, .company-card');
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const angleX = (e.clientY - cardCenterY) * 0.01;
            const angleY = (e.clientX - cardCenterX) * -0.01;
            
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
                card.style.boxShadow = `
                    ${-angleY * 10}px ${angleX * 10}px 20px rgba(0, 201, 255, 0.3),
                    var(--shadow-glass)
                `;
            }
        });
    }

    /**
     * Particle system for ambient animation
     */
    initParticleSystem() {
        if (!this.config.particlesEnabled) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        `;
        document.body.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(particleContainer);
        }
    }

    /**
     * Create individual particle
     */
    createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(0, 201, 255, 0.8) 0%, rgba(146, 254, 157, 0.4) 100%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${duration}s ${delay}s ease-in-out infinite;
            box-shadow: 0 0 10px rgba(0, 201, 255, 0.5);
        `;
        
        container.appendChild(particle);
        this.particles.push(particle);
    }

    /**
     * Update particles based on scroll
     */
    updateParticlesOnScroll() {
        this.particles.forEach((particle, index) => {
            const currentTransform = particle.style.transform || '';
            const translateY = this.scrollY * 0.1 * (index % 3 + 1);
            particle.style.transform = `${currentTransform} translateY(${translateY}px)`;
        });
    }

    /**
     * Ripple effect for buttons and interactive elements
     */
    initRippleEffects() {
        const buttons = document.querySelectorAll('.contact-btn, .share-button, .footer-whatsapp-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }

    /**
     * Create ripple effect at click position
     */
    createRipple(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * Enhanced parallax for background elements
     */
    initParallaxEffects() {
        // Parallax for pseudo-elements
        const style = document.createElement('style');
        style.textContent = `
            .header-card::after {
                transform: translateY(${this.scrollY * 0.2}px);
            }
            
            .contact-card::after {
                transform: translateY(${this.scrollY * 0.15}px);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Intersection Observer for scroll-triggered animations
     */
    initIntersectionObservers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100); // Staggered animation
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.header-card, .title-card, .contact-card, .company-card, .share-button');
        animatedElements.forEach(el => observer.observe(el));
    }

    /**
     * Add CSS for new animations
     */
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translateY(0px) translateX(0px) rotate(0deg);
                    opacity: 0.8;
                }
                25% {
                    transform: translateY(-20px) translateX(10px) rotate(90deg);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-10px) translateX(-10px) rotate(180deg);
                    opacity: 0.9;
                }
                75% {
                    transform: translateY(-30px) translateX(5px) rotate(270deg);
                    opacity: 0.7;
                }
            }
            
            .animate-in {
                animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
            
            .header-card,
            .title-card,
            .contact-card,
            .company-card,
            .share-button {
                opacity: 0;
                transform: translateY(30px);
            }
            
            .header-card.animate-in {
                animation-delay: 0.1s;
            }
            
            .title-card.animate-in {
                animation-delay: 0.2s;
            }
            
            .contact-card.animate-in {
                animation-delay: 0.3s;
            }
            
            .company-card.animate-in {
                animation-delay: 0.4s;
            }
            
            .share-button.animate-in {
                animation-delay: 0.5s;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Clean up animation listeners
     */
    destroy() {
        // Remove event listeners
        window.removeEventListener('scroll', this.updateScrollAnimations);
        document.removeEventListener('mousemove', this.updateMouseEffects);
        
        // Remove particles
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
        
        // Remove particle container
        const particleContainer = document.querySelector('.particle-container');
        if (particleContainer) particleContainer.remove();
        
        // Remove mouse glow
        const mouseGlow = document.querySelector('.mouse-glow');
        if (mouseGlow) mouseGlow.remove();
        
        this.isInitialized = false;
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const animations = new FuturisticAnimations();
    animations.addAnimationStyles();
    animations.init();
    
    // Make available globally
    window.futuristicAnimations = animations;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FuturisticAnimations;
}