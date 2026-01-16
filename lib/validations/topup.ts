import { z } from "zod";

export const topupReceiptSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

export type TopupReceiptInput = z.infer<typeof topupReceiptSchema>;
