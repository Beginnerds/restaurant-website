import React from 'react'
import './styles.css'
import NavBar from './_components/navbar'
import Footer from './_components/footer'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Yummi serves fresh, flavorful dishes crafted to delight every craving."',
  title: 'Yummi - Food And More',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: '/assets/favicon.png',
    },
  ],
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="bg-background relative font-default">
        <header className="sticky top-0 left-0 z-30 md:max-w-7xl mx-auto">
          <NavBar />
        </header>
        <main className="md:max-w-7xl mx-auto">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
