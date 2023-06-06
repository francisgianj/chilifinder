import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "@/components/header";
import clsx from "clsx";
import Script from "next/script";

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

    { rel: "apple-touch-icon", url: "/apple-icon-180.png" },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-2048-2732.jpg",
      sizes:
        "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-2732-2048.jpg",
      sizes:
        "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-1668-2388.jpg",
      sizes:
        "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-2388-1668.jpg",
      sizes:
        "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-1536-2048.jpg",
      sizes:
        "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-2048-1536.jpg",
      sizes:
        "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-1668-2224.jpg",
      sizes:
        "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-2224-1668.jpg",
      sizes:
        "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-1620-2160.jpg",
      sizes:
        "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-2160-1620.jpg",
      sizes:
        "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-1290-2796.jpg",
      sizes:
        "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-2796-1290.jpg",
      sizes:
        "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-1179-2556.jpg",
      sizes:
        "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-2556-1179.jpg",
      sizes:
        "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-1284-2778.jpg",
      sizes:
        "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-2778-1284.jpg",
      sizes:
        "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-1170-2532.jpg",
      sizes:
        "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-2532-1170.jpg",
      sizes:
        "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-1125-2436.jpg",
      sizes:
        "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-2436-1125.jpg",
      sizes:
        "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-1242-2688.jpg",
      sizes:
        "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-2688-1242.jpg",
      sizes:
        "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-828-1792.jpg",
      sizes:
        "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-1792-828.jpg",
      sizes:
        "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-1242-2208.jpg",
      sizes:
        "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-2208-1242.jpg",
      sizes:
        "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-750-1334.jpg",
      sizes:
        "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "/apple-splash-1334-750.jpg",
      sizes:
        "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "apple-splash-640-1136.jpg",
      sizes:
        "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    },
    {
      rel: "apple-touch-startup-image",
      url: "apple-splash-1136-640.jpg",
      sizes:
        "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
    },

    { rel: "manifest", url: "/site.webmanifest" },
  ],
  appleWebApp: true,
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

        <Script id="sw">{`
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
          }`}</Script>
      </body>
    </html>
  );
}
