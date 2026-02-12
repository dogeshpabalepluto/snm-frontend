import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";
import { Poppins, Playfair_Display } from "next/font/google";



export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "700"], // 👈 add real bold
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${playfair.variable}`}>
        <Header  />
        {children}
        <Footer />
      </body>
    </html>
  );
}
