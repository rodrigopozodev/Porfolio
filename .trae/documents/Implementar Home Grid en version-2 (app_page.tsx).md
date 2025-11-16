## Objetivo
Crear la página de inicio en `version-2/app/page.tsx` con un layout Grid de 5 columnas × 2 filas (10%/90%) y seis áreas: `header`, `nav-left`, `recomendaciones`, `personal`, `destacado`, `nav-right`. Cada bloque muestra contenido de ejemplo y un borde azul de 2px, respetando la estructura del proyecto.

## Cambios Propuestos
- `app/page.tsx`
  - Renderizar el contenedor principal `.parent` (ocupa `100vh`).
  - Dividir en seis `<div>` mapeados a las áreas de grid:
    - `.header` (fila 1, cols 1–5) → muestra "Header" (más adelante integrará `Header.tsx`).
    - `.nav-left` (fila 2, col 1) → "Nav Left".
    - `.recomendaciones` (fila 2, col 2) → "Recomendaciones".
    - `.personal` (fila 2, col 3) → "Personal".
    - `.destacado` (fila 2, col 4) → "Destacado".
    - `.nav-right` (fila 2, col 5) → "Nav Right".
  - Usar una clase común `.box` para el borde azul y estilos de depuración.

- `app/styles/grid.css`
  - Definir la grilla principal:
    - `.parent { display: grid; height: 100vh; grid-template-columns: repeat(5, 1fr); grid-template-rows: 10% 90%; grid-template-areas: "header header header header header" "nav-left recomendaciones personal destacado nav-right"; }`
    - Asignar áreas: `.header { grid-area: header; }`, `.nav-left { grid-area: nav-left; }`, etc.

- `app/styles/layout.css`
  - Estilos base de los bloques:
    - `.box { border: 2px solid #3b82f6; /* blue-500 */ padding: 8px; color: inherit; }`
    - Centrados opcionales y tipografía mínima para visualización.

## Responsividad
- Mantener bordes de depuración siempre visibles.
- Mobile/tablet (ej. `max-width: 768px`): stack vertical con `grid-template-columns: 1fr` y `grid-template-rows: auto` (header arriba, el resto debajo), manteniendo los mismos nombres de áreas.
- Landscape crítico: el archivo `styles/landscape.css` ya existe; más adelante se añadirán reglas específicas (600×300, 667×375, etc.).

## Integración Futura
- Reemplazar el contenido de `.header` por el componente `components/layout/Header.tsx` cuando definas su contenido real.
- `Sidebar.tsx` podrá mapearse a `.nav-left`/`.nav-right` si decides usar sidebars en desktop.
- Las secciones (`Hero`, `About`, `Projects`, `Contact`) pueden ubicarse en `recomendaciones`, `personal` y `destacado` según tu diseño.

## Entregables
- Código funcional en `app/page.tsx` con JSX sencillo y placeholders.
- Reglas CSS añadidas en `app/styles/grid.css` y `app/styles/layout.css` (ya importadas por `globals.css`).

¿Confirmas que proceda a implementar estos cambios ahora?