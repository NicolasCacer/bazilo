import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NavBar from "@/components/landingPage/navBar";
import { Rajdhani } from "next/font/google";

const rajdhani = Rajdhani({ subsets: ["latin"], weight: "600" });

export const metadata: Metadata = {
  title: "Bazilo Game Place",
  description: "Next.js application project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rajdhani.className} antialiased bg-white dark:bg-black text-black dark:text-white h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
