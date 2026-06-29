import * as z from "zod"
 
export const loginSchema = z.object({
  identifier: z
    .string({ message: "Identifier is required" })
    .min(2, { message: "Identifier must be at least 2 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .optional()
    .or(z.literal('')),
  pinCode: z
    .string()
    .min(4, { message: "PIN must be at least 4 digits" })
    .max(6, { message: "PIN must be at most 6 digits" })
    .optional()
    .or(z.literal('')),
}).refine((data) => 
  (data.password && data.password.length >= 8) || 
  (data.pinCode && data.pinCode.length >= 4), {
  message: "Please provide either a password or PIN",
  path: ["password"]
});
export type LoginFormData = z.infer< typeof loginSchema>
export const loginDefaultValue: LoginFormData = {
  identifier: "",
  password: undefined,
  pinCode: undefined,
}