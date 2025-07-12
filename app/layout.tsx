import { Outfit, Roboto_Mono } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import React from "react";
import type { Metadata } from "next";

import Header from "@/components/Header";

import { CursorProvider } from "@/context/CursorContext";
import { TransitionProvider } from "@/context/TransitionProvider";

import { query } from "@/lib/apollo-client";
import { GET_SEO_DATA } from "@/lib/queries";
import { generateMetadataObject } from "@/lib/metadata";
import ClientWrapper from "@/components/ClientWrapper";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-robotomono",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await query({
    query: GET_SEO_DATA,
  });

  return generateMetadataObject(data?.global?.defaultSeo);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { page_path: window.location.pathname });
      `}
          </Script>
        </>
      )}
      <body
        className={`${robotoMono.variable} ${outfit.variable} bg-[#0c0c0c]`}
        suppressHydrationWarning
      >
        <TransitionProvider>
          <CursorProvider>
            <ClientWrapper />
            <Header />
            {children}
          </CursorProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
