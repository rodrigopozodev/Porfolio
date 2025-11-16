// Esta pequeña utilidad construye textos de clases CSS de forma segura.
// "clsx" junta trozos de texto condicionalmente (añade o quita según valores).
// "tailwind-merge" resuelve conflictos entre utilidades de Tailwind y elimina duplicados,
// de modo que el resultado final sea limpio y coherente.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// "cn" recibe varias piezas de texto y devuelve una única cadena lista para usar en "className".
// Primero une todo con "clsx" y después normaliza con "tailwind-merge" para evitar choques de clases.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
