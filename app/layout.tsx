import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
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
      className={`${jakarta.variable} ${bebas.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
