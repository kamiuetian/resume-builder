import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";



export async function GET(req: NextRequest) {
    //    const session = await createSession();
    //    return NextResponse.redirect(session.url, { status: 302 });
    const d = await cancelSubscription("sub_1Nf576KqHnLiINxvfSdez6Fr");

    return NextResponse.json(d);

}


async function cancelSubscription(subscriptionId: string) {
    //@ts-ignore
    const s = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    try {
        const deletedSubscription = await s.subscriptions.deleteDiscount(subscriptionId);
        return deletedSubscription;
    } catch (err: any) {
        return err.message;
    }
}



async function createSession() {
    //@ts-ignore
    const s = new Stripe(process.env.STRIPE_SECRET_KEY);
    const priceId = 'price_1Nf4wHKqHnLiINxvXEvz7rVc';

    try {
        // Create Checkout Sessions from body params.
        const session = await s.checkout.sessions.create({
            mode: 'subscription',
            line_items: [
                {
                    price: priceId,
                    // For metered billing, do not pass quantity
                    quantity: 1,
                },
            ],
            currency: "usd",
            // payment_method_types: ['card'],
            // billing_address_collection: 'required',
            // subscription_data: {
            //     items: [
            //         {
            //             price: priceId,
            //             quantity: 1,
            //         },
            //     ],
            // },
            // success_url: `http://localhost:3000/checkout?status=success&id={CHECKOUT_SESSION_ID}`,
            success_url: process.env.STRIPE_SUCCESS_URL!,
            cancel_url: process.env.STRIPE_CANCEL_URL!,
        });
        return session;
    } catch (err: any) {
        return err.message;
    }

}