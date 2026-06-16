export interface ColorDetail {
  hex: string;
  name: string;
  description: string;
}

export interface ColorPalette {
  primary: ColorDetail;
  secondary: ColorDetail;
  accent: ColorDetail;
  background: ColorDetail;
  textPrimary: ColorDetail;
  textSecondary: ColorDetail;
  textMuted: ColorDetail;
}

export interface FontDetail {
  name: string;
  importUrl: string; // Google Font link, e.g. "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
  category: string;
}

export interface Typography {
  headingFont: FontDetail;
  bodyFont: FontDetail;
  pairingExplanation: string;
}

export interface BorderRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface Shadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  inner: string;
}

export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface ButtonStyles {
  primary: string;
  secondary: string;
  outline: string;
}

export interface CardStyles {
  border: string;
  background: string;
  padding: string;
  extraTailwindClasses: string;
}

export interface DesignSystem {
  borderRadius: BorderRadius;
  shadows: Shadows;
  spacingScale: SpacingScale;
  buttonStyles: ButtonStyles;
  cardStyles: CardStyles;
}

export interface SectionHero {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string; // Lucide icon identifier e.g. "Cpu", "Shield", "LineChart", "Sparkles", "Smile", "Zap", "Users"
}

export interface SectionFeatures {
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

export interface TestimonialItem {
  quote: string;
  authorName: string;
  authorRole: string;
  rating: number;
}

export interface SectionTestimonials {
  title: string;
  subtitle: string;
  items: TestimonialItem[];
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
}

export interface SectionPricing {
  title: string;
  subtitle: string;
  tiers: PricingTier[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SectionFAQ {
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export interface SectionContact {
  title: string;
  subtitle: string;
  fields: string[];
  email: string;
  phone: string;
  address: string;
}

export interface WebsiteSections {
  hero: SectionHero;
  features: SectionFeatures;
  testimonials: SectionTestimonials;
  pricing: SectionPricing;
  faq: SectionFAQ;
  contact: SectionContact;
}

export interface WebsiteTheme {
  id: string;
  createdAt: string;
  brandName: string;
  websiteType: string;
  designStyle: string;
  industry: string;
  colorScheme: string;
  targetAudience: string;
  colorPalette: ColorPalette;
  typography: Typography;
  designSystem: DesignSystem;
  sections: WebsiteSections;
  cssVariables: string;
}

export interface ThemeParams {
  websiteType: string;
  brandName: string;
  industry: string;
  colorScheme: string;
  designStyle: string;
  targetAudience: string;
}
