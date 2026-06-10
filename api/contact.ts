import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone, companySize, message } = req.body;

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
      subject: "New MotoCore ERP Inquiry",
      replyTo: email,
      html: `
        <h2>New MotoCore ERP Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Type:</strong> ${companySize}</p>
        <p><strong>Message:</strong> ${message || "No message provided"}</p>
        <hr />
        <p>Submitted from MotoCore ERP Website</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({ success: false });
  }
}