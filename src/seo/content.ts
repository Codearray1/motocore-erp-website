// Product page content (English and Nepali). Every claim describes a live MotoCore feature confirmed by the owner.
// MotoCore manages finance & collections; it is not statutory accounting (no journals / trial balance / IRD billing),
// so pages never call it accounting software.
import bikeDashboard from "../assets/products/bike-dashboard.webp";
import bikeInquiries from "../assets/products/bike-inquiries.webp";
import bikeBookings from "../assets/products/bike-bookings.webp";
import bikeAllocation from "../assets/products/bike-allocation.webp";
import bikeMobile from "../assets/products/bike-mobile-dashboard.webp";
import partsProDashboard from "../assets/products/parts-pro-dashboard.webp";
import partsInventory from "../assets/products/parts-inventory.webp";
import partsCatalogue from "../assets/products/parts-catalogue.webp";
import partsCounterSale from "../assets/products/parts-counter-sale.webp";
import workshopJobCards from "../assets/products/workshop-job-cards.webp";
import workshopDashboard from "../assets/products/workshop-dashboard.webp";
import workshopEstimates from "../assets/products/workshop-estimates.webp";
import workshopCustomers from "../assets/products/workshop-customers.webp";
import reconDashboard from "../assets/products/recon-dashboard.webp";
import reconProfitability from "../assets/products/recon-profitability.webp";
import reconStock from "../assets/products/recon-stock.webp";
import reconCrm from "../assets/products/recon-crm.webp";

export type Lang = "en" | "ne";

export interface Cta {
  label: string;
  href: string;
  external?: boolean;
}

export interface FeatureGroup {
  heading: string;
  intro?: string;
  items: { title: string; text: string }[];
}

export interface Shot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  phone?: boolean;
}

/** "Mobile app" highlight on a product page (MotoCore Bike). */
export interface MobileApp {
  badge: string; // hero chip, links to the section
  heading: string;
  text: string;
  points: string[];
  storesNote: string; // shown while no store link is set
  image: Shot;
}

/** Public store links for the MotoCore Bike app; an empty link hides that store's button. */
export const APP_STORES = { android: "", ios: "" };

export interface PageContent {
  slug: string; // "" for the Nepali home (/ne)
  lang: Lang;
  product: string; // display name, e.g. "MotoCore Bike"
  title: string; // <title>, under ~60 characters
  description: string; // meta description, under ~160 characters
  eyebrow: string;
  h1: string;
  intro: string;
  ctas: Cta[];
  shots?: { heading: string; items: Shot[] };
  mobileApp?: MobileApp;
  tiers?: { heading: string; intro: string; columns: { name: string; text: string }[]; rows: { feature: string; values: [boolean, boolean] }[] };
  groups: FeatureGroup[];
  steps?: { heading: string; items: string[] };
  faq: { q: string; a: string }[];
  app: { name: string; os: string; category: string };
  soon?: boolean; // not released yet: no SoftwareApplication schema
}

export const SITE = {
  origin: "https://www.motocoreerp.com",
  name: "MotoCore ERP",
  company: "Code One Nepal Pvt. Ltd.",
  phone: "+977-9863473651",
  phoneHref: "tel:+9779863473651",
  email: "motocorenepal@gmail.com",
  locality: "Sanepa, Lalitpur",
  country: "NP",
  register: "https://live.motocoreerp.com/register",
  login: "https://live.motocoreerp.com/",
  bikeApp: "https://bike.motocoreerp.com/",
  grievance: { name: "Bijay Devkota", phone: "+977-9705330636", phoneHref: "tel:+9779705330636" },
};

/** Official social profiles. An entry left empty is not shown (no placeholder links). */
export const SOCIAL: { facebook: string; instagram: string; linkedin: string; tiktok: string } = {
  facebook: "https://www.facebook.com/profile.php?id=61590382095428",
  instagram: "https://www.instagram.com/motocoreerp/",
  linkedin: "https://www.linkedin.com/company/131154156/",
  tiktok: "https://www.tiktok.com/@motocore.erp",
};

const demoEn: Cta = { label: "Book a free demo", href: "#contact" };
const demoNe: Cta = { label: "निःशुल्क डेमो बुक गर्नुहोस्", href: "#contact" };
const trialEn: Cta = { label: "Start free trial", href: SITE.register, external: true };
const trialNe: Cta = { label: "निःशुल्क ट्रायल सुरु गर्नुहोस्", href: SITE.register, external: true };
const callEn: Cta = { label: "Call +977 9863473651", href: SITE.phoneHref };
const callNe: Cta = { label: "फोन: +९७७ ९८६३४७३६५१", href: SITE.phoneHref };

// Screenshots from the MotoCore platform with demo data, 1600x900
type ShotDef = [src: string, en: [alt: string, caption: string], ne: [alt: string, caption: string]];
const gallery = (lang: Lang, heading: Record<Lang, string>, defs: ShotDef[]) => ({
  heading: heading[lang],
  items: defs.map(([src, en, ne]): Shot => {
    const [alt, caption] = lang === "ne" ? ne : en;
    return { src, width: 1600, height: 900, alt, caption };
  }),
});

const partsShots = (lang: Lang) =>
  gallery(lang, { en: "A look inside MotoCore Parts", ne: "MotoCore Parts भित्र हेर्नुहोस्" }, [
    [partsProDashboard, ["MotoCore Parts Pro dashboard", "Parts Pro dashboard: inventory value, sales, gross profit, receivables and stock health."], ["MotoCore Parts Pro ड्यासबोर्ड", "Parts Pro ड्यासबोर्ड: स्टक मूल्य, बिक्री, नाफा, पाउनुपर्ने रकम र स्टकको अवस्था।"]],
    [partsInventory, ["Inventory overview in MotoCore Parts", "Inventory overview across warehouses, racks and bins."], ["MotoCore Parts स्टक सारांश", "गोदाम, र्‍याक र बिनअनुसार स्टक सारांश।"]],
    [partsCatalogue, ["Parts catalogue in MotoCore Parts", "Parts catalogue with stock, prices and barcode import."], ["MotoCore Parts पार्ट सूची", "स्टक, मूल्य र बारकोड आयातसहित पार्ट सूची।"]],
    [partsCounterSale, ["Counter sale with barcode scanning", "Counter sales with barcode scanning (Parts Pro)."], ["बारकोड स्क्यानसहित काउन्टर बिक्री", "बारकोड स्क्यानसहित काउन्टर बिक्री (Parts Pro)।"]],
  ]);

const workshopShots = (lang: Lang) =>
  gallery(lang, { en: "A look inside MotoCore Workshop", ne: "MotoCore Workshop भित्र हेर्नुहोस्" }, [
    [workshopJobCards, ["Job card pipeline in MotoCore Workshop", "Every job card by stage: inspection, diagnosis, approval, parts, repair, washing and QC."], ["MotoCore Workshop जब कार्ड", "हरेक जब कार्ड चरणअनुसार: निरीक्षण, निदान, स्वीकृति, पार्ट, मर्मत, धुलाइ र QC।"]],
    [workshopDashboard, ["MotoCore Workshop dashboard", "Workshop dashboard: live work by stage, technicians and bays."], ["MotoCore Workshop ड्यासबोर्ड", "वर्कसप ड्यासबोर्ड: चरणअनुसार काम, प्राविधिक र बे।"]],
    [workshopEstimates, ["Estimates and quotations in MotoCore Workshop", "Estimates and quotations waiting for customer approval."], ["MotoCore Workshop इस्टिमेट", "ग्राहक स्वीकृति कुरिरहेका इस्टिमेट र कोटेसन।"]],
    [workshopCustomers, ["Workshop customers in MotoCore Workshop", "Customers with their vehicles, open jobs and outstanding balance."], ["MotoCore Workshop ग्राहक", "ग्राहक, उनका सवारी, खुला काम र बाँकी रकम।"]],
  ]);

const reconShots = (lang: Lang) =>
  gallery(lang, { en: "A look inside MotoCore Recon-Lite", ne: "MotoCore Recon-Lite भित्र हेर्नुहोस्" }, [
    [reconDashboard, ["MotoCore Recon-Lite control centre", "Control centre: sales, valuations, follow-ups and what needs attention today."], ["MotoCore Recon-Lite नियन्त्रण केन्द्र", "नियन्त्रण केन्द्र: बिक्री, मूल्याङ्कन, फलोअप र आज ध्यान दिनुपर्ने काम।"]],
    [reconProfitability, ["Profitability per used vehicle", "Realised profit per vehicle: sale price, landed cost and extra costs."], ["प्रति सवारी नाफा", "प्रति सवारी नाफा: बिक्री मूल्य, खरिद लागत र थप खर्च।"]],
    [reconStock, ["Used vehicle stock in MotoCore Recon-Lite", "Stock with readiness, age and expected margin for every vehicle."], ["MotoCore Recon-Lite स्टक", "हरेक सवारीको तयारी, उमेर र अपेक्षित नाफासहित स्टक।"]],
    [reconCrm, ["Buyer and seller CRM in MotoCore Recon-Lite", "CRM: buyer and seller inquiries matched to available stock."], ["MotoCore Recon-Lite CRM", "CRM: किन्ने र बेच्ने सोधपुछ उपलब्ध स्टकसँग मिलाइन्छ।"]],
  ]);

const bikeShots = (lang: Lang): { heading: string; items: Shot[] } => {
  const ne = lang === "ne";
  return {
    heading: ne ? "MotoCore Bike भित्र हेर्नुहोस्" : "A look inside MotoCore Bike",
    items: [
      { src: bikeDashboard, width: 1600, height: 844, alt: ne ? "MotoCore Bike सञ्चालक ड्यासबोर्ड" : "MotoCore Bike owner dashboard", caption: ne ? "सञ्चालक ड्यासबोर्ड: सोधपुछ, बुकिङ, स्टक, सङ्कलन र बिक्री फनेल एकै ठाउँमा।" : "Owner dashboard: inquiries, bookings, stock, collections and the sales funnel at a glance." },
      { src: bikeInquiries, width: 1600, height: 711, alt: ne ? "हट, वार्म र कोल्ड सोधपुछ सूची" : "Inquiries by hot, warm and cold temperature", caption: ne ? "सोधपुछ र लिड: तापक्रम, स्रोत र अपेक्षित खरिद मितिसहित।" : "Inquiries and leads with temperature, source and expected purchase date." },
      { src: bikeBookings, width: 1600, height: 522, alt: ne ? "बुकिङ ग्राहक, तिरेको र बाँकी रकम" : "Booking customers with paid and outstanding amounts", caption: ne ? "बुकिङ ग्राहक: बिक्री मूल्य, तिरेको र बाँकी रकम, स्टकको अवस्था।" : "Booking customers: deal value, paid and outstanding amounts, stock status." },
      { src: bikeAllocation, width: 1600, height: 467, alt: ne ? "एलोकेसन सेन्टर" : "Allocation Center", caption: ne ? "एलोकेसन सेन्टर: पूरा भुक्तानी भएका बुकिङमा VIN तोक्नुहोस् र डेलिभर गर्नुहोस्।" : "Allocation Center: allocate a VIN to paid bookings and deliver." },
      { src: bikeMobile, width: 600, height: 1230, phone: true, alt: ne ? "मोबाइल एपमा MotoCore Bike" : "MotoCore Bike on a phone", caption: ne ? "बिक्री टोलीका लागि मोबाइलमा पनि।" : "The same dashboard on the sales team's phone." },
    ],
  };
};

const bikeApp = (lang: Lang): MobileApp => {
  const ne = lang === "ne";
  return {
    badge: ne ? "Android र iOS मोबाइल एप समावेश" : "Android and iOS app included",
    heading: ne ? "शोरूम तपाईंको खल्तीमा: MotoCore Bike मोबाइल एप" : "Your showroom in your pocket: the MotoCore Bike app",
    text: ne
      ? "MotoCore Bike सँग Android र iPhone एप आउँछ। सञ्चालक, म्यानेजर र बिक्री टोलीले वेबमा प्रयोग गर्ने उही लगइन र अनुमतिबाट शोरूम फ्लोर वा बाहिरबाट काम गर्न सक्छन्।"
      : "MotoCore Bike comes with Android and iPhone apps. Owners, managers and the sales team use the same login and permissions as on the web, from the showroom floor or on the move.",
    points: ne
      ? [
          "सोधपुछ, बुकिङ, स्टक र भुक्तानी देखाउने सञ्चालक ड्यासबोर्ड",
          "शोरूम फ्लोरबाटै नयाँ सोधपुछ र वाक-इन बुकिङ",
          "नयाँ बुकिङ, भुक्तानी र स्वीकृतिका लागि पुस सूचना",
          "एक्सचेन्ज, नामसारी, फिर्ता र कलेक्सन मोबाइलमै",
        ]
      : [
          "Owner dashboard with inquiries, bookings, stock and collections",
          "Add inquiries and walk-in bookings from the showroom floor",
          "Push notifications for new bookings, payments and approvals",
          "Exchange, namsari, refunds and collections on the phone",
        ],
    storesNote: ne ? "एप डाउनलोडका लागि हाम्रो टोलीलाई सम्पर्क गर्नुहोस्।" : "Ask our team for the app download when you sign up.",
    image: { src: bikeMobile, width: 600, height: 1230, phone: true, alt: ne ? "MotoCore Bike मोबाइल एपको ड्यासबोर्ड" : "MotoCore Bike mobile app dashboard", caption: "" },
  };
};

const bikeEn: PageContent = {
  slug: "bike-showroom-software",
  lang: "en",
  product: "MotoCore Bike",
  title: "Bike Showroom Management Software in Nepal | MotoCore Bike",
  description:
    "MotoCore Bike is a showroom management system for motorcycle, scooter and EV dealers in Nepal: inquiries, bookings, VIN stock, delivery, namsari and collections.",
  eyebrow: "MotoCore Bike · showroom management system for two-wheeler dealers",
  h1: "Bike showroom management software for motorcycle, scooter and EV dealers",
  intro:
    "MotoCore Bike runs a two-wheeler dealership from the first walk-in to the bill book: inquiries and follow-ups, bookings and receipts, VIN-wise stock, allocation, sale documents, challan and delivery, namsari tracking, collections and refunds. It is built for showrooms in Nepal, with NPR amounts, Nepali fiscal years and a mobile app for your sales team.",
  ctas: [demoEn, callEn],
  shots: bikeShots("en"),
  mobileApp: bikeApp("en"),
  groups: [
    {
      heading: "From inquiry to delivery in one flow",
      items: [
        { title: "Inquiries and follow-ups", text: "Walk-in and phone inquiries with hot / warm / cold temperature, daily follow-up lists, overdue reminders and lost-inquiry revival." },
        { title: "One customer, one record", text: "Customers are found by phone number before anything is created, so the same buyer is never entered twice." },
        { title: "Bookings with receipts", text: "Book a model, variant and colour with an advance; every receipt is numbered and protected against double entry." },
        { title: "VIN-wise stock and allocation", text: "Purchases are posted with VIN and engine (or motor) numbers; the Allocation Center offers only matching stock for each booking." },
        { title: "Documents, challan and delivery", text: "A document checklist per sale, challan generation, delivery confirmation and namsari (registration) tracking until the bill book is handed over." },
        { title: "Exchange vehicles", text: "Capture an old bike, record its valuation and agreed value, and apply the exchange credit to the new deal." },
      ],
    },
    {
      heading: "Money under control",
      intro: "Finance and collections management built for dealers (not a statutory accounting ledger).",
      items: [
        { title: "Collections and receivables", text: "Customer, financier and distributor-claim receivables with daily collections and verification." },
        { title: "Discounts with approval", text: "Sales officers request a discount with a reason; only the owner or sales manager can approve it." },
        { title: "Refunds and cancellations", text: "Refunds follow an approval and payout flow, and can never exceed what the customer paid." },
        { title: "Schemes and finance deals", text: "Distributor schemes, finance company deals and insurance, all reflected in the deal value." },
        { title: "Deal profitability", text: "Profitability per sale and a financial close / reopen step for every delivered deal." },
        { title: "Role-based access", text: "Owner, sales manager, finance manager and sales officer each see and do only what their role allows." },
      ],
    },
    {
      heading: "Built for how Nepali showrooms work",
      items: [
        { title: "Mobile app", text: "Android and iOS apps for the sales floor, with push notifications for new bookings, payments and approvals." },
        { title: "Cloud, multi-branch ready", text: "Runs in the browser and on phones; each dealership's data is kept separate and secure." },
        { title: "Nepali dates and NPR", text: "Nepali fiscal year display and amounts in Nepalese rupees throughout." },
      ],
    },
  ],
  steps: {
    heading: "How a sale moves through MotoCore Bike",
    items: [
      "Record the inquiry and follow up until the customer is ready.",
      "Convert it to a booking and take the advance receipt.",
      "Request and approve any discount, scheme, finance or exchange.",
      "Allocate a matching VIN from stock and collect the documents.",
      "Confirm the sale, print the challan and deliver the bike.",
      "Track namsari and close the deal's finances.",
    ],
  },
  faq: [
    { q: "Is MotoCore Bike a showroom management system?", a: "Yes. MotoCore Bike is a complete showroom management system for two-wheeler dealers: inquiries, follow-ups, bookings, VIN-wise stock, allocation, delivery, namsari, collections, discounts and refunds, with owner dashboards and a mobile app." },
    { q: "Which dealers is MotoCore Bike for?", a: "Motorcycle, scooter and electric two-wheeler showrooms and sub-dealers in Nepal, from a single outlet to several branches." },
    { q: "Does it work on mobile phones?", a: "Yes. The web app works on any device, and there are Android and iOS apps for sales staff, with push notifications." },
    { q: "Is it accounting software?", a: "No. MotoCore Bike manages your showroom's finances and collections: receipts, receivables, refunds, claims and deal profitability. It does not replace your accounting or IRD billing software." },
    { q: "Can I see it before buying?", a: "Yes. Book a free demo and we will walk you through the full inquiry-to-delivery flow with your own models." },
  ],
  app: { name: "MotoCore Bike", os: "Web, Android, iOS", category: "BusinessApplication" },
};

const bikeNe: PageContent = {
  slug: "bike-showroom-software",
  lang: "ne",
  product: "MotoCore Bike",
  title: "बाइक शोरूम सफ्टवेयर नेपाल | MotoCore Bike",
  description:
    "MotoCore Bike: नेपालका मोटरसाइकल, स्कुटर र इलेक्ट्रिक सवारी डिलरका लागि बाइक शोरूम सफ्टवेयर — सोधपुछ, बुकिङ, VIN स्टक, डेलिभरी, नामसारी र भुक्तानी।",
  eyebrow: "MotoCore Bike · दुईपाङ्ग्रे सवारी डिलर व्यवस्थापन सफ्टवेयर",
  h1: "मोटरसाइकल, स्कुटर र इलेक्ट्रिक सवारी डिलरका लागि बाइक शोरूम सफ्टवेयर",
  intro:
    "MotoCore Bike ले ग्राहक शोरूममा आएदेखि बिलबुक हस्तान्तरणसम्मको सम्पूर्ण काम एउटै प्रणालीमा चलाउँछ: सोधपुछ र फलोअप, बुकिङ र रसिद, VIN अनुसारको स्टक, एलोकेसन, बिक्री कागजात, चलान र डेलिभरी, नामसारी ट्र्याकिङ, भुक्तानी सङ्कलन र फिर्ता। नेपालका शोरूमका लागि बनाइएको — रुपैयाँमा रकम, नेपाली आर्थिक वर्ष र बिक्री टोलीका लागि मोबाइल एप।",
  ctas: [demoNe, callNe],
  shots: bikeShots("ne"),
  mobileApp: bikeApp("ne"),
  groups: [
    {
      heading: "सोधपुछदेखि डेलिभरीसम्म एउटै प्रवाह",
      items: [
        { title: "सोधपुछ र फलोअप", text: "शोरूम र फोनबाट आएका सोधपुछ, हट / वार्म / कोल्ड वर्गीकरण, दैनिक फलोअप सूची र छुटेका फलोअपको सम्झना।" },
        { title: "एक ग्राहक, एक रेकर्ड", text: "नयाँ ग्राहक बनाउनुअघि फोन नम्बरबाट खोजिन्छ, त्यसैले एउटै ग्राहक दुई पटक दर्ता हुँदैन।" },
        { title: "रसिदसहित बुकिङ", text: "मोडेल, भेरियन्ट र रङ छानेर अग्रिम भुक्तानीसहित बुकिङ; हरेक रसिद नम्बरसहित र दोहोरो प्रविष्टिबाट सुरक्षित।" },
        { title: "VIN अनुसार स्टक र एलोकेसन", text: "खरिद VIN र इन्जिन (वा मोटर) नम्बरसहित दर्ता हुन्छ; एलोकेसन सेन्टरले हरेक बुकिङका लागि मिल्दो स्टक मात्र देखाउँछ।" },
        { title: "कागजात, चलान र डेलिभरी", text: "हरेक बिक्रीको कागजात सूची, चलान, डेलिभरी पुष्टि र बिलबुक नआएसम्म नामसारी ट्र्याकिङ।" },
        { title: "पुरानो सवारी साटासाट", text: "पुरानो बाइकको मूल्याङ्कन र सहमत मूल्य राखेर नयाँ बिक्रीमा साटासाट रकम मिलाउनुहोस्।" },
      ],
    },
    {
      heading: "रकमको पूर्ण नियन्त्रण",
      intro: "डिलरका लागि वित्त र भुक्तानी सङ्कलन व्यवस्थापन (कानुनी लेखा खाता होइन)।",
      items: [
        { title: "सङ्कलन र बाँकी रकम", text: "ग्राहक, फाइनान्स कम्पनी र डिस्ट्रिब्युटर क्लेमको बाँकी रकम, दैनिक सङ्कलन र प्रमाणीकरण।" },
        { title: "स्वीकृतिसहित छुट", text: "बिक्री अधिकृतले कारणसहित छुट माग्छन्; सञ्चालक वा सेल्स म्यानेजरले मात्र स्वीकृत गर्छन्।" },
        { title: "फिर्ता र रद्द", text: "फिर्ता रकम स्वीकृति र भुक्तानी प्रक्रियाबाट जान्छ, र ग्राहकले तिरेभन्दा बढी कहिल्यै हुँदैन।" },
        { title: "स्किम र फाइनान्स", text: "डिस्ट्रिब्युटर स्किम, फाइनान्स कम्पनी र बीमा — सबै बिक्री मूल्यमा समावेश।" },
        { title: "बिक्री नाफा", text: "हरेक बिक्रीको नाफा विश्लेषण र डेलिभरी भएका बिक्रीको वित्तीय क्लोज / रिओपन।" },
        { title: "भूमिका अनुसार पहुँच", text: "सञ्चालक, सेल्स म्यानेजर, फाइनान्स म्यानेजर र बिक्री अधिकृत — हरेकले आफ्नो भूमिकाअनुसार मात्र देख्छन् र गर्छन्।" },
      ],
    },
    {
      heading: "नेपाली शोरूमको काम गर्ने तरिकाअनुसार",
      items: [
        { title: "मोबाइल एप", text: "बिक्री टोलीका लागि एन्ड्रोइड र आईओएस एप, नयाँ बुकिङ, भुक्तानी र स्वीकृतिको पुस नोटिफिकेसनसहित।" },
        { title: "क्लाउडमा, धेरै शाखाका लागि तयार", text: "ब्राउजर र फोनमा चल्छ; हरेक डिलरको डाटा छुट्टै र सुरक्षित रहन्छ।" },
        { title: "नेपाली मिति र रुपैयाँ", text: "नेपाली आर्थिक वर्ष र सबै रकम नेपाली रुपैयाँमा।" },
      ],
    },
  ],
  steps: {
    heading: "MotoCore Bike मा बिक्री कसरी अघि बढ्छ",
    items: [
      "सोधपुछ दर्ता गर्नुहोस् र ग्राहक तयार नभएसम्म फलोअप गर्नुहोस्।",
      "बुकिङमा बदल्नुहोस् र अग्रिम रसिद काट्नुहोस्।",
      "छुट, स्किम, फाइनान्स वा साटासाट माग र स्वीकृत गर्नुहोस्।",
      "स्टकबाट मिल्दो VIN एलोकेट गर्नुहोस् र कागजात सङ्कलन गर्नुहोस्।",
      "बिक्री पुष्टि गर्नुहोस्, चलान छाप्नुहोस् र बाइक डेलिभर गर्नुहोस्।",
      "नामसारी ट्र्याक गर्नुहोस् र बिक्रीको वित्तीय हिसाब बन्द गर्नुहोस्।",
    ],
  },
  faq: [
    { q: "MotoCore Bike कुन डिलरका लागि हो?", a: "नेपालका मोटरसाइकल, स्कुटर र इलेक्ट्रिक दुईपाङ्ग्रे सवारीका शोरूम र सब-डिलर — एउटा पसलदेखि धेरै शाखासम्म।" },
    { q: "मोबाइलमा चल्छ?", a: "चल्छ। वेब एप जुनसुकै उपकरणमा चल्छ, र बिक्री टोलीका लागि पुस नोटिफिकेसनसहित एन्ड्रोइड र आईओएस एप छन्।" },
    { q: "यो लेखा (एकाउन्टिङ) सफ्टवेयर हो?", a: "होइन। MotoCore Bike ले शोरूमको वित्त र भुक्तानी सङ्कलन व्यवस्थापन गर्छ: रसिद, बाँकी रकम, फिर्ता, क्लेम र बिक्री नाफा। यसले तपाईंको लेखा वा IRD बिलिङ सफ्टवेयरको ठाउँ लिँदैन।" },
    { q: "किन्नुअघि हेर्न पाइन्छ?", a: "पाइन्छ। निःशुल्क डेमो बुक गर्नुहोस्, हामी तपाईंकै मोडेलसहित सोधपुछदेखि डेलिभरीसम्मको पूरा प्रक्रिया देखाउँछौं।" },
  ],
  app: { name: "MotoCore Bike", os: "Web, Android, iOS", category: "BusinessApplication" },
};

const partsTiers = (lang: Lang) => {
  const ne = lang === "ne";
  const r = (en: string, np: string, lite: boolean) => ({ feature: ne ? np : en, values: [lite, true] as [boolean, boolean] });
  return {
    heading: ne ? "Lite र Pro मा के फरक छ" : "Parts Lite and Parts Pro",
    intro: ne ? "Lite मा मुख्य स्टक र खरिद व्यवस्थापन छ। Pro मा बारकोड स्क्यानिङ र विश्लेषण जस्ता थप सुविधा छन्।" : "Lite covers core stock and purchasing. Pro adds advanced features such as barcode scanning and analytics.",
    columns: [
      { name: "Parts Lite", text: ne ? "पार्ट काउन्टर र साना गोदामका लागि" : "For parts counters and smaller stores" },
      { name: "Parts Pro", text: ne ? "ठूला वितरक र धेरै गोदामका लागि" : "For distributors and multi-warehouse operations" },
    ],
    rows: [
      r("Multi-warehouse inventory", "धेरै गोदामको स्टक", true),
      r("Stock tracking and reorder levels", "मौज्दात ट्र्याकिङ र पुनः अर्डर तह", true),
      r("Purchase requests, orders and GRN", "खरिद माग, आदेश र GRN", true),
      r("Vendor management", "आपूर्तिकर्ता व्यवस्थापन", true),
      r("Barcode scanning", "बारकोड स्क्यानिङ", false),
      r("Inventory analytics", "स्टक विश्लेषण", false),
    ],
  };
};

const partsEn: PageContent = {
  slug: "spare-parts-inventory-software",
  lang: "en",
  product: "MotoCore Parts",
  title: "Spare Parts Inventory Software in Nepal | MotoCore Parts",
  description:
    "MotoCore Parts (Lite and Pro): spare parts inventory and procurement for automotive dealers and distributors — multi-warehouse stock, reorder levels, POs, GRN, barcode.",
  eyebrow: "MotoCore Parts · Lite and Pro",
  h1: "Spare parts inventory software for automotive dealers and distributors",
  intro:
    "Know what is in every warehouse and what needs reordering. MotoCore Parts tracks spare parts stock across locations, flags items below their reorder level and runs procurement from purchase request to goods received. Choose Parts Lite for the essentials or Parts Pro for barcode scanning and analytics.",
  ctas: [trialEn, demoEn],
  shots: partsShots("en"),
  tiers: partsTiers("en"),
  groups: [
    {
      heading: "Parts and procurement features",
      items: [
        { title: "Multi-warehouse inventory", text: "Stock levels for every part in every warehouse or branch." },
        { title: "Stock tracking", text: "Movements in and out, so the counts stay accurate." },
        { title: "Reorder levels", text: "Set minimum levels and see which parts need to be reordered." },
        { title: "Purchase requests and orders", text: "Raise purchase requests and convert them to purchase orders." },
        { title: "Vendor management", text: "Keep your suppliers and their terms in one place." },
        { title: "Goods received (GRN)", text: "Receive deliveries against purchase orders and update stock." },
      ],
    },
  ],
  faq: [
    { q: "What is the difference between Parts Lite and Parts Pro?", a: "Parts Lite covers core inventory and purchasing. Parts Pro adds advanced features such as barcode scanning and inventory analytics." },
    { q: "Who is it for?", a: "Spare parts distributors, dealership parts counters and workshops that hold their own stock." },
    { q: "Can several branches share stock visibility?", a: "Yes. Inventory is tracked per warehouse with central visibility for management." },
  ],
  app: { name: "MotoCore Parts", os: "Web", category: "BusinessApplication" },
};

const partsNe: PageContent = {
  slug: "spare-parts-inventory-software",
  lang: "ne",
  product: "MotoCore Parts",
  title: "पार्टपुर्जा स्टक सफ्टवेयर नेपाल | MotoCore Parts",
  description:
    "MotoCore Parts (Lite र Pro): अटोमोबाइल डिलर र वितरकका लागि पार्टपुर्जा स्टक र खरिद — धेरै गोदाम, पुनः अर्डर तह, खरिद आदेश, GRN र बारकोड।",
  eyebrow: "MotoCore Parts · Lite र Pro",
  h1: "अटोमोबाइल डिलर र वितरकका लागि पार्टपुर्जा स्टक सफ्टवेयर",
  intro:
    "कुन गोदाममा के छ र के पुनः अर्डर गर्नुपर्छ, तुरुन्तै थाहा पाउनुहोस्। MotoCore Parts ले सबै स्थानको पार्टपुर्जा मौज्दात ट्र्याक गर्छ, पुनः अर्डर तहभन्दा कम भएका सामान देखाउँछ र खरिद मागदेखि सामान प्राप्तिसम्मको प्रक्रिया चलाउँछ। आधारभूत कामका लागि Parts Lite, बारकोड र विश्लेषणका लागि Parts Pro रोज्नुहोस्।",
  ctas: [trialNe, demoNe],
  shots: partsShots("ne"),
  tiers: partsTiers("ne"),
  groups: [
    {
      heading: "पार्टपुर्जा र खरिदका सुविधा",
      items: [
        { title: "धेरै गोदामको स्टक", text: "हरेक गोदाम वा शाखामा हरेक पार्टको मौज्दात।" },
        { title: "मौज्दात ट्र्याकिङ", text: "आउने-जाने सबै कारोबार, ताकि गन्ती सधैं सही रहोस्।" },
        { title: "पुनः अर्डर तह", text: "न्यूनतम तह तोक्नुहोस् र कुन पार्ट पुनः अर्डर गर्नुपर्छ हेर्नुहोस्।" },
        { title: "खरिद माग र आदेश", text: "खरिद माग उठाउनुहोस् र खरिद आदेशमा बदल्नुहोस्।" },
        { title: "आपूर्तिकर्ता व्यवस्थापन", text: "आपूर्तिकर्ता र तिनका सर्त एकै ठाउँमा।" },
        { title: "सामान प्राप्ति (GRN)", text: "खरिद आदेशअनुसार सामान बुझ्नुहोस् र स्टक अद्यावधिक गर्नुहोस्।" },
      ],
    },
  ],
  faq: [
    { q: "Parts Lite र Parts Pro मा के फरक छ?", a: "Parts Lite मा मुख्य स्टक र खरिद व्यवस्थापन छ। Parts Pro मा बारकोड स्क्यानिङ र स्टक विश्लेषण जस्ता थप सुविधा छन्।" },
    { q: "यो कसका लागि हो?", a: "पार्टपुर्जा वितरक, डिलरसिपका पार्ट काउन्टर र आफ्नै स्टक राख्ने वर्कसप।" },
    { q: "धेरै शाखाको स्टक एकै ठाउँमा देखिन्छ?", a: "देखिन्छ। हरेक गोदामको स्टक छुट्टै ट्र्याक हुन्छ र व्यवस्थापनले केन्द्रबाट हेर्न सक्छ।" },
  ],
  app: { name: "MotoCore Parts", os: "Web", category: "BusinessApplication" },
};

const workshopEn: PageContent = {
  slug: "workshop-management-software",
  lang: "en",
  product: "MotoCore Workshop",
  title: "Workshop Management Software in Nepal | MotoCore Workshop",
  description:
    "MotoCore Workshop: workshop management software for vehicle service centres — job cards, technician scheduling, labour and service tracking, linked to parts inventory.",
  eyebrow: "MotoCore Workshop",
  h1: "Workshop management software for vehicle service centres",
  intro:
    "Run your workshop on job cards instead of paper. MotoCore Workshop tracks every vehicle from arrival to handover, schedules technicians, records labour and shows the status of every service, while parts are drawn from the same inventory your stores team manages in MotoCore Parts.",
  ctas: [trialEn, demoEn],
  shots: workshopShots("en"),
  groups: [
    {
      heading: "Workshop features",
      items: [
        { title: "Job cards", text: "Open a job card per vehicle and track the work from arrival to delivery." },
        { title: "Technician scheduling", text: "Assign jobs to technicians and balance the workload across the bay." },
        { title: "Labour management", text: "Record the labour performed on every job." },
        { title: "Service tracking", text: "See the status of every vehicle in the workshop at a glance." },
        { title: "Linked parts inventory", text: "Parts used on a job come from the same multi-warehouse stock." },
        { title: "Customer history", text: "Every visit is kept on the customer's record for the next service." },
      ],
    },
  ],
  faq: [
    { q: "Which workshops can use it?", a: "Two-wheeler and four-wheeler workshops, authorised service centres and independent garages." },
    { q: "Does it connect to spare parts?", a: "Yes. MotoCore Workshop uses the same parts inventory as MotoCore Parts, with stock tracking and reorder levels." },
  ],
  app: { name: "MotoCore Workshop", os: "Web", category: "BusinessApplication" },
};

const workshopNe: PageContent = {
  slug: "workshop-management-software",
  lang: "ne",
  product: "MotoCore Workshop",
  title: "वर्कसप र सर्भिस सेन्टर सफ्टवेयर नेपाल | MotoCore",
  description:
    "MotoCore Workshop: सवारी सर्भिस सेन्टरका लागि वर्कसप व्यवस्थापन — जब कार्ड, प्राविधिक तालिका, श्रम र सर्भिस ट्र्याकिङ, पार्टपुर्जा स्टकसँग जोडिएको।",
  eyebrow: "MotoCore Workshop",
  h1: "सवारी सर्भिस सेन्टरका लागि वर्कसप व्यवस्थापन सफ्टवेयर",
  intro:
    "कागजको सट्टा जब कार्डमा वर्कसप चलाउनुहोस्। MotoCore Workshop ले हरेक सवारी आएदेखि हस्तान्तरणसम्म ट्र्याक गर्छ, प्राविधिकको तालिका बनाउँछ, श्रम रेकर्ड गर्छ र हरेक सर्भिसको अवस्था देखाउँछ; पार्टपुर्जा भने MotoCore Parts मा स्टोर टोलीले व्यवस्थापन गर्ने उही स्टकबाट जान्छ।",
  ctas: [trialNe, demoNe],
  shots: workshopShots("ne"),
  groups: [
    {
      heading: "वर्कसपका सुविधा",
      items: [
        { title: "जब कार्ड", text: "हरेक सवारीको जब कार्ड खोलेर आएदेखि डेलिभरीसम्म काम ट्र्याक गर्नुहोस्।" },
        { title: "प्राविधिक तालिका", text: "प्राविधिकलाई काम तोक्नुहोस् र कामको भार सन्तुलित राख्नुहोस्।" },
        { title: "श्रम व्यवस्थापन", text: "हरेक काममा भएको श्रम रेकर्ड गर्नुहोस्।" },
        { title: "सर्भिस ट्र्याकिङ", text: "वर्कसपमा रहेका हरेक सवारीको अवस्था एकै नजरमा।" },
        { title: "जोडिएको पार्टपुर्जा स्टक", text: "काममा प्रयोग भएका पार्टपुर्जा उही धेरै-गोदाम स्टकबाट।" },
        { title: "ग्राहक इतिहास", text: "हरेक भ्रमण अर्को सर्भिसका लागि ग्राहकको रेकर्डमा रहन्छ।" },
      ],
    },
  ],
  faq: [
    { q: "कुन वर्कसपले प्रयोग गर्न सक्छन्?", a: "दुईपाङ्ग्रे र चारपाङ्ग्रे वर्कसप, अधिकृत सर्भिस सेन्टर र स्वतन्त्र ग्यारेज।" },
    { q: "पार्टपुर्जासँग जोडिन्छ?", a: "जोडिन्छ। MotoCore Workshop ले MotoCore Parts कै स्टक प्रयोग गर्छ।" },
  ],
  app: { name: "MotoCore Workshop", os: "Web", category: "BusinessApplication" },
};

const reconEn: PageContent = {
  slug: "used-vehicle-reconditioning-software",
  lang: "en",
  product: "MotoCore Recon-Lite",
  title: "Used Vehicle & Recondition Software in Nepal | MotoCore Recon-Lite",
  description:
    "MotoCore Recon-Lite: used vehicle dealer software for valuation, acquisition tracking, reconditioning, stock and profit per vehicle. 15-day free trial.",
  eyebrow: "MotoCore Recon-Lite",
  h1: "Used vehicle and reconditioning software for pre-owned dealers",
  intro:
    "Buy right, recondition on budget and know your profit on every vehicle. MotoCore Recon-Lite tracks each used vehicle from valuation and acquisition through reconditioning to sale.",
  ctas: [trialEn, demoEn],
  shots: reconShots("en"),
  groups: [
    {
      heading: "Used vehicle features",
      items: [
        { title: "Valuation", text: "Record the valuation of every vehicle you consider buying." },
        { title: "Acquisition tracking", text: "Follow each purchase from offer to stock." },
        { title: "Reconditioning", text: "Track the reconditioning work and its cost per vehicle." },
        { title: "Stock management", text: "Know which vehicles are in stock, in reconditioning or sold." },
        { title: "Profitability", text: "See the profit on each vehicle once costs and sale price are in." },
      ],
    },
  ],
  faq: [
    { q: "Is there a free trial?", a: "Yes. MotoCore Recon-Lite comes with a 15-day free trial." },
    { q: "Who is Recon-Lite for?", a: "Used vehicle and recondition dealers who buy, refurbish and resell vehicles." },
  ],
  app: { name: "MotoCore Recon-Lite", os: "Web", category: "BusinessApplication" },
};

const reconNe: PageContent = {
  slug: "used-vehicle-reconditioning-software",
  lang: "ne",
  product: "MotoCore Recon-Lite",
  title: "पुरानो सवारी र रिकन्डिसन सफ्टवेयर | MotoCore Recon-Lite",
  description:
    "MotoCore Recon-Lite: पुरानो सवारी डिलरका लागि मूल्याङ्कन, खरिद ट्र्याकिङ, रिकन्डिसनिङ, स्टक र प्रति सवारी नाफा। १५ दिन निःशुल्क ट्रायल।",
  eyebrow: "MotoCore Recon-Lite",
  h1: "पुरानो सवारी डिलरका लागि रिकन्डिसन सफ्टवेयर",
  intro:
    "सही मूल्यमा किन्नुहोस्, बजेटमै मर्मत गर्नुहोस् र हरेक सवारीको नाफा थाहा पाउनुहोस्। MotoCore Recon-Lite ले हरेक पुरानो सवारी मूल्याङ्कन र खरिददेखि रिकन्डिसनिङ हुँदै बिक्रीसम्म ट्र्याक गर्छ।",
  ctas: [trialNe, demoNe],
  shots: reconShots("ne"),
  groups: [
    {
      heading: "पुरानो सवारीका सुविधा",
      items: [
        { title: "मूल्याङ्कन", text: "किन्न विचार गरिएका हरेक सवारीको मूल्याङ्कन रेकर्ड गर्नुहोस्।" },
        { title: "खरिद ट्र्याकिङ", text: "हरेक खरिद प्रस्तावदेखि स्टकसम्म ट्र्याक गर्नुहोस्।" },
        { title: "रिकन्डिसनिङ", text: "हरेक सवारीको मर्मत काम र त्यसको लागत ट्र्याक गर्नुहोस्।" },
        { title: "स्टक व्यवस्थापन", text: "कुन सवारी स्टकमा, मर्मतमा वा बिक्री भयो, थाहा पाउनुहोस्।" },
        { title: "नाफा", text: "लागत र बिक्री मूल्य राखेपछि हरेक सवारीको नाफा हेर्नुहोस्।" },
      ],
    },
  ],
  faq: [
    { q: "निःशुल्क ट्रायल छ?", a: "छ। MotoCore Recon-Lite मा १५ दिनको निःशुल्क ट्रायल छ।" },
    { q: "Recon-Lite कसका लागि हो?", a: "पुराना सवारी किनेर, मर्मत गरेर पुनः बेच्ने डिलरका लागि।" },
  ],
  app: { name: "MotoCore Recon-Lite", os: "Web", category: "BusinessApplication" },
};

const interestEn: Cta = { label: "Register your interest", href: "#contact" };
const interestNe: Cta = { label: "रुचि दर्ता गर्नुहोस्", href: "#contact" };

const carEn: PageContent = {
  slug: "car-showroom-software",
  lang: "en",
  product: "MotoCore Car",
  soon: true,
  title: "Car Showroom Software in Nepal (Coming Soon) | MotoCore Car",
  description:
    "MotoCore Car brings MotoCore's dealer management to four-wheeler showrooms in Nepal. Coming soon: register your interest for early access.",
  eyebrow: "MotoCore Car · coming soon",
  h1: "Car showroom software for Nepal, coming soon",
  intro:
    "MotoCore Car brings the MotoCore approach to four-wheeler dealers, on the same platform as MotoCore Bike, Parts, Workshop and Recon-Lite. It is in development now. Register your interest and we will contact you when early access opens.",
  ctas: [interestEn, callEn],
  groups: [
    {
      heading: "Already available for car businesses",
      intro: "While MotoCore Car is being built, these MotoCore products already work for four-wheeler businesses:",
      items: [
        { title: "MotoCore Workshop", text: "Job cards, technician scheduling, labour and service tracking for car service centres, linked to parts stock." },
        { title: "MotoCore Parts", text: "Spare parts inventory and procurement across warehouses. Parts Pro adds barcode scanning and analytics." },
        { title: "MotoCore Recon-Lite", text: "Valuation, acquisition, reconditioning cost and profit for every used car you buy and sell." },
      ],
    },
  ],
  faq: [
    { q: "When will MotoCore Car launch?", a: "MotoCore Car is in development. Customers who register their interest hear about early access first." },
    { q: "Can I use MotoCore for my car workshop or parts business today?", a: "Yes. MotoCore Workshop, MotoCore Parts and MotoCore Recon-Lite are available now and work for four-wheeler businesses." },
  ],
  app: { name: "MotoCore Car", os: "Web", category: "BusinessApplication" },
};

const carNe: PageContent = {
  slug: "car-showroom-software",
  lang: "ne",
  product: "MotoCore Car",
  soon: true,
  title: "कार शोरूम सफ्टवेयर नेपाल (छिट्टै) | MotoCore Car",
  description: "MotoCore Car: नेपालका चारपाङ्ग्रे सवारी शोरूमका लागि डिलर व्यवस्थापन। छिट्टै आउँदैछ, प्रारम्भिक पहुँचका लागि रुचि दर्ता गर्नुहोस्।",
  eyebrow: "MotoCore Car · छिट्टै आउँदैछ",
  h1: "नेपालका लागि कार शोरूम सफ्टवेयर, छिट्टै",
  intro:
    "MotoCore Car ले MotoCore Bike, Parts, Workshop र Recon-Lite कै प्लेटफर्ममा चारपाङ्ग्रे सवारी डिलरलाई MotoCore ल्याउँछ। यो अहिले विकासमा छ। रुचि दर्ता गर्नुहोस्, प्रारम्भिक पहुँच खुल्दा हामी सम्पर्क गर्नेछौं।",
  ctas: [interestNe, callNe],
  groups: [
    {
      heading: "कार व्यवसायका लागि अहिले नै उपलब्ध",
      intro: "MotoCore Car तयार हुँदै गर्दा यी MotoCore उत्पादन चारपाङ्ग्रे व्यवसायमा अहिले नै चल्छन्:",
      items: [
        { title: "MotoCore Workshop", text: "कार सर्भिस सेन्टरका लागि जब कार्ड, प्राविधिक तालिका, श्रम र सर्भिस ट्र्याकिङ, पार्टपुर्जा स्टकसँग जोडिएको।" },
        { title: "MotoCore Parts", text: "धेरै गोदामको पार्टपुर्जा स्टक र खरिद। Parts Pro मा बारकोड र विश्लेषण थपिन्छ।" },
        { title: "MotoCore Recon-Lite", text: "किनबेच गर्ने हरेक पुरानो कारको मूल्याङ्कन, खरिद, मर्मत लागत र नाफा।" },
      ],
    },
  ],
  faq: [
    { q: "MotoCore Car कहिले सुरु हुन्छ?", a: "MotoCore Car विकासमा छ। रुचि दर्ता गर्ने ग्राहकले प्रारम्भिक पहुँचको जानकारी पहिले पाउँछन्।" },
    { q: "मेरो कार वर्कसप वा पार्टपुर्जा व्यवसायमा अहिले नै MotoCore चलाउन सकिन्छ?", a: "सकिन्छ। MotoCore Workshop, MotoCore Parts र MotoCore Recon-Lite अहिले उपलब्ध छन् र चारपाङ्ग्रे व्यवसायमा पनि चल्छन्।" },
  ],
  app: { name: "MotoCore Car", os: "Web", category: "BusinessApplication" },
};

export const PRODUCT_PAGES: PageContent[] = [bikeEn, partsEn, workshopEn, reconEn, carEn, bikeNe, partsNe, workshopNe, reconNe, carNe];

/** The MotoCore product line, in display order. */
export const PRODUCTS: { key: string; slug: string | null; name: string; soon?: boolean; tag: Record<Lang, string>; text: Record<Lang, string> }[] = [
  {
    key: "bike",
    slug: "bike-showroom-software",
    name: "MotoCore Bike",
    tag: { en: "Bike & EV showrooms", ne: "बाइक र EV शोरूम" },
    text: { en: "Inquiry to delivery for motorcycle, scooter and EV dealers, with namsari, collections and a mobile app.", ne: "मोटरसाइकल, स्कुटर र EV डिलरका लागि सोधपुछदेखि डेलिभरी, नामसारी, सङ्कलन र मोबाइल एप।" },
  },
  {
    key: "parts",
    slug: "spare-parts-inventory-software",
    name: "MotoCore Parts",
    tag: { en: "Lite and Pro", ne: "Lite र Pro" },
    text: { en: "Spare parts inventory and procurement across warehouses. Pro adds barcode scanning and analytics.", ne: "धेरै गोदामको पार्टपुर्जा स्टक र खरिद। Pro मा बारकोड र विश्लेषण थपिन्छ।" },
  },
  {
    key: "workshop",
    slug: "workshop-management-software",
    name: "MotoCore Workshop",
    tag: { en: "Service centres", ne: "सर्भिस सेन्टर" },
    text: { en: "Job cards, technician scheduling, labour and service tracking, linked to parts stock.", ne: "जब कार्ड, प्राविधिक तालिका, श्रम र सर्भिस ट्र्याकिङ, पार्टपुर्जा स्टकसँग जोडिएको।" },
  },
  {
    key: "recon",
    slug: "used-vehicle-reconditioning-software",
    name: "MotoCore Recon-Lite",
    tag: { en: "Used vehicles · 15-day trial", ne: "पुराना सवारी · १५ दिन ट्रायल" },
    text: { en: "Valuation, acquisition, reconditioning cost and profit per used vehicle.", ne: "पुराना सवारीको मूल्याङ्कन, खरिद, मर्मत लागत र प्रति सवारी नाफा।" },
  },
  {
    key: "car",
    slug: "car-showroom-software",
    name: "MotoCore Car",
    soon: true,
    tag: { en: "Coming soon", ne: "छिट्टै आउँदैछ" },
    text: { en: "Showroom management for four-wheeler dealers.", ne: "चारपाङ्ग्रे सवारी डिलरका लागि शोरूम व्यवस्थापन।" },
  },
];

/** Products with a page, in order (navbar, footer, related links). */
export const SOLUTION_SLUGS = PRODUCTS.filter((p) => p.slug).map((p) => p.slug as string);
export const SOLUTION_LABELS: Record<Lang, Record<string, string>> = {
  en: Object.fromEntries(PRODUCTS.filter((p) => p.slug).map((p) => [p.slug as string, p.name])),
  ne: Object.fromEntries(PRODUCTS.filter((p) => p.slug).map((p) => [p.slug as string, p.name])),
};

/** /products and /ne/products. */
/** Home page FAQ (rendered on / and published as FAQPage structured data). */
export const HOME_FAQ: { q: string; a: string }[] = [
  { q: "What is MotoCore?", a: "MotoCore is all-in-one automobile management software (an automobile ERP) built in Nepal. It covers showroom management with MotoCore Bike, spare parts inventory with MotoCore Parts, workshop management with MotoCore Workshop and used vehicle trading with MotoCore Recon-Lite, with MotoCore Car coming soon." },
  { q: "Which showroom management system is best for bike dealers in Nepal?", a: "Look for a system built around how Nepali showrooms work: inquiries and follow-ups, bookings with receipts, VIN-wise stock, namsari tracking, financier receivables, approved discounts and a mobile app. MotoCore Bike was built for exactly this flow. Book a free demo to see it with your own showroom in mind." },
  { q: "Do you have workshop management software for service centres?", a: "Yes. MotoCore Workshop handles job cards, inspection, diagnosis, estimates and customer approval, technicians and bays, parts requests and billing readiness, and it is linked to your spare parts stock." },
  { q: "What is the difference between MotoCore Parts Lite and Parts Pro?", a: "Parts Lite covers day-to-day spare parts inventory, purchasing and counter sales across warehouses. Parts Pro adds barcode scanning and analytics such as the Parts Pro dashboard and inventory intelligence." },
  { q: "Is MotoCore cloud-based?", a: "Yes. MotoCore runs in the browser, so there is nothing to install on your computers, and MotoCore Bike also has Android and iOS apps. Each business's data is kept separate." },
  { q: "Is MotoCore accounting or IRD billing software?", a: "MotoCore manages sales, stock, workshops, collections and receivables for automobile businesses. It is not a statutory accounting ledger or IRD-approved billing software, so keep using your accountant's system for the books and VAT returns." },
];

export const PRODUCTS_PAGE: Record<Lang, { title: string; description: string; eyebrow: string; h1: string; intro: string }> = {
  en: {
    title: "MotoCore Products | Automobile Management Software in Nepal",
    description: "MotoCore is one automobile management platform: MotoCore Bike, Parts (Lite and Pro), Workshop and Recon-Lite, with MotoCore Car coming soon.",
    eyebrow: "MotoCore products",
    h1: "One platform for every part of an automobile business",
    intro: "MotoCore covers showroom sales, spare parts, workshops and used vehicles. Use one product or several; they share the same customers, stock and reports.",
  },
  ne: {
    title: "MotoCore का उत्पादन | अटोमोबाइल व्यवस्थापन सफ्टवेयर नेपाल",
    description: "MotoCore एउटै अटोमोबाइल व्यवस्थापन प्लेटफर्म हो: MotoCore Bike, Parts (Lite र Pro), Workshop र Recon-Lite, MotoCore Car छिट्टै।",
    eyebrow: "MotoCore का उत्पादन",
    h1: "अटोमोबाइल व्यवसायका हरेक कामका लागि एउटै प्लेटफर्म",
    intro: "MotoCore ले शोरूम बिक्री, पार्टपुर्जा, वर्कसप र पुराना सवारी समेट्छ। एउटा वा धेरै उत्पादन प्रयोग गर्नुहोस्; सबैले एउटै ग्राहक, स्टक र रिपोर्ट साझा गर्छन्।",
  },
};

/** The Nepali home (/ne). */
export const NE_HOME = {
  title: "MotoCore ERP | नेपालको अटोमोबाइल व्यवस्थापन सफ्टवेयर",
  description: "बाइक शोरूम, पार्टपुर्जा, वर्कसप र पुराना सवारी व्यवसायका लागि नेपालमै बनेको सबै-एकै-ठाउँ अटोमोबाइल व्यवस्थापन प्लेटफर्म। निःशुल्क डेमो बुक गर्नुहोस्।",
  eyebrow: "सबै-एकै-ठाउँ अटोमोबाइल व्यवस्थापन",
  h1: "नेपालका अटोमोबाइल व्यवसायका लागि MotoCore ERP",
  intro: "MotoCore नेपालमै बनेको क्लाउड प्लेटफर्म हो — बाइक शोरूम, पार्टपुर्जा वितरक, वर्कसप र सर्भिस सेन्टर, र पुराना सवारी व्यवसायका लागि। बिक्री, स्टक, ग्राहक, भुक्तानी र रिपोर्ट एकै ठाउँमा।",
};
