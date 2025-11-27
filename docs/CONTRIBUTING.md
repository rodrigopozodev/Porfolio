# Guía de Contribución

¡Gracias por tu interés en contribuir! Esta guía te ayudará a entender cómo contribuir al proyecto.

## 🚀 Inicio Rápido

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📋 Proceso de Desarrollo

### 1. Configuración del Entorno

```bash
# Clonar el repositorio
git clone <repository-url>
cd Porfolio

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### 2. Estructura de Commits

Usa commits descriptivos siguiendo [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: agregar nuevo componente de tarjeta
fix: corregir error en useTheme hook
docs: actualizar documentación de hooks
test: agregar tests para useHandedness
refactor: mejorar estructura de carpetas
```

### 3. Código de Estilo

- **TypeScript**: Usa tipos estrictos, evita `any`
- **ESLint**: Ejecuta `npm run lint` antes de commitear
- **Formato**: Usa Prettier (si está configurado)
- **Nombres**: Usa nombres descriptivos en inglés

### 4. Testing

- Escribe tests para nuevas features
- Asegúrate de que todos los tests pasen: `npm test`
- Mantén la cobertura de código alta

## 🎯 Áreas de Contribución

### Bugs

1. Verifica que el bug no esté ya reportado
2. Crea un issue con:
   - Descripción clara
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si aplica

### Features

1. Discute la feature en un issue primero
2. Espera aprobación antes de implementar
3. Sigue la arquitectura existente
4. Agrega documentación

### Documentación

- Mejora README
- Agrega ejemplos de código
- Documenta nuevas features
- Corrige errores tipográficos

## 📝 Checklist para Pull Requests

- [ ] Código sigue el estilo del proyecto
- [ ] Tests agregados/actualizados
- [ ] Todos los tests pasan
- [ ] Documentación actualizada
- [ ] Commits siguen Conventional Commits
- [ ] No hay warnings de ESLint
- [ ] Código revisado por ti mismo

## 🧪 Testing

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests en modo watch
npm test -- --watch

# Tests con UI
npm run test:ui

# Cobertura
npm run test:coverage
```

### Escribir Tests

```typescript
import { describe, it, expect } from "vitest"
import { renderHook } from "@testing-library/react"
import { useTheme } from "@/componentes/utils/useTheme"

describe("useTheme", () => {
  it("debería inicializar correctamente", () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe("system")
  })
})
```

## 🏗️ Arquitectura

### Estructura de Componentes

```typescript
// Componente funcional con TypeScript
"use client"

import { useState } from "react"
import { logger } from "@/lib/logger"

interface Props {
  title: string
  onClick?: () => void
}

export default function MyComponent({ title, onClick }: Props) {
  const [state, setState] = useState(false)
  
  const handleClick = () => {
    try {
      onClick?.()
    } catch (error) {
      logger.error("Error in onClick", error instanceof Error ? error : new Error(String(error)))
    }
  }
  
  return <button onClick={handleClick}>{title}</button>
}
```

### Hooks Personalizados

```typescript
"use client"

import { useState, useEffect } from "react"
import { logger } from "@/lib/logger"

export function useMyHook() {
  const [value, setValue] = useState(0)
  
  useEffect(() => {
    // Lógica del hook
  }, [])
  
  return { value, setValue }
}
```

## 🐛 Reportar Bugs

Usa el template de issue para bugs:

```markdown
**Descripción**
Descripción clara del bug

**Pasos para Reproducir**
1. Ir a '...'
2. Click en '...'
3. Ver error

**Comportamiento Esperado**
Lo que debería pasar

**Comportamiento Actual**
Lo que realmente pasa

**Screenshots**
Si aplica

**Entorno**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 120]
- Versión: [e.g. 0.1.0]
```

## 💡 Sugerencias

Para sugerencias de features:

1. Abre un issue con la etiqueta "enhancement"
2. Describe la feature detalladamente
3. Explica por qué sería útil
4. Espera feedback antes de implementar

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Vitest Docs](https://vitest.dev)

## ❓ Preguntas

Si tienes preguntas:
1. Revisa la documentación
2. Busca en issues existentes
3. Abre un nuevo issue con la etiqueta "question"

---

**Gracias por contribuir!** 🎉

