export interface Currency {
  code: string; // Currency code (e.g., "SGD")
  name: string; // Currency name (e.g., "Singapore Dollar")
  countryCode: string; // ISO 3166-1 alpha-3 country code (e.g., "SGP")
  flag: string; // Flag emoji
}

// Supported currencies matching backend's CURRENCY_COUNTRY_MAP
export const currencies: Currency[] = [
  { code: "SGD", name: "Singapore Dollar", countryCode: "SGP", flag: "🇸🇬" },
  { code: "USD", name: "US Dollar", countryCode: "USA", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", countryCode: "EUR", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", countryCode: "GBR", flag: "🇬🇧" },
  { code: "AUD", name: "Australian Dollar", countryCode: "AUS", flag: "🇦🇺" },
  { code: "JPY", name: "Japanese Yen", countryCode: "JPN", flag: "🇯🇵" },
  { code: "CNY", name: "Chinese Yuan", countryCode: "CHN", flag: "🇨🇳" },
  { code: "HKD", name: "Hong Kong Dollar", countryCode: "HKG", flag: "🇭🇰" },
  { code: "MYR", name: "Malaysian Ringgit", countryCode: "MYS", flag: "🇲🇾" },
  { code: "INR", name: "Indian Rupee", countryCode: "IND", flag: "🇮🇳" },
];

// Map currency code to currency object for quick lookup
export const currencyMap = currencies.reduce(
  (acc, currency) => {
    acc[currency.code] = currency;
    return acc;
  },
  {} as Record<string, Currency>
);
