## Objetivo
Ajustar `version-2/app/styles/grid.css` para que las columnas de navegación (`.nav-left` y `.nav-right`) ocupen el 10% del ancho cada una, y las tres columnas centrales (`.recomendaciones`, `.personal`, `.destacado`) se repartan equitativamente el 80% restante. Mantener el grid 5×2, sin scroll y con bordes azules.

## Cambios Propuestos
- `app/styles/grid.css`
  - `.parent`: `grid-template-columns: 10% 26.6667% 26.6666% 26.6667% 10%` y `grid-template-rows: 10% 90%`.
  - Mantener áreas numéricas (`grid-area`) ya definidas para las seis regiones.
  - Replicar la misma configuración de columnas y filas en `@media (orientation: portrait)` y `@media (orientation: landscape)` para consistencia en móvil.
  - Conservar `min-width: 0; min-height: 0;` en las áreas para evitar cortes.
- `app/styles/layout.css`
  - Mantener `.box` con borde azul y las reglas universales de ajuste (wrap de texto, medios contenido, controles con `max-width: 100%`).

## Consideraciones
- Sin scroll: el contenido debe adaptarse; ya está reforzado en `layout.css` con wraps y límites de ancho.
- No se tocan los JSX ni la estructura de `page.tsx`.

## Resultado Esperado
- Las columnas 1 y 5 ocupan el 10% cada una; columnas 2–4 ocupan ~26.6667% cada una.
- Se mantiene la proporción en desktop y móvil (portrait/landscape), sin desbordes.

¿Confirmas que aplique estos cambios ahora?