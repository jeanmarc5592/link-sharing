import type { Metadata } from 'next'
import { Instrument_Sans } from 'next/font/google'
import './globals.css'
import ToastProvider from './common/providers/ToastProvider'
import StoreProvider from './common/providers/StoreProvider'
import QueryProvider from './common/providers/QueryProvider'

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Devlinks',
  description: 'Link sharing for developers made easy!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={instrumentSans.className}>
      <body className="bg-custom-gray-light">
        <ToastProvider>
          <StoreProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
          </StoreProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
