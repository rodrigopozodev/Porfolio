## Objetivo
- Aumentar el texto del reverso en móvil (sin scroll ni cortes).
- Ajustar la navegación de puntos exterior: más margen con la pared derecha y más cerca de la tarjeta.

## Cambios propuestos
- Portfolio carrusel (`components/portfolio-section.tsx`):
  - Ampliar los párrafos móviles de League Tracker y ZapasPro con 1–2 frases adicionales.
  - Aumentar ancho de la tarjeta en móvil `max-w-[94%]` → `max-w-[96%]`.
  - Reposicionar puntos laterales a `right-10` para más margen con la pared y menos separación con la tarjeta.
- Projects (`app/projects/page.tsx`):
  - Ampliar los párrafos móviles de League Tracker y ZapasPro con 1–2 frases adicionales para consistencia.

## Verificación
- En ≤900px: texto ampliado visible completo, título centrado; navegación lateral más cerca de la tarjeta y más lejos del borde.
- En >900px: sin cambios en navegación ni en contenido de escritorio.