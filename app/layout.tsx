import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Entertainment Market Map",
  description: "Spaces, sub-spaces, companies, and key problems across the entertainment industry.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body>{children}</body></html>
    );
}
