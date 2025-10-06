# Plan para reemplazar la dirección en Company Card

## Problema identificado
En la sección Company Card del archivo `publish/index.html` (líneas 184-194) actualmente se muestra una dirección de Beijing que debe ser reemplazada por un texto descriptivo sobre Costamar Corporate Travel.

## Cambios necesarios

### 1. Modificación del HTML (publish/index.html)
Reemplazar las líneas 184-194:

```html
<div class="company-addresses">
    <div class="address-item">
        <svg class="address-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <div>
            <strong>Beijing:</strong> No.15, Shayang Rd., Changping, Beijing 102206, China
        </div>
    </div>
</div>
```

Por el siguiente código:

```html
<div class="company-description">
    <p>Costamar Corporate Travel es la división especializada en viajes de negocios y MICE del Grupo Costamar. Ofrecemos soluciones integrales para la gestión de viajes corporativos, reuniones, congresos, ferias y viajes de incentivo, asegurando eficiencia, ahorro y experiencias memorables para nuestros clientes empresariales.</p>
</div>
```

### 2. Cambios en el JavaScript (publish/main.js)
Agregar las traducciones para el nuevo texto en el objeto `translations` (líneas 792-852):

En la sección `es:` agregar:
```javascript
companyDescription: 'Costamar Corporate Travel es la división especializada en viajes de negocios y MICE del Grupo Costamar. Ofrecemos soluciones integrales para la gestión de viajes corporativos, reuniones, congresos, ferias y viajes de incentivo, asegurando eficiencia, ahorro y experiencias memorables para nuestros clientes empresariales.',
```

En la sección `en:` agregar:
```javascript
companyDescription: 'Costamar Corporate Travel is the specialized division in business travel and MICE of the Costamar Group. We offer comprehensive solutions for corporate travel management, meetings, congresses, fairs and incentive trips, ensuring efficiency, savings and memorable experiences for our business clients.',
```

### 3. Actualización de la función updatePageLanguage (publish/main.js)
Agregar en la función `updatePageLanguage` (líneas 878-972) el siguiente código después de la línea 972:

```javascript
// Update company description
const companyDescription = document.querySelector('.company-description p');
if (companyDescription) {
    companyDescription.textContent = t.companyDescription;
}
```

### 4. Verificación del logo
Verificar si se debe reemplazar el logo de FOTON (línea 178) por un logo de Costamar si estuviera disponible:

```html
<img src="assets/img/Foton-logo-01.png" alt="FOTON Logo" class="company-logo">
```

Si hubiera un logo de Costamar, se debería cambiar por:
```html
<img src="assets/img/Costamar-logo.png" alt="Costamar Corporate Travel Logo" class="company-logo">
```

## Estilos CSS necesarios
Los estilos CSS ya existen en el archivo `publish/styles.css` (líneas 737-755) con la clase `.company-description`, por lo que no se necesitan cambios adicionales en este aspecto.

## Resultado esperado
Una vez implementados estos cambios, la Company Card mostrará el texto descriptivo de Costamar Corporate Travel en lugar de la dirección de Beijing, y este texto será traducido correctamente cuando el usuario cambie entre español e inglés.

## Prioridad de cambios
1. Modificación del HTML - Alta prioridad
2. Actualización del JavaScript para traducciones - Alta prioridad
3. Verificación del logo - Media prioridad (depende de si hay un logo disponible)