import type { Metadata } from "next";
import { Chonburi, Domine, Space_Mono } from "next/font/google";
import "@/styles/globals.css";
import Layout from "@/layouts";
import { Analytics } from "@vercel/analytics/next"

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"]
});

const chonburi = Chonburi({
  variable: "--font-chonburi",
  subsets: ["latin"],
  weight: "400"
});

const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Tebunah Training - Formations en Informatique",
  description: "Tebunah Training propose des formations pratiques en développement web, Intelligence Artificielle, outils bureautiques (...etc), animées par des experts passionnés. Découvrez notre catalogue et boostez vos compétences IT dès aujourd'hui !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="fr"
      className={`${chonburi.variable} ${domine.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Layout>
          {children}
        </Layout>
      </body>

      <Analytics />
    </html>
  );
}
