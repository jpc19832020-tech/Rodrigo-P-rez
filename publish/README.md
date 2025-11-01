# Tarjeta Digital Personalizable - Sistema de Configuración Centralizada

## Descripción

Este proyecto implementa una tarjeta digital (vCard) con un sistema de configuración centralizada que permite personalizar toda la información desde un único archivo.

## Características

- **Configuración Centralizada**: Toda la información personalizable está en `config.js`
- **Actualización Dinámica**: La página se carga automáticamente con los datos de configuración
- **Bilingüe**: Soporte para español e inglés con traducciones configurables
- **Diseño Responsive**: Mobile-first con soporte para todas las resoluciones
- **Funcionalidades Interactivas**:
  - Copiado de números de teléfono al portapapeles
  - Compartir tarjeta usando Web Share API
  - Enlaces preconfigurados para WhatsApp y correo electrónico
  - Lightbox para imágenes
  - Sistema de QR codes

## Estructura del Proyecto

```
publish/
├── config.js              # 📋 ARCHIVO DE CONFIGURACIÓN CENTRALIZADA
├── index.html              # Página principal (usa datos de config.js)
├── main.js                 # Lógica JavaScript (usa datos de config.js)
├── styles.css              # Estilos personalizados
├── assets/
│   ├── img/                # Imágenes de la galería
│   └── og/                 # Imágenes para OpenGraph
└── README.md               # Este archivo
```

## 📋 Archivo de Configuración (`config.js`)

El archivo `config.js` contiene toda la información personalizable organizada en secciones:

### Información Personal
```javascript
const personalInfo = {
    name: "Miexy Marcani Benites",
    title: "Supervisora de Viajes MICE | División Corporativo & MICE",
    subtitle: "Experta profesional en eventos...",
    profileImage: "assets/img/JP.1.jpeg"
};
```

### Información de Contacto
```javascript
const contactInfo = {
    phone: "+51976330377",
    officePhone: "(51-1) 616-7610 anexo 5483",
    email: "m.marcani@costamarcorp.com",
    whatsapp: "+51976330377",
    facebook: "https://www.facebook.com/people/Exo-DigitalStudio/pfbid02VmWVzYQYBbfZBpnxF9qDHCajhkcay9eQ1v3ANrRWfikMM44uMHaLqS5TzVoDo26Hl/",
    location: "Av. José Pardo 513, Miraflores",
    mapsUrl: "https://www.google.com/maps/..."
};
```

### Información de la Empresa
```javascript
const companyInfo = {
    name: "COSTAMAR CORPORATE TRAVEL",
    logo: "assets/img/EXO.png",
    description: "Costamar Corporate Travel es la división..."
};
```

### URLs y Enlaces
```javascript
const urls = {
    website: "https://jpc19832020-tech.github.io/Miexy-Marcani-Benites/",
    shareUrl: "https://jpc19832020-tech.github.io/Miexy-Marcani/",
    smartcardWhatsApp: "+51 929 000 881"
};
```

### Textos de Interfaz
```javascript
const uiTexts = {
    whatsappButton: "Escríbeme por WhatsApp",
    shareButton: "Compartir tarjeta",
    shareQRButton: "Compartir QR",
    footerCTA: "Haz de tu presentación una experiencia digital...",
    // ... más textos
};
```

## 🚀 Cómo Personalizar

1. **Abrir el archivo `config.js`**
2. **Modificar los valores deseados** en las secciones correspondientes
3. **Guardar los cambios**
4. **Abrir `index.html`** en un navegador para ver los cambios

### Ejemplo de Personalización Rápida

```javascript
// Cambiar nombre y título
personalInfo.name = "Juan Pérez";
personalInfo.title = "Gerente de Ventas";

// Cambiar teléfono y email
contactInfo.phone = "+51123456789";
contactInfo.email = "juan.perez@empresa.com";

// Cambiar textos de botones
uiTexts.whatsappButton = "Háblame por WhatsApp";
uiTexts.shareButton = "Compartir mi tarjeta";
```

## 🌐 Soporte Multiidioma

El sistema soporta español e inglés automáticamente. Las traducciones se cargan desde el archivo de configuración y se pueden personalizar:

```javascript
// Los textos se actualizan automáticamente en ambos idiomas
uiTexts.phoneLabel = "Teléfono"; // Español
// En inglés se mostrará como "Phone" automáticamente
```

## 🎨 Colores de Marca

Los colores se pueden personalizar en la sección `brandColors`:

```javascript
const brandColors = {
    primary: "#0D58A3",      // Azul principal
    primaryDark: "#0a4a8a",  // Azul oscuro
    primaryLight: "#1a6bc4", // Azul claro
    white: "#ffffff",        // Blanco
    black: "#000000"         // Negro
};
```

## 📱 Funcionalidades Implementadas

1. **Contacto**: Botones para llamar, WhatsApp, correo electrónico y ubicación
2. **Compartir**: Funcionalidad de compartir nativa o con modal fallback
3. **QR Codes**: Generación automática de QR para compartir contacto
4. **Lightbox**: Galería de imágenes con zoom
5. **Accesibilidad**: Soporte completo para lectores de pantalla
6. **Animaciones**: Transiciones suaves y efectos visuales

## 🔧 Mantenimiento

### Para agregar nueva información personalizable:

1. **Agregar la propiedad** en la sección correspondiente de `config.js`
2. **Actualizar el HTML** para usar un ID específico
3. **Modificar la función `initializePage()`** en `index.html` para asignar el nuevo valor

### Para agregar nuevas imágenes:

1. **Colocar la imagen** en la carpeta `assets/img/`
2. **Actualizar la ruta** en la sección `images` de `config.js`
3. **La imagen se cargará automáticamente** en la página

## 🌟 Ventajas del Sistema

- **Fácil Mantenimiento**: Toda la información en un solo lugar
- **Actualización Rápida**: Cambios instantáneos sin modificar múltiples archivos
- **Consistencia**: Evita errores de sincronización entre archivos
- **Escalabilidad**: Fácil agregar nuevas opciones de personalización
- **Reutilización**: La misma estructura puede usarse para diferentes personas

## 📄 Licencia

Este proyecto está bajo licencia MIT.

---

**Nota**: Para personalizar esta tarjeta para otra persona, solo necesitas modificar los valores en `config.js` y reemplazar las imágenes en la carpeta `assets/img/`.