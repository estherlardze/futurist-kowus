import type { Metadata } from "next";
import { Bebas_Neue, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({ variable: "--font-bebas", subsets: ["latin"], weight: "400" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

const siteUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.futuristkowus.com"
    : "http://localhost:3000";

const title = "Dr. Futurist Daniel Owusu-Koranteng";
const description =
  "The official website of Dr. Futurist Daniel Owusu-Koranteng - award-winning author, Executive Director of Wacam, President of Ghana's National Association of ADR Practitioners, and champion of human rights and environmental justice across Africa.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: title,
    type: "website",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
