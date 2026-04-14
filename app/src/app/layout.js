import "../styles/globals.css";

import Footer from "@/components/Footer";

export const metadata = {
    title: "TrainMyBreath",
    description: "Breathing exercises application",
    icons: {
        icon: "/icon-192x192.png",
        apple: "/icon-192x192.png",
    },
    manifest: "/manifest.json"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta name="theme-color" content="#060a0e" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="HandheldFriendly" content="true" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                {children}
                <Footer />
            </body>
        </html>
    );
}
