// Function to copy phone number to clipboard
function copyPhone() {
    const phoneNumber = '+51 937 375 605';
    navigator.clipboard.writeText(phoneNumber).then(() => {
        showToast('Teléfono copiado');
    }).catch(err => {
        console.error('Error al copiar el teléfono: ', err);
    });
}

// Function to show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Show the toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove the toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Function to handle card sharing
function shareCard() {
    const shareData = {
        title: 'Tarjeta de Jhon Carlos Pérez Cubas',
        text: 'Contacto y enlaces de Jhon en FOTON',
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Compartido exitosamente'))
            .catch((error) => console.log('Error al compartir:', error));
    } else {
        // Fallback: Show modal with QR code and link
        showShareModal();
    }
}

// Function to show the share modal
function showShareModal() {
    // Close any existing modals
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn">&times;</button>
            <div class="modal-header">
                <h2>Compartir</h2>
            </div>
            <div class="modal-body">
                <p>Escanea el QR o copia el enlace</p>
                <div id="qrcode" class="qr-container"></div>
                <div class="link-container">
                    <input type="text" id="share-link" value="${window.location.href}" readonly>
                    <button class="copy-link-btn" onclick="copyLink()">Copiar enlace</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add close functionality
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    // Add QR code (we'll create a simple QR using canvas)
    generateQRCode('qrcode', window.location.href);
}

// Function to generate QR code using canvas
function generateQRCode(containerId, text) {
    const container = document.getElementById(containerId);
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Simple QR-like pattern (not an actual QR, but visual representation)
    ctx.fillStyle = '#000000';
    
    // Draw a simple grid pattern to simulate a QR code
    const blockSize = 10;
    const blocks = canvas.width / blockSize;
    
    for (let x = 0; x < blocks; x++) {
        for (let y = 0; y < blocks; y++) {
            // Create a pattern similar to QR codes
            if ((x + y) % 3 === 0) {
                ctx.fillStyle = '#000';
            } else if ((x + y) % 4 === 0) {
                ctx.fillStyle = '#0D58A3';
            } else {
                ctx.fillStyle = '#fff';
            }
            
            // Add some randomness to make it look more like a QR code
            if (Math.random() > 0.7) {
                ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            }
        }
    }
    
    // Draw border squares to look more like a QR code
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 40, 40); // Top left
    ctx.fillRect(canvas.width - 40, 0, 40, 40); // Top right
    ctx.fillRect(0, canvas.height - 40, 40, 40); // Bottom left
    
    // Add center pattern
    ctx.fillStyle = '#fff';
    ctx.fillRect(80, 80, 40, 40);
    ctx.fillStyle = '#000';
    ctx.fillRect(90, 90, 20, 20);
}

// Function to copy the share link
function copyLink() {
    const shareLink = document.getElementById('share-link');
    shareLink.select();
    document.execCommand('copy');
    
    // Show toast
    showToast('Enlace copiado');
}

// Function to build mailto links for email buttons
function buildMailto() {
    // Both email buttons should use the same mailto link
    const emailButtons = document.querySelectorAll('a[href^="mailto:"]');
    
    emailButtons.forEach(button => {
        const href = button.getAttribute('href');
        if (href.includes('subject=Consulta%20–%20Tarjeta%20FOTON')) {
            // This is already properly formatted
            return;
        }
        
        // Update the href to use the correct mailto format
        button.setAttribute('href', 'mailto:jhoncarlosperezcubas@gmail.com?subject=Consulta%20–%20Tarjeta%20FOTON&body=Hola%20Jhon,');
    });
}

// Carousel functionality
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');

function initCarousel(options = { interval: 5000 }) {
    if (slides.length === 0) return;
    
    // Update indicators
    updateIndicators();
    
    // Start auto-rotation
    startCarousel(options.interval);
    
    // Pause on hover or touch
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', pauseCarousel);
        carouselContainer.addEventListener('mouseleave', () => startCarousel(options.interval));
    }
    
    // Touch events for swipe
    let startX = 0;
    let endX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        pauseCarousel();
    });
    
    carouselContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
        startCarousel(options.interval);
    });
}

function updateSlide() {
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateIndicators();
}

function updateIndicators() {
    // Update active indicator
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlide();
}

function startCarousel(interval) {
    slideInterval = setInterval(nextSlide, interval);
}

function pauseCarousel() {
    clearInterval(slideInterval);
}

function handleSwipe() {
    const minSwipeDistance = 50;
    const swipeDistance = startX - endX;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
            nextSlide(); // Swipe left - next
        } else {
            prevSlide(); // Swipe right - prev
        }
    }
}

// Initialize the carousel when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set up phone copy button if it exists
    const phoneButton = document.querySelector('a[href^="tel:"]');
    if (phoneButton) {
        phoneButton.addEventListener('click', function(e) {
            e.preventDefault();
            copyPhone();
        });
    }
    
    // Initialize carousel
    initCarousel({ interval: 5000 });
    
    // Initialize email buttons
    buildMailto();
});