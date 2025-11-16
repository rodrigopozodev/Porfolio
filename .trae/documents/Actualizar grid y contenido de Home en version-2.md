## Objetivo
Aplicar la estructura solicitada en `version-2`:
- CSS: usar `grid-area` con coordenadas numéricas y `grid-gap: 0`.
- HTML/JSX: etiquetas en español dentro de cada bloque.

## Cambios Propuestos
- `app/styles/grid.css`
  - `.parent`: `display: grid; height: 100vh; grid-template-columns: repeat(5, 1fr); grid-template-rows: 10% 90%; grid-column-gap: 0; grid-row-gap: 0;`
  - Asignaciones numéricas:
    - `.header { grid-area: 1 / 1 / 2 / 6; }`
    - `.nav-left { grid-area: 2 / 1 / 3 / 2; }`
    - `.recomendaciones { grid-area: 2 / 2 / 3 / 3; }`
    - `.personal { grid-area: 2 / 3 / 3 / 4; }`
    - `.destacado { grid-area: 2 / 4 / 3 / 5; }`
    - `.nav-right { grid-area: 2 / 5 / 3 / 6; }`
  - Retirar `grid-template-areas` previo para evitar conflicto.

- `app/page.tsx`
  - Actualizar textos en español:
    - Header → "Header"
    - Nav Left → "Navegación izquierda"
    - Recomendaciones → "Recomendaciones"
    - Personal → "Personal"
    - Destacado → "Proyecto destacado"
    - Nav Right → "Navegación derecha"
  - Mantener clase `.box` para borde azul (depuración constante).

## Consideraciones
- No tocar la responsividad móvil en esta iteración (no solicitado); se puede añadir después.
- Sin build ni commit.

## Resultado Esperado
- Home renderiza con el grid y contenido actualizado.

¿Confirmas que proceda a aplicar estos cambios?