import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(request){
  const body = await request.json();
  const { listingId, checkin, checkout, total } = body;
  const nights = Math.max(1, Math.round((new Date(checkout) - new Date(checkin)) / 86400000));
  const booking = await prisma.booking.create({
    data: { listingId, checkin: new Date(checkin), checkout: new Date(checkout), nights, total: Math.max(1,Number(total)||0) }
  });

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key){
    return Response.json({ ok:true, bookingId: booking.id, clientSecret: null, note: "Stripe non configurato (.env)" });
  }
  const stripe = new Stripe(key, { apiVersion: "2023-10-16" });
  const pi = await stripe.paymentIntents.create({
    amount: booking.total * 100,
    currency: "eur",
    metadata: { bookingId: booking.id }
  });
  return Response.json({ ok:true, bookingId:booking.id, clientSecret: pi.client_secret });
}
