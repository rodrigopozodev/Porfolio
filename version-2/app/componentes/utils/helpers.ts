/**
 * Utilidades de helpers. `cn` concatena clases filtrando valores falsy.
 */
export function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ")
}