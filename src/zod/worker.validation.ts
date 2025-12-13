import z from "zod";

// --- Create Worker Schema ---
export const createWorkerZodSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email("Invalid email address"),
  contactNumber: z.string().min(10, "Contact Number must be at least 10 characters long"),
  nidNumber: z.string().min(8, "NID Number must be at least 8 characters long"),
  position: z.string().min(2, "Position must be at least 2 characters long"),
  dailyRate: z.number().min(0, "Daily Rate cannot be negative").optional(),
  halfDayRate: z.number().min(0, "Half-Day Rate cannot be negative").optional(),
  companyName: z.string().min(2, "Company Name must be at least 2 characters long").optional(),
  joiningDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional()
  ),
  profilePhoto: z.string().url("Profile photo must be a valid URL").optional(),
});

// --- Update Worker Schema ---
export const updateWorkerZodSchema = z.object({
  name: z.string().optional(),
  contactNumber: z.string().optional(),
  nidNumber: z.string().optional(),
  position: z.string().optional(),
  dailyRate: z.number().optional(),
  halfDayRate: z.number().optional(),
  companyName: z.string().optional(),
  joiningDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional()
  ),
  profilePhoto: z.string().url().optional(),
  banned: z.boolean().optional(),
  approved: z.boolean().optional(),
});
