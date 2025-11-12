## Objetivo
- Mostrar el doble de texto en móvil sin cortar contenido y sin activar scroll.

## Alcance
- Reverso de las tarjetas en la sección Portfolio (carrusel móvil y grid si aplica).
- Reverso de las tarjetas en la página “Projects”.

## Cambios en Portfolio (carrusel móvil)
- `components/portfolio-section.tsx`:
  - League Tracker (bloque `shouldCarousel`): ampliar el párrafo móvil con 2–4 frases adicionales (Multi‑Search, contenido editorial, refresco manual, privacidad sin sesión, tecnología).
  - ZapasPro: ampliar el párrafo móvil con 2–4 frases adicionales (búsqueda/ordenación, filtros combinados, UI responsive, páginas de administración, tecnología).
  - Mantener `text-sm` y `leading-snug`; aumentar ancho útil en móvil con `max-[900px]:max-w-[95%]`.
  - Título centrado en móvil usando `max-[900px]:text-center` (ya aplicado, se verifica).

## Cambios en Projects
- `app/projects/page.tsx` (`renderBackContent`):
  - Ampliar los párrafos móviles de League Tracker y ZapasPro con las mismas 2–4 frases adicionales para consistencia.
  - Mantener `text-sm`, `leading-snug`, `max-[900px]:max-w-[95%]` y alineación superior/izquierda para aprovechar el alto.

## Estilo y límites
- No activar scroll: mantener alturas actuales (`h-[66–76vh]`) y revisar que el nuevo texto no desborde.
- Si es necesario, ajustar ligeramente `leading` o `margin` para encajar cómodamente (p.ej., reducir `mb-4` a `mb-3`).

## Verificación
- En viewport ≤ 900px: comprobar que el reverso muestra contenido ampliado, el título centrado, y que no hay cortes ni scroll.
- En tablet/escritorio: el contenido detallado actual se mantiene sin cambios.