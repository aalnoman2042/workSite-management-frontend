""
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["WORKER", "CHIEF_ENGINEER","SITE_ENGINEER", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["WORKER", "CHIEF_ENGINEER","SITE_ENGINEER", "ADMIN"],
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["WORKER", "CHIEF_ENGINEER","SITE_ENGINEER", "ADMIN"],
                },
            ],
        },
    ]
}

export const siteEngineerNavItems: NavSection[] = [
    {
        title: "Site Management",
        items: [
            {
                title: "Sites",
                href: "/site-engineer/dashboard/sites",
                icon: "task", // ✅ String
                // badge: "3",
                roles: ["SITE_ENGINEER"],
            },
            {
                title: "Task Assignment",
                href: "/site-engineer/dashboard/task-assign",
                icon: "Clock", // ✅ String
                roles: ["SITE_ENGINEER"],
            },
            {
                title: "Payments",
                href: "/site-engineer/dashboard/payments",
                icon: "FileText", // ✅ String
                roles: ["SITE_ENGINEER"],
            },
        ],
    }
]
export const chiefEngineerNavItems: NavSection[] = [
    {
        title: "Patient Management",
        items: [
            {
                title: "create new site",
                href: "/chief-engineer/dashboard/create-site",
                icon: "Calendar", // ✅ String
                // badge: "3",
                roles: ["CHIEF_ENGINEER"],
            },
            {
                title: "All Sites",
                href: "/chief-engineer/dashboard/all-sites",
                icon: "Clock", // ✅ String
                roles: ["CHIEF_ENGINEER"],
            },
            {
                title: "Workers",
                href: "/chief-engineer/dashboard/workers",
                icon: "FileText", // ✅ String
                roles: ["CHIEF_ENGINEER"],
            },
        ],
    }
]

export const workerNavItems: NavSection[] = [
    {
        title: "Appointments",
        items: [
            {
                title: "My Appointments",
                href: "/dashboard/my-appointments",
                icon: "Calendar", // ✅ String
                roles: ["WORKER"],
            },
            {
                title: "Book Appointment",
                href: "/consultation",
                icon: "ClipboardList", // ✅ String
                roles: ["WORKER"],
            },
        ],
    },
    {
        title: "Medical Records",
        items: [
            {
                title: "My Prescriptions",
                href: "/dashboard/my-prescriptions",
                icon: "FileText", // ✅ String
                roles: ["WORKER"],
            },
            {
                title: "Health Records",
                href: "/dashboard/health-records",
                icon: "Activity", // ✅ String
                roles: ["WORKER"],
            },
        ],
    },

]

export const adminNavItems: NavSection[] = [
    {
        title: "User creation",
        items: [
            {
                title: " Create Workers",
                href: "/admin/dashboard/create-workers",
                icon: "Shield", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: " Create Site Engineers",
                href: "/admin/dashboard/create-site-engineer",
                icon: "Stethoscope", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: " Create Chief Engineers",
                href: "/admin/dashboard/create-chief-engineer",
                icon: "Users", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "User Management",
        items: [
            {
                title: "All Workers",
                href: "/admin/dashboard/all-workers",
                icon: "Calendar", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Schedules",
                href: "/admin/dashboard/schedules-management",
                icon: "Clock", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Specialities",
                href: "/admin/dashboard/specialities-management",
                icon: "Hospital", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    }
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "CHIEF_ENGINEER":
            return [...commonNavItems, ...chiefEngineerNavItems];
        case "SITE_ENGINEER":
            return [...commonNavItems, ...siteEngineerNavItems];
        case "WORKER":
            return [...commonNavItems, ...workerNavItems];
        default:
            return [];
    }
}