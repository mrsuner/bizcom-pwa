export interface Service {
  id: string;
  name: string;
  icon: string;
  href: string;
}

export interface UserBalance {
  companyName: string;
  isPremium: boolean;
  bizCoins: number;
}

export interface Announcement {
  id: string;
  title: string;
  description?: string;
  date: string;
  href: string;
}

export interface AnnouncementTab {
  id: string;
  label: string;
  content: string;
}

export interface AnnouncementDetail {
  id: string;
  title: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedDate: string;
  tabs: AnnouncementTab[];
}

export interface NavItem {
  href: string;
  icon: string;
  label: string;
  isFab?: boolean;
}

// Auth types
export interface SignInCredentials {
  email: string;
  password?: string;
  otp?: string;
}

export interface RegistrationData {
  email: string;
  password?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: "male" | "female" | "other";
  nationality: string;
  phoneDialCode: string;
  phoneNumber: string;
}

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

// Topup types
export interface TopupReceipt {
  file: File | null;
  amount: number;
  reference?: string;
  notes?: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

// Profile types
export interface ProfileMenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface SystemNotification {
  id: string;
  type: "warning" | "info" | "success";
  message: string;
  action?: {
    label: string;
    href: string;
  };
}

// Company types
export interface Company {
  id: string;
  company_name: string;
  service_slug: string;
  service_name: string;
  status: "ongoing" | "completed";
  created_at: string;
}

// Payment types
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: "open" | "pending" | "paid" | "confirmed" | "cancelled";
  payment_method: string;
  reference_number: string;
  notes?: string;
  paid_at?: string;
  confirmed_at?: string;
  due_at?: string;
  created_at: string;
}

// File types
export interface UserFile {
  id: string;
  client_filename: string;
  mime_type: string;
  size: number;
  expires_at?: string;
  is_persistent: boolean;
  created_at: string;
}

// Balance types
export interface BalanceAudit {
  id: string;
  amount: number;
  type: "credit" | "debit";
  description?: string;
  created_at: string;
}

// User Profile types
export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  phone_dial_code: string;
  gender?: string;
  date_of_birth?: string;
  nationality?: string;
  nric?: string;
  passport?: string;
  passport_exp_date?: string;
  address_line_1?: string;
  address_line_2?: string;
  address_line_3?: string;
}

// FAQ types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
