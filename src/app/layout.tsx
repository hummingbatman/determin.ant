import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "determin.ant — Linear Algebra from Scratch",
  description: "Learn linear algebra through interactive visualizations. No prerequisites. Just intuition.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var t = localStorage.getItem('determin-ant-theme');
            if (t === 'dark') document.documentElement.dataset.theme = 'dark';
          } catch(e) {}
        `}} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
