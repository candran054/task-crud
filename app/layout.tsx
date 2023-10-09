import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./component/sidebar";
import Header from "./component/header";
import Providers from "./redux/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={`flex ${inter.className}`}>
          <Sidebar />
          <section className="w-full">
            <Header />
            {children}
          </section>
        </body>
      </html>
    </Providers>
  );
}
