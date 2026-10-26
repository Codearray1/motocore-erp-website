// Privacy Policy and Terms of Service. DRAFTS prepared for the owner's review by a Nepal-qualified lawyer before
// they are relied on. They describe how MotoCore actually works (providers, data flows, roles) as of the effective date.
import { SITE } from "./content";

export interface LegalSection {
  heading: string;
  body: (string | string[])[]; // a string is a paragraph, an array is a bullet list
}

export interface LegalDoc {
  slug: "privacy" | "terms";
  title: string;
  description: string;
  h1: string;
  effective: string;
  intro: string;
  sections: LegalSection[];
}

const EFFECTIVE = "26 October 2026";
const CONTACT = [
  `${SITE.company}, ${SITE.locality}, Nepal`,
  `Email: ${SITE.email}`,
  `Phone: ${SITE.phone}`,
  `Grievance Officer: ${SITE.grievance.name}, ${SITE.grievance.phone}`,
];

export const PRIVACY: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy | MotoCore ERP",
  description: "How Code One Nepal Pvt. Ltd. collects, uses, stores and protects personal information in the MotoCore website, platform and mobile apps.",
  h1: "Privacy Policy",
  effective: EFFECTIVE,
  intro:
    "This Privacy Policy explains how Code One Nepal Pvt. Ltd. (\"MotoCore\", \"we\", \"us\") collects, uses, stores, shares and protects personal information when you use the MotoCore website (www.motocoreerp.com), the MotoCore platform (including MotoCore Parts, Workshop and Recon-Lite at live.motocoreerp.com), MotoCore Bike (bike.motocoreerp.com) and the MotoCore mobile apps (together, the \"Services\"). It is written to meet the Individual Privacy Act, 2075 (2018) of Nepal and related laws, and reflects the principles of the EU General Data Protection Regulation (GDPR) because our servers are located in the European Union.",
  sections: [
    {
      heading: "1. Who is responsible for your information",
      body: [
        "For information you give us directly (for example on our website forms, or as a user of your company's MotoCore account), Code One Nepal Pvt. Ltd. decides how it is used and is responsible for it.",
        "For information that a dealership, workshop or other business (our \"Customer\") enters about its own customers, staff, vehicles and transactions (\"Customer Data\"), that business is responsible for it and decides how it is used. We process Customer Data only on the Customer's instructions to provide the Services. If you are a customer of a business that uses MotoCore, please contact that business first about your information.",
      ],
    },
    {
      heading: "2. Information we collect",
      body: [
        "We collect only what we need to provide and improve the Services:",
        [
          "Website enquiries: your name, business email, phone number, type of business and the message you send through our contact, demo or early-access forms.",
          "Account information: the name, username, role and company of each person given access to MotoCore, and their password (stored only as a one-way hash).",
          "Customer Data entered by our Customers: for example their customers' names, phone numbers, addresses, identity and vehicle documents or document references, vehicle details (VIN, engine or motor number), bookings, payments, receivables, refunds and service records.",
          "Mobile app information: a push-notification token, the device platform (Android or iOS) and the app version, so we can deliver notifications you have allowed. Photos or files are read only when you choose to upload them (for example a company logo).",
          "Technical and security information: IP address, browser or device type, the time of each request, and an audit log of actions taken in an account, used to keep the Services secure and to investigate problems.",
          "Preferences stored on your device: your light / dark theme choice and, when you sign in, a session token. We do not use advertising or tracking cookies, and we do not run third-party analytics or advertising tools on the Services.",
        ],
      ],
    },
    {
      heading: "3. How we use information",
      body: [
        [
          "To provide, operate, maintain and support the Services, including sign-in, notifications and customer support.",
          "To respond to enquiries and demo requests, and to send service messages about your account (for example security notices or changes to these terms).",
          "To keep the Services secure, prevent fraud and misuse, keep audit records and meet legal obligations.",
          "To improve the Services using aggregated information that does not identify individuals.",
        ],
        "We do not sell personal information, and we do not use Customer Data for our own marketing.",
      ],
    },
    {
      heading: "4. Legal basis",
      body: [
        "We process personal information because it is necessary to provide the Services under our contract with the Customer, because you have given consent (for example when you submit a form or allow notifications), because it is necessary to comply with the law, or because we have a legitimate interest in running and securing the Services that does not override your rights.",
      ],
    },
    {
      heading: "5. Who we share information with",
      body: [
        "We share information only with service providers who help us run the Services, under agreements that require them to protect it, and only as much as they need:",
        [
          "Contabo GmbH (Germany): servers and databases for the MotoCore platform and MotoCore Bike.",
          "Vercel Inc.: hosting of this website and its contact form.",
          "Railway Corp. (United States): the system that receives website enquiries as sales leads.",
          "Google LLC: Gmail for enquiry emails, Google Firebase Cloud Messaging for push notifications, and Google Maps and Google Fonts on this website (these may receive your IP address).",
          "Apple Inc. and Google LLC: delivery of push notifications to iOS and Android devices.",
        ],
        "We may also disclose information when the law requires it (for example to a court or government authority of Nepal), to protect the rights, safety and property of MotoCore, our Customers or others, or as part of a merger or sale of our business, in which case this policy will continue to apply.",
      ],
    },
    {
      heading: "6. Where information is stored",
      body: [
        "Our servers are located in Germany (European Union), and some providers listed above process information in the United States. This means your information is stored and processed outside Nepal. We choose providers that apply strong security and contractual safeguards, and we protect the information in the same way wherever it is processed.",
      ],
    },
    {
      heading: "7. How long we keep information",
      body: [
        [
          "Customer Data: for as long as the Customer's account is active. After an account ends, we keep it for up to 90 days so the Customer can request an export, then delete or anonymise it, unless the law requires us to keep it longer.",
          "Website enquiries: up to 2 years after our last contact with you, unless you become a Customer.",
          "Audit and security logs: as long as needed for security and legal purposes, normally up to 2 years.",
          "Backups are overwritten on a rolling basis.",
        ],
      ],
    },
    {
      heading: "8. How we protect information",
      body: [
        "We use encryption in transit (HTTPS), hashed passwords, role-based access so each user sees only what their role allows, separation of each Customer's data, audit logging and regular backups. No system is completely secure; if a breach affects your information we will notify the affected Customer, and where required you and the relevant authorities, without undue delay.",
      ],
    },
    {
      heading: "9. Your rights",
      body: [
        "Subject to the law, you may ask us to:",
        [
          "tell you what personal information we hold about you and give you a copy;",
          "correct information that is inaccurate or incomplete;",
          "delete information we no longer need or have no right to keep;",
          "stop or limit certain processing, or withdraw a consent you gave (this does not affect earlier processing);",
          "stop sending you notifications: turn them off in your device settings at any time.",
        ],
        "For Customer Data, we will pass your request to the business that holds your record and help them respond. We respond to requests within 30 days and may need to verify your identity first. You also have the right to complain to the competent authority in Nepal.",
      ],
    },
    {
      heading: "10. Children",
      body: ["The Services are for businesses and are not directed to anyone under 18. We do not knowingly collect information from children through our website or apps."],
    },
    {
      heading: "11. Mobile app permissions",
      body: [
        "The apps ask for permission only for what you choose to use: notifications (to alert you about bookings, payments and approvals) and photo library access (only when you pick an image to upload, such as your company logo). You can change these permissions in your device settings at any time.",
      ],
    },
    {
      heading: "12. Changes to this policy",
      body: ["We may update this policy. We will post the new version here with a new effective date and, for material changes, notify Customers by email or in the Services before they take effect."],
    },
    {
      heading: "13. Contact and grievances",
      body: ["For any privacy question, request or complaint, contact our Grievance Officer. We will acknowledge your complaint and try to resolve it within 30 days.", CONTACT],
    },
  ],
};

export const TERMS: LegalDoc = {
  slug: "terms",
  title: "Terms of Service | MotoCore ERP",
  description: "The terms under which Code One Nepal Pvt. Ltd. provides the MotoCore website, platform, MotoCore Bike and mobile apps to businesses.",
  h1: "Terms of Service",
  effective: EFFECTIVE,
  intro:
    "These Terms of Service (\"Terms\") are an agreement between Code One Nepal Pvt. Ltd. (\"MotoCore\", \"we\", \"us\") and the business that subscribes to or uses MotoCore (the \"Customer\", \"you\"). They apply to the MotoCore website, the MotoCore platform (including MotoCore Parts, Workshop and Recon-Lite), MotoCore Bike and the MotoCore mobile apps (the \"Services\"). By creating an account, starting a trial or using the Services, you agree to these Terms. If you accept them for a company, you confirm that you are authorised to bind it.",
  sections: [
    {
      heading: "1. Eligibility and accounts",
      body: [
        [
          "The Services are for business use. Users must be at least 18 years old.",
          "You are responsible for your users, for keeping passwords confidential, for assigning roles correctly and for everything done under your account. Tell us immediately at the contact below if you suspect unauthorised access.",
          "You must give accurate information when you register and keep it up to date.",
        ],
      ],
    },
    {
      heading: "2. Trials, plans, fees and offers",
      body: [
        [
          "Free trials (for example the 15-day MotoCore Recon-Lite trial) let you evaluate the Services. At the end of a trial, continued use requires a paid plan. Data in a trial account that does not convert may be deleted after the trial ends.",
          "Fees, plan features (for example Parts Lite or Parts Pro) and billing periods are those in your quotation, order form or invoice. Fees are payable in advance, are exclusive of applicable taxes (including VAT), and are non-refundable except where these Terms or the law say otherwise.",
          "Launch offers and discounts apply only as stated when they are offered, may be limited in number or time, and may be changed or withdrawn for new sign-ups at any time. An offer you have already accepted is honoured for the period stated.",
          "We may suspend the Services if an invoice remains unpaid for more than 15 days after we notify you.",
          "We may change prices for future billing periods with at least 30 days' notice.",
        ],
      ],
    },
    {
      heading: "3. Your data",
      body: [
        "You own the data you and your users enter (\"Customer Data\"). You give us permission to host, process and display it only to provide, secure and support the Services, as described in our Privacy Policy.",
        "You are responsible for Customer Data: for having a lawful basis and any required consent to collect and enter your customers' and staff members' personal information, for its accuracy, and for keeping your own copies of documents you are legally required to keep.",
        "When your account ends, you may request an export of Customer Data within 90 days. After that period we may delete it.",
      ],
    },
    {
      heading: "4. What MotoCore is and is not",
      body: [
        "MotoCore is business management software for automobile businesses. It manages operational records such as inquiries, bookings, stock, job cards, receipts, receivables, refunds and profitability.",
        [
          "MotoCore is not statutory accounting software, is not an IRD-approved billing system, and does not file taxes or returns. You remain responsible for your accounts, tax invoices, VAT and all legal and regulatory compliance.",
          "Figures, reports and calculations are tools to support your decisions. You must check them before relying on them for financial, tax or legal purposes.",
          "Nothing in the Services is legal, tax or financial advice.",
        ],
      ],
    },
    {
      heading: "5. Acceptable use",
      body: [
        "You must not, and must not allow anyone to:",
        [
          "use the Services for anything unlawful, fraudulent or harmful, or to store content you have no right to use;",
          "try to access another customer's data, break or test our security without written permission, or overload or disrupt the Services;",
          "copy, resell, sublicense or reverse engineer the Services, or use them to build a competing product;",
          "upload malware or harmful code.",
        ],
        "We may suspend access that breaches this section, to protect the Services or other customers, with notice where reasonably possible.",
      ],
    },
    {
      heading: "6. Availability, support and changes",
      body: [
        "We work to keep the Services available and secure, but we do not guarantee that they will be uninterrupted or error-free. Planned maintenance, internet and hosting outages and events beyond our control may cause interruptions. We provide support through the contact details below during normal business hours in Nepal.",
        "We improve the Services continuously and may add, change or remove features. We will not remove a core feature of a paid plan during its current billing period without a reasonable alternative or a pro-rata refund.",
      ],
    },
    {
      heading: "7. Intellectual property",
      body: [
        "The Services, the MotoCore name and logo, and all related software and content belong to Code One Nepal Pvt. Ltd. or its licensors. You receive a limited, non-exclusive, non-transferable right to use the Services during your subscription, for your internal business. If you send us suggestions, we may use them without obligation to you.",
      ],
    },
    {
      heading: "8. Third-party services",
      body: ["The Services rely on third-party providers (for example hosting, email and push notifications) and may link to third-party sites. We are not responsible for third-party services that we do not control."],
    },
    {
      heading: "9. Confidentiality",
      body: ["Each party will keep the other's non-public business information confidential and use it only for this agreement, except where disclosure is required by law."],
    },
    {
      heading: "10. Disclaimer",
      body: [
        "Except as expressly stated in these Terms, and to the extent permitted by law, the Services are provided \"as is\" and \"as available\", without warranties of any kind, including fitness for a particular purpose or that results will be accurate or complete. Your rights as a consumer under mandatory law, if any, are not affected.",
      ],
    },
    {
      heading: "11. Limitation of liability",
      body: [
        "To the extent permitted by law: (a) neither party is liable for indirect, incidental, special or consequential losses, or for loss of profit, revenue, data or goodwill; and (b) MotoCore's total liability arising out of or relating to the Services or these Terms is limited to the fees you paid us for the Services in the 12 months before the event giving rise to the claim. These limits do not apply where the law does not allow them, such as for fraud.",
      ],
    },
    {
      heading: "12. Indemnity",
      body: ["You will compensate MotoCore for losses and reasonable costs arising from a third-party claim caused by Customer Data you entered without the right to do so, or by your breach of these Terms or the law."],
    },
    {
      heading: "13. Term, suspension and termination",
      body: [
        [
          "These Terms apply while you use the Services. You may stop using the Services at any time; fees already paid are not refunded except as these Terms or the law require.",
          "Either party may end the agreement if the other materially breaches it and does not fix the breach within 30 days of written notice.",
          "On termination your access ends, and Customer Data is handled as described in section 3.",
        ],
      ],
    },
    {
      heading: "14. Governing law and disputes",
      body: [
        "These Terms are governed by the laws of Nepal. The parties will first try in good faith to resolve any dispute through discussion within 30 days. If it is not resolved, the courts of Lalitpur District, Nepal, have exclusive jurisdiction.",
      ],
    },
    {
      heading: "15. Changes and general terms",
      body: [
        "We may update these Terms. We will post the new version here with a new effective date and, for material changes, notify Customers at least 30 days before they take effect. Continued use after that date means you accept the updated Terms.",
        "If any part of these Terms is found unenforceable, the rest remains in effect. Failing to enforce a right is not a waiver of it. You may not transfer this agreement without our consent. These Terms, together with any order form and the Privacy Policy, are the entire agreement between the parties about the Services. If there is a conflict, the order form prevails, then these Terms.",
      ],
    },
    {
      heading: "16. Contact",
      body: [CONTACT],
    },
  ],
};
