import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const ERP_API_URL =
  process.env.ERP_API_URL ||
  process.env.VITE_ERP_API_URL ||
  "https://motocore-erp-production.up.railway.app";

const FORM_TYPE_TO_LEAD_TYPE: Record<string, string> = {
  request_demo: "REQUEST_DEMO",
  early_access: "EARLY_ACCESS",
  beta_access: "BETA_TESTING",
  contact: "GENERAL",
};

async function syncLeadToErp({
  formType,
  name,
  email,
  phone,
  businessName,
  businessType,
  companySize,
  message,
}: {
  formType?: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  businessType?: string;
  companySize?: string;
  message?: string;
}) {
  const leadType = FORM_TYPE_TO_LEAD_TYPE[formType || ""] || "GENERAL";
  const normalizedBaseUrl = ERP_API_URL.replace(/\/$/, "");

  const payload = {
    lead_type: leadType,
    name,
    email,
    phone,
    business_name: businessName || "Not provided",
    business_type: businessType || companySize || "Not provided",
    message: message || "No message provided",
    source: "website",
  };

  const response = await fetch(
    `${normalizedBaseUrl}/api/v1/public/website-leads`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `ERP lead sync failed with ${response.status}: ${errorBody}`
    );
  }
}

export default async function handler(
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
    const {
      name,
      email,
      phone,
      companySize,
      businessName,
      businessType,
      formType,
      message,
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required",
      });
    }

    let erpSyncSucceeded = false;
    let emailSucceeded = false;

    try {
      await syncLeadToErp({
        formType,
        name,
        email,
        phone,
        companySize,
        businessName,
        businessType,
        message,
      });
      erpSyncSucceeded = true;
    } catch (erpError) {
      console.error("ERP LEAD SYNC ERROR:", erpError);
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: `"MotoCore ERP Website" <${process.env.GMAIL_USER}>`,
        to: "motocorenepal@gmail.com",
        replyTo: email,
        subject: `🚀 MotoCore Lead | ${name} | ${
          businessType || companySize || "General"
        }`,
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
                  <td style="padding:12px; font-weight:bold; border-bottom:1px solid #eee;">Business Name</td>
                  <td style="padding:12px; border-bottom:1px solid #eee;">${businessName || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding:12px; font-weight:bold; border-bottom:1px solid #eee;">Business Type</td>
                  <td style="padding:12px; border-bottom:1px solid #eee;">${businessType || companySize || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding:12px; font-weight:bold; border-bottom:1px solid #eee;">Form Type</td>
                  <td style="padding:12px; border-bottom:1px solid #eee;">${formType || "contact"}</td>
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
      emailSucceeded = true;
    } catch (emailError) {
      console.error("CONTACT EMAIL ERROR:", emailError);
    }

    if (emailSucceeded) {
      try {
        const displayName =
          name === "Get Early Access Lead" ? "Valued Customer" : name;
        await transporter.sendMail({
          from: `"MotoCore ERP" <${process.env.GMAIL_USER}>`,
          to: email,
          replyTo: "motocorenepal@gmail.com",
          subject: "Thank You for Contacting MotoCore ERP",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 24px; background:#f7f7f7; color:#111;">
              <div style="max-width:700px; margin:auto; background:#ffffff; padding:28px; border-radius:12px; border:1px solid #eeeeee;">
                <h2 style="color:#E30613;">Thank You for Contacting MotoCore ERP</h2>

                <p>Dear ${displayName},</p>

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
    }

    if (!emailSucceeded && !erpSyncSucceeded) {
      return res.status(500).json({
        success: false,
        message: "Failed to send inquiry",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry sent successfully",
      emailSent: emailSucceeded,
      erpSynced: erpSyncSucceeded,
    });
  } catch (error: any) {
    console.error("CONTACT API ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send inquiry",
      error: error.message,
    });
  }
}
