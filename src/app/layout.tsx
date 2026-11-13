import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/lib/demo/DemoContext";
import { ToastProvider } from "@/components/ui/toast";
import { DemoBanner } from "@/components/layout/DemoBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

export const metadata: Metadata = {
  title: "MINDMELD – The Human Connection Engine",
  description:
    "Intelligent student collaboration platform connecting college builders based on skills, personality, and startup vision.",
  keywords: ["student collaboration", "hackathon team builder", "AI matching", "college startups", "developer network"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-cyber-dark text-slate-100 antialiased selection:bg-violet-600 selection:text-white">
        <DemoProvider>
          <ToastProvider>
            <DemoBanner />
            {children}
          </ToastProvider>
        </DemoProvider>
      </body>
    </html>
  );
}

