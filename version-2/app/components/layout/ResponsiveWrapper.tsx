import React from "react"

type Props = { children: React.ReactNode }

export default function ResponsiveWrapper({ children }: Props) {
  return <div>{children}</div>
}