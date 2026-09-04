# Belanja Baik V2

Fondasi website production-ready untuk Belanja Baik.

## Sudah tersedia
- Next.js responsive
- Search + kategori
- Supabase product catalog
- Tracking klik
- Affiliate URL per produk
- SQL + Row Level Security
- Fallback demo bila database belum dipasang

## Jalankan
1. Install Node.js 20+.
2. `npm install`
3. Copy `.env.example` menjadi `.env.local`.
4. Isi Supabase URL dan anon key.
5. `npm run dev`
6. Buka `http://localhost:3000`.

## Online
Paling sederhana: Vercel + Supabase.
- Buat project Supabase.
- Jalankan `supabase/schema.sql`.
- Import project ke Vercel.
- Isi environment variables.
- Deploy.

## Sebelum dipublikasikan
Ganti seluruh affiliate URL demo dengan link affiliate resmi Belanja Baik.
Ganti angka dampak demo dengan data terverifikasi.

## Roadmap V3
1. Login admin.
2. Dashboard admin untuk tambah/edit produk.
3. Generator affiliate link.
4. Integrasi Shopee Affiliate Open API.
5. Integrasi TikTok Shop Affiliate API.
6. Sinkronisasi order + komisi.
7. Dashboard transparansi.
8. Domain + analytics + anti-fraud.
