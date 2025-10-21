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
    phone: "+51976330377",
    officePhone: "(51-1) 616-7610 anexo 5483",
    email: "m.marcani@costamarcorp.com",
    whatsapp: "+51976330377",
    facebook: "https://www.facebook.com/costamar/",
    location: "Av. José Pardo 513, Miraflores",
    mapsUrl: "https://www.google.com/maps/place/Costamar+Travel/@-12.1191404,-77.0338826,3a,75y,165.04h,91.95t/data=!3m7!1e1!3m5!1sFaccT-GejrHvApfGXzS6kA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-1.945596443337152%26panoid%3DFaccT-GejrHvApfGXzS6kA%26yaw%3D165.04055948610977!7i16384!8i8192!4m16!1m9!3m8!1s0x9105c822ad3df4d5:0x25d372b55107b1dd!2sAv.+Jos%C3%A9+Pardo+513,+Miraflores+15074!3b1!8m2!3d-12.1192886!4d-77.033908!10e5!16s%2Fg%2F11xvlxhw28!3m5!1s0x9105c9fc0bf98143:0x57225abaae2576f0!8m2!3d-12.1192779!4d-77.0339071!16s%2Fg%2F11qn6v_1z0?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D"
};

// Información de la empresa
const companyInfo = {
    name: "EXO Digital Studio",
    tagline: "",
    logo: "assets/img/Foton-logo-01.png",
    description: "Costamar Corporate Travel es la división especializada en viajes de negocios y MICE del Grupo Costamar. Ofrecemos soluciones integrales para la gestión de viajes corporativos, reuniones, congresos, ferias y viajes de incentivo, asegurando eficiencia, ahorro y experiencias memorables para nuestros clientes empresariales."
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
    companyLogo: "assets/img/Foton-logo-01.png",
    qrCode: "assets/img/QR_Costamar.png",
    favicon: "assets/img/image.png",
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
    officePhoneLabel: "Teléfono oficina",
    whatsappLabel: "WhatsApp",
    emailLabel: "Correo",
    facebookLabel: "Facebook",
    facebookText: "Perfil de Facebook",
    locationLabel: "Oficina Lima"
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