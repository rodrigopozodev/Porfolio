# Arquitectura del Proyecto

Este documento describe la arquitectura, estructura y decisiones de diseño del portfolio.

## 📐 Visión General

El proyecto está construido con **Next.js 16** usando el **App Router**, siguiendo principios de:
- **Mobile-first**: Diseño responsive desde móvil hacia desktop
- **Type Safety**: TypeScript estricto en todo el código
- **Componentización**: Componentes reutilizables y modulares
- **Separación de Concerns**: Lógica, presentación y datos separados

## 🗂️ Estructura de Carpetas

```
app/
├── api/                          # API Routes (Next.js)
│   └── testimonios/
│       └── route.ts             # Endpoints REST para testimonios
│
├── componentes/                  # Componentes reutilizables
│   ├── botones/                  # Botones de acción
│   │   ├── temas/               # ThemeToggle
│   │   ├── lateralidad/         # HandednessToggle
│   │   ├── traducción/          # LanguageToggle
│   │   ├── visitar/             # VisitarButton
│   │   └── informacion/         # InformacionButton
│   │
│   ├── tarjetas/                 # Tarjetas de proyectos
│   │   ├── tarjetasToggle.tsx   # Componente principal
│   │   ├── tarjetas.css         # Estilos de tarjetas
│   │   └── useAutoFontSize.ts    # Hook para tamaño de fuente automático
│   │
│   ├── testimonios/              # Componentes de testimonios
│   │   └── KineticTestimonial.tsx
│   │
│   ├── utils/                    # Hooks y utilidades
│   │   ├── useTheme.ts          # Gestión de temas
│   │   ├── useHandedness.ts     # Gestión de lateralidad
│   │   ├── useLanguage.ts       # Gestión de idiomas
│   │   ├── useLocalStorage.ts   # Hook genérico para localStorage
│   │   ├── ErrorBoundary.tsx    # Error Boundary de React
│   │   └── breakpoints.ts       # Breakpoints de diseño
│   │
│   └── transiciones/             # Componentes de transición
│       └── TransitionFull.tsx
│
├── lib/                          # Utilidades y configuración
│   ├── config.ts                 # Configuración centralizada
│   ├── logger.ts                 # Sistema de logging
│   ├── validations.ts            # Schemas de validación (Zod)
│   └── sqlite.ts                 # Acceso a base de datos
│
├── paginas/                      # Páginas de la aplicación
│   ├── inicio/                   # Página principal
│   │   ├── Header/               # Header con toggles
│   │   ├── body/                 # Contenido principal
│   │   ├── navegacion/           # Navegación entre páginas
│   │   └── styles/               # Estilos específicos
│   │       ├── grid.css          # Layout grid responsive
│   │       └── inicio.css        # Estilos de inicio
│   │
│   └── proyectos/                # Página de proyectos
│       └── Proyectos.tsx
│
├── globals.css                    # Estilos globales
├── layout.tsx                     # Layout raíz
└── page.tsx                       # Página principal
```

## 🎯 Principios de Diseño

### 1. Mobile-First

El diseño comienza desde móvil y se expande hacia pantallas más grandes:

```css
/* Base: móvil */
.parent {
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto auto auto;
}

/* Tablet (≥768px) */
@media (min-width: 768px) {
  .parent {
    grid-template-columns: 10% 80% 10%;
  }
}

/* Desktop (≥1024px) */
@media (min-width: 1024px) {
  .parent {
    grid-template-columns: 10% 26.6667% 26.6666% 26.6667% 10%;
  }
}
```

### 2. Container Queries

Uso de Container Queries para tipografía fluida:

```css
.nombre {
  font-size: clamp(0.95rem, 8cqw, 2.4rem);
}
```

### 3. Separación de Concerns

- **Componentes**: Solo presentación
- **Hooks**: Lógica de negocio
- **Lib**: Utilidades y configuración
- **API Routes**: Lógica del servidor

## 🔧 Hooks Personalizados

### useTheme

Gestiona el tema de la aplicación (light/dark/system):

```typescript
const { theme, toggleTheme, isDark } = useTheme()
```

**Características**:
- Persistencia en localStorage
- Detección de preferencias del sistema
- Sincronización entre componentes

### useHandedness

Gestiona la lateralidad (left/right):

```typescript
const { mode, toggleMode } = useHandedness()
```

**Características**:
- Eventos personalizados para sincronización
- Persistencia opcional

### useLanguage

Gestiona el idioma de la aplicación:

```typescript
const { language, toggleLanguage } = useLanguage()
```

### useLocalStorage

Hook genérico para localStorage:

```typescript
const [value, setValue] = useLocalStorage<string>("key", "default")
```

## 🛡️ Manejo de Errores

### Error Boundaries

Error Boundary a nivel de aplicación:

```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Logging

Sistema de logging centralizado:

```typescript
import { logger } from "@/lib/logger"

logger.error("Error message", error, { context })
logger.warn("Warning message", { context })
logger.info("Info message", { context })
```

### Validación

Schemas de Zod para validación:

```typescript
import { testimonialSchema, validateData } from "@/lib/validations"

const result = validateData(testimonialSchema, data)
if (!result.success) {
  // Manejar errores
}
```

## 🗄️ Base de Datos

SQLite con better-sqlite3:

```typescript
// app/lib/sqlite.ts
const db = new Database(dbPath)
db.exec(`
  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    ...
  )
`)
```

## 🎨 Sistema de Estilos

### Tailwind CSS 4

Uso de Tailwind para estilos utilitarios.

### CSS Modules

Algunos componentes usan CSS modules para estilos específicos.

### Variables CSS

Variables de tema en `globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

## 🧪 Testing

### Vitest

Framework de testing:

```typescript
// vitest.config.ts
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
})
```

### Tests Unitarios

Tests para hooks y utilidades:

```typescript
// app/componentes/utils/__tests__/useTheme.test.ts
describe("useTheme", () => {
  it("debería inicializar con tema 'system'", () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe("system")
  })
})
```

## 📦 Configuración Centralizada

Toda la configuración está en `app/lib/config.ts`:

```typescript
export const appConfig = {
  name: "Portfolio de Rodrigo Pozo Sánchez",
  version: "0.1.0",
  // ...
}

export const themeConfig = {
  defaultTheme: "system",
  storageKey: "theme",
  // ...
}
```

## 🚀 Optimizaciones

### Preload de Recursos

Preload de imágenes críticas en `layout.tsx`:

```tsx
<link rel="preload" as="image" href="/League Tracker.png" />
```

### Lazy Loading

Componentes pesados se cargan bajo demanda.

### Image Optimization

Optimización de imágenes con CSS:

```css
.flip-image {
  image-rendering: -webkit-optimize-contrast;
  transform: translateZ(0);
}
```

## 🔐 Seguridad

- Validación de inputs con Zod
- Sanitización de datos
- Manejo seguro de errores
- Type safety con TypeScript

## 📱 Responsive Design

### Breakpoints

```typescript
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  large: 1366,
  xl: 1920,
}
```

### Layout Adaptativo

- **Móvil**: Scroll vertical, todas las secciones visibles
- **Tablet**: Grid 3 columnas
- **Desktop**: Grid 5 columnas

## 🎯 Próximas Mejoras

- [ ] Implementar i18n real
- [ ] Agregar más tests (E2E)
- [ ] Mejorar accesibilidad (skip links, focus visible)
- [ ] Optimizar bundle size
- [ ] Implementar PWA

---

**Última actualización**: Diciembre 2024

