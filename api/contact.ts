import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

module.exports = async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { name, email, phone, companySize, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"MotoCore ERP Website" <${process.env.GMAIL_USER}>`,
      to: "motocorenepal@gmail.com",
      replyTo: email,
      subject: `🚀 MotoCore Lead | ${name} | ${companySize || "General"}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; background:#f7f7f7; color:#111;">
          <div style="max-width:700px; margin:auto; background:#ffffff; padding:28px; border-radius:12px; border:1px solid #eeeeee;">
            <h2 style="color:#E30613; margin-bottom:10px;"> 🚀 New Website Lead Received </h2>
            <p style="color:#777;"> Submitted: ${new Date().toLocaleString()}</p>

            <table style="border-collapse:collapse; width:100%; margin-top:20px;">
              <tr>
                <td style="padding:12px; font-weight:bold; border-bottom:1px solid #eee;">Name</td>
                <td style="padding:12px; border-bottom:1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding:12px; font-weight:bold; border-bottom:1px solid #eee;">Email</td>
                <td style="padding:12px; border-bottom:1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding:12px; font-weight:bold; border-bottom:1px solid #eee;">Phone</td>
                <td style="padding:12px; border-bottom:1px solid #eee;">${phone}</td>
              </tr>
              <tr>
                <td style="padding:12px; font-weight:bold; border-bottom:1px solid #eee;">Business Type</td>
                <td style="padding:12px; border-bottom:1px solid #eee;">${companySize || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding:12px; font-weight:bold; border-bottom:1px solid #eee;">Message</td>
                <td style="padding:12px; border-bottom:1px solid #eee;">${message || "No message provided"}</td>
              </tr>
            </table>

            <p style="margin-top:24px; font-size:13px; color:#777;">
              Submitted from MotoCore ERP Website.
            </p>
          </div>
        </div>
      `,
    });

    try {
      await transporter.sendMail({
        from: `"MotoCore ERP" <${process.env.GMAIL_USER}>`,
        to: email,
        replyTo: "motocorenepal@gmail.com",
        subject: "Thank You for Contacting MotoCore ERP",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; background:#f7f7f7; color:#111;">
            <div style="max-width:700px; margin:auto; background:#ffffff; padding:28px; border-radius:12px; border:1px solid #eeeeee;">
              <h2 style="color:#E30613;">Thank You for Contacting MotoCore ERP</h2>

              <p>Dear ${name},</p>

              <p>
                Your inquiry has been submitted successfully.
                Thank you for your interest in MotoCore ERP.
              </p>

              <p>
                Our team has received your message and will get back to you within 12 business hours.
              </p>

              <p>
                For urgent assistance, please contact us directly:
              </p>

              <p>
                <strong>Phone:</strong> +977 9863473651<br/>
                <strong>Email:</strong> motocorenepal@gmail.com
              </p>

              <p>
                Best Regards,<br/>
                <strong>MotoCore ERP Team</strong><br/>
                Code One Nepal Pvt. Ltd.
              </p>
            </div>
          </div>
        `,
      });
    } catch (autoReplyError) {
      console.error("AUTO REPLY ERROR:", autoReplyError);
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry sent successfully",
    });
  } catch (error: any) {
    console.error("CONTACT API ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send inquiry",
      error: error.message,
    });
  }
};