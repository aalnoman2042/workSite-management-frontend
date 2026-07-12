export function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function formatDateTime(date: string | Date): string {
    return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

// SENIOR_TECHNICIAN -> Senior Technician
export function formatEnumLabel(value?: string | null): string {
    if (!value) return "—";
    return value
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

// Stripe checks out in BDT, so the dashboard money tiles read in BDT too.
export function formatCurrency(amount?: number | null): string {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount ?? 0);
}


export function queryStringFormatter(searchParamsObj: { [key: string]: string | string[] | undefined }): string {
    let queryString = "";
    // {searchTerm: "John", speciality: "Cardiology"}
    // after entries: [ ["searchTerm", "John"], ["speciality", "Cardiology"] ]
    const queryArray = Object.entries(searchParamsObj).map(([key, value]) => {
        if (Array.isArray(value)) {
            // { speciality: ["Cardiology", "Neurology"] }
            // ["Cardiology", "Neurology"]
            // ?speciality=Cardiology&speciality=Neurology
            return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
        }
        else if (value !== undefined) {
            return `${key}=${encodeURIComponent(value)}`;
        }
        return "";
    });
    queryString = queryArray.filter((q) => q !== "").join("&"); // searchTerm=John&speciality=Cardiology&speciality=Neurology
    return queryString;
}