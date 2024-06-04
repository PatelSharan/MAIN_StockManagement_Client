import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LoginState from "@/contexts/login/loginstate";
import LoadingState from "@/contexts/loading/LoadingState";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Data Management Admin",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginState>
          <LoadingState>
            <Navbar />
            <div className="min-h-[85vh] sm:max-w-[90vw] m-auto">
              {children}
            </div>
          </LoadingState>
        </LoginState>
      </body>
    </html >
  );
}
