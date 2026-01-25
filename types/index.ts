export interface Service {
  id: string;
  name: string;
  icon: string;
  href: string;
}

export interface UserBalance {
  id: number;
  user_id: number;
  balance: string; // decimal as string from API
  is_based: boolean;
  country_code: string; // 3-letter: "SGP", "USA"
  currency_code: string; // 3-letter: "SGD", "USD"
  created_at: string;
  updated_at: string;
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

// API response type for announcement
export interface AnnouncementApi {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  author_id: number | null;
  author?: {
    id: number;
    name: string;
    email: string;
  };
  tabs: AnnouncementTab[] | null;
  published_at: string;
  created_at: string;
  updated_at: string;
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
export interface UserEntity {
  id: number;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  nationality: string | null;
  phone_number: string | null;
  phone_dial_code: string | null;
}

export interface UserRole {
  name: string;
}

export interface User {
  id: number;
  name?: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  phone_dial_code: string | null;
  entity_id: number | null;
  entity?: UserEntity;
  roles: UserRole[];
  balances?: UserBalance[];
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
export interface Receipt {
  id: number;
  client_filename: string;
  mime_type: string;
  size: number;
  url: string | null;
  created_at: string;
}

export interface Payment {
  id: number;
  user_id: number;
  amount: string;
  currency: string;
  status: "open" | "pending" | "paid" | "confirmed" | "cancelled";
  payment_method: string;
  reference_number: string | null;
  notes: string | null;
  paid_at: string | null;
  confirmed_at: string | null;
  due_at: string | null;
  receipts: Receipt[];
  created_at: string;
  updated_at: string;
}

// Pagination types
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: PaginationMeta;
}

// File types
export interface UserFile {
  id: number;
  client_filename: string;
  mime_type: string;
  size: number;
  expires_at: string | null;
  is_persistent: boolean;
  url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserFilesResponse {
  files: UserFile[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface UserFileDetailResponse {
  file: UserFile & {
    drive: string;
    path: string;
    hash: string | null;
    user_id: number;
  };
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
