// import PublicNavbar from "@/components/shared/PublicNavbar";

import PublicFooter from "@/components/shared/publicFooter";
import PublicNavbar from "@/components/shared/publicNavbar";


const CommonLayout = ({children } : { children: React.ReactNode }) => {
    return (
    <>
    <PublicNavbar></PublicNavbar>
    {children}
    <PublicFooter></PublicFooter>
    </>
    );
};

export default CommonLayout;