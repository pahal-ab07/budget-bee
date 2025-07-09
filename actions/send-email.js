"use server";

import { Resend } from "resend";

export async function sendEmail({to , subject, react}){
    const resend = new Resend(process.env.RESEND_API_KEY || "");
    console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY ? "SET" : "NOT SET");
    console.log("Sending email to:", to, "with subject:", subject);
    try {
        // TEMP: Send a simple text email to isolate issues
        const data = await resend.emails.send({
            from: 'BudgetBee <onboarding@resend.dev>',
            to,
            subject,
            text: 'This is a test email from BudgetBee.'
        });
        console.log("Resend API result:", data);
        return {success: true, data};
    } catch (error) {
        console.error("Failed to send email:", error);
        return {success:false, error};
    }
}

//completed