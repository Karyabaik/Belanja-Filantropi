import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
console.log("SUPABASE URL:", supabaseUrl);
console.log("SUPABASE KEY EXISTS:", !!supabaseKey);
    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json(data);
 } catch (error) {
  console.error("ERROR:", error);

  return Response.json(
    {
      error: error instanceof Error
        ? error.message
        : String(error),
    },
    { status: 500 }
  );
} 
