document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('main-iframe');
    const errorContainer = document.getElementById('error-container');
    const openOfficialBtn = document.getElementById('open-official');
    
    // Manejar errores de carga del iframe
    iframe.addEventListener('error', function() {
        // Mostrar el contenedor de error
        errorContainer.style.display = 'flex';
    });
    
    // Agregar timeout como respaldo adicional
    setTimeout(() => {
        if (iframe.contentDocument && iframe.contentDocument.body.innerHTML.trim() === '') {
            errorContainer.style.display = 'flex';
        }
    }, 10000); // 10 segundos de timeout
    
    // Manejar el botón para abrir en el sitio oficial
    openOfficialBtn.addEventListener('click', function() {
        window.open('https://www.fotonmotor.com/digital360/index.html#:~:text=TRUCK%E2%89%AB', '_blank');
    });
    
    // Función para manejar redimensionamiento
    function handleResize() {
        // Asegurar que el iframe ocupe el espacio disponible
        const headerHeight = document.querySelector('.top-bar').offsetHeight;
        iframe.style.height = `calc(100vh - ${headerHeight}px)`;
    }
    
    // Ejecutar al cargar la página
    handleResize();
    
    // Ejecutar al redimensionar la ventana
    window.addEventListener('resize', handleResize);
});