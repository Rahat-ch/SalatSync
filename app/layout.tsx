import type { Metadata } from "next";
import { Playfair_Display, Amiri } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "SalatSync - Islamic Prayer Times",
  description: "Beautiful Islamic prayer times app with elegant design and accurate timings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${amiri.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
