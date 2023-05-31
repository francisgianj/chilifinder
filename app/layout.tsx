import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "@/components/header";
import clsx from "clsx";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "ChiliFinder",
    template: "%s | ChiliFinder",
  },
  description:
    "ChiliFinder is the product of our research entitled Automatic Chili Pepper Plant Species Identification using Convolutional Neural Networks presented to the faculty of the College of Computer Studies, AMA University, Quezon City, Philippines.",
  icons: [
    { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
    { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
    { rel: "manifest", url: "/site.webmanifest" },
  ],
  themeColor: "#ebb402",
  openGraph: {
    title: "ChiliFinder",
    description:
      "ChiliFinder is the product of our research entitled Automatic Chili Pepper Plant Species Identification using Convolutional Neural Networks presented to the faculty of the College of Computer Studies, AMA University, Quezon City, Philippines.",
    url: "https://chilifinder.vercel.app/",
    siteName: "ChiliFinder",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "ChiliFinder Logo",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx("", montserrat.className)}>
        <Header />
        <div className="mt-12">{children}</div>
      </body>
    </html>
  );
}
