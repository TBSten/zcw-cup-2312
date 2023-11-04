import BaseLayout from '@/components/BaseLayout'
import { ColorSchemeScript } from '@mantine/core'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wiki杯',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <Providers>
          <BaseLayout>
            {children}
          </BaseLayout>
        </Providers>
      </body>
    </html>
  )
}
