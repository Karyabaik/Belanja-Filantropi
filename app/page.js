"use client";

import { useEffect, useState } from "react";

const demoProducts = [
  {
    id: 1,
    name: "Earbuds Wireless",
    category: "Elektronik",
    price: 199000,
    marketplace: "Shopee",
    image: "https://placehold.co/600x600?text=Earbuds",
    affiliate_url: "#",
    impact: "Sebagian komisi dialokasikan untuk program sosial.",
  },
  {
    id: 2,
    name: "Sepatu Running",
    category: "Fashion",
    price: 329000,
    marketplace: "TikTok Shop",
    image: "https://placehold.co/600x600?text=Sepatu",
    affiliate_url: "#",
    impact: "Sebagian komisi dialokasikan untuk program sosial.",
  },
  {
    id: 3,
    name: "Blender Portable",
    category: "Rumah",
    price: 149000,
    marketplace: "Shopee",
    image: "https://placehold.co/600x600?text=Blender",
    affiliate_url: "#",
    impact: "Sebagian komisi dialokasikan untuk program sosial.",
  },
  {
    id: 4,
    name: "Skincare Basic Set",
    category: "Kecantikan",
    price: 179000,
    marketplace: "TikTok Shop",
    image: "https://placehold.co/600x600?text=Skincare",
    affiliate_url: "#",
    impact: "Sebagian komisi dialokasikan untuk program sosial.",
  },
];

const categories = [
  "Semua",
  "Elektronik",
  "Fashion",
  "Rumah",
  "Kecantikan",
];

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [products, setProducts] = useState(demoProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) return;

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      } catch (error) {
        console.log("Menggunakan produk demo.");
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "Semua" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      <header className="navbar">
        <div className="container nav-inner">
          <div className="logo">💚 Belanja Baik</div>

          <a href="#produk" className="nav-link">
            Belanja
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="badge">BELANJA + KEBAIKAN</span>

            <h1>
              Belanja kebutuhanmu.
              <br />
              <span>Ikut bantu sesama.</span>
            </h1>

            <p>
              Temukan produk yang kamu butuhkan, belanja seperti biasa,
              dan ikut menciptakan dampak sosial dari setiap transaksi.
            </p>

            <a href="#produk" className="primary-button">
              Mulai Belanja →
            </a>
          </div>

          <div className="hero-card">
            <div className="hero-icon">🛍️</div>
            <strong>Belanja Baik</strong>
            <p>Setiap belanja punya peluang untuk menjadi kebaikan.</p>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          <div>
            <strong>Rp 12,4 jt</strong>
            <span>Komisi terkumpul</span>
          </div>

          <div>
            <strong>3.821</strong>
            <span>Transaksi</span>
          </div>

          <div>
            <strong>8.542</strong>
            <span>Pengguna</span>
          </div>
        </div>
      </section>

      <section id="produk" className="products-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">PILIH KEBUTUHANMU</span>
              <h2>Produk pilihan</h2>
            </div>

            <input
              type="search"
              placeholder="Cari produk..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />

                <div className="product-content">
                  <span className="marketplace">
                    {product.marketplace}
                  </span>

                  <h3>{product.name}</h3>

                  <strong className="price">
                    {formatRupiah(product.price)}
                  </strong>

                  <p>{product.impact}</p>

                  <a
                    href={product.affiliate_url}
                    target="_blank"
                    rel="noreferrer"
                    className="buy-button"
                  >
                    Beli & Berdampak →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty">
              Produk tidak ditemukan.
            </div>
          )}
        </div>
      </section>

      <section className="how-section">
        <div className="container">
          <span className="eyebrow">CARA KERJA</span>
          <h2>Semudah belanja biasa</h2>

          <div className="steps">
            <div>
              <span>01</span>
              <h3>Pilih produk</h3>
              <p>Temukan produk yang sedang kamu butuhkan.</p>
            </div>

            <div>
              <span>02</span>
              <h3>Belanja</h3>
              <p>Kamu diarahkan ke marketplace untuk menyelesaikan pembelian.</p>
            </div>

            <div>
              <span>03</span>
              <h3>Jadi kebaikan</h3>
              <p>Komisi affiliate dapat dialokasikan untuk program sosial.</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <strong>💚 Belanja Baik</strong>
          <p>Belanja sekalian berdampak untuk kebaikan.</p>
        </div>
      </footer>
    </main>
  );
}
