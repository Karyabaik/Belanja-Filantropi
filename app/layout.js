import "./globals.css";

export const metadata = {
  title: "Belanja Baik — Belanja Sekalian Berdampak",
  description:
    "Belanja kebutuhanmu melalui Belanja Baik dan ikut menciptakan dampak sosial.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
