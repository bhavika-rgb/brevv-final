import "./globals.css";
import type { Metadata } from "next";
import Navigation from "@/app/components/Layout/Navigation/Navigation";
import Footer from "@/app/components/Layout/Footer/Footer";
import DemoModal from "@/app/components/DemoModal/DemoModal";

export const metadata: Metadata = {
  title: "Brevv - Transform Learning Into Measurable Success",
  description:
    "Empower learners, educators, and organizations with a modern learning platform designed for engagement, performance, and growth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-slate-800 font-body antialiased overflow-x-hidden">
        <Navigation />
        {children}
        <Footer />
        <DemoModal />
      </body>
    </html>
  );
}
