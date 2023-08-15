import { type ReactElement } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}
