import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

import StyledComponentsRegistry from "@/styles/registry";
import siteConfig from "@/static-config-helpers/site-data";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s - ${siteConfig.siteTitle}`,
    default: siteConfig.siteTitle,
  },
  description: siteConfig.siteDescription,
  keywords: siteConfig.keywords,
  icons: siteConfig.icons,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <GoogleTagManager gtmId={siteConfig.googleTagManagerID} />
        <GoogleAnalytics gaId={siteConfig.googleAnalyticsID} />
      </body>
    </html>
  );
}
