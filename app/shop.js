"use client";

import { useEffect, useMemo, useState } from "react";

const DEMO_PRODUCTS = [
  {
    id: "demo-1",
    name: "Earbuds Wireless",
    category: "Elektronik",
    price: 199000,
    marketplace: "Shopee",
    image: "https://placehold.co/600x600?text=Earbuds",
    affiliate_url: "#",
    impact: "Sebagian komisi dialokasikan untuk program sosial",
  },
  {
    id: "demo-2",
    name: "Sepatu Running",
    category: "Fashion",
    price: 329000,
    marketplace: "TikTok Shop",
    image: "https://placehold.co/600x600?text=Sepatu",
    affiliate_url: "#",
    impact: "Sebagian komisi dialokasikan untuk program sosial",
  },
  {
    id: "demo-3",
    name: "Blender Portable",
    category: "Rumah",
    price: 149000,
    marketplace: "Shopee",
    image: "https://placehold.co/600x600?text=Blender",
    affiliate_url: "#",
    impact: "Sebagian komisi dialokasikan untuk program sosial",
  },
  {
    id: "demo-4",
    name: "Skincare Basic Set",
    category: "Kecantikan",
    price: 179000,
    marketplace: "TikTok Shop",
    image: "https://placehold.co/600x600?text=Skincare",
    affiliate_url: "#",
    impact: "Sebagian komisi dialokasikan untuk program sosial",
  },
  {
    id: "demo-5",
    name: "Keyboard Mechanical",
    category: "Elektronik",
    price: 399000,
    marketplace: "Shopee",
    image: "https://placehold.co/600x600?text=Keyboard",
    affiliate_url: "#",
    impact: "Sebagian komisi dialokasikan untuk program sosial",
  },
  {
    id: "demo-6",
    name: "Tas Harian",
    category: "Fashion",
    price: 129000,
    marketplace: "TikTok Shop",
    image: "https://placehold.co/600x600?text=Tas",
    affiliate_url: "#",
    impact: "Sebagian komisi dialokasikan untuk program sosial",
  },
  {
    id: "demo-7",
    name: "Lampu Meja LED",
    category: "Rumah",
    price: 89000,
    marketplace: "Shopee",
    image: "https://placehold.co/600x600?text=Lampu",
    affiliate_url: "#",
    impact: "Sebagian komisi dialokasikan untuk program sosial",
  },
  {
    id: "demo-8",
    name: "Sunscreen",
    category: "Kecantikan",
    price: 99000,
    marketplace: "TikTok Shop",
    image: "https://placehold.co/600x600?text=Sunscreen",
    affiliate_url: "#",
    impact: "Sebagian komisi dialokasikan untuk program sosial",
  },
];

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function Shop() {
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${supabaseUrl}/rest/v1/products?active=eq.true&order=created_at.desc`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil produk");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Product loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = [
      "Semua",
      ...new Set(products.map((product) => product.category).filter(Boolean)),
    ];

    return unique;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "Semua" || product.category === category;

      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  async function handleBuy(product) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

      if (supabaseUrl && supabaseKey && !product.id.startsWith("demo-")) {
        await fetch(`${supabaseUrl}/rest/v1/click_events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            product_id: product.id,
            marketplace: product.marketplace,
          }),
        });
      }

      if (product.affiliate_url && product.affiliate_url !== "#") {
        window.location.href = product.affiliate_url;
      } else {
        alert(
          "Link affiliate produk ini belum dipasang. Nanti setelah API/affiliate link aktif, tombol ini akan langsung menuju marketplace."
        );
      }
    } catch (error) {
      console.error("Click tracking error:", error);

      if (product.affiliate_url && product.affiliate_url !== "#") {
        window.location.href = product.affiliate_url;
      }
    }
  }

  return (
    <section className="shop-section">
      <div className="shop-toolbar">
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`category-button ${
                category === item ? "active" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="empty-state">
          <p>Memuat produk...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h3>Produk tidak ditemukan</h3>
          <p>Coba gunakan kata kunci lain.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <img
                  src={
                    product.image ||
                    "https://placehold.co/600x600?text=Belanja+Baik"
                  }
                  alt={product.name}
                  className="product-image"
                />
              </div>

              <div className="product-content">
                <span className="marketplace">
                  {product.marketplace}
                </span>

                <h3>{product.name}</h3>

                <div className="product-price">
                  {formatRupiah(product.price)}
                </div>

                <p className="product-impact">
                  💚 {product.impact || "Belanja sekaligus berdampak"}
                </p>

                <button
                  className="buy-button"
                  onClick={() => handleBuy(product)}
                >
                  Beli & Berdampak →
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
