import type { Metadata } from 'next'
import { Instrument_Sans } from 'next/font/google'
import './globals.css'
import { Provider } from './_trpc/Provider'

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={instrumentSans.className}>
      <body className="bg-custom-gray-light">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
