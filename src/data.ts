import { FeatureItem } from "./types";

export const MOTOC_FEATURES: FeatureItem[] = [
  {
    id: "dealership",
    icon: "CarFront",
    title: "Vehicle Dealership",
    description: "Inventory management, financing, CRM, bookings, deliveries and sales performance.",
  },
  {
    id: "used-vehicle",
    icon: "History",
    title: "Used Vehicle Management",
    description: "Valuation, acquisition tracking, stock management, reconditioning and profitability analysis.",
  },
  {
    id: "inventory",
    icon: "Boxes",
    title: "Inventory & Parts",
    description: "Multi-warehouse inventory, stock tracking, reorder levels and procurement visibility.",
  },
  {
    id: "workshop",
    icon: "Wrench",
    title: "Workshop Management",
    description: "Job cards, technician scheduling, labor management and service tracking.",
  },
  {
    id: "crm",
    icon: "Users",
    title: "CRM & Customers",
    description: "Lead lifecycle management, customer history, follow-up automation and loyalty management.",
  },
  {
    id: "procurement",
    icon: "ShoppingCart",
    title: "Procurement Management",
    description: "Purchase requests, purchase orders, vendor management and GRN processing.",
  },
  {
    id: "finance",
    icon: "TrendingUp",
    title: "Finance & KPIs",
    description: "Real-time dashboards, profitability analysis, business intelligence and management reporting.",
  },
  {
    id: "multi-branch",
    icon: "Network",
    title: "Multi-Branch Operations",
    description: "Centralized control of multiple dealerships, workshops and warehouses.",
  }
];

export const TRUSTED_SECTORS = [
  { label: "New Vehicle Dealerships", icon: "CarFront" },
  { label: "Used Vehicle Dealerships", icon: "History" },
  { label: "Workshops", icon: "Wrench" },
  { label: "Service Centers", icon: "Activity" },
  { label: "Parts Distributors", icon: "Boxes" },
  { label: "Automotive Enterprises", icon: "Building2" },
];

export const INDUSTRY_BENEFITS = [
  "Dealership Sales Automation",
  "Precise Used Vehicle Valuation",
  "Workshop Productivity Management",
  "Inventory & Parts Visibility",
  "Multi-Branch Management",
  "Real-Time Analytics",
  "Cloud-Based Operations"
];

export const FOOTER_FEATURES = [
  { text: "Cloud Based Architecture", icon: "Cloud" },
  { text: "Secure & Reliable Platform", icon: "ShieldAlert" },
  { text: "Real-Time Analytics", icon: "BarChart3" },
  { text: "Scalable Enterprise Solution", icon: "Zap" }
];
