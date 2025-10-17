// Import fonts from next/font/google
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Your global styles

// Load the fonts with CSS variable names
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Optional metadata
export const metadata = {
  title: "CDU AI",
  description: "Help and guidance for CDU students through AI assistance.",
};

// Root layout component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
