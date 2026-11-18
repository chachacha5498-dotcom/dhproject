import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "해리 포터 지식그래프 GraphRAG 챗봇",
  description: "Neo4j 지식그래프 기반 해리 포터와 마법사의 돌 질의응답 챗봇",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
