import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solvera | IT Outsourcing & Digital Solutions",
  description:
    "From websites to enterprise systems, AI chatbots to workflow automation — we deliver technology that drives your business forward.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
