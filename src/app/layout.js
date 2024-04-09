
import "./globals.css";
import Providers from '../components/ProgressBarProvider';
import { Rubik, Ysabeau_SC } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const rubik = Rubik({
   subsets: ["latin"],
   weight:["300","400","500","600","700","800","900"]
  });
const ysabeau_sc = Ysabeau_SC({
  subsets:["latin"],
  weight:["400","500","700","800","900","1000"],
  variable:"--ysbeau_sc"
})
export const metadata = {
  title: "CryptoRaise",
  description: "Decentralized Crowdfunding Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={(rubik.className, ysabeau_sc.variable)} >
        <div className=" max-w-[80rem] mx-auto">
          <Header />
          <Providers>{children}</Providers>
          <Footer />
        </div>
      </body>
    </html>
  );
}
