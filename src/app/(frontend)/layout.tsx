import React from 'react'
import './styles.css'
import NavBar from './_components/navbar'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="bg-background relative font-default">
        <header className="sticky top-0 left-0 z-30 md:max-w-7xl mx-auto">
          <NavBar />
        </header>
        <main className="md:max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  )
}
