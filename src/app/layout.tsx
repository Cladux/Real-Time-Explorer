import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Real Time city Explorer",
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark text-foreground bg-neutral-950">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
