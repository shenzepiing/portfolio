import type { Metadata } from "next";
import "./globals.css";
import "./eye-overrides.css";

export const metadata: Metadata = {
  title: "Zeping Shen",
  description: "一个可替换内容的创意设计师作品集。",
  openGraph: { images: ["/og.png"] },
  icons: {
    icon: "/zeping-shen-favicon-v5.png",
    shortcut: "/zeping-shen-favicon-v5.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
