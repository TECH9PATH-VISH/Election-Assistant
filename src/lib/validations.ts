import * as z from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Invalid ZIP code." }),
});

export const electionQuizSchema = z.object({
  answers: z.record(z.string(), z.string()),
});
