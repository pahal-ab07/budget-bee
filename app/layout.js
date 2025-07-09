import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter=Inter({subsets: ["latin"]});

export const metadata = {
  title: "BudgetBee",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* Header */}
        <Header />

        <main className="min-h-screen">{children}</main>
        <Toaster richColors  />
        {/* footer */}
        <footer className="bg-indigo-500 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>Made By Abhishek Pahal</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
