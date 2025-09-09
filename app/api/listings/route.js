import { prisma } from "@/lib/prisma";

export async function GET(request){
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').toLowerCase();
  const data = await prisma.listing.findMany({ orderBy: { createdAt: 'desc' } });
  const filtered = q ? data.filter(l => l.title.toLowerCase().includes(q) || (l.address||'').toLowerCase().includes(q)) : data;
  return Response.json(filtered);
}

export async function POST(request){
  const body = await request.json();
  const listing = await prisma.listing.create({
    data: {
      title: body.title || 'Senza titolo',
      description: body.description || '',
      address: body.address || '',
      city: body.city || null,
      basePrice: Math.max(20, Number(body.basePrice||0)),
      minStay: Math.max(1, Number(body.minStay||1)),
      beds: Math.max(1, Number(body.beds||1))
    }
  });
  return Response.json(listing);
}
