import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GlowBeauty — Camera Studio",
  description: "Try real-time beauty filters right from your camera.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-body bg-blush-50 text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
