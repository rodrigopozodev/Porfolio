## Objetivo
Arrancar el servidor de desarrollo de Next.js para `version-2` y verificar que está accesible localmente, sin hacer build ni commit.

## Pasos
1. Entrar al directorio `version-2/`.
2. Ejecutar `npm run dev` (puerto por defecto `http://localhost:3000`).
3. Esperar a que el servidor levante y confirmar que se cargan `layout.tsx` y `page.tsx` de `app/`.
4. Proporcionar la URL de previsualización y validar que responde (sin cambios de código adicionales).

## Consideraciones
- No haré `npm run build` ni `git commit`.
- Usaré la configuración actual generada por `create-next-app` y la estructura modular que ya creamos.
- Si el puerto 3000 está ocupado, arrancaré en un puerto alternativo (por ejemplo 3001) manteniendo todo sin cambios en el código.

## Resultado esperado
- Servidor de desarrollo corriendo en `http://localhost:3000` (o puerto alternativo) y accesible.
- Confirmación de que el proyecto `version-2` inicia con su estructura en `app/`.

¿Confirmas que proceda a iniciar el servidor ahora?