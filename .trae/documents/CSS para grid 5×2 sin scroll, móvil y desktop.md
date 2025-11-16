## Objetivo
Mantener el layout 5×2 idéntico en móviles (vertical y horizontal), tablets y desktop, sin scroll y sin contenido cortado.

## Cambios propuestos
- Reemplazar `version-2/app/styles/grid.css` para:
  - Usar `height: 100svh` y `100dvh`.
  - Fijar el grid 5×2 y eliminar apilados por ancho.
  - Añadir reglas explícitas para `portrait` y `landscape` (idénticas).
  - Permitir que los hijos se ajusten dentro de cada área (`min-width: 0; min-height: 0`).
- Reemplazar `version-2/app/styles/layout.css` para:
  - Mantener `.box` con borde azul.
  - Asegurar ajuste de contenido: `box-sizing`, wraps de texto, imágenes/medios con `max-width: 100%`, botones con `max-width: 100%`.

## CSS — grid.css
```css
/* Home Grid 5×2 — sin scroll en todas las plataformas */

/* Contenedor principal */
.parent {
  display: grid;
  height: 100svh; /* viewport estable en móviles (small viewport height) */
  height: 100dvh; /* soporte dinámico de viewport */
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 10% 90%;
  grid-column-gap: 0;
  grid-row-gap: 0;
}

/* Áreas del grid */
.header { grid-area: 1 / 1 / 2 / 6; }
.nav-left { grid-area: 2 / 1 / 3 / 2; }
.recomendaciones { grid-area: 2 / 2 / 3 / 3; }
.personal { grid-area: 2 / 3 / 3 / 4; }
.destacado { grid-area: 2 / 4 / 3 / 5; }
.nav-right { grid-area: 2 / 5 / 3 / 6; }

/* Evitar cortes: asegurar que los contenedores puedan encoger */
.header,
.nav-left,
.recomendaciones,
.personal,
.destacado,
.nav-right {
  min-width: 0; /* permite que el contenido ajustado por flex/grid encaje */
  min-height: 0; /* evita overflow vertical en hijos con flex/grid */
}

/* Orientación explícita: mismo grid en portrait y landscape */
@media (orientation: portrait) {
  .parent {
    height: 100svh;
    height: 100dvh;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 10% 90%;
    grid-column-gap: 0;
    grid-row-gap: 0;
  }
}

@media (orientation: landscape) {
  .parent {
    height: 100svh;
    height: 100dvh;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 10% 90%;
    grid-column-gap: 0;
    grid-row-gap: 0;
  }
}
```

## CSS — layout.css
```css
/* Bloques de depuración con borde azul y ajuste de contenido */
.box {
  border: 2px solid #3b82f6; /* blue-500 */
  box-sizing: border-box;
  padding: 8px;
  min-width: 0;
}

/* Ajuste universal de contenido dentro del grid */
.parent,
.parent * {
  box-sizing: border-box;
}

/* Texto: envolver siempre para evitar cortes */
.parent * {
  overflow-wrap: break-word;
  word-break: break-word;
}

/* Imágenes y medios: caben dentro del contenedor */
.parent img,
.parent video,
.parent canvas,
.parent svg {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

/* Botones y elementos similares: no sobresalen */
.parent button,
.parent .btn,
.parent input,
.parent select,
.parent textarea {
  max-width: 100%;
}
```

## Resultado
- Grid 5×2 idéntico en móvil/tablet/desktop, sin scroll.
- Contenido ajustado dentro de cada bloque, sin desbordes.

¿Confirmas que reemplace `grid.css` y `layout.css` con el CSS anterior?