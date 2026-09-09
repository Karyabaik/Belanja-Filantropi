import { createClient } from "@supabase/supabase-js";

function getSupabase() {
const supabaseUrl =
process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
throw new Error(
"NEXT_PUBLIC_SUPABASE_URL belum tersedia"
);
}

if (!supabaseKey) {
throw new Error(
"NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY belum tersedia"
);
}

return createClient(
supabaseUrl,
supabaseKey
);
}

// GET PRODUCTS
export async function GET() {
try {
const supabase = getSupabase();

```
const { data, error } = await supabase
  .from("products")
  .select("*")
  .eq("is_active", true)
  .order("created_at", {
    ascending: false,
  });

if (error) {
  console.error(
    "Supabase GET Error:",
    error
  );

  return Response.json(
    {
      error: error.message,
    },
    { status: 500 }
  );
}

return Response.json(data || [], {
  status: 200,
});
```

} catch (error) {
console.error(
"Products GET Error:",
error
);

```
return Response.json(
  {
    error:
      error instanceof Error
        ? error.message
        : "Gagal mengambil produk",
  },
  { status: 500 }
);
```

}
}

// ADD PRODUCT
export async function POST(request) {
try {
const supabase = getSupabase();

```
const body = await request.json();

if (
  !body.name ||
  !body.affiliate_url
) {
  return Response.json(
    {
      error:
        "Nama produk dan affiliate URL wajib diisi",
    },
    { status: 400 }
  );
}

const { data, error } =
  await supabase
    .from("products")
    .insert({
      name: body.name,
      affiliate_url:
        body.affiliate_url,
      description:
        body.description || null,
      image_url:
        body.image_url || null,
      price:
        body.price ?? null,
      marketplace:
        body.marketplace || null,
      commission_rate:
        body.commission_rate ?? 0,
      is_active:
        body.is_active ?? true,
    })
    .select()
    .single();

if (error) {
  console.error(
    "Supabase POST Error:",
    error
  );

  return Response.json(
    {
      error: error.message,
    },
    { status: 500 }
  );
}

return Response.json(
  {
    success: true,
    message:
      "Produk berhasil ditambahkan",
    product: data,
  },
  { status: 201 }
);
```

} catch (error) {
console.error(
"Products POST Error:",
error
);

```
return Response.json(
  {
    error:
      error instanceof Error
        ? error.message
        : "Gagal menambahkan produk",
  },
  { status: 500 }
);
```

}
}
