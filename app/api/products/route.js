export async function GET() {
  return Response.json({
    status: "OK",
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  });
}
