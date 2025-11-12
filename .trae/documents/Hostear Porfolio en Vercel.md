## Preflight
- Repo en GitHub: `rodrigopozodev/Porfolio` ya actualizado en `master`
- Build local verificado con `next build` (sin errores)
- No se requiere `vercel.json` ni variables de entorno

## Método 1: Importar desde GitHub (recomendado)
- Ir a `https://vercel.com/import/git` y conectar la cuenta de GitHub
- Seleccionar el repo `rodrigopozodev/Porfolio`
- Proyecto
  - Framework: Next.js (auto‑detectado)
  - Build & Output: Automático (`next build`)
  - Production Branch: `master`
  - Deploy: crear el proyecto y desplegar
- Opcional
  - Activar Auto‑Deploy en cada push a `master`
  - Añadir dominio personalizado desde “Domains”

## Método 2: CLI (si prefieres terminal)
- Instalar CLI: `npm i -g vercel`
- Login: `vercel login` (abre confirmación por email)
- En el directorio del proyecto: `vercel` para crear/enlazar el proyecto
- Desplegar a producción: `vercel --prod`

## Verificación
- Comprobar que las rutas funcionan: `/`, `/about`, `/projects`, `/projects/league-tracker`, `/projects/zapaspro`
- Revisar estilos, navegación y toggles (idioma, tema, zurdo/diestro)
- Activar “Auto‑Deploy” y (opcional) Vercel Analytics en el panel

## Siguientes pasos
- Confirmas el método (GitHub o CLI) y lo ejecuto
- Si eliges CLI, indícame si realizas el `vercel login` en tu cuenta; tras el login, continúo con `vercel --prod`