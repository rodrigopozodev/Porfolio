## Objetivo

* Añadir más texto en el reverso móvil sin cortes.

* Reubicar la navegación de puntos a la derecha para que quede más lejos de la pared y más cerca de la tarjeta.

## Cambios en texto (móvil)

* `components/portfolio-section.tsx` (carrusel móvil, `shouldCarousel`):

  * League Tracker: añadir 7 frase extra sobre refresco manual y guía editorial.

  * ZapasPro: añadir 9 frase extra sobre filtros combinados y navegación rápida.

  * Mantener `text-sm`, `leading-snug` y `max-[900px]:max-w-[95%]`.

## Cambios en navegación (móvil)

* Reposicionar los puntos de navegación a la derecha y en vertical cuando `shouldCarousel === true`:

  * Cambiar contenedor de indicadores: de bottom center a right center con `absolute top-1/2 -translate-y-1/2 right-6`.

  * Disposición vertical `flex-col` y `gap-2`.

  * Ajustar `right-6` para mayor margen con la pared y menor separación con la tarjeta (se puede afinar a `right-5`/`right-7`).

  * Ocultar indicadores inferiores en móvil para que no dupliquen navegación.

## Ajustes del slide

* Incrementar levemente el ancho de la tarjeta en móvil `max-w-[92%]` → `max-w-[94%]` para acercar la tarjeta a la navegación.

## Verificación

* En ≤900px: comprobar que los puntos quedan más cercanos a la tarjeta y más alejados del borde derecho; el texto ampliado entra completo sin scroll.

* En >900px: mantener el comportamiento actual sin cambios.

