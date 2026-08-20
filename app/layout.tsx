import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി | Nedumkandom Public Library",
  description: "നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി, ഇടുക്കി, കേരളം - അറിവിലേക്ക് ഒരു വാതിൽ | വായനയിലൂടെ ഒരു സമൂഹം. ഓൺലൈൻ അംഗത്വം, പുസ്തകങ്ങൾ, പരിപാടികൾ.",
  keywords: ["Nedumkandom Public Library", "നെടുങ്കണ്ടം ലൈബ്രറി", "ഇടുക്കി ലൈബ്രറി", "കേരള പൊതുഗ്രന്ഥശാല", "Malayalam Library"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ml">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
