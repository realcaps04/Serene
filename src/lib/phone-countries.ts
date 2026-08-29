export type PhoneCountry = {
  code: string;
  name: string;
  dial: string;
  flag: string;
  minLength: number;
  maxLength: number;
};

/** Common countries — flag emojis render in full color on modern platforms. */
export const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: "IN", name: "India", dial: "91", flag: "🇮🇳", minLength: 10, maxLength: 10 },
  { code: "US", name: "United States", dial: "1", flag: "🇺🇸", minLength: 10, maxLength: 10 },
  { code: "GB", name: "United Kingdom", dial: "44", flag: "🇬🇧", minLength: 10, maxLength: 10 },
  { code: "AE", name: "United Arab Emirates", dial: "971", flag: "🇦🇪", minLength: 9, maxLength: 9 },
  { code: "SA", name: "Saudi Arabia", dial: "966", flag: "🇸🇦", minLength: 9, maxLength: 9 },
  { code: "CA", name: "Canada", dial: "1", flag: "🇨🇦", minLength: 10, maxLength: 10 },
  { code: "AU", name: "Australia", dial: "61", flag: "🇦🇺", minLength: 9, maxLength: 9 },
  { code: "SG", name: "Singapore", dial: "65", flag: "🇸🇬", minLength: 8, maxLength: 8 },
  { code: "MY", name: "Malaysia", dial: "60", flag: "🇲🇾", minLength: 9, maxLength: 10 },
  { code: "PK", name: "Pakistan", dial: "92", flag: "🇵🇰", minLength: 10, maxLength: 10 },
  { code: "BD", name: "Bangladesh", dial: "880", flag: "🇧🇩", minLength: 10, maxLength: 10 },
  { code: "LK", name: "Sri Lanka", dial: "94", flag: "🇱🇰", minLength: 9, maxLength: 9 },
  { code: "NP", name: "Nepal", dial: "977", flag: "🇳🇵", minLength: 10, maxLength: 10 },
  { code: "DE", name: "Germany", dial: "49", flag: "🇩🇪", minLength: 10, maxLength: 11 },
  { code: "FR", name: "France", dial: "33", flag: "🇫🇷", minLength: 9, maxLength: 9 },
  { code: "IT", name: "Italy", dial: "39", flag: "🇮🇹", minLength: 9, maxLength: 10 },
  { code: "ES", name: "Spain", dial: "34", flag: "🇪🇸", minLength: 9, maxLength: 9 },
  { code: "NL", name: "Netherlands", dial: "31", flag: "🇳🇱", minLength: 9, maxLength: 9 },
  { code: "BR", name: "Brazil", dial: "55", flag: "🇧🇷", minLength: 10, maxLength: 11 },
  { code: "MX", name: "Mexico", dial: "52", flag: "🇲🇽", minLength: 10, maxLength: 10 },
  { code: "ZA", name: "South Africa", dial: "27", flag: "🇿🇦", minLength: 9, maxLength: 9 },
  { code: "NG", name: "Nigeria", dial: "234", flag: "🇳🇬", minLength: 10, maxLength: 10 },
  { code: "KE", name: "Kenya", dial: "254", flag: "🇰🇪", minLength: 9, maxLength: 9 },
  { code: "PH", name: "Philippines", dial: "63", flag: "🇵🇭", minLength: 10, maxLength: 10 },
  { code: "ID", name: "Indonesia", dial: "62", flag: "🇮🇩", minLength: 9, maxLength: 11 },
  { code: "TH", name: "Thailand", dial: "66", flag: "🇹🇭", minLength: 9, maxLength: 9 },
  { code: "VN", name: "Vietnam", dial: "84", flag: "🇻🇳", minLength: 9, maxLength: 10 },
  { code: "JP", name: "Japan", dial: "81", flag: "🇯🇵", minLength: 10, maxLength: 10 },
  { code: "KR", name: "South Korea", dial: "82", flag: "🇰🇷", minLength: 9, maxLength: 10 },
  { code: "CN", name: "China", dial: "86", flag: "🇨🇳", minLength: 11, maxLength: 11 },
  { code: "HK", name: "Hong Kong", dial: "852", flag: "🇭🇰", minLength: 8, maxLength: 8 },
  { code: "NZ", name: "New Zealand", dial: "64", flag: "🇳🇿", minLength: 8, maxLength: 10 },
];

const byCode = new Map(PHONE_COUNTRIES.map((c) => [c.code, c]));
const byDialLength = [...PHONE_COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);

export function getDefaultCountryCode(): string {
  if (typeof navigator === "undefined") return "IN";
  const region = navigator.language.split("-")[1]?.toUpperCase();
  if (region && byCode.has(region)) return region;
  return "IN";
}

export function getCountryByCode(code: string): PhoneCountry {
  return byCode.get(code) ?? byCode.get("IN")!;
}

export function parseStoredPhone(stored: string): { countryCode: string; nationalNumber: string } {
  const digits = stored.replace(/\D/g, "");
  if (!digits) {
    return { countryCode: getDefaultCountryCode(), nationalNumber: "" };
  }

  for (const country of byDialLength) {
    if (digits.startsWith(country.dial)) {
      return {
        countryCode: country.code,
        nationalNumber: digits.slice(country.dial.length),
      };
    }
  }

  return { countryCode: getDefaultCountryCode(), nationalNumber: digits };
}

export function formatStoredPhone(countryCode: string, nationalNumber: string): string {
  const digits = nationalNumber.replace(/\D/g, "");
  if (!digits) return "";
  const country = getCountryByCode(countryCode);
  return `+${country.dial}${digits}`;
}

export function formatPhoneDisplay(stored: string): string {
  if (!stored.trim()) return "";
  const { countryCode, nationalNumber } = parseStoredPhone(stored);
  const country = getCountryByCode(countryCode);
  return `+${country.dial} ${nationalNumber}`;
}

export function validatePhoneNumber(countryCode: string, nationalNumber: string): string | null {
  const digits = nationalNumber.replace(/\D/g, "");
  if (!digits) return null;

  const country = getCountryByCode(countryCode);
  if (digits.length < country.minLength) {
    return `Enter at least ${country.minLength} digits for ${country.name}.`;
  }
  if (digits.length > country.maxLength) {
    return `Maximum ${country.maxLength} digits for ${country.name}.`;
  }
  return null;
}

export function isValidPhoneNumber(countryCode: string, nationalNumber: string): boolean {
  return validatePhoneNumber(countryCode, nationalNumber) === null && nationalNumber.replace(/\D/g, "").length > 0;
}
