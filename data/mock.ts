import type {
  Service,
  UserBalance,
  Announcement,
  NavItem,
  AnnouncementDetail,
  User,
  ProfileMenuItem,
  SystemNotification,
  Company,
  Payment,
  UserFile,
  BalanceAudit,
  UserProfile,
  FAQ,
} from "@/types";

export const services: Service[] = [
    { id: "1", name: "HR", icon: "Users", href: "/services/hr" },
    { id: "2", name: "LMS", icon: "BookOpen", href: "/services/lms" },
    { id: "3", name: "Marketing", icon: "Megaphone", href: "/services/marketing" },
    { id: "4", name: "Data", icon: "BarChart3", href: "/services/data" },
    { id: "5", name: "Incorporation", icon: "Building2", href: "/services/incorporation" },
    { id: "6", name: "Sales", icon: "TrendingUp", href: "/services/sales" },
    { id: "7", name: "Compliance", icon: "ShieldCheck", href: "/services/compliance" },
    { id: "8", name: "CSR", icon: "Heart", href: "/services/csr" },
    { id: "9", name: "Finance", icon: "DollarSign", href: "/services/finance" },
];

export const mockBalances: UserBalance[] = [
  {
    id: 1,
    user_id: 1,
    balance: "12450.00",
    is_based: true,
    country_code: "SGP",
    currency_code: "SGD",
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: "2026-01-19T00:00:00.000Z",
  },
  {
    id: 2,
    user_id: 1,
    balance: "500.00",
    is_based: false,
    country_code: "USA",
    currency_code: "USD",
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: "2026-01-19T00:00:00.000Z",
  },
  {
    id: 3,
    user_id: 1,
    balance: "250.00",
    is_based: false,
    country_code: "GBR",
    currency_code: "GBP",
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: "2026-01-19T00:00:00.000Z",
  },
];

// For backward compatibility
export const userBalance = mockBalances[0];

export const announcement: Announcement = {
  id: "1",
  title: "新马载送服务",
  description: "是足轩会员专属「扣扣扣」",
  date: "20/09/2025",
  href: "/announcements/promo",
};

export const navItems: NavItem[] = [
  { href: "/", icon: "Home", label: "Home" },
  { href: "/about", icon: "Info", label: "About" },
  { href: "/services", icon: "MousePointerClick", label: "Services", isFab: true },
  { href: "/voucher", icon: "Gift", label: "Voucher" },
  { href: "/profile", icon: "User", label: "Profile" },
];

export const announcementDetails: Record<string, AnnouncementDetail> = {
  promo: {
    id: "promo",
    title: "新马载送服务",
    coverImage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop",
    author: {
      name: "BizCom Team",
    },
    publishedDate: "2025-09-20",
    tabs: [
      {
        id: "details",
        label: "Details",
        content: `
          <h3>Cross-Border Transport Service</h3>
          <p>Exclusive for BizCom members! Enjoy our premium Singapore-Malaysia transport service with special discounts.</p>
          <ul>
            <li>Door-to-door pickup and drop-off</li>
            <li>Comfortable vehicles with WiFi</li>
            <li>Professional drivers</li>
            <li>24/7 customer support</li>
          </ul>
          <p><strong>Limited time offer:</strong> Use code BIZCOM2025 for 20% off your first booking!</p>
        `,
      },
      {
        id: "terms",
        label: "Terms",
        content: `
          <h3>Terms & Conditions</h3>
          <ol>
            <li>Offer valid until December 31, 2025</li>
            <li>Discount code can only be used once per account</li>
            <li>Cancellations must be made 24 hours in advance</li>
            <li>BizCom reserves the right to modify or terminate this offer</li>
            <li>Not combinable with other promotions</li>
          </ol>
        `,
      },
      {
        id: "contact",
        label: "Contact",
        content: `
          <h3>Get in Touch</h3>
          <p>Have questions about this promotion? Contact us:</p>
          <p><strong>Email:</strong> transport@bizcom.sg</p>
          <p><strong>Phone:</strong> +65 6789 1234</p>
          <p><strong>WhatsApp:</strong> +65 9123 4567</p>
          <p>Operating hours: Mon-Fri, 9am - 6pm SGT</p>
        `,
      },
    ],
  },
};

export const mockUser: User = {
  id: 1,
  email: "john@example.com",
  first_name: "John",
  last_name: "Doe",
  phone_number: "91234567",
  phone_dial_code: "+65",
  entity_id: null,
  roles: [],
};

export const profileMenuItems: ProfileMenuItem[] = [
  { id: "profile", label: "Profile", icon: "User", href: "/profile/edit" },
  { id: "companies", label: "Companies", icon: "Building2", href: "/profile/companies" },
  { id: "payments", label: "Payments", icon: "CreditCard", href: "/profile/payments" },
  { id: "balances", label: "Balances", icon: "Wallet", href: "/profile/balances" },
  { id: "files", label: "Files", icon: "FolderOpen", href: "/profile/files" },
  { id: "faqs", label: "FAQs", icon: "HelpCircle", href: "/faqs" },
];

export const mockNotifications: SystemNotification[] = [
  {
    id: "1",
    type: "warning",
    message: "You have 2 pending payments.",
    action: { label: "Complete Payments", href: "/profile/payments" },
  },
];

export const mockCompanies: Company[] = [
  {
    id: "1",
    company_name: "ABC Pte. Ltd.",
    service_slug: "incorporation",
    service_name: "Incorporation",
    status: "ongoing",
    created_at: "2025-12-01",
  },
  {
    id: "2",
    company_name: "XYZ Holdings",
    service_slug: "compliance",
    service_name: "Compliance",
    status: "completed",
    created_at: "2025-09-15",
  },
];

export const mockPayments: Payment[] = [
  {
    id: 1,
    user_id: 1,
    amount: "1500.00",
    currency: "SGD",
    status: "confirmed",
    payment_method: "bank_transfer",
    reference_number: "INV-2025-001",
    notes: null,
    paid_at: "2025-12-10",
    confirmed_at: "2025-12-11",
    due_at: null,
    receipts: [],
    created_at: "2025-12-01",
    updated_at: "2025-12-11",
  },
  {
    id: 2,
    user_id: 1,
    amount: "800.00",
    currency: "SGD",
    status: "pending",
    payment_method: "bank_transfer",
    reference_number: "INV-2025-002",
    notes: null,
    paid_at: null,
    confirmed_at: null,
    due_at: "2026-01-15",
    receipts: [],
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
  },
];

export const mockFiles: UserFile[] = [
  {
    id: 1,
    client_filename: "passport_scan.pdf",
    mime_type: "application/pdf",
    size: 2457600,
    is_persistent: true,
    expires_at: null,
    created_at: "2025-12-15T00:00:00.000Z",
    updated_at: "2025-12-15T00:00:00.000Z",
  },
  {
    id: 2,
    client_filename: "business_license.jpg",
    mime_type: "image/jpeg",
    size: 1258291,
    is_persistent: true,
    expires_at: null,
    created_at: "2025-11-20T00:00:00.000Z",
    updated_at: "2025-11-20T00:00:00.000Z",
  },
];

export const mockBalanceAudits: BalanceAudit[] = [
  {
    id: "1",
    amount: 500,
    type: "credit",
    description: "Topup",
    created_at: "2026-01-12",
  },
  {
    id: "2",
    amount: 200,
    type: "debit",
    description: "Service Payment - Incorporation",
    created_at: "2026-01-10",
  },
];

export const mockUserProfile: UserProfile = {
  id: "1",
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  phone_number: "91234567",
  phone_dial_code: "+65",
  gender: "male",
  date_of_birth: "1990-01-15",
  nationality: "Singapore",
  nric: "S1234567A",
  passport: "E1234567",
  passport_exp_date: "2028-12-15",
  address_line_1: "123 Main Street",
  address_line_2: "#12-34",
  address_line_3: "Singapore 123456",
};

export const mockFaqs: FAQ[] = [
  {
    id: "1",
    question: "How do I top up my BizCoins?",
    answer:
      "You can top up your BizCoins by going to Profile > Balances > Topup. Choose between online payment or offline bank transfer.",
  },
  {
    id: "2",
    question: "How do I contact support?",
    answer:
      "You can reach our support team via email at support@bizcom.sg or call us at +65 6789 1234 during business hours (Mon-Fri, 9am-6pm SGT).",
  },
  {
    id: "3",
    question: "What are BizCoins?",
    answer:
      "BizCoins are our platform currency used to pay for services. 1 BizCoin = 1 SGD. You can top up and use them for any service on our platform.",
  },
  {
    id: "4",
    question: "How long does company incorporation take?",
    answer:
      "Typically, Singapore company incorporation takes 1-3 business days once all documents are submitted and verified.",
  },
  {
    id: "5",
    question: "Can I edit my profile information?",
    answer:
      "Profile information linked to KYC verification cannot be edited directly. Please contact support if you need to update your verified details.",
  },
];
