import './globals.css'

export const metadata = {
  title: 'Dayunnasgor Role Selection',
  description: 'Choose your workspace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
