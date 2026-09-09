export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl) {
      return Response.json(
        { error: "NEXT_PUBLIC_SUPABASE_URL tidak tersedia di Vercel" },
        { status: 500 }
      );
    }

    if (!supabaseKey) {
      return Response.json(
        { error: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY tidak tersedia di Vercel" },
        { status: 500 }
      );
    }

    const url =
      `${supabaseUrl}/rest/v1/products` +
      `?select=*` +
      `&is_active=eq.true` +
      `&order=created_at.desc`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const text = await response.text();

    if (!response.ok) {
      return Response.json(
        {
          error: "Supabase mengembalikan error",
          status: response.status,
          detail: text,
        },
        { status: 500 }
      );
    }

    const data = JSON.parse(text);

    return Response.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("API PRODUCTS ERROR:", error);

    return Response.json(
      {
        error: "Gagal mengambil produk",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
