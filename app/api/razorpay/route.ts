import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { amount, currency } = await req.json();

        // Using the user-provided keys
        const key_id = 'rzp_live_SNuYyvjWoaQDcz';
        const key_secret = '4BN5xjUrycyaFH97Mk5a4hd5';
        const basicAuth = Buffer.from(`${key_id}:${key_secret}`).toString('base64');

        const response = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${basicAuth}`,
            },
            body: JSON.stringify({
                amount: Math.round(amount * 100), // amount in lowest subunit (paisa/cents)
                currency: currency || 'INR',
                receipt: 'rcpt_' + Math.random().toString(36).substring(7),
            }),
        });

        const order = await response.json();

        if (order.error) {
            console.error("Razorpay Order Error:", order.error);
            return NextResponse.json({ error: order.error.description || 'Error creating order' }, { status: 500 });
        }

        return NextResponse.json(order);
    } catch (error: any) {
        console.error("Razorpay API Exception:", error);
        return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
    }
}
