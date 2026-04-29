import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Antonio, Bitter } from "next/font/google";
import Script from "next/script";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
});

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crosshair.best"),
  title: {
    default: "Crosshair - Miras de Valorant, Códigos y Configuraciones Pro",
    template: "%s | Crosshair",
  },
  description:
    "Encuentra las mejores miras de Valorant. Códigos de crosshair de jugadores profesionales, configuraciones de ratón, video y periféricos. Generador de miras y tier list.",
  keywords: [
    "valorant",
    "crosshair",
    "mira",
    "código mira valorant",
    "pro settings",
    "configuración valorant",
    "crosshair codes",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Crosshair",
    title: "Crosshair - Miras de Valorant y Configuraciones Pro",
    description:
      "Códigos de miras de Valorant, ajustes de profesionales y generador de crosshairs.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Crosshair - Miras de Valorant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crosshair - Miras de Valorant",
    description:
      "Códigos de miras, configuraciones pro y generador de crosshairs para Valorant.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${antonio.variable} ${bitter.variable} h-full antialiased`}
    >
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0QQM4G7CKW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0QQM4G7CKW');
          `}
        </Script>
        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8271717628756547"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Umami Analytics */}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="8a280a9b-21b6-49d7-9ecf-5854ef37e799"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Menu />
        <div className="px-1 w-full h-full xs:px-6 lg:px-12 2xl:px-16 flex-1">
          {children}
        </div>
        <footer className="w-full border-white/10 border-t mt-24">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
