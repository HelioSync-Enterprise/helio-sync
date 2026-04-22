import type { Metadata } from "next";
import "./layout.css";

export const metadata: Metadata = {
  title: "Helio Sync - Energia Solar Residencial Otimizada",
  description:
    "Helio Sync é um projeto que visa fornecer uma maneira viável e eficaz de gerar energia diretamente da sua residência, usando painéis solares que rastreiam o movimento do sol em tempo real, otimizando a captura de energia e maximizando o desempenho ao longo do dia. Com foco na sustentabilidade e eficiência, Helio Sync oferece uma solução inovadora para quem busca aproveitar a energia solar de forma mais eficaz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
