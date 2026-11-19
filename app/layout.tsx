import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { B612_Mono } from "next/font/google";
import "./globals.css";

import Rain from "@/components/Rain";

const b612Mono = B612_Mono({
  variable: "--font-b612-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "baysalt.dev",
    template: "%s | baysalt.dev"
  },
  description: "portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${b612Mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Rain />
        {children}
      </body>
      <GoogleAnalytics gaId="GTM-W24PBBMQ" />
    </html>
  );
}
