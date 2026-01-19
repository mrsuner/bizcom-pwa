// Mapping from ISO 3166-1 alpha-3 to alpha-2 for common currencies
const COUNTRY_CODE_MAP: Record<string, string> = {
  SGP: "SG",
  USA: "US",
  EUR: "EU",
  GBR: "GB",
  AUS: "AU",
  JPN: "JP",
  CHN: "CN",
  HKG: "HK",
  MYS: "MY",
  IND: "IN",
  TWN: "TW",
  KOR: "KR",
  THA: "TH",
  IDN: "ID",
  PHL: "PH",
  VNM: "VN",
  NZL: "NZ",
  CAN: "CA",
  CHE: "CH",
};

export function getFlagEmoji(alpha3Code: string): string {
  const alpha2 = COUNTRY_CODE_MAP[alpha3Code] || alpha3Code.slice(0, 2);
  const codePoints = alpha2
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function formatBalance(balance: string, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(parseFloat(balance));
}
