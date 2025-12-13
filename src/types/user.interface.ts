import { UserRole } from "@/lib/auth-utils";

export interface UserInfo {
    name: string;
    email: string;
    role: UserRole;
}

// export type UserRole = "WORKER" | "SITE_ENGINEER" | "CHIEF_ENGINEER" | "ADMIN";
export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface IUser {
  id: string;
  email: string;
  role: UserRole;
  isBanned: boolean;
  gender?: Gender;
  approved: boolean;
  profilePhoto?: string;
  createdAt: string;
  updatedAt: string;
}