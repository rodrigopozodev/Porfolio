## Cambios propuestos
- Reemplazar `version-2/app/styles/grid.css` para usar `height: 100svh/100dvh`, mantener el grid 5×2 sin apilado móvil y añadir reglas explícitas por orientación.
- Mantener `version-2/app/styles/layout.css` con `.box` para bordes de depuración.

## CSS completo — grid.css
```css
/* Home Grid 5×2 — desktop y móvil */

/* Contenedor principal */
.parent {
  display: grid;
  height: 100svh; /* alto estable en móviles (small viewport) */
  height: 100dvh; /* alto estable (dynamic viewport) */
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 10% 90%;
  grid-column-gap: 0;
  grid-row-gap: 0;
  overflow-x: auto; /* opcional: permite scroll horizontal si no caben las 5 columnas */
}

/* Áreas (fila 1 y fila 2) */
.header { grid-area: 1 / 1 / 2 / 6; }
.nav-left { grid-area: 2 / 1 / 3 / 2; }
.recomendaciones { grid-area: 2 / 2 / 3 / 3; }
.personal { grid-area: 2 / 3 / 3 / 4; }
.destacado { grid-area: 2 / 4 / 3 / 5; }
.nav-right { grid-area: 2 / 5 / 3 / 6; }

/* Orientación explícita: mismo grid en portrait y landscape */
@media (orientation: portrait) {
  .parent {
    height: 100svh;
    height: 100dvh;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 10% 90%;
    grid-column-gap: 0;
    grid-row-gap: 0;
    overflow-x: auto;
  }
  .header { grid-area: 1 / 1 / 2 / 6; }
  .nav-left { grid-area: 2 / 1 / 3 / 2; }
  .recomendaciones { grid-area: 2 / 2 / 3 / 3; }
  .personal { grid-area: 2 / 3 / 3 / 4; }
  .destacado { grid-area: 2 / 4 / 3 / 5; }
  .nav-right { grid-area: 2 / 5 / 3 / 6; }
}

@media (orientation: landscape) {
  .parent {
    height: 100svh;
    height: 100dvh;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 10% 90%;
    grid-column-gap: 0;
    grid-row-gap: 0;
    overflow-x: auto;
  }
  .header { grid-area: 1 / 1 / 2 / 6; }
  .nav-left { grid-area: 2 / 1 / 3 / 2; }
  .recomendaciones { grid-area: 2 / 2 / 3 / 3; }
  .personal { grid-area: 2 / 3 / 3 / 4; }
  .destacado { grid-area: 2 / 4 / 3 / 5; }
  .nav-right { grid-area: 2 / 5 / 3 / 6; }
}

/* Nota: se eliminan/evitan @media (max-width: 768px) que apilen los divs. */
```

## CSS completo — layout.css
```css
/* Bloques de depuración con borde azul visible en todos los dispositivos */
.box {
  border: 2px solid #3b82f6; /* blue-500 */
  box-sizing: border-box;
  padding: 8px;
}
```

## Resultado esperado
- El layout 5×2 se mantiene igual en móviles (vertical y horizontal) y en desktop.
- Altura estable en móviles con `100svh/100dvh`.
- Borde azul constante para depuración.

¿Confirmas que reemplace el contenido de `grid.css` y `layout.css` con el CSS anterior (sin tocar el JSX)?