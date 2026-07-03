import "./globals.css";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: "KDS - Dayunnasgor",
  description: "Kitchen Display System",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
