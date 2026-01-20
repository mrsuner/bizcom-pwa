import { z } from "zod";

export const transferSchema = z
  .object({
    from_currency: z.string().min(1, "Please select source currency"),
    to_currency: z.string().min(1, "Please select destination currency"),
    amount: z
      .string()
      .min(1, "Amount is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Amount must be a positive number",
      }),
  })
  .refine((data) => data.from_currency !== data.to_currency, {
    message: "Currencies must be different",
    path: ["to_currency"],
  });

export type TransferInput = z.infer<typeof transferSchema>;
