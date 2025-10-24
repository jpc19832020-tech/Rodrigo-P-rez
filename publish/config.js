// ============================================
// ARCHIVO DE CONFIGURACIÓN CENTRALIZADO
// ============================================
// Toda la información personalizable del proyecto está aquí
// Modifica estos valores para personalizar la tarjeta digital

// Información personal principal
const personalInfo = {
    name: "Rodrigo Pérez",
    title: "CEO | EXO Digital Studio",
    subtitle: "Creador de nuestras herramientas y productos digitales.",
    profileImage: "assets/img/JP.1.png"
};

// Información de contacto
const contactInfo = {
    phone: "+51925475680",
    email: "exo.digitalstudio@gmail.com",
    whatsapp: "+51925475680",
    facebook: "https://www.facebook.com/people/Exo-DigitalStudio/pfbid02VmWVzYQYBbfZBpnxF9qDHCajhkcay9eQ1v3ANrRWfikMM44uMHaLqS5TzVoDo26Hl/",
    instagram: "https://www.instagram.com/exo_digitalstudio/",
    tiktok: "https://www.tiktok.com/@exodigitalstudio",
    website: "https://jpc19832020-tech.github.io/Rodrigo-Perez/"
};

// Información de la empresa
const companyInfo = {
    name: "EXO Digital Studio",
    tagline: "",
    logo: "assets/img/EXO.png",
    description: `EXO Digital Studio es una fusión entre tecnología, diseño y automatización.
Creamos soluciones inteligentes que impulsan marcas, optimizan procesos y transformamos la presencia digital de emprendedores y empresas.
Desde micrositios dinámicos, asistentes automatizados y workflows inteligentes, hasta experiencias visuales personalizadas, EXO combina estética futurista con funcionalidad real.`
};

// URLs y enlaces
const urls = {
    website: "https://jpc19832020-tech.github.io/Rodrigo-Perez/",
    shareUrl: "https://jpc19832020-tech.github.io/Rodrigo-Perez/",
    smartcardWhatsApp: "+51 925 475 680"
};

// Metadatos SEO
const seo = {
    title: "Rodrigo Pérez — CEO | EXO Digital Studio",
    description: "Contacto oficial de Rodrigo Pérez — CEO | EXO Digital Studio",
    favicon: "assets/img/image.png",
    ogImage: "assets/og/og-default.png"
};

// Recursos de imágenes
const images = {
    profile: "assets/img/JP.1.png",
    companyLogo: "assets/img/EXO.favicon",
    qrCode: "assets/img/QR_Costamar.png",
    favicon: "assets/img/EXO.favicon",
    footerLogo: "assets/img/EXO.png",
    ogImage: "assets/og/og-default.png"
};

// Textos de interfaz
const uiTexts = {
    whatsappButton: "Escríbeme por WhatsApp",
    shareButton: "Compartir tarjeta",
    shareQRButton: "Compartir QR",
    footerCTA: "Haz de tu presentación una experiencia digital. Obtén tu SmartCard ahora.",
    phoneLabel: "Teléfono",
    whatsappLabel: "WhatsApp",
    emailLabel: "Correo",
    facebookLabel: "Facebook",
    facebookText: "Perfil de Facebook",
    instagramLabel: "Instagram",
    instagramText: "Sígueme en Instagram",
    tiktokLabel: "TikTok",
    tiktokText: "Sígueme en TikTok",
    websiteLabel: "Sitio Web",
    websiteText: "Visitar mi sitio web"
};

// Colores de marca
const brandColors = {
    primary: "#0D58A3",
    primaryDark: "#0a4a8a",
    primaryLight: "#1a6bc4",
    white: "#ffffff",
    black: "#000000"
};

// Mensajes predefinidos
const messages = {
    whatsapp: "Hola%20Rodrigo,%20te%20contacto%20desde%20tu%20tarjeta%20web.",
    emailSubject: "Consulta%20%E2%80%93%20Tarjeta%20Web",
    emailBody: "Hola%20Rodrigo,",
    smartcardWhatsApp: "Hola,%20quiero%20obtener%20mi%20SmartCard"
};

// Configuración adicional
const config = {
    currentYear: new Date().getFullYear(),
    copyright: `© ${new Date().getFullYear()} EXO Digital Studio`,
    language: "es", // idioma por defecto
    enableAnimations: true,
    enableAnalytics: false
};

// Exportar toda la configuración
window.appConfig = {
    personalInfo,
    contactInfo,
    companyInfo,
    urls,
    seo,
    images,
    uiTexts,
    brandColors,
    messages,
    config
};

// Hacer disponible globalmente
console.log("📋 Configuración cargada correctamente");