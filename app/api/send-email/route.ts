import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// You will need to add RESEND_API_KEY to your Vercel/environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { to, subject, type, data } = await req.json();

        let htmlContent = '';

        if (type === 'demo') {
            htmlContent = `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
                    <h1 style="color: #4353ff;">Welcome to BGV Genius Hub!</h1>
                    <p>Hi ${data.name},</p>
                    <p>Your demo session for <strong>${data.subject}</strong> is confirmed for <strong>${data.date}</strong>.</p>
                    <p>We are so excited to help you start learning.</p>
                    <br/>
                    <p>Best,<br/>Birendra Global Vision Team</p>
                </div>
            `;
        } else if (type === 'life_hub') {
            htmlContent = `
                <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
                    <h1 style="color: #C8B96E;">Your Path Awaits.</h1>
                    <p>Dear ${data.name},</p>
                    <p>Thank you for booking a <strong>${data.service_name}</strong> session.</p>
                    <p>Our team will reach out via WhatsApp at ${data.whatsapp} shortly to finalize the Zoom details for ${data.date} at ${data.time}.</p>
                    <p>Infinite Gratitude.</p>
                    <br/>
                    <p style="color: #7A6E3A;">BGV Life Hub</p>
                </div>
            `;
        } else if (type === 'teacher') {
            htmlContent = `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
                    <h1 style="color: #F59E0B;">Application Received!</h1>
                    <p>Hi ${data.name},</p>
                    <p>Thank you for applying to be a teacher at BGV for <strong>${data.subject}</strong>.</p>
                    <p>Our admissions board is reviewing your profile and demo video. We will be in touch within 7 days.</p>
                    <br/>
                    <p>Best,<br/>Birendra Global Vision Admissions</p>
                </div>
            `;
        }

        const dataRes = await resend.emails.send({
            from: 'Birendra Global Vision <onboarding@resend.dev>', // Change to your verified domain later
            to: [to],
            // Bcc yourself to keep track of orders
            bcc: ['birendraglobalvision@example.com'], // Add your admin email here
            subject: subject,
            html: htmlContent,
        });

        return NextResponse.json(dataRes);
    } catch (error: any) {
        console.error('Email error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
