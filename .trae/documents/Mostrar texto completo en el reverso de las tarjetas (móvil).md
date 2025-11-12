## Objetivo

* Evitar cortes del texto en la cara trasera de las tarjetas en pantallas móviles, permitiendo ver el contenido completo.

## Enfoque

* Mantener las alturas fijas del flip para no romper la animación 3D.

* Habilitar scroll vertical SOLO en la cara trasera y quitar restricciones que lo impiden.

## Cambios concretos

* Quitar `overflow-hidden` del wrapper de `CardFlipBack`:

  * `components/portfolio-section.tsx:230` y `components/portfolio-section.tsx:443`

  * `components/hero-section.tsx:274`

  * `app/projects/page.tsx:170`

* Añadir scroll vertical y contención de overscroll al contenedor interno del reverso:

  * `components/portfolio-section.tsx:231` y `components/portfolio-section.tsx:444`

    * Agregar `overflow-y-auto overscroll-contain` (y `px-4` para margen interior suave).

  * `components/hero-section.tsx:275`

  * `app/projects/page.tsx:171`

## Verificación

* En viewport ≤ 900px: voltear tarjetas y confirmar que el texto se puede desplazar dentro de la cara trasera sin recortes.

* Confirmar que el scroll interno no arrastra toda la página gracias a `overscroll-contain`.

* Revisar que el carrusel móvil sigue funcionando y que el autoplay se pausa al voltear (ya implementado).

## Alcance y compatibilidad

* Aplica a sección de portfolio (grid y carrusel) y a la página "projects" para consistencia.

* No cambia la cara frontal ni la animación de flip 3D.

## Opcional (si quieres afinar)

* Sustituir `vh` por `svh` en alturas móviles para mejorar comportamiento con barras de navegador móviles.

* Si prefieres limitar el cambio a móvil, usar `max-[900px]:overflow-y-auto` en lugar de aplicarlo en todos los breakpoints.

