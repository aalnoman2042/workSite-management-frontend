// import PublicNavbar from "@/components/shared/PublicNavbar";

import PublicNavbar from "@/components/shared/publicNavbar";


const CommonLayout = ({children } : { children: React.ReactNode }) => {
    return (
    <>
    <PublicNavbar></PublicNavbar>
    {children}
    </>
    );
};

export default CommonLayout;