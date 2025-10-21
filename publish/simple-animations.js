// ============================================
// EXO Digital Studio - Simple Elegant Animations
// ============================================

/**
 * Simple animation system for minimal elegant design
 */

class SimpleAnimations {
    constructor() {
        this.isInitialized = false;
        this.observers = [];
        this.config = {
            animationsEnabled: true,
            reducedMotion: false,
            animationDelay: 100
        };
    }

    /**
     * Initialize animation system
     */
    init() {
        if (this.isInitialized) return;
        
        // Check for reduced motion preference
        this.config.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!this.config.reducedMotion) {
            this.initScrollAnimations();
            this.initHoverEffects();
            this.initIntersectionObserver();
        }
        
        this.isInitialized = true;
        console.log('🎨 Simple animations initialized');
    }

    /**
     * Scroll-based animations
     */
    initScrollAnimations() {
        let ticking = false;
        
        const updateScrollAnimations = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const yPos = rate / 2;
            
            // Subtle parallax for profile card
            const profileCard = document.querySelector('.profile-card');
            if (profileCard) {
                profileCard.style.transform = `translateY(${yPos}px)`;
            }
            
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
     * Enhanced hover effects
     */
    initHoverEffects() {
        // Contact items hover effect
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.addHoverEffect(e.target);
            });
            
            item.addEventListener('mouseleave', (e) => {
                this.removeHoverEffect(e.target);
            });
        });

        // Profile image hover effect
        const profileImg = document.querySelector('.profile-img');
        if (profileImg) {
            profileImg.addEventListener('mouseenter', () => {
                profileImg.style.transform = 'scale(1.05)';
            });
            
            profileImg.addEventListener('mouseleave', () => {
                profileImg.style.transform = 'scale(1)';
            });
        }

        // Action buttons hover effect
        const actionBtns = document.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });
    }

    /**
     * Add hover effect to element
     */
    addHoverEffect(element) {
        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    /**
     * Remove hover effect from element
     */
    removeHoverEffect(element) {
        // Keep transition for smooth return
    }

    /**
     * Intersection Observer for scroll-triggered animations
     */
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * this.config.animationDelay);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.profile-card, .contact-section, .action-buttons, .company-card, .footer');
        animatedElements.forEach(el => observer.observe(el));
    }

    /**
     * Create ripple effect
     */
    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
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
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * Add CSS for new animations
     */
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .animate-in {
                animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
            
            .profile-card,
            .contact-section,
            .action-buttons,
            .company-card,
            .footer {
                opacity: 0;
            }
            
            .profile-card.animate-in {
                animation-delay: 0.1s;
            }
            
            .contact-section.animate-in {
                animation-delay: 0.2s;
            }
            
            .action-buttons.animate-in {
                animation-delay: 0.3s;
            }
            
            .company-card.animate-in {
                animation-delay: 0.4s;
            }
            
            .footer.animate-in {
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
        
        // Disconnect observers
        this.observers.forEach(observer => observer.disconnect());
        
        this.isInitialized = false;
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const animations = new SimpleAnimations();
    animations.addAnimationStyles();
    animations.init();
    
    // Make available globally
    window.simpleAnimations = animations;
    
    // Add ripple effects to buttons
    document.querySelectorAll('.action-btn, .modal-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            animations.createRipple(e, button);
        });
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleAnimations;
}