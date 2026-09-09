import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    // Cek environment variable
    if (!supabaseUrl) {
      return Response.json(
        {
          error: "NEXT_PUBLIC_SUPABASE_URL belum tersedia",
        },
        { status: 500 }
      );
    }

    if (!supabaseKey) {
      return Response.json(
        {
          error:
            "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY belum tersedia",
        },
        { status: 500 }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Supabase error:", error);

      return Response.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return Response.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error("API error:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Gagal mengambil produk",
      },
      { status: 500 }
    );
  }
}
