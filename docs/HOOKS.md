# Documentación de Hooks Personalizados

Este documento describe todos los hooks personalizados del proyecto.

## 📚 Índice

- [useTheme](#usetheme)
- [useHandedness](#usehandedness)
- [useLanguage](#uselanguage)
- [useLocalStorage](#uselocalstorage)
- [useIsDark](#useisdark)

---

## useTheme

Gestiona el tema de la aplicación (light/dark/system).

### Uso

```typescript
import { useTheme } from "@/componentes/utils/useTheme"

function MyComponent() {
  const { theme, toggleTheme, isDark, setTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Tema actual: {theme} ({isDark ? "oscuro" : "claro"})
    </button>
  )
}
```

### API

#### `theme: "light" | "dark" | "system"`

Tema actual de la aplicación.

#### `isDark: boolean`

Indica si el tema actual es oscuro.

#### `mountedTheme: "light" | "dark" | "system"`

Tema montado (útil para evitar hydration mismatches).

#### `toggleTheme(): void`

Alterna entre `light` y `dark`.

#### `setTheme(theme: "light" | "dark" | "system"): void`

Establece un tema específico.

### Características

- ✅ Persistencia en localStorage
- ✅ Detección de preferencias del sistema
- ✅ Sincronización entre componentes mediante eventos
- ✅ Manejo de errores con logging

### Ejemplo Completo

```typescript
const { theme, toggleTheme, isDark } = useTheme()

useEffect(() => {
  console.log(`Tema cambiado a: ${theme}`)
}, [theme])
```

---

## useHandedness

Gestiona la lateralidad (modo diestro/zurdo) de la navegación.

### Uso

```typescript
import { useHandedness } from "@/componentes/utils/useHandedness"

function Navigation() {
  const { mode, toggleMode, setMode } = useHandedness()
  
  return (
    <div className={mode === "left" ? "nav-left" : "nav-right"}>
      <button onClick={toggleMode}>
        Cambiar a {mode === "left" ? "derecha" : "izquierda"}
      </button>
    </div>
  )
}
```

### API

#### `mode: "left" | "right"`

Modo actual de lateralidad.

#### `toggleMode(): void`

Alterna entre `left` y `right`.

#### `setMode(mode: "left" | "right"): void`

Establece un modo específico.

### Características

- ✅ Eventos personalizados para sincronización
- ✅ Escucha cambios desde otros componentes
- ✅ Manejo de errores con logging

### Eventos

El hook escucha el evento `handednessChange`:

```typescript
window.dispatchEvent(
  new CustomEvent("handednessChange", { detail: { mode: "left" } })
)
```

---

## useLanguage

Gestiona el idioma de la aplicación.

### Uso

```typescript
import { useLanguage } from "@/componentes/utils/useLanguage"

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()
  
  return (
    <button onClick={toggleLanguage}>
      Idioma: {language === "es" ? "Español" : "English"}
    </button>
  )
}
```

### API

#### `language: "es" | "en"`

Idioma actual.

#### `toggleLanguage(): void`

Alterna entre `es` y `en`.

### Características

- ✅ Persistencia en localStorage
- ✅ Sincronización entre componentes

---

## useLocalStorage

Hook genérico para gestionar valores en localStorage.

### Uso

```typescript
import { useLocalStorage } from "@/componentes/utils/useLocalStorage"

function MyComponent() {
  const [value, setValue] = useLocalStorage<string>("myKey", "default")
  
  return (
    <input 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
    />
  )
}
```

### API

#### `useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]`

- `key`: Clave en localStorage
- `initialValue`: Valor por defecto
- Retorna: `[value, setValue]`

### Características

- ✅ Type-safe con TypeScript
- ✅ Manejo de errores (fallback a valor inicial)
- ✅ Sincronización entre tabs (opcional)

### Ejemplo con Tipos

```typescript
interface User {
  name: string
  email: string
}

const [user, setUser] = useLocalStorage<User>("user", {
  name: "",
  email: "",
})
```

---

## useIsDark

Hook simplificado solo para detectar si el tema es oscuro.

### Uso

```typescript
import { useIsDark } from "@/componentes/utils/useTheme"

function MyComponent() {
  const isDark = useIsDark()
  
  return (
    <div className={isDark ? "dark-mode" : "light-mode"}>
      Contenido
    </div>
  )
}
```

### API

#### `useIsDark(): boolean`

Retorna `true` si el tema es oscuro, `false` si es claro.

### Características

- ✅ Ligero (solo detecta, no gestiona)
- ✅ Útil para componentes que solo necesitan el estado
- ✅ Escucha cambios de tema automáticamente

### Cuándo Usar

- Cuando solo necesitas saber si es dark/light
- Cuando no necesitas cambiar el tema
- Para evitar re-renders innecesarios

---

## 🧪 Testing

Todos los hooks tienen tests unitarios:

```bash
npm test useTheme
npm test useHandedness
```

---

## 💡 Mejores Prácticas

1. **Usa `useIsDark`** cuando solo necesites detectar el tema
2. **Usa `useTheme`** cuando necesites gestionar el tema
3. **Maneja errores** - Los hooks ya incluyen logging
4. **Type safety** - Aprovecha los tipos de TypeScript

---

**Última actualización**: Diciembre 2024

