export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface EarlyAccessSubmission {
  email: string;
  timestamp: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  companySize?: string;
  businessType?: string;
  message?: string;
}

export interface CountdownState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}
