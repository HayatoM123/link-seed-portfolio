import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: site.title,
      },
    ],
   },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },

};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-white text-zinc-900 antialiased">
        <Header />
        <main className="py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}