# Portfolio de Rodrigo Pozo Sánchez

Portfolio personal moderno construido con Next.js 16, React 19, TypeScript y Tailwind CSS. Muestra proyectos, habilidades y testimonios con un diseño responsive y accesible.

## 🚀 Características

- **Diseño Moderno**: UI profesional con animaciones fluidas y transiciones suaves
- **Tema Claro/Oscuro**: Soporte completo para temas con persistencia en localStorage
- **Lateralidad (Handedness)**: Feature única que adapta la navegación según preferencia del usuario
- **Responsive**: Mobile-first con layout adaptativo para todos los dispositivos
- **Accesible**: ARIA labels, navegación por teclado y semántica HTML correcta
- **Optimizado**: Preload de recursos, lazy loading y optimización de imágenes
- **Type-Safe**: TypeScript estricto en todo el proyecto
- **Testing**: Tests unitarios con Vitest para hooks y utilidades críticas

## 📋 Requisitos Previos

- Node.js 18+ 
- npm, yarn, pnpm o bun

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm start            # Inicia servidor de producción

# Calidad de código
npm run lint         # Ejecuta ESLint

# Testing
npm test             # Ejecuta tests en modo watch
npm run test:ui      # Ejecuta tests con UI interactiva
npm run test:coverage # Ejecuta tests con cobertura
```

## 🏗️ Estructura del Proyecto

```
app/
├── api/                    # API Routes (Next.js)
│   └── testimonios/        # Endpoints para testimonios
├── componentes/            # Componentes reutilizables
│   ├── botones/           # Botones de acción
│   ├── tarjetas/          # Tarjetas de proyectos
│   ├── testimonios/       # Componentes de testimonios
│   └── utils/             # Hooks y utilidades
├── lib/                    # Utilidades y configuración
│   ├── config.ts          # Configuración centralizada
│   ├── logger.ts          # Sistema de logging
│   ├── validations.ts     # Schemas de validación (Zod)
│   └── sqlite.ts          # Acceso a base de datos
├── paginas/                # Páginas de la aplicación
│   ├── inicio/            # Página principal
│   └── proyectos/         # Página de proyectos
└── globals.css             # Estilos globales
```

Para más detalles, ver [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## 🎨 Tecnologías Utilizadas

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4
- **Animaciones**: Framer Motion
- **Validación**: Zod
- **Base de Datos**: SQLite (better-sqlite3)
- **Testing**: Vitest + Testing Library

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` (opcional):

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
DB_PATH=data.sqlite
NODE_ENV=development
```

### Base de Datos

La base de datos SQLite se crea automáticamente en `data.sqlite` al iniciar la aplicación.

## 📚 Documentación

- [Arquitectura del Proyecto](./docs/ARCHITECTURE.md) - Estructura detallada y decisiones de diseño
- [Guía de Contribución](./docs/CONTRIBUTING.md) - Cómo contribuir al proyecto
- [Hooks Personalizados](./docs/HOOKS.md) - Documentación de hooks custom

## 🧪 Testing

El proyecto incluye tests unitarios para:
- Hooks personalizados (`useTheme`, `useHandedness`)
- Validaciones (schemas de Zod)
- Utilidades críticas

Ejecuta los tests con:
```bash
npm test
```

## 🐛 Manejo de Errores

El proyecto incluye:
- **Error Boundaries**: Captura errores de React a nivel de aplicación
- **Logging estructurado**: Sistema de logging centralizado
- **Validación robusta**: Schemas de Zod para validar datos
- **Manejo de errores**: Todos los `catch` blocks incluyen logging apropiado

## 🚢 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente Next.js
3. El despliegue se realizará automáticamente

### Otros Proveedores

El proyecto puede desplegarse en cualquier plataforma que soporte Next.js:
- Netlify
- Railway
- AWS Amplify
- Docker

## 📝 Licencia

Este proyecto es privado y personal.

## 👤 Autor

**Rodrigo Pozo Sánchez**

- Portfolio: [En desarrollo]
- GitHub: [@rodrigopozosanchez](https://github.com/rodrigopozosanchez)
- LinkedIn: [Rodrigo Pozo Sánchez](https://www.linkedin.com/in/rodrigo-pozo-sánchez)

## 🙏 Agradecimientos

- Next.js team por el excelente framework
- Comunidad de React por las herramientas y recursos
- Todos los que han contribuido con feedback y sugerencias

---

**Última actualización**: Diciembre 2024
