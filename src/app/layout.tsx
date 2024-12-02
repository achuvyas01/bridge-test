import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/redux-provider";
import DynamicAuthProvider from "../components/providers/dynamic-context-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "Buddy App",
  title: "Buddy App",
  description: "Buddy Description",
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buddy-dev.buildverse.app",
    siteName: "Buddy App",
    title: "Buddy App",
    images: [
      {
        url: "https://buddy-dev.buildverse.app/openGraph.png",
        width: 1200,
        height: 630,
        alt: "Buddy App",
      },
    ],
  },
  keywords: ["buddy-app"],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5, // Changed from 1 to 5
    userScalable: true, // Changed from false to true
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " dark"}>
        <ReduxProvider>
          <DynamicAuthProvider>
            {children}

            {/*             <Tooltip.Provider delayDuration={800} skipDelayDuration={500}>
              <MainLayout>{children}</MainLayout>
            </Tooltip.Provider>
  */}

            <ToastContainer theme="dark" />
          </DynamicAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
