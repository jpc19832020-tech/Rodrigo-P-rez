// ============================================
// FOTON Vision 360° - Enhanced JavaScript
// ============================================

// State management
let iframeLoaded = false;
let loadTimeout;
let retryCount = 0;
const MAX_RETRIES = 3;
const LOAD_TIMEOUT = 15000; // 15 seconds

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 FOTON Vision 360° initialized');
    
    initializeIframe();
    initializeInfoBanner();
    initializeErrorHandlers();
    
    // Show info banner after 2 seconds
    setTimeout(() => {
        showInfoBanner();
    }, 2000);
});

// ============================================
// IFRAME MANAGEMENT
// ============================================

/**
 * Initialize iframe with loading and error handling
 */
function initializeIframe() {
    const iframe = document.getElementById('main-iframe');
    const loadingOverlay = document.getElementById('loading-overlay');
    const errorContainer = document.getElementById('error-container');
    
    if (!iframe) return;
    
    // Set loading timeout
    loadTimeout = setTimeout(() => {
        if (!iframeLoaded) {
            console.warn('Iframe loading timeout');
            handleIframeError();
        }
    }, LOAD_TIMEOUT);
    
    // Listen for iframe load
    iframe.addEventListener('load', function() {
        console.log('✓ Iframe loaded successfully');
        iframeLoaded = true;
        clearTimeout(loadTimeout);
        
        // Hide loading overlay with animation
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 500);
        
        // Try to detect if iframe content actually loaded
        try {
            // This will throw an error if cross-origin
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc.body && iframeDoc.body.innerHTML.length === 0) {
                console.warn('Iframe loaded but content is empty');
                handleIframeError();
            }
        } catch (e) {
            // Cross-origin - assume it loaded correctly
            console.log('Cross-origin iframe - assuming successful load');
        }
    });
    
    // Listen for iframe errors
    iframe.addEventListener('error', function() {
        console.error('✗ Iframe failed to load');
        handleIframeError();
    });
    
    // Monitor iframe for crashes or unresponsiveness
    monitorIframe(iframe);
}

/**
 * Monitor iframe for issues
 */
function monitorIframe(iframe) {
    let checkCount = 0;
    const maxChecks = 10;
    
    const checkInterval = setInterval(() => {
        checkCount++;
        
        try {
            // Try to access iframe window
            if (!iframe.contentWindow) {
                console.warn('Iframe window not accessible');
                clearInterval(checkInterval);
                handleIframeError();
                return;
            }
        } catch (e) {
            // Expected for cross-origin
        }
        
        if (checkCount >= maxChecks) {
            clearInterval(checkInterval);
        }
    }, 2000);
}

/**
 * Handle iframe loading errors
 */
function handleIframeError() {
    const loadingOverlay = document.getElementById('loading-overlay');
    const errorContainer = document.getElementById('error-container');
    const iframe = document.getElementById('main-iframe');
    
    clearTimeout(loadTimeout);
    
    // Hide loading overlay
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }
    
    // Show error container
    if (errorContainer) {
        errorContainer.classList.add('active');
    }
    
    // Hide iframe
    if (iframe) {
        iframe.style.display = 'none';
    }
    
    console.error('Failed to load 360° view after', retryCount, 'retries');
}

// ============================================
// ERROR HANDLERS
// ============================================

/**
 * Initialize error handling buttons
 */
function initializeErrorHandlers() {
    const retryBtn = document.getElementById('retry-btn');
    const openOfficialBtn = document.getElementById('open-official');
    
    if (retryBtn) {
        retryBtn.addEventListener('click', retryLoad);
    }
    
    if (openOfficialBtn) {
        openOfficialBtn.addEventListener('click', function() {
            console.log('Opening official site');
        });
    }
}

/**
 * Retry loading the iframe
 */
function retryLoad() {
    if (retryCount >= MAX_RETRIES) {
        console.warn('Max retries reached');
        showToast('Máximo de reintentos alcanzado. Por favor, abre el sitio oficial.');
        return;
    }
    
    retryCount++;
    console.log('Retrying load, attempt', retryCount);
    
    const iframe = document.getElementById('main-iframe');
    const loadingOverlay = document.getElementById('loading-overlay');
    const errorContainer = document.getElementById('error-container');
    
    // Reset state
    iframeLoaded = false;
    
    // Show loading, hide error
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
    }
    if (errorContainer) {
        errorContainer.classList.remove('active');
    }
    if (iframe) {
        iframe.style.display = 'block';
        // Force reload by changing src
        const currentSrc = iframe.src;
        iframe.src = '';
        setTimeout(() => {
            iframe.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + 'retry=' + retryCount;
        }, 100);
    }
    
    // Set new timeout
    loadTimeout = setTimeout(() => {
        if (!iframeLoaded) {
            handleIframeError();
        }
    }, LOAD_TIMEOUT);
}

// ============================================
// INFO BANNER
// ============================================

/**
 * Initialize info banner
 */
function initializeInfoBanner() {
    const infoBanner = document.getElementById('info-banner');
    const infoClose = document.getElementById('info-close');
    
    if (infoClose) {
        infoClose.addEventListener('click', hideInfoBanner);
    }
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        hideInfoBanner();
    }, 10000);
}

/**
 * Show info banner
 */
function showInfoBanner() {
    const infoBanner = document.getElementById('info-banner');
    if (infoBanner && !sessionStorage.getItem('infoBannerDismissed')) {
        infoBanner.classList.add('show');
    }
}

/**
 * Hide info banner
 */
function hideInfoBanner() {
    const infoBanner = document.getElementById('info-banner');
    if (infoBanner) {
        infoBanner.classList.remove('show');
        sessionStorage.setItem('infoBannerDismissed', 'true');
    }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

/**
 * Show toast notification
 */
function showToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: rgba(17, 24, 39, 0.95);
        backdrop-filter: blur(10px);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 9999px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        opacity: 0;
        transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 500;
        font-size: 0.875rem;
        white-space: nowrap;
        max-width: calc(100% - 2rem);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
    });
    
    // Remove after duration
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

/**
 * Log performance metrics
 */
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Global error handler
 */
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// ============================================
// VISIBILITY CHANGE HANDLER
// ============================================

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
        // Check if iframe is still responsive
        const iframe = document.getElementById('main-iframe');
        if (iframe && !iframeLoaded) {
            console.log('Checking iframe status after visibility change');
        }
    }
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

/**
 * Handle keyboard shortcuts
 */
document.addEventListener('keydown', function(event) {
    // ESC to close error or go back
    if (event.key === 'Escape') {
        const errorContainer = document.getElementById('error-container');
        if (errorContainer && errorContainer.classList.contains('active')) {
            window.history.back();
        }
    }
    
    // R to retry
    if (event.key === 'r' || event.key === 'R') {
        const errorContainer = document.getElementById('error-container');
        if (errorContainer && errorContainer.classList.contains('active')) {
            retryLoad();
        }
    }
});

console.log('✓ Vision 360° script loaded');