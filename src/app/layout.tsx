import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import MenuBlack from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import QueryProvider from "@/components/QueryProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CulinArt",
  description: "Вкусная еда с доставкой",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" >
      
      <body className={inter.className} >
        <AuthProvider>
          <QueryProvider>
            <div>
            <MenuBlack />
              {children}
             
              <ToastContainer position="bottom-right" autoClose={3000} />
            </div>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
