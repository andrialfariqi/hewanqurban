import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jual Hewan Qurban Berkualitas",
  description:
    "Penjualan hewan qurban",
  keywords: ["hewan qurban", "qurban premium", "jual domba", "jual kambing", "jual sapi qurban"],
  icons: {
    icon: "/Logo%20Qurban%20Black%20White.svg",
    shortcut: "/Logo%20Qurban%20Black%20White.svg",
    apple: "/Logo%20Qurban%20Black%20White.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
