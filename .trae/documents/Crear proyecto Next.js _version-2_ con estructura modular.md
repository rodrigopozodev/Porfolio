## Objetivos
- Crear un nuevo proyecto Next.js en `version-2/` con la estructura solicitada.
- Separar layout, UI y secciones, con estilos y breakpoints centralizados.
- Preparar utilidades para detección de breakpoints en JS.

## Estructura de Carpetas
- `version-2/app/`
  - `layout.tsx`, `page.tsx`, `globals.css`
  - `components/`
    - `layout/` → `Header.tsx`, `Footer.tsx`, `Sidebar.tsx`, `ResponsiveWrapper.tsx`
    - `ui/` → `Button.tsx`, `Card.tsx`, `Grid.tsx`
    - `sections/` → `Hero.tsx`, `About.tsx`, `Projects.tsx`, `Contact.tsx`
  - `styles/` → `breakpoints.css`, `grid.css`, `layout.css`, `typography.css`, `mobile.css`, `tablet.css`, `desktop.css`, `landscape.css`
  - `utils/` → `breakpoints.ts`, `constants.ts`, `helpers.ts`
- `version-2/public/` → `images/`, `icons/`
- `version-2/package.json`, `version-2/tailwind.config.js` (opcional)

## Justificación de la Estructura
- **Separación por responsabilidad**: `layout` orquesta el shell (Header/Footer/Sidebar), `ui` ofrece componentes reutilizables atómicos, `sections` compone páginas con piezas de negocio.
- **Estilos escalables**: todos los media queries viven en `breakpoints.css`, y los estilos por dispositivo (`mobile.css`, `tablet.css`, `desktop.css`, `landscape.css`) aíslan reglas por contexto.
- **Grid independiente**: `grid.css` define un sistema de grid consistente, reusable en secciones y UI.
- **Responsive declarativo**: `ResponsiveWrapper.tsx` aplica variaciones de layout automáticamente según breakpoints (sin duplicar lógica en cada sección).
- **Utilidades centralizadas**: `utils/breakpoints.ts` unifica `matchMedia` y eventos; `constants.ts` fija tamaños; `helpers.ts` concentra funciones comunes.
- **Portabilidad de UI**: los componentes de `ui` no dependen del layout ni de páginas; facilitan test y reuso entre secciones.
- **Landscape crítico**: `landscape.css` cubre tamaños problemáticos (600×300, 667×375, 736×414, 812×375, 896×414, 1024×600) con reglas específicas.

## Implementación (Pasos)
1. Inicializar Next.js en `version-2/` con TypeScript y App Router.
2. Configurar `tsconfig.json` con alias `@/*` y `baseUrl` para imports.
3. Crear carpetas y archivos vacíos conforme al listado.
4. Implementar `layout.tsx` usando `Header`, `Footer`, `Sidebar` y envolviendo `{children}` con `ResponsiveWrapper`.
5. Implementar `page.tsx` con secciones (`Hero`, `About`, `Projects`, `Contact`) de forma mínima.
6. Importar en `globals.css` los módulos de `styles/*` en orden: `typography.css` → `layout.css` → `grid.css` → `breakpoints.css` → `mobile.css` → `tablet.css` → `desktop.css` → `landscape.css`.
7. Rellenar `utils/breakpoints.ts` con listeners `matchMedia` y un hook `useBreakpoint()`.
8. Opcional: añadir `tailwind.config.js` si decides combinar Tailwind con CSS modular; mantener los estilos críticos en los CSS dedicados.

## Detalles Técnicos
- **ResponsiveWrapper.tsx**: detecta breakpoint actual (con `useBreakpoint()`), expone props/slots para variantes y aplica clases del módulo de estilos correspondiente.
- **Grid.tsx**: abstrae filas/columnas y áreas; permite layout declarativo sin mezclar reglas de negocio.
- **Landscape.css**: define media queries exactas para todos los tamaños landscape proporcionados y aplica layouts alternativos.

## Integración Inicial
- `Header.tsx`: barra superior (nav/toggles), sin lógica de datos.
- `Footer.tsx`: enlaces secundarios y metainformación.
- `Sidebar.tsx`: navegación contextual en desktop.
- `Hero/About/Projects/Contact`: placeholders con Grid.

## Opcional Tailwind
- Si usas Tailwind, mantener utilidades de spacing/color; la responsividad, grid y reglas de layout principales viven en los CSS dedicados para evitar dispersión.

## Confirmación
- Al aprobar, creo `version-2/` con la estructura y los stubs vacíos, sin ejecutar build ni commit. ¿Confirmas que proceda a generar la estructura exactamente como está descrita?