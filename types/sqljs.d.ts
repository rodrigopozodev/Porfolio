declare module "sql.js" {
  export type Database = any
  export default function initSqlJs(config?: {
    locateFile?: (file: string) => string
  }): Promise<{ Database: new (data?: Uint8Array) => Database }>
}