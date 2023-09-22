import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST(req: NextRequest) {
    const { amount } = await req.json();
    // @ts-ignore
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}