import * as z from "zod";

export const signupSchema = z.object({
  name: z
    .string({ message: "Name is required " })
    .min(2, { message: "Name must be at least 2 characters" }),
  userName: z
    .string({ message: "userName must be a string" })
    .min(2, { message: "userName must be at least 2 characters" }),
  email: z
    .string({ message: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  pinCode: z
    .string()
    .min(4, { message: "PIN must be at least 4 digits" })
    .max(6, { message: "PIN must be at most 6 digits" })
    .regex(/^\d+$/, { message: "PIN must contain only numbers" }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\+234\d{10}$/, {
      message: "Must be a valid Nigerian number (+234...)",
    }),
});

export type SignUpFormData = z.infer<typeof signupSchema>;
export const defaultSignupValues: SignUpFormData = {
  name: "",
  userName: "",
  email: "",
  password: "",
  pinCode: "",
  phoneNumber: "+234",
};
