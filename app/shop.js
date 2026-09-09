"use client";

import { useEffect, useMemo, useState } from "react";

const DEMO_PRODUCTS = [
{
id: "demo-1",
name: "Earbuds Wireless",
description: "Produk elektronik pilihan",
price: 199000,
marketplace: "Shopee",
image_url: "https://placehold.co/600x600?text=Earbuds",
affiliate_url: "#",
commission_rate: 5,
is_active: true,
},
{
id: "demo-2",
name: "Sepatu Running",
description: "Sepatu untuk aktivitas sehari-hari",
price: 329000,
marketplace: "TikTok Shop",
image_url: "https://placehold.co/600x600?text=Sepatu",
affiliate_url: "#",
commission_rate: 5,
is_active: true,
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
const [products, setProducts] = useState([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
async function loadProducts() {
try {
setLoading(true);
setError("");

```
    const response = await fetch("/api/products", {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();

    console.log("Response produk:", result);

    if (!response.ok) {
      throw new Error(
        result?.error || "Gagal mengambil produk dari server"
      );
    }

    if (!Array.isArray(result)) {
      throw new Error("Format data produk tidak valid");
    }

    // Kalau Supabase punya produk, tampilkan produk Supabase
    if (result.length > 0) {
      setProducts(result);
    } else {
      // Kalau database kosong, tampilkan demo
      setProducts(DEMO_PRODUCTS);
    }
  } catch (err) {
    console.error("Product loading error:", err);

    setError(
      err instanceof Error
        ? err.message
        : "Gagal mengambil produk"
    );

    // Tetap tampilkan produk demo agar halaman tidak kosong
    setProducts(DEMO_PRODUCTS);
  } finally {
    setLoading(false);
  }
}

loadProducts();
```

}, []);

const filteredProducts = useMemo(() => {
const keyword = search.toLowerCase().trim();

```
if (!keyword) {
  return products;
}

return products.filter((product) => {
  return (
    product.name?.toLowerCase().includes(keyword) ||
    product.description?.toLowerCase().includes(keyword) ||
    product.marketplace?.toLowerCase().includes(keyword)
  );
});
```

}, [products, search]);

async function handleBuy(product) {
try {
// Produk demo tidak perlu tracking
if (
product.id &&
!product.id.toString().startsWith("demo-")
) {
try {
await fetch("/api/products/click", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
product_id: product.id,
}),
});
} catch (trackingError) {
console.error(
"Tracking error:",
trackingError
);
}
}

```
  if (
    product.affiliate_url &&
    product.affiliate_url !== "#"
  ) {
    window.location.href = product.affiliate_url;
  } else {
    alert(
      "Link affiliate produk ini belum dipasang."
    );
  }
} catch (err) {
  console.error("Buy error:", err);

  if (
    product.affiliate_url &&
    product.affiliate_url !== "#"
  ) {
    window.location.href = product.affiliate_url;
  }
}
```

}

return ( <section className="shop-section"> <div className="shop-toolbar">
<input
type="text"
placeholder="Cari produk..."
value={search}
onChange={(e) =>
setSearch(e.target.value)
}
className="search-input"
/> </div>

```
  {loading ? (
    <div className="empty-state">
      <p>Memuat produk...</p>
    </div>
  ) : error ? (
    <div className="empty-state">
      <h3>Terjadi masalah</h3>
      <p>{error}</p>
      <p>
        Produk demo ditampilkan sementara.
      </p>
    </div>
  ) : filteredProducts.length === 0 ? (
    <div className="empty-state">
      <h3>Produk tidak ditemukan</h3>
      <p>
        Coba gunakan kata kunci lain.
      </p>
    </div>
  ) : (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <article
          className="product-card"
          key={product.id}
        >
          <div className="product-image-wrap">
            <img
              src={
                product.image_url ||
                "https://placehold.co/600x600?text=Belanja+Baik"
              }
              alt={product.name}
              className="product-image"
            />
          </div>

          <div className="product-content">
            <span className="marketplace">
              {product.marketplace ||
                "Marketplace"}
            </span>

            <h3>{product.name}</h3>

            <div className="product-price">
              {product.price
                ? formatRupiah(product.price)
                : "Lihat harga"}
            </div>

            <p className="product-impact">
              💚{" "}
              {product.description ||
                "Belanja sekaligus berdampak"}
            </p>

            <button
              className="buy-button"
              onClick={() =>
                handleBuy(product)
              }
            >
              Beli & Berdampak →
            </button>
          </div>
        </article>
      ))}
    </div>
  )}
</section>
```

);
}
