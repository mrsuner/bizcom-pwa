import { z } from "zod";

// Sign In schemas
export const signInEmailPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signInOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

// Registration schemas
export const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional().or(z.literal("")),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select a gender",
  }),
  nationality: z.string().min(1, "Nationality is required"),
  phoneDialCode: z.string().min(1, "Dial code is required"),
  phoneNumber: z.string().min(6, "Phone number must be at least 6 digits"),
});

// Type exports
export type SignInEmailPasswordInput = z.infer<typeof signInEmailPasswordSchema>;
export type SignInOtpInput = z.infer<typeof signInOtpSchema>;
export type EmailInput = z.infer<typeof emailSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
export type PasswordInput = z.infer<typeof passwordSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
