// Search-landing page content (English and Nepali). Every claim here describes a live MotoCore feature; MotoCore is
// finance & collections management, not statutory accounting (no journals / trial balance / IRD billing), so pages
// never call it accounting software.

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

export interface PageContent {
  slug: string; // "" for the Nepali hub (/ne/)
  lang: Lang;
  title: string; // <title>, under ~60 characters
  description: string; // meta description, under ~160 characters
  eyebrow: string;
  h1: string;
  intro: string;
  ctas: Cta[];
  groups: FeatureGroup[];
  steps?: { heading: string; items: string[] };
  faq: { q: string; a: string }[];
  app: { name: string; os: string; category: string };
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
};

const demoEn: Cta = { label: "Book a free demo", href: "#contact" };
const demoNe: Cta = { label: "निःशुल्क डेमो बुक गर्नुहोस्", href: "#contact" };
const trialEn: Cta = { label: "Start free trial", href: SITE.register, external: true };
const trialNe: Cta = { label: "निःशुल्क ट्रायल सुरु गर्नुहोस्", href: SITE.register, external: true };
const callEn: Cta = { label: "Call +977 9863473651", href: SITE.phoneHref };
const callNe: Cta = { label: "फोन: +९७७ ९८६३४७३६५१", href: SITE.phoneHref };

const bikeEn: PageContent = {
  slug: "bike-showroom-software",
  lang: "en",
  title: "Bike Showroom Software in Nepal | MotoCore Bike Showroom",
  description:
    "Bike showroom management software for motorcycle, scooter and EV dealers in Nepal: inquiries, bookings, VIN stock, delivery, namsari, collections and refunds.",
  eyebrow: "Two-wheeler dealer management software",
  h1: "Bike showroom software for motorcycle, scooter and EV dealers",
  intro:
    "MotoCore Bike Showroom runs a two-wheeler dealership from the first walk-in to the bill book: inquiries and follow-ups, bookings and receipts, VIN-wise stock, allocation, sale documents, challan and delivery, namsari tracking, collections and refunds. It is built for showrooms in Nepal, with NPR amounts, Nepali fiscal years and a mobile app for your sales team.",
  ctas: [demoEn, callEn],
  groups: [
    {
      heading: "From inquiry to delivery in one flow",
      items: [
        { title: "Inquiries and follow-ups", text: "Walk-in and phone inquiries with hot / warm / cold temperature, daily follow-up lists, overdue reminders and lost-inquiry revival." },
        { title: "One customer, one record", text: "Customers are found by phone number before anything is created, so the same buyer is never entered twice." },
        { title: "Bookings with receipts", text: "Book a model, variant and colour with an advance; every receipt is numbered and protected against double entry." },
        { title: "VIN-wise stock and allocation", text: "Purchases are posted with VIN and engine numbers; the Allocation Center offers only matching stock for each booking." },
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
    heading: "How a sale moves through MotoCore",
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
    { q: "Which dealers is MotoCore Bike Showroom for?", a: "Motorcycle, scooter and electric two-wheeler showrooms and sub-dealers in Nepal, from a single outlet to several branches." },
    { q: "Does it work on mobile phones?", a: "Yes. The web app works on any device, and there are Android and iOS apps for sales staff, with push notifications." },
    { q: "Is it accounting software?", a: "No. MotoCore manages your showroom's finances and collections: receipts, receivables, refunds, claims and deal profitability. It does not replace your accounting or IRD billing software." },
    { q: "Can I see it before buying?", a: "Yes. Book a free demo and we will walk you through the full inquiry-to-delivery flow with your own models." },
  ],
  app: { name: "MotoCore Bike Showroom", os: "Web, Android, iOS", category: "BusinessApplication" },
};

const bikeNe: PageContent = {
  slug: "bike-showroom-software",
  lang: "ne",
  title: "बाइक शोरूम सफ्टवेयर नेपाल | MotoCore Bike Showroom",
  description:
    "नेपालका मोटरसाइकल, स्कुटर र इलेक्ट्रिक सवारी डिलरका लागि बाइक शोरूम व्यवस्थापन सफ्टवेयर: सोधपुछ, बुकिङ, VIN स्टक, डेलिभरी, नामसारी र भुक्तानी।",
  eyebrow: "दुईपाङ्ग्रे सवारी डिलर व्यवस्थापन सफ्टवेयर",
  h1: "मोटरसाइकल, स्कुटर र इलेक्ट्रिक सवारी डिलरका लागि बाइक शोरूम सफ्टवेयर",
  intro:
    "MotoCore Bike Showroom ले ग्राहक शोरूममा आएदेखि बिलबुक हस्तान्तरणसम्मको सम्पूर्ण काम एउटै प्रणालीमा चलाउँछ: सोधपुछ र फलोअप, बुकिङ र रसिद, VIN अनुसारको स्टक, एलोकेसन, बिक्री कागजात, चलान र डेलिभरी, नामसारी ट्र्याकिङ, भुक्तानी सङ्कलन र फिर्ता। नेपालका शोरूमका लागि बनाइएको — रुपैयाँमा रकम, नेपाली आर्थिक वर्ष र बिक्री टोलीका लागि मोबाइल एप।",
  ctas: [demoNe, callNe],
  groups: [
    {
      heading: "सोधपुछदेखि डेलिभरीसम्म एउटै प्रवाह",
      items: [
        { title: "सोधपुछ र फलोअप", text: "शोरूम र फोनबाट आएका सोधपुछ, हट / वार्म / कोल्ड वर्गीकरण, दैनिक फलोअप सूची र छुटेका फलोअपको सम्झना।" },
        { title: "एक ग्राहक, एक रेकर्ड", text: "नयाँ ग्राहक बनाउनुअघि फोन नम्बरबाट खोजिन्छ, त्यसैले एउटै ग्राहक दुई पटक दर्ता हुँदैन।" },
        { title: "रसिदसहित बुकिङ", text: "मोडेल, भेरियन्ट र रङ छानेर अग्रिम भुक्तानीसहित बुकिङ; हरेक रसिद नम्बरसहित र दोहोरो प्रविष्टिबाट सुरक्षित।" },
        { title: "VIN अनुसार स्टक र एलोकेसन", text: "खरिद VIN र इन्जिन नम्बरसहित दर्ता हुन्छ; एलोकेसन सेन्टरले हरेक बुकिङका लागि मिल्दो स्टक मात्र देखाउँछ।" },
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
    heading: "MotoCore मा बिक्री कसरी अघि बढ्छ",
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
    { q: "MotoCore Bike Showroom कुन डिलरका लागि हो?", a: "नेपालका मोटरसाइकल, स्कुटर र इलेक्ट्रिक दुईपाङ्ग्रे सवारीका शोरूम र सब-डिलर — एउटा पसलदेखि धेरै शाखासम्म।" },
    { q: "मोबाइलमा चल्छ?", a: "चल्छ। वेब एप जुनसुकै उपकरणमा चल्छ, र बिक्री टोलीका लागि पुस नोटिफिकेसनसहित एन्ड्रोइड र आईओएस एप छन्।" },
    { q: "यो लेखा (एकाउन्टिङ) सफ्टवेयर हो?", a: "होइन। MotoCore ले शोरूमको वित्त र भुक्तानी सङ्कलन व्यवस्थापन गर्छ: रसिद, बाँकी रकम, फिर्ता, क्लेम र बिक्री नाफा। यसले तपाईंको लेखा वा IRD बिलिङ सफ्टवेयरको ठाउँ लिँदैन।" },
    { q: "किन्नुअघि हेर्न पाइन्छ?", a: "पाइन्छ। निःशुल्क डेमो बुक गर्नुहोस्, हामी तपाईंकै मोडेलसहित सोधपुछदेखि डेलिभरीसम्मको पूरा प्रक्रिया देखाउँछौं।" },
  ],
  app: { name: "MotoCore Bike Showroom", os: "Web, Android, iOS", category: "BusinessApplication" },
};

const dealerEn: PageContent = {
  slug: "automotive-dealership-erp",
  lang: "en",
  title: "Automotive Dealership ERP for Nepal | MotoCore ERP",
  description:
    "Dealership management ERP for new and used vehicle dealers: sales, inventory, financing, CRM, bookings, deliveries, workshop, parts and multi-branch reporting.",
  eyebrow: "Dealer management system",
  h1: "Automotive dealership ERP for new and used vehicle dealers",
  intro:
    "MotoCore ERP brings a dealership's sales, inventory, customers, workshop, spare parts and reporting into one cloud platform. Owners see every branch in real time, and each team works in the module built for its job.",
  ctas: [trialEn, demoEn],
  groups: [
    {
      heading: "What MotoCore ERP covers",
      items: [
        { title: "Dealership sales", text: "Inventory, financing, CRM, bookings, deliveries and sales performance for new vehicle dealerships." },
        { title: "Used vehicle management", text: "Valuation, acquisition tracking, stock management, reconditioning and profitability analysis." },
        { title: "Workshop and service", text: "Job cards, technician scheduling, labour management and service tracking." },
        { title: "Spare parts inventory", text: "Multi-warehouse inventory, stock tracking, reorder levels and procurement visibility." },
        { title: "Procurement", text: "Purchase requests, purchase orders, vendor management and goods received notes (GRN)." },
        { title: "CRM", text: "Lead lifecycle, customer history, follow-up automation and loyalty management." },
        { title: "Reports and dashboards", text: "Real-time dashboards, profitability analysis and management reporting." },
        { title: "Multi-branch operations", text: "Central control of several dealerships, workshops and warehouses." },
      ],
    },
  ],
  faq: [
    { q: "Who is MotoCore ERP for?", a: "New and used vehicle dealerships, workshops and service centres, spare parts distributors and automotive groups with several branches." },
    { q: "Is MotoCore cloud-based?", a: "Yes. It runs in the browser, so every branch works on the same live data without installing servers." },
    { q: "Does MotoCore include accounting?", a: "MotoCore handles operational finance such as receivables, payments and profitability. Statutory accounting and IRD billing stay in your accounting software." },
  ],
  app: { name: "MotoCore ERP", os: "Web", category: "BusinessApplication" },
};

const dealerNe: PageContent = {
  slug: "automotive-dealership-erp",
  lang: "ne",
  title: "अटोमोबाइल डिलरसिप ERP नेपाल | MotoCore ERP",
  description:
    "नयाँ र पुराना सवारी डिलरका लागि डिलरसिप व्यवस्थापन ERP: बिक्री, स्टक, फाइनान्स, CRM, बुकिङ, डेलिभरी, वर्कसप, पार्टपुर्जा र शाखागत रिपोर्ट।",
  eyebrow: "डिलर व्यवस्थापन प्रणाली",
  h1: "नयाँ र पुराना सवारी डिलरका लागि अटोमोबाइल डिलरसिप ERP",
  intro:
    "MotoCore ERP ले डिलरसिपको बिक्री, स्टक, ग्राहक, वर्कसप, पार्टपुर्जा र रिपोर्ट एउटै क्लाउड प्लेटफर्ममा ल्याउँछ। सञ्चालकले हरेक शाखा तुरुन्तै हेर्न सक्छन्, र हरेक टोलीले आफ्नो कामका लागि बनेको मोड्युलमा काम गर्छ।",
  ctas: [trialNe, demoNe],
  groups: [
    {
      heading: "MotoCore ERP मा के-के समेटिन्छ",
      items: [
        { title: "डिलरसिप बिक्री", text: "नयाँ सवारी डिलरका लागि स्टक, फाइनान्स, CRM, बुकिङ, डेलिभरी र बिक्री प्रदर्शन।" },
        { title: "पुरानो सवारी व्यवस्थापन", text: "मूल्याङ्कन, खरिद ट्र्याकिङ, स्टक व्यवस्थापन, मर्मत (रिकन्डिसनिङ) र नाफा विश्लेषण।" },
        { title: "वर्कसप र सर्भिस", text: "जब कार्ड, प्राविधिक तालिका, श्रम व्यवस्थापन र सर्भिस ट्र्याकिङ।" },
        { title: "पार्टपुर्जा स्टक", text: "धेरै गोदामको स्टक, मौज्दात ट्र्याकिङ, पुनः अर्डर तह र खरिदको स्पष्ट जानकारी।" },
        { title: "खरिद", text: "खरिद माग, खरिद आदेश, आपूर्तिकर्ता व्यवस्थापन र सामान प्राप्ति (GRN)।" },
        { title: "CRM", text: "लिडको पूरा जीवनचक्र, ग्राहक इतिहास, स्वचालित फलोअप र लोयल्टी व्यवस्थापन।" },
        { title: "रिपोर्ट र ड्यासबोर्ड", text: "तत्काल ड्यासबोर्ड, नाफा विश्लेषण र व्यवस्थापन रिपोर्ट।" },
        { title: "धेरै शाखा सञ्चालन", text: "धेरै डिलरसिप, वर्कसप र गोदामको केन्द्रीय नियन्त्रण।" },
      ],
    },
  ],
  faq: [
    { q: "MotoCore ERP कसका लागि हो?", a: "नयाँ र पुराना सवारी डिलर, वर्कसप र सर्भिस सेन्टर, पार्टपुर्जा वितरक र धेरै शाखा भएका अटोमोबाइल समूहका लागि।" },
    { q: "MotoCore क्लाउडमा चल्छ?", a: "चल्छ। ब्राउजरमै चल्ने भएकाले सर्भर जडान नगरी सबै शाखाले एउटै ताजा डाटामा काम गर्छन्।" },
    { q: "MotoCore मा लेखा (एकाउन्टिङ) समावेश छ?", a: "MotoCore ले बाँकी रकम, भुक्तानी र नाफा जस्ता सञ्चालन वित्त व्यवस्थापन गर्छ। कानुनी लेखा र IRD बिलिङ तपाईंको लेखा सफ्टवेयरमै रहन्छ।" },
  ],
  app: { name: "MotoCore ERP", os: "Web", category: "BusinessApplication" },
};

const workshopEn: PageContent = {
  slug: "workshop-management-software",
  lang: "en",
  title: "Workshop & Service Center Software in Nepal | MotoCore",
  description:
    "Workshop management software for vehicle service centres: job cards, technician scheduling, labour management and service tracking, linked to parts inventory.",
  eyebrow: "Workshop and service management",
  h1: "Workshop management software for vehicle service centres",
  intro:
    "Run your workshop on job cards instead of paper. MotoCore tracks every vehicle from arrival to handover, schedules technicians, records labour and shows the status of every service, while parts are drawn from the same inventory your stores team manages.",
  ctas: [trialEn, demoEn],
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
    { q: "Does it connect to spare parts?", a: "Yes. The workshop uses the same parts inventory, with stock tracking and reorder levels." },
  ],
  app: { name: "MotoCore Workshop", os: "Web", category: "BusinessApplication" },
};

const workshopNe: PageContent = {
  slug: "workshop-management-software",
  lang: "ne",
  title: "वर्कसप र सर्भिस सेन्टर सफ्टवेयर नेपाल | MotoCore",
  description:
    "सवारी सर्भिस सेन्टरका लागि वर्कसप व्यवस्थापन सफ्टवेयर: जब कार्ड, प्राविधिक तालिका, श्रम व्यवस्थापन र सर्भिस ट्र्याकिङ, पार्टपुर्जा स्टकसँग जोडिएको।",
  eyebrow: "वर्कसप र सर्भिस व्यवस्थापन",
  h1: "सवारी सर्भिस सेन्टरका लागि वर्कसप व्यवस्थापन सफ्टवेयर",
  intro:
    "कागजको सट्टा जब कार्डमा वर्कसप चलाउनुहोस्। MotoCore ले हरेक सवारी आएदेखि हस्तान्तरणसम्म ट्र्याक गर्छ, प्राविधिकको तालिका बनाउँछ, श्रम रेकर्ड गर्छ र हरेक सर्भिसको अवस्था देखाउँछ; पार्टपुर्जा भने स्टोर टोलीले व्यवस्थापन गर्ने उही स्टकबाट जान्छ।",
  ctas: [trialNe, demoNe],
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
    { q: "पार्टपुर्जासँग जोडिन्छ?", a: "जोडिन्छ। वर्कसपले मौज्दात ट्र्याकिङ र पुनः अर्डर तहसहितको उही पार्टपुर्जा स्टक प्रयोग गर्छ।" },
  ],
  app: { name: "MotoCore Workshop", os: "Web", category: "BusinessApplication" },
};

const partsEn: PageContent = {
  slug: "spare-parts-inventory-software",
  lang: "en",
  title: "Spare Parts Inventory Software in Nepal | MotoCore",
  description:
    "Spare parts inventory and procurement software for automotive parts distributors and dealers: multi-warehouse stock, reorder levels, purchase orders and GRN.",
  eyebrow: "Parts inventory and procurement",
  h1: "Spare parts inventory software for automotive dealers and distributors",
  intro:
    "Know what is in every warehouse and what needs reordering. MotoCore tracks spare parts stock across locations, flags items below their reorder level and runs procurement from purchase request to goods received.",
  ctas: [trialEn, demoEn],
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
    { q: "Who is it for?", a: "Spare parts distributors, dealership parts counters and workshops that hold their own stock." },
    { q: "Can several branches share stock visibility?", a: "Yes. Inventory is tracked per warehouse with central visibility for management." },
  ],
  app: { name: "MotoCore Parts", os: "Web", category: "BusinessApplication" },
};

const partsNe: PageContent = {
  slug: "spare-parts-inventory-software",
  lang: "ne",
  title: "पार्टपुर्जा स्टक व्यवस्थापन सफ्टवेयर नेपाल | MotoCore",
  description:
    "अटोमोबाइल पार्टपुर्जा वितरक र डिलरका लागि स्टक र खरिद सफ्टवेयर: धेरै गोदामको मौज्दात, पुनः अर्डर तह, खरिद आदेश र GRN।",
  eyebrow: "पार्टपुर्जा स्टक र खरिद",
  h1: "अटोमोबाइल डिलर र वितरकका लागि पार्टपुर्जा स्टक सफ्टवेयर",
  intro:
    "कुन गोदाममा के छ र के पुनः अर्डर गर्नुपर्छ, तुरुन्तै थाहा पाउनुहोस्। MotoCore ले सबै स्थानको पार्टपुर्जा मौज्दात ट्र्याक गर्छ, पुनः अर्डर तहभन्दा कम भएका सामान देखाउँछ र खरिद मागदेखि सामान प्राप्तिसम्मको खरिद प्रक्रिया चलाउँछ।",
  ctas: [trialNe, demoNe],
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
    { q: "यो कसका लागि हो?", a: "पार्टपुर्जा वितरक, डिलरसिपका पार्ट काउन्टर र आफ्नै स्टक राख्ने वर्कसप।" },
    { q: "धेरै शाखाको स्टक एकै ठाउँमा देखिन्छ?", a: "देखिन्छ। हरेक गोदामको स्टक छुट्टै ट्र्याक हुन्छ र व्यवस्थापनले केन्द्रबाट हेर्न सक्छ।" },
  ],
  app: { name: "MotoCore Parts", os: "Web", category: "BusinessApplication" },
};

const usedEn: PageContent = {
  slug: "used-vehicle-reconditioning-software",
  lang: "en",
  title: "Used Vehicle & Reconditioning Software | MotoCore Recon Lite",
  description:
    "Used vehicle dealer software: valuation, acquisition tracking, reconditioning, stock management and profit per vehicle. MotoCore Recon Lite, 15-day free trial.",
  eyebrow: "MotoCore Recon Lite",
  h1: "Used vehicle and reconditioning software for pre-owned dealers",
  intro:
    "Buy right, recondition on budget and know your profit on every vehicle. MotoCore Recon Lite tracks each used vehicle from valuation and acquisition through reconditioning to sale.",
  ctas: [trialEn, demoEn],
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
    { q: "Is there a free trial?", a: "Yes. MotoCore Recon Lite comes with a 15-day free trial." },
    { q: "Who is Recon Lite for?", a: "Used vehicle and recondition dealers who buy, refurbish and resell vehicles." },
  ],
  app: { name: "MotoCore Recon Lite", os: "Web", category: "BusinessApplication" },
};

const usedNe: PageContent = {
  slug: "used-vehicle-reconditioning-software",
  lang: "ne",
  title: "पुरानो सवारी र रिकन्डिसन सफ्टवेयर | MotoCore Recon Lite",
  description:
    "पुरानो सवारी डिलरका लागि सफ्टवेयर: मूल्याङ्कन, खरिद ट्र्याकिङ, रिकन्डिसनिङ, स्टक व्यवस्थापन र प्रति सवारी नाफा। MotoCore Recon Lite, १५ दिन निःशुल्क ट्रायल।",
  eyebrow: "MotoCore Recon Lite",
  h1: "पुरानो सवारी डिलरका लागि रिकन्डिसन सफ्टवेयर",
  intro:
    "सही मूल्यमा किन्नुहोस्, बजेटमै मर्मत गर्नुहोस् र हरेक सवारीको नाफा थाहा पाउनुहोस्। MotoCore Recon Lite ले हरेक पुरानो सवारी मूल्याङ्कन र खरिददेखि रिकन्डिसनिङ हुँदै बिक्रीसम्म ट्र्याक गर्छ।",
  ctas: [trialNe, demoNe],
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
    { q: "निःशुल्क ट्रायल छ?", a: "छ। MotoCore Recon Lite मा १५ दिनको निःशुल्क ट्रायल छ।" },
    { q: "Recon Lite कसका लागि हो?", a: "पुराना सवारी किनेर, मर्मत गरेर पुनः बेच्ने डिलरका लागि।" },
  ],
  app: { name: "MotoCore Recon Lite", os: "Web", category: "BusinessApplication" },
};

const hubNe: PageContent = {
  slug: "",
  lang: "ne",
  title: "MotoCore ERP | नेपालको अटोमोबाइल व्यवसाय सफ्टवेयर",
  description:
    "बाइक शोरूम, सवारी डिलर, वर्कसप, पार्टपुर्जा र पुरानो सवारी व्यवसायका लागि नेपालमै बनेको क्लाउड ERP। निःशुल्क डेमो बुक गर्नुहोस्।",
  eyebrow: "अटोमोबाइल व्यवसाय व्यवस्थापन",
  h1: "नेपालका अटोमोबाइल व्यवसायका लागि MotoCore ERP",
  intro:
    "MotoCore ERP नेपालमै बनेको क्लाउड प्लेटफर्म हो — बाइक शोरूम, सवारी डिलरसिप, वर्कसप र सर्भिस सेन्टर, पार्टपुर्जा वितरक र पुराना सवारी व्यवसायका लागि। बिक्री, स्टक, ग्राहक, भुक्तानी र रिपोर्ट एकै ठाउँमा।",
  ctas: [demoNe, trialNe],
  groups: [
    {
      heading: "हाम्रा समाधान",
      items: [
        { title: "बाइक शोरूम सफ्टवेयर", text: "मोटरसाइकल, स्कुटर र इलेक्ट्रिक सवारी डिलरका लागि सोधपुछदेखि नामसारीसम्म।" },
        { title: "अटोमोबाइल डिलरसिप ERP", text: "नयाँ र पुराना सवारी डिलरका लागि बिक्री, स्टक, फाइनान्स र धेरै शाखा।" },
        { title: "वर्कसप व्यवस्थापन", text: "जब कार्ड, प्राविधिक तालिका र सर्भिस ट्र्याकिङ।" },
        { title: "पार्टपुर्जा स्टक", text: "धेरै गोदामको मौज्दात, पुनः अर्डर तह र खरिद।" },
        { title: "पुरानो सवारी (Recon Lite)", text: "मूल्याङ्कन, रिकन्डिसनिङ र प्रति सवारी नाफा।" },
      ],
    },
  ],
  faq: [
    { q: "MotoCore ERP कहाँको हो?", a: "MotoCore ERP Code One Nepal Pvt. Ltd. (सानेपा, ललितपुर) ले नेपालका व्यवसायका लागि बनाएको हो।" },
    { q: "डेमो कसरी हेर्ने?", a: "तलको फारम भर्नुहोस् वा +९७७ ९८६३४७३६५१ मा फोन गर्नुहोस्।" },
  ],
  app: { name: "MotoCore ERP", os: "Web", category: "BusinessApplication" },
};

export const PRODUCT_PAGES: PageContent[] = [bikeEn, dealerEn, workshopEn, partsEn, usedEn, bikeNe, dealerNe, workshopNe, partsNe, usedNe, hubNe];

/** Order and labels for the "Solutions" links in the navbar, footer and related-pages block. */
export const SOLUTION_SLUGS = [
  "bike-showroom-software",
  "automotive-dealership-erp",
  "workshop-management-software",
  "spare-parts-inventory-software",
  "used-vehicle-reconditioning-software",
] as const;

export const SOLUTION_LABELS: Record<Lang, Record<string, string>> = {
  en: {
    "bike-showroom-software": "Bike Showroom Software",
    "automotive-dealership-erp": "Dealership ERP",
    "workshop-management-software": "Workshop Management",
    "spare-parts-inventory-software": "Spare Parts Inventory",
    "used-vehicle-reconditioning-software": "Used Vehicles (Recon Lite)",
  },
  ne: {
    "bike-showroom-software": "बाइक शोरूम सफ्टवेयर",
    "automotive-dealership-erp": "डिलरसिप ERP",
    "workshop-management-software": "वर्कसप व्यवस्थापन",
    "spare-parts-inventory-software": "पार्टपुर्जा स्टक",
    "used-vehicle-reconditioning-software": "पुरानो सवारी (Recon Lite)",
  },
};
