/* eslint-disable @typescript-eslint/no-explicit-any */


import { z } from 'zod';

export const registerWorkerValidationZodSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    nidNumber: z.string().min(1, { message: "NID Number is required" }),

    email: z.string().email({ message: "Valid email is required" }),

    contactNumber: z
      .string()
      .min(1, { message: "Contact number is required" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password must be at most 100 characters long" }),

    confirmPassword: z
      .string()
      .min(6, {
        message: "Confirm Password must be at least 6 characters long",
      }),

    // PROFILE PHOTO (optional)
    profilePhoto: z
      .union([
        z.string().url().optional(), // valid URL
        z.literal("").optional(),     // empty string allowed         
      ])
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});

export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const forgotPasswordSchema = z.object({
    email: z.email("Please enter a valid email address"),
});

export const changePasswordSchema = z
    .object({
        oldPassword: z.string().min(6, "Password must be at least 6 characters"),
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });