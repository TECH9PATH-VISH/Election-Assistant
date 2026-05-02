/**
 * @file validations.ts
 * @description Centralized Zod validation schemas for the Election Assistant platform.
 */

import * as z from "zod";

/**
 * Zod schema for validating user profile information.
 */
export const userProfileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Invalid ZIP code." }),
});

/**
 * Zod schema for validating the election quiz answers.
 */
export const electionQuizSchema = z.object({
  answers: z.record(z.string(), z.string()),
});

/**
 * Zod schema for validating a timeline event prop.
 */
export const timelineEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  description: z.string(),
  isCompleted: z.boolean().optional(),
});

export type TimelineEventProp = z.infer<typeof timelineEventSchema>;

/**
 * Zod schema for validating Calendar Integration props.
 */
export const calendarIntegrationPropsSchema = z.object({
  title: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
});

export type CalendarIntegrationProps = z.infer<typeof calendarIntegrationPropsSchema>;

/**
 * Zod schema for validating the polling location search input.
 */
export const pollingSearchSchema = z.object({
  address: z.string().min(5, "Please enter a valid address with at least 5 characters.")
    .max(200, "Address is too long."),
});
