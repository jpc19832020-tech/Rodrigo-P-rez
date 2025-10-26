// ============================================
// FOTON Business Card - Enhanced JavaScript
// ============================================

// Global state

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
    const phoneNumber = window.appConfig ? window.appConfig.contactInfo.phone : '+51976330377';
    const success = await copyToClipboard(phoneNumber);
    
    if (success) {
        const t = currentLanguage === 'en' ? '📱 Phone copied' : '📱 Teléfono copiado';
        showToast(t);
        
        // Add visual feedback to button
        const phoneBtn = document.querySelector('.btn-phone');
        if (phoneBtn) {
            phoneBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                phoneBtn.style.transform = '';
            }, 150);
        }
    } else {
        const t = currentLanguage === 'en' ? '❌ Could not copy phone' : '❌ No se pudo copiar el teléfono';
        showToast(t);
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
    const config = window.appConfig;
    const shareData = {
        title: config ? config.seo.title : 'Tarjeta de Rodrigo Pérez',
        text: config ? `Contacto y enlaces de ${config.personalInfo.name}` : 'Contacto y enlaces de Rodrigo Pérez',
        url: config ? config.urls.website : window.location.href
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
 * Share QR using a professional lightbox
 */
async function shareQR() {
    // Get current language translations
    const t = translations[currentLanguage];
    
    // Remove any existing modal
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content qr-modal-content">
            <button class="close-btn" aria-label="${currentLanguage === 'es' ? 'Cerrar' : 'Close'}">&times;</button>
            <div class="modal-header">
                <h2>${t.shareQRTitle}</h2>
            </div>
            <div class="modal-body qr-modal-body">
                <div class="qr-image-container">
                    <img src="${window.appConfig ? window.appConfig.images.qrCode : 'assets/img/QR_Costamar.png'}" alt="QR Costamar" class="qr-image">
                </div>
                <p class="qr-description">${t.shareQRText}</p>
                <div class="qr-actions">
                    <button class="qr-download-btn">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                        </svg>
                        ${t.downloadQR}
                    </button>
                    <button class="qr-copy-btn">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        ${t.copyLink}
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
    const downloadBtn = modal.querySelector('.qr-download-btn');
    const copyBtn = modal.querySelector('.qr-copy-btn');
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Download QR image
    downloadBtn.addEventListener('click', () => {
        const config = window.appConfig;
        const qrSrc = config ? config.images.qrCode : 'assets/img/QR_Costamar.png';
        const qrName = config ? 'QR_Costamar.png' : 'QR_Costamar.png';
        
        const link = document.createElement('a');
        link.href = qrSrc;
        link.download = qrName;
        link.click();
        
        const t = currentLanguage === 'es' ? '📥 QR descargado' : '📥 QR downloaded';
        showToast(t);
    });
    
    // Copy link functionality
    copyBtn.addEventListener('click', async () => {
        const config = window.appConfig;
        const specificUrl = config ? config.urls.shareUrl : 'https://jpc19832020-tech.github.io/Rodrigo-Perez/';
        const success = await copyToClipboard(specificUrl);
        if (success) {
            const t = currentLanguage === 'es' ? '🔗 Enlace copiado' : '🔗 Link copied';
            showToast(t);
            
            const copiedText = currentLanguage === 'es' ? 'Copiado' : 'Copied';
            const copyText = currentLanguage === 'es' ? 'Copiar enlace' : 'Copy link';
            
            copyBtn.innerHTML = `
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                ${copiedText}
            `;
            setTimeout(() => {
                copyBtn.innerHTML = `
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    ${copyText}
                `;
            }, 2000);
        }
    });
    
    // Close on ESC key
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
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
        const config = window.appConfig;
        const url = config ? config.urls.website : window.location.href;
        const success = await copyToClipboard(url);
        if (success) {
            const t = currentLanguage === 'es' ? '🔗 Enlace copiado' : '🔗 Link copied';
            showToast(t);
            
            const copiedText = currentLanguage === 'es' ? '✓ Copiado' : '✓ Copied';
            const copyText = currentLanguage === 'es' ? 'Copiar enlace' : 'Copy link';
            
            copyBtn.innerHTML = `
                <svg style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                ${copiedText}
            `;
            setTimeout(() => {
                copyBtn.innerHTML = `
                    <svg style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    ${copyText}
                `;
            }, 2000);
        }
    });
    
    // Generate QR code
    const config = window.appConfig;
    const qrUrl = config ? config.urls.website : window.location.href;
    generateQRCode('qrcode', qrUrl);
    
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
// INITIALIZATION
// ============================================

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Business Card initialized');
    
    // Set current year in footer (config already handles this)
    // This is now handled by the config initialization
    
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

// ============================================
// EXPORT FUNCTIONS FOR INLINE HANDLERS
// ============================================

// Make functions available globally for inline onclick handlers
window.copyPhone = copyPhone;
window.copyWeChatID = copyWeChatID;
window.shareCard = shareCard;
window.shareQR = shareQR;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

// ============================================
// LANGUAGE SWITCHING FUNCTIONALITY
// ============================================

let currentLanguage = 'es'; // Default language is Spanish

// Load translations from config if available, otherwise use defaults
const getTranslations = () => {
    if (window.appConfig && window.appConfig.uiTexts) {
        const config = window.appConfig;
        return {
            es: {
                phone: config.uiTexts.phoneLabel || 'Teléfono',
                whatsapp: config.uiTexts.whatsappLabel || 'WhatsApp',
                whatsappText: config.uiTexts.whatsappButton || 'Escríbeme por WhatsApp',
                email: config.uiTexts.emailLabel || 'Correo',
                emailCorp: 'Correo corporativo',
                website: config.uiTexts.websiteLabel || 'Sitio web',
                websiteText: config.uiTexts.websiteText || 'Visitar mi sitio web',
                wechat: 'WeChat ID',
                facebook: config.uiTexts.facebookLabel || 'Facebook',
                facebookText: config.uiTexts.facebookText || 'Perfil de Facebook',
                instagram: config.uiTexts.instagramLabel || 'Instagram',
                instagramText: config.uiTexts.instagramText || 'Sígueme en Instagram',
                tiktok: config.uiTexts.tiktokLabel || 'TikTok',
                tiktokText: config.uiTexts.tiktokText || 'Sígueme en TikTok',
                shareCard: config.uiTexts.shareButton || 'Compartir tarjeta',
                shareQR: config.uiTexts.shareQRButton || 'Compartir QR',
                contact: 'Contacto',
                regionSubtitle: 'Innovación y soporte integral',
                info1: 'Cadena de suministro optimizada para proyectos industriales, minería y construcción.',
                info2: 'Soporte técnico y capacitación personalizada para flotas en operación en Perú.',
                info3: 'Red global de repuestos y servicios con presencia en más de 110 países.',
                phoneCopied: '📱 Teléfono copiado',
                wechatCopied: '💬 WeChat ID copiado',
                linkCopied: '🔗 Enlace copiado',
                shareTitle: 'Compartir tarjeta',
                shareQRTitle: 'Compartir QR',
                shareText: 'Escanea el QR o copia el enlace',
                shareQRText: 'Escanea este código QR para obtener más información',
                copyLink: 'Copiar enlace',
                downloadQR: 'Descargar QR',
                copied: '✓ Copiado',
                companyDescription: config.companyInfo.description || '',
                footerCTAText: config.uiTexts.footerCTA || '',
                whatsappMessage: config.messages.whatsapp || '',
                emailSubject: config.messages.emailSubject || '',
                emailBody: config.messages.emailBody || ''
            },
            en: {
                phone: 'Phone',
                whatsapp: 'WhatsApp',
                whatsappText: 'Message me on WhatsApp',
                email: 'Email',
                emailCorp: 'Corporate Email',
                website: config.uiTexts.websiteLabel || 'Website',
                websiteText: config.uiTexts.websiteText || 'Visit my website',
                wechat: 'WeChat ID',
                facebook: 'Facebook',
                facebookText: 'Facebook Profile',
                instagram: config.uiTexts.instagramLabel || 'Instagram',
                instagramText: config.uiTexts.instagramText || 'Follow me on Instagram',
                tiktok: config.uiTexts.tiktokLabel || 'TikTok',
                tiktokText: config.uiTexts.tiktokText || 'Follow me on TikTok',
                shareCard: 'Share Card',
                shareQR: 'Share QR',
                contact: 'Contact',
                regionSubtitle: 'Innovation and comprehensive support',
                phoneCopied: '📱 Phone copied',
                wechatCopied: '💬 WeChat ID copied',
                linkCopied: '🔗 Link copied',
                shareTitle: 'Share card',
                shareQRTitle: 'Share QR',
                shareText: 'Scan the QR or copy the link',
                shareQRText: 'Scan this QR code for more information',
                copyLink: 'Copy link',
                downloadQR: 'Download QR',
                copied: '✓ Copied',
                companyDescription: config.companyInfo.description || '',
                footerCTAText: config.uiTexts.footerCTA || '',
                whatsappMessage: config.messages.whatsapp || '',
                emailSubject: config.messages.emailSubject || '',
                emailBody: config.messages.emailBody || ''
            }
        };
    }
    
    // Fallback translations
    return {
        es: {
            phone: 'Teléfono',
            whatsapp: 'WhatsApp',
            whatsappText: 'Escríbeme por WhatsApp',
            email: 'Correo',
            emailCorp: 'Correo corporativo',
            website: 'Sitio web',
            websiteText: 'Visitar mi sitio web',
            wechat: 'WeChat ID',
            facebook: 'Facebook',
            facebookText: 'Perfil de Facebook',
            instagram: 'Instagram',
            instagramText: 'Sígueme en Instagram',
            tiktok: 'TikTok',
            tiktokText: 'Sígueme en TikTok',
            shareCard: 'Compartir tarjeta',
            shareQR: 'Compartir QR',
            contact: 'Contacto',
            regionSubtitle: 'Innovación y soporte integral',
            info1: 'Cadena de suministro optimizada para proyectos industriales, minería y construcción.',
            info2: 'Soporte técnico y capacitación personalizada para flotas en operación en Perú.',
            info3: 'Red global de repuestos y servicios con presencia en más de 110 países.',
            phoneCopied: '📱 Teléfono copiado',
            wechatCopied: '💬 WeChat ID copiado',
            linkCopied: '🔗 Enlace copiado',
            shareTitle: 'Compartir tarjeta',
            shareQRTitle: 'Compartir QR',
            shareText: 'Escanea el QR o copia el enlace',
            shareQRText: 'Escanea este código QR para obtener más información',
            copyLink: 'Copiar enlace',
            downloadQR: 'Descargar QR',
            copied: '✓ Copiado',
            companyDescription: 'Costamar Corporate Travel es la división especializada en viajes de negocios y MICE del Grupo Costamar. Ofrecemos soluciones integrales para la gestión de viajes corporativos, reuniones, congresos, ferias y viajes de incentivo, asegurando eficiencia, ahorro y experiencias memorables para nuestros clientes empresariales.',
            footerCTAText: 'Haz de tu presentación una experiencia digital. Obtén tu SmartCard ahora.',
            whatsappMessage: 'Hola%20Rodrigo,%20te%20contacto%20desde%20tu%20tarjeta%20web.',
            emailSubject: 'Consulta%20%E2%80%93%20Tarjeta%20Web',
            emailBody: 'Hola%20Rodrigo,'
        },
        en: {
            phone: 'Phone',
            whatsapp: 'WhatsApp',
            whatsappText: 'Message me on WhatsApp',
            email: 'Email',
            emailCorp: 'Corporate Email',
            website: 'Website',
            websiteText: 'Visit my website',
            wechat: 'WeChat ID',
            facebook: 'Facebook',
            facebookText: 'Facebook Profile',
            instagram: 'Instagram',
            instagramText: 'Follow me on Instagram',
            tiktok: 'TikTok',
            tiktokText: 'Follow me on TikTok',
            shareCard: 'Share Card',
            shareQR: 'Share QR',
            contact: 'Contact',
            regionSubtitle: 'Innovation and comprehensive support',
            phoneCopied: '📱 Phone copied',
            wechatCopied: '💬 WeChat ID copied',
            linkCopied: '🔗 Link copied',
            shareTitle: 'Share card',
            shareQRTitle: 'Share QR',
            shareText: 'Scan the QR or copy the link',
            shareQRText: 'Scan this QR code for more information',
            copyLink: 'Copy link',
            downloadQR: 'Download QR',
            copied: '✓ Copied',
            companyDescription: 'Costamar Corporate Travel is the specialized division in business travel and MICE of the Costamar Group. We offer comprehensive solutions for corporate travel management, meetings, congresses, fairs and incentive trips, ensuring efficiency, savings and memorable experiences for our business clients.',
            footerCTAText: 'Make your presentation a digital experience. Get your SmartCard now.',
            whatsappMessage: 'Hello%20Rodrigo,%20I%27m%20contacting%20you%20from%20your%20web%20card.',
            emailSubject: 'Inquiry%20%E2%80%93%20%20',
            emailBody: 'Hello%20Rodrigo,'
        }
    };
};

// Initialize translations
const translations = getTranslations();

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
        'WhatsApp': t.whatsapp,
        'Correo': t.email,
        'Email': t.email,
        'Correo corporativo': t.emailCorp,
        'Corporate Email': t.emailCorp,
        'Sitio web': t.website,
        'Website': t.website,
        'WeChat ID': t.wechat,
        'Facebook': t.facebook,
        'Instagram': t.instagram,
        'TikTok': t.tiktok
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
        }
    });
    
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
    
    // Update Share QR button
    const shareQRButtons = document.querySelectorAll('.share-button');
    if (shareQRButtons.length > 1) {
        // The second share button is the QR button
        const qrButton = shareQRButtons[1];
        const textNode = Array.from(qrButton.childNodes).find(node =>
            node.nodeType === 3 && node.textContent.trim() !== ''
        );
        if (textNode) {
            textNode.textContent = t.shareQR;
        } else {
            // If no text node found, add one after the SVG
            const svg = qrButton.querySelector('svg');
            if (svg) {
                const textNode = document.createTextNode(t.shareQR);
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
// ============================================
// GALLERY CAROUSEL FUNCTIONALITY
// ============================================

/**
 * Carousel Gallery Manager - Optimized for performance
 */
class CarouselGallery {
    constructor() {
        this.currentIndex = 0;
        this.slides = [];
        this.indicators = [];
        this.autoPlayInterval = null;
        this.isPaused = false;
        this.isTransitioning = false;
        this.lightboxIndex = null;
        this.images = [
            'assets/img/F1.jpeg',
            'assets/img/F2.jpg',
            'assets/img/F3.jpg',
            'assets/img/image.png',
            'assets/img/JP.1.png'
        ];
        
        // Preload images for better performance
        this.preloadImages();
        
        this.init();
    }

    /**
     * Preload images for smooth transitions
     */
    preloadImages() {
        this.images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    /**
     * Initialize carousel
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupCarousel());
        } else {
            this.setupCarousel();
        }
    }

    /**
     * Setup carousel elements and event listeners
     */
    setupCarousel() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        
        if (this.slides.length === 0) return;
        
        // Add click listeners to slides for lightbox
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', () => this.openLightbox(index));
        });
        
        // Add hover listeners to pause auto-play
        this.slides.forEach((slide) => {
            slide.addEventListener('mouseenter', () => this.pauseAutoPlay());
            slide.addEventListener('mouseleave', () => this.resumeAutoPlay());
        });

        // Add hover listeners to carousel container
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carouselContainer.addEventListener('mouseleave', () => this.resumeAutoPlay());
        }

        // Start auto-play
        this.startAutoPlay();
        
        // Add keyboard navigation
        this.setupKeyboardNavigation();
        
        // Add touch/swipe support for mobile
        this.setupTouchNavigation();
        
        console.log('🎠 Galería carrusel inicializada');
    }

    /**
     * Go to specific slide with performance optimization
     */
    goToSlide(index) {
        // Prevent rapid clicking during transition
        if (this.isTransitioning) return;
        
        if (index < 0) index = this.slides.length - 1;
        if (index >= this.slides.length) index = 0;
        
        // Set transitioning flag
        this.isTransitioning = true;
        
        // Remove active class from current slide and indicator
        this.slides[this.currentIndex].classList.remove('active');
        this.indicators[this.currentIndex].classList.remove('active');
        
        // Add active class to new slide and indicator
        this.currentIndex = index;
        this.slides[this.currentIndex].classList.add('active');
        this.indicators[this.currentIndex].classList.add('active');
        
        // Update track position for smooth transition
        this.updateTrackPosition();
        
        // Clear transitioning flag after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }

    /**
     * Go to next slide
     */
    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    }

    /**
     * Go to previous slide
     */
    prevSlide() {
        this.goToSlide(this.currentIndex - 1);
    }

    /**
     * Update track position for smooth transitions
     */
    updateTrackPosition() {
        const track = document.querySelector('.carousel-track');
        if (track) {
            const offset = -this.currentIndex * 100;
            track.style.transform = `translateX(${offset}%)`;
            track.style.transition = 'transform 0.5s ease-in-out';
        }
    }

    /**
     * Start auto-play functionality with performance optimization
     */
    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        // Clear any existing interval
        this.stopAutoPlay();
        
        this.autoPlayInterval = setInterval(() => {
            if (!this.isPaused && !this.isTransitioning) {
                this.nextSlide();
            }
        }, 3000); // Change every 3 seconds
    }

    /**
     * Stop auto-play functionality
     */
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    /**
     * Pause auto-play
     */
    pauseAutoPlay() {
        this.isPaused = true;
    }

    /**
     * Resume auto-play
     */
    resumeAutoPlay() {
        this.isPaused = false;
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const carousel = document.querySelector('.gallery-carousel');
            if (!carousel) return;
            
            // Check if carousel is in viewport
            const rect = carousel.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (!isInViewport) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.closeLightbox();
                    break;
            }
        });
    }

    /**
     * Setup touch/swipe navigation for mobile
     */
    setupTouchNavigation() {
        const viewport = document.querySelector('.carousel-viewport');
        if (!viewport) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        viewport.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        viewport.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    /**
     * Handle swipe gestures
     */
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide(); // Swipe left, go next
            } else {
                this.prevSlide(); // Swipe right, go prev
            }
        }
    }

    /**
     * Open lightbox with specific image
     */
    openLightbox(index) {
        // Remove existing lightbox
        this.closeLightbox();
        
        // Store current index for navigation
        this.lightboxIndex = index;
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'carousel-lightbox';
        lightbox.innerHTML = `
            <div class="carousel-lightbox-content">
                <button class="carousel-lightbox-nav carousel-lightbox-prev" aria-label="Imagen anterior">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                </button>
                <img src="${this.images[index]}" alt="Imagen ${index + 1}" class="carousel-lightbox-image">
                <button class="carousel-lightbox-nav carousel-lightbox-next" aria-label="Siguiente imagen">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
                <button class="carousel-lightbox-close" aria-label="Cerrar">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Trigger animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                lightbox.classList.add('active');
            });
        });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add event listeners
        const closeBtn = lightbox.querySelector('.carousel-lightbox-close');
        const prevBtn = lightbox.querySelector('.carousel-lightbox-prev');
        const nextBtn = lightbox.querySelector('.carousel-lightbox-next');
        
        closeBtn.addEventListener('click', () => this.closeLightbox());
        prevBtn.addEventListener('click', () => this.lightboxPrev());
        nextBtn.addEventListener('click', () => this.lightboxNext());
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
        
        // Close on ESC key
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox();
                document.removeEventListener('keydown', handleEsc);
            } else if (e.key === 'ArrowLeft') {
                this.lightboxPrev();
            } else if (e.key === 'ArrowRight') {
                this.lightboxNext();
            }
        };
        document.addEventListener('keydown', handleEsc);
    }

    /**
     * Close lightbox
     */
    closeLightbox() {
        const lightbox = document.querySelector('.carousel-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => {
                if (lightbox.parentNode) {
                    lightbox.parentNode.removeChild(lightbox);
                }
                document.body.style.overflow = '';
            }, 300);
        }
        this.lightboxIndex = null;
    }

    /**
     * Navigate to previous image in lightbox
     */
    lightboxPrev() {
        if (this.lightboxIndex === null) return;
        this.lightboxIndex = this.lightboxIndex - 1;
        if (this.lightboxIndex < 0) {
            this.lightboxIndex = this.images.length - 1;
        }
        this.updateLightboxImage();
    }

    /**
     * Navigate to next image in lightbox
     */
    lightboxNext() {
        if (this.lightboxIndex === null) return;
        this.lightboxIndex = this.lightboxIndex + 1;
        if (this.lightboxIndex >= this.images.length) {
            this.lightboxIndex = 0;
        }
        this.updateLightboxImage();
    }

    /**
     * Update lightbox image with fade effect
     */
    updateLightboxImage() {
        const lightboxImg = document.querySelector('.carousel-lightbox-image');
        if (lightboxImg && this.lightboxIndex !== null) {
            // Add fade effect
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = this.images[this.lightboxIndex];
                lightboxImg.alt = `Imagen ${this.lightboxIndex + 1}`;
                lightboxImg.style.opacity = '1';
            }, 150);
        }
    }
}

// Initialize carousel when DOM is ready
const carousel = new CarouselGallery();

// Make carousel methods available globally for inline handlers
window.carousel = carousel;