import { Inter } from "next/font/google";

import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Acme Store Admin Panel</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
