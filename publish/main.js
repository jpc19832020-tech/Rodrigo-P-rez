// ============================================
// FOTON Business Card - Enhanced JavaScript
// ============================================

// Global state
let currentSlide = 0;
let slideInterval;
let isCarouselPaused = false;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Show toast notification with animation
 */
function showToast(message, duration = 3000) {
    // Remove any existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
    });
    
    // Remove toast after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

/**
 * Copy text to clipboard with fallback
 */
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                textArea.remove();
                return true;
            } catch (err) {
                console.error('Fallback: Could not copy text', err);
                textArea.remove();
                return false;
            }
        }
    } catch (err) {
        console.error('Failed to copy text', err);
        return false;
    }
}

// ============================================
// PHONE COPY FUNCTIONALITY
// ============================================

/**
 * Copy phone number to clipboard
 */
async function copyPhone() {
    const phoneNumber = '+51 976 330 377';
    const success = await copyToClipboard(phoneNumber);
    
    if (success) {
        showToast('📱 Teléfono copiado / Phone copied');
        
        // Add visual feedback to button
        const phoneBtn = document.querySelector('.btn-phone');
        if (phoneBtn) {
            phoneBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                phoneBtn.style.transform = '';
            }, 150);
        }
    } else {
        showToast('❌ No se pudo copiar el teléfono');
    }
}

/**
 * Copy office phone number to clipboard
 */
async function copyOfficePhone() {
    const officePhoneNumber = '(51-1) 616-7610 anexo 5483';
    const success = await copyToClipboard(officePhoneNumber);
    
    if (success) {
        showToast('📱 Teléfono de oficina copiado / Office phone copied');
        
        // Add visual feedback to button
        const officePhoneBtn = document.querySelector('.btn-phone:nth-child(3)');
        if (officePhoneBtn) {
            officePhoneBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                officePhoneBtn.style.transform = '';
            }, 150);
        }
    } else {
        showToast('❌ No se pudo copiar el teléfono de oficina');
    }
}

// ============================================
// WECHAT ID COPY FUNCTIONALITY
// ============================================

/**
 * Copy WeChat ID to clipboard
 */
async function copyWeChatID() {
    const wechatID = '';
    const success = await copyToClipboard(wechatID);
    
    if (success) {
        showToast('💬 WeChat ID copiado');
        
        // Add visual feedback to button
        const wechatBtn = document.querySelector('.btn-wechat');
        if (wechatBtn) {
            wechatBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                wechatBtn.style.transform = '';
            }, 150);
        }
    } else {
        showToast('❌ No se pudo copiar el WeChat ID');
    }
}

// ============================================
// SHARE FUNCTIONALITY
// ============================================

/**
 * Share card using Web Share API or fallback modal
 */
async function shareCard() {
    const shareData = {
        title: 'Tarjeta de Miexy Marcani Benites',
        text: 'Contacto y enlaces de Miexy Marcani Benites',
        url: window.location.href
    };

    // Try Web Share API first
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData);
            console.log('Shared successfully');
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.log('Error sharing:', err);
                showShareModal();
            }
        }
    } else {
        // Fallback to modal
        showShareModal();
    }
}

/**
 * Show share modal with QR code
 */
function showShareModal() {
    // Remove any existing modal
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn" aria-label="Cerrar">&times;</button>
            <div class="modal-header">
                <h2>Compartir tarjeta</h2>
            </div>
            <div class="modal-body">
                <p>Escanea el QR o copia el enlace</p>
                <div id="qrcode" class="qr-container"></div>
                <div class="link-container">
                    <input type="text" id="share-link" value="${window.location.href}" readonly>
                    <button class="copy-link-btn">
                        <svg style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        Copiar enlace
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Trigger animation
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-btn');
    const copyBtn = modal.querySelector('.copy-link-btn');
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    copyBtn.addEventListener('click', async () => {
        const success = await copyToClipboard(window.location.href);
        if (success) {
            showToast('🔗 Enlace copiado');
            copyBtn.textContent = '✓ Copiado';
            setTimeout(() => {
                copyBtn.innerHTML = `
                    <svg style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    Copiar enlace
                `;
            }, 2000);
        }
    });
    
    // Generate QR code
    generateQRCode('qrcode', window.location.href);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

/**
 * Close modal with animation
 */
function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        document.body.style.overflow = '';
    }, 300);
}

/**
 * Generate QR code using canvas
 */
function generateQRCode(containerId, text) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    const size = 200;
    canvas.width = size;
    canvas.height = size;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    // Create QR-like pattern
    ctx.fillStyle = '#000000';
    const blockSize = 10;
    const blocks = size / blockSize;
    
    // Generate pattern based on URL
    const hash = text.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    for (let x = 0; x < blocks; x++) {
        for (let y = 0; y < blocks; y++) {
            const seed = (x * blocks + y + hash) % 100;
            
            // Create pattern
            if (seed % 3 === 0 || (x < 4 && y < 4) || (x > blocks - 5 && y < 4) || (x < 4 && y > blocks - 5)) {
                ctx.fillStyle = seed % 5 === 0 ? '#0D58A3' : '#000000';
                ctx.fillRect(x * blockSize, y * blockSize, blockSize - 1, blockSize - 1);
            }
        }
    }
    
    // Corner markers
    const drawCorner = (x, y) => {
        ctx.fillStyle = '#000000';
        ctx.fillRect(x, y, 50, 50);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 10, y + 10, 30, 30);
        ctx.fillStyle = '#0D58A3';
        ctx.fillRect(x + 15, y + 15, 20, 20);
    };
    
    drawCorner(0, 0);
    drawCorner(size - 50, 0);
    drawCorner(0, size - 50);
}

// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================

/**
 * Initialize carousel with auto-play and swipe support
 */
function initCarousel(options = { interval: 5000 }) {
    const slides = document.querySelectorAll('.carousel-item');
    const carousel = document.querySelector('.carousel');
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (!slides.length || !carousel || !carouselContainer) return;
    
    // Create indicators
    createIndicators(slides.length);
    
    // Update initial state
    updateCarousel();
    
    // Start auto-play
    startCarousel(options.interval);
    
    // Pause on hover
    carouselContainer.addEventListener('mouseenter', pauseCarousel);
    carouselContainer.addEventListener('mouseleave', () => {
        if (!isCarouselPaused) {
            startCarousel(options.interval);
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        pauseCarousel();
    }, { passive: true });
    
    carouselContainer.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
    }, { passive: true });
    
    carouselContainer.addEventListener('touchend', () => {
        handleSwipe(touchStartX, touchEndX, touchStartY, touchEndY);
        if (!isCarouselPaused) {
            startCarousel(options.interval);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

/**
 * Create indicator dots
 */
function createIndicators(count) {
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const indicator = document.createElement('button');
        indicator.className = 'indicator';
        indicator.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
        indicator.addEventListener('click', () => goToSlide(i));
        
        if (i === 0) {
            indicator.classList.add('active');
        }
        
        indicatorsContainer.appendChild(indicator);
    }
}

/**
 * Update carousel position and indicators
 */
function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carousel) return;
    
    // Update carousel position with smooth animation
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

/**
 * Go to next slide
 */
function nextSlide() {
    const slides = document.querySelectorAll('.carousel-item');
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

/**
 * Go to previous slide
 */
function prevSlide() {
    const slides = document.querySelectorAll('.carousel-item');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

/**
 * Go to specific slide
 */
function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    pauseCarousel();
    isCarouselPaused = true;
    
    // Resume after 3 seconds
    setTimeout(() => {
        isCarouselPaused = false;
        startCarousel(5000);
    }, 3000);
}

/**
 * Start carousel auto-play
 */
function startCarousel(interval) {
    stopCarousel();
    slideInterval = setInterval(nextSlide, interval);
}

/**
 * Pause carousel
 */
function pauseCarousel() {
    stopCarousel();
}

/**
 * Stop carousel
 */
function stopCarousel() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

/**
 * Handle swipe gesture
 */
function handleSwipe(startX, endX, startY, endY) {
    const minSwipeDistance = 50;
    const swipeDistanceX = startX - endX;
    const swipeDistanceY = Math.abs(startY - endY);
    
    // Only process horizontal swipes
    if (swipeDistanceY < 100 && Math.abs(swipeDistanceX) > minSwipeDistance) {
        if (swipeDistanceX > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Business Card initialized');
    
    // Initialize carousel
    initCarousel({ interval: 5000 });
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Log performance metrics
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        });
    }
});

// ============================================
// LIGHTBOX FUNCTIONALITY
// ============================================

let currentLightboxSlide = 0;

/**
 * Open lightbox with single image
 */
function openLightbox(imageSrc, imageAlt) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (!lightbox || !lightboxImg) return;
    
    lightboxImg.src = imageSrc;
    lightboxImg.alt = imageAlt;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close on ESC key
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

/**
 * Close single image lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Open gallery lightbox
 */
function openGalleryLightbox() {
    const galleryLightbox = document.getElementById('gallery-lightbox');
    if (!galleryLightbox) return;
    
    // Set current slide to match main carousel
    currentLightboxSlide = currentSlide;
    
    // Create indicators for lightbox carousel
    createLightboxIndicators(3);
    
    // Update lightbox carousel
    updateLightboxCarousel();
    
    galleryLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close on ESC key
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeGalleryLightbox();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
    
    // Close on background click
    galleryLightbox.addEventListener('click', (e) => {
        if (e.target === galleryLightbox) {
            closeGalleryLightbox();
        }
    });
    
    // Add swipe support for lightbox
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    const lightboxCarouselContainer = galleryLightbox.querySelector('.lightbox-carousel-container');
    
    lightboxCarouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    lightboxCarouselContainer.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
    }, { passive: true });
    
    lightboxCarouselContainer.addEventListener('touchend', () => {
        handleLightboxSwipe(touchStartX, touchEndX, touchStartY, touchEndY);
    });
}

/**
 * Close gallery lightbox
 */
function closeGalleryLightbox() {
    const galleryLightbox = document.getElementById('gallery-lightbox');
    if (!galleryLightbox) return;
    
    galleryLightbox.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Create indicators for lightbox carousel
 */
function createLightboxIndicators(count) {
    const indicatorsContainer = document.querySelector('.lightbox-carousel-indicators');
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const indicator = document.createElement('button');
        indicator.className = 'indicator';
        indicator.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
        indicator.addEventListener('click', (e) => {
            e.stopPropagation();
            goToLightboxSlide(i);
        });
        
        if (i === currentLightboxSlide) {
            indicator.classList.add('active');
        }
        
        indicatorsContainer.appendChild(indicator);
    }
}

/**
 * Update lightbox carousel position
 */
function updateLightboxCarousel() {
    const lightboxCarousel = document.querySelector('.lightbox-carousel');
    const indicators = document.querySelectorAll('.lightbox-carousel-indicators .indicator');
    
    if (!lightboxCarousel) return;
    
    lightboxCarousel.style.transform = `translateX(-${currentLightboxSlide * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentLightboxSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

/**
 * Next slide in lightbox
 */
function nextLightboxSlide(event) {
    if (event) event.stopPropagation();
    const slides = document.querySelectorAll('.lightbox-carousel-item');
    currentLightboxSlide = (currentLightboxSlide + 1) % slides.length;
    updateLightboxCarousel();
}

/**
 * Previous slide in lightbox
 */
function prevLightboxSlide(event) {
    if (event) event.stopPropagation();
    const slides = document.querySelectorAll('.lightbox-carousel-item');
    currentLightboxSlide = (currentLightboxSlide - 1 + slides.length) % slides.length;
    updateLightboxCarousel();
}

/**
 * Go to specific slide in lightbox
 */
function goToLightboxSlide(index) {
    currentLightboxSlide = index;
    updateLightboxCarousel();
}

/**
 * Handle swipe in lightbox
 */
function handleLightboxSwipe(startX, endX, startY, endY) {
    const minSwipeDistance = 50;
    const swipeDistanceX = startX - endX;
    const swipeDistanceY = Math.abs(startY - endY);
    
    if (swipeDistanceY < 100 && Math.abs(swipeDistanceX) > minSwipeDistance) {
        if (swipeDistanceX > 0) {
            nextLightboxSlide();
        } else {
            prevLightboxSlide();
        }
    }
}

// ============================================
// EXPORT FUNCTIONS FOR INLINE HANDLERS
// ============================================

// Make functions available globally for inline onclick handlers
window.copyPhone = copyPhone;
window.copyOfficePhone = copyOfficePhone;
window.copyWeChatID = copyWeChatID;
window.shareCard = shareCard;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.openGalleryLightbox = openGalleryLightbox;
window.closeGalleryLightbox = closeGalleryLightbox;
window.nextLightboxSlide = nextLightboxSlide;
window.prevLightboxSlide = prevLightboxSlide;

// ============================================
// LANGUAGE SWITCHING FUNCTIONALITY
// ============================================

let currentLanguage = 'es'; // Default language is Spanish

const translations = {
    es: {
        phone: 'Teléfono',
        officePhone: 'Teléfono oficina',
        whatsapp: 'WhatsApp',
        whatsappText: 'Escríbeme por WhatsApp',
        email: 'Correo',
        emailCorp: 'Correo corporativo',
        website: 'Sitio web',
        wechat: 'WeChat ID',
        facebook: 'Facebook',
        facebookText: 'Perfil de Facebook',
        location: 'Oficina Lima',
        shareCard: 'Compartir tarjeta',
        gallery: 'Galería',
        gallerySubtitle: '',
       
       
        contact: 'Contacto',
     
        regionSubtitle: 'Innovación y soporte integral',
        info1: 'Cadena de suministro optimizada para proyectos industriales, minería y construcción.',
        info2: 'Soporte técnico y capacitación personalizada para flotas en operación en Perú.',
        info3: 'Red global de repuestos y servicios con presencia en más de 110 países.',
        phoneCopied: '📱 Teléfono copiado',
        wechatCopied: '💬 WeChat ID copiado',
        linkCopied: '🔗 Enlace copiado',
        shareTitle: 'Compartir tarjeta',
        shareText: 'Escanea el QR o copia el enlace',
        copyLink: 'Copiar enlace',
        copied: '✓ Copiado',
        companyDescription: 'Costamar Corporate Travel es la división especializada en viajes de negocios y MICE del Grupo Costamar. Ofrecemos soluciones integrales para la gestión de viajes corporativos, reuniones, congresos, ferias y viajes de incentivo, asegurando eficiencia, ahorro y experiencias memorables para nuestros clientes empresariales.',
        footerCTAText: 'Haz de tu presentación una experiencia digital. Obtén tu SmartCard ahora.',
        whatsappMessage: 'Hola%20Miexy,%20te%20contacto%20desde%20tu%20tarjeta%20web.',
        emailSubject: 'Consulta%20%E2%80%93%20Tarjeta%20Web',
        emailBody: 'Hola%20Miexy,'
    },
    en: {
        phone: 'Phone',
        officePhone: 'Office Phone',
        whatsapp: 'WhatsApp',
        whatsappText: 'Message me on WhatsApp',
        email: 'Email',
        emailCorp: 'Corporate Email',
        website: 'Website',
        wechat: 'WeChat ID',
        facebook: 'Facebook',
        facebookText: 'Facebook Profile',
        location: 'Lima Office',
        shareCard: 'Share Card',
        gallery: 'Gallery',
        
        
        
        contact: 'Contact',
        
        regionSubtitle: 'Innovation and comprehensive support',
        
        phoneCopied: '📱 Phone copied',
        wechatCopied: '💬 WeChat ID copied',
        linkCopied: '🔗 Link copied',
        shareTitle: 'Share card',
        shareText: 'Scan the QR or copy the link',
        copyLink: 'Copy link',
        copied: '✓ Copied',
        companyDescription: 'Costamar Corporate Travel is the specialized division in business travel and MICE of the Costamar Group. We offer comprehensive solutions for corporate travel management, meetings, congresses, fairs and incentive trips, ensuring efficiency, savings and memorable experiences for our business clients.',
        footerCTAText: 'Make your presentation a digital experience. Get your SmartCard now.',
        whatsappMessage: 'Hello%20Miexy,%20I%27m%20contacting%20you%20from%20your%20web%20card.',
        emailSubject: 'Inquiry%20%E2%80%93%20%20',
        emailBody: 'Hello%20Miexy,'
    }
};

/**
 * Toggle between Spanish and English
 */
function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    updatePageLanguage();
    
    // Update button text
    const langText = document.getElementById('langText');
    if (langText) {
        langText.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
    }
    
    // Save preference
    localStorage.setItem('preferredLanguage', currentLanguage);
    
    // Show toast
    showToast(currentLanguage === 'es' ? '🌐 Idioma: Español' : '🌐 Language: English');
}

/**
 * Update all text content based on current language
 */
function updatePageLanguage() {
    const t = translations[currentLanguage];
    
    // Update document language
    document.documentElement.lang = currentLanguage;
    
    // Update contact section labels
    const labels = {
        'Teléfono': t.phone,
        'Phone': t.phone,
        'Teléfono oficina': t.officePhone,
        'Office Phone': t.officePhone,
        'WhatsApp': t.whatsapp,
        'Correo': t.email,
        'Email': t.email,
        'Correo corporativo': t.emailCorp,
        'Corporate Email': t.emailCorp,
        'Sitio web': t.website,
        'Website': t.website,
        'WeChat ID': t.wechat,
        'Facebook': t.facebook,
        'Oficina Lima': t.location,
        'Lima Office': t.location
    };
    
    document.querySelectorAll('.btn-label').forEach(label => {
        const currentText = label.textContent.trim();
        if (labels[currentText]) {
            label.textContent = labels[currentText];
        }
    });
    
    // Update specific button texts
    const whatsappBtn = document.querySelector('.btn-whatsapp .btn-text');
    if (whatsappBtn && (whatsappBtn.textContent.includes('Escríbeme') || whatsappBtn.textContent.includes('Message'))) {
        whatsappBtn.textContent = t.whatsappText;
    }
    
    const facebookBtn = document.querySelector('.btn-facebook .btn-text');
    if (facebookBtn && (facebookBtn.textContent.includes('Perfil') || facebookBtn.textContent.includes('Profile'))) {
        facebookBtn.textContent = t.facebookText;
    }
    
    // Update section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        if (title.textContent.includes('Representante') || title.textContent.includes('Representative')) {
            title.textContent = t.representative;
        } else if (title.textContent.includes('Contacto') || title.textContent.includes('Contact')) {
            title.textContent = t.contact;
        } else if (title.textContent.includes('Galería') || title.textContent.includes('Gallery')) {
            title.textContent = t.gallery;
        }
    });
    
    // Update gallery subtitle
    const gallerySubtitle = document.querySelector('.gallery-subtitle');
    if (gallerySubtitle) {
        gallerySubtitle.textContent = t.gallerySubtitle;
    }
    
    // Update vision badges
    document.querySelectorAll('.vision-badge, .lightbox-vision-badge').forEach(badge => {
        const textNode = Array.from(badge.childNodes).find(node => node.nodeType === 3);
        if (textNode) {
            textNode.textContent = t.vision360;
        }
    });
    
    // Update share button
    const shareButton = document.querySelector('.share-button');
    if (shareButton) {
        // Find the text node more specifically and replace it
        const textNode = Array.from(shareButton.childNodes).find(node =>
            node.nodeType === 3 && node.textContent.trim() !== ''
        );
        if (textNode) {
            textNode.textContent = t.shareCard;
        } else {
            // If no text node found, add one after the SVG
            const svg = shareButton.querySelector('svg');
            if (svg) {
                const textNode = document.createTextNode(t.shareCard);
                svg.parentNode.insertBefore(textNode, svg.nextSibling);
            }
        }
    }
    
    // Update region section
    const regionTitle = document.querySelector('.section-title-large');
    if (regionTitle) {
        regionTitle.textContent = t.regionTitle;
    }
    
    const regionSubtitle = document.querySelector('.info-subtitle');
    if (regionSubtitle) {
        regionSubtitle.textContent = t.regionSubtitle;
    }
    
    // Update info items
    const infoItems = document.querySelectorAll('.info-item p');
    if (infoItems.length >= 3) {
        infoItems[0].textContent = t.info1;
        infoItems[1].textContent = t.info2;
        infoItems[2].textContent = t.info3;
    }
    
    // Update company description
    const companyDescription = document.querySelector('.company-description p');
    if (companyDescription) {
        companyDescription.textContent = t.companyDescription;
    }
    
    // Update footer CTA text
    const footerCTAText = document.querySelector('.footer-cta-text');
    if (footerCTAText) {
        footerCTAText.textContent = t.footerCTAText;
    }
    
    // Update WhatsApp link
    const whatsappLink = document.querySelector('.btn-whatsapp');
    if (whatsappLink) {
        const phoneNumber = whatsappLink.href.match(/wa\.me\/(\d+)/)[1];
        whatsappLink.href = `https://wa.me/${phoneNumber}?text=${t.whatsappMessage}`;
    }
    
    // Update email link
    const emailLink = document.querySelector('.btn-email');
    if (emailLink) {
        const emailAddress = emailLink.href.match(/mailto:([^?]+)/)[1];
        emailLink.href = `mailto:${emailAddress}?subject=${t.emailSubject}&body=${t.emailBody}`;
    }
    
    // Update footer WhatsApp link
    const footerWhatsappLink = document.querySelector('.footer-whatsapp-btn');
    if (footerWhatsappLink) {
        const phoneNumber = footerWhatsappLink.href.match(/wa\.me\/(\d+)/)[1];
        footerWhatsappLink.href = `https://wa.me/${phoneNumber}?text=${t.whatsappMessage}`;
    }
}

/**
 * Initialize language on page load
 */
function initLanguage() {
    // Check for saved preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
        currentLanguage = savedLang;
    }
    
    // Update button text
    const langText = document.getElementById('langText');
    if (langText) {
        langText.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
    }
    
    // Apply language if not Spanish (default)
    if (currentLanguage === 'en') {
        updatePageLanguage();
    }
}

// Make toggleLanguage available globally
window.toggleLanguage = toggleLanguage;

// Initialize language when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}