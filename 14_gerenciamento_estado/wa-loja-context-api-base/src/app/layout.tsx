import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./components/BootstrapClient";
import Navbar from "./components/Navbar/Navbar";
import { FavoritosProvider } from "./provider/FavoritosProvider";
import { ReactQueryClientProvider } from "./components/ReactQueryClient";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./provider/AuthProvider";

export const metadata: Metadata = {
  title: "WA Loja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ReactQueryClientProvider>
          <AuthProvider>
            <FavoritosProvider>
                <Navbar />
                {children}
                <BootstrapClient />
                <ToastContainer />
            </FavoritosProvider>
          </AuthProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
