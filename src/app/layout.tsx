import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Rajdhani } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";

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
      <body className={`${rajdhani.className} antialiased h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
