import './globals.css'

export const metadata = {
  title: 'Survey App',
  description: 'Made by love Tyo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
