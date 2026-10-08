import { z } from "zod";

export const INQUIRY_TYPES = [
  "Gemstone Inquiry",
  "Product Information",
  "Certification Inquiry",
  "General Inquiry",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name cannot exceed 100 characters."),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address (e.g., name@example.com).")
    .max(255, "Email address cannot exceed 255 characters."),

  phone: z
    .string()
    .trim()
    .max(50, "Phone number cannot exceed 50 characters.")
    .optional()
    .or(z.literal("")),

  inquiryType: z.enum(INQUIRY_TYPES),

  gemstoneSlug: z
    .string()
    .trim()
    .max(100)
    .optional()
    .or(z.literal("")),

  gemstoneName: z
    .string()
    .trim()
    .max(150)
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters detailing your inquiry.")
    .max(3000, "Message cannot exceed 3,000 characters."),

  // Honeypot field for spam prevention. Legitimate users will not see or fill this.
  website: z
    .string()
    .max(0, "Automated submission detected.")
    .optional()
    .or(z.literal("")),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
