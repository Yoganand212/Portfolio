import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yoganand S — The Jazz Lounge",
  description:
    "Step into the jazz lounge. A portfolio that feels like visiting a cozy club on a rainy night — where every object tells part of the story.",
  keywords: [
    "Yoganand S",
    "portfolio",
    "computer science",
    "machine learning",
    "full-stack developer",
  ],
  authors: [{ name: "Yoganand S" }],
  openGraph: {
    title: "Yoganand S — The Jazz Lounge",
    description:
      "Step inside. Every room tells a story.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Sentient from Fontshare — display serif */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=sentient@300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        {/* Geist Sans from Google Fonts — body */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;350;400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#1B1714" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
