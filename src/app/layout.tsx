import "./globals.css";
import { Inter } from "next/font/google";
import AuthContextProvider from "@/contexts/authContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Travely Manager",
  description: "Generated by create next app",
};

export default function RootLayout({  
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={`bg-white${inter.className}`}>
        <div className="flex">
          <main className="flex-1">
            <AuthContextProvider>{children}</AuthContextProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
