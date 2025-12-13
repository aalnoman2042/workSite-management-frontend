
// import { ISite } from "@/components/module/sites/siteCard";
import SiteList from "@/components/module/sites/siteList";
import { getallSites } from "@/services/siteServices/siteManagement";
import { ISite } from "@/types/site.interface";
// import { getAllSites } from "@/services/admin/siteManagement";

const SitesPage = async () => {
  const sitesResult = await getallSites(); // backend fetch
  // console.log(sitesResult.map((site: ISite) => site), "sitesResult");
  
//   const sites: ISite[] = sitesResult.data;
const sites = Array.isArray(sitesResult) ? sitesResult : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Sites</h1>
      <SiteList sites={sites} />
    </div>
  );
};

export default SitesPage;
