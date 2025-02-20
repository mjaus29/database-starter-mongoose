"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";

import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Acme Store Admin Panel</title>
      </head>
      <body className={hydrated ? inter.className : ""}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
