
import React from 'react';
import SitesPage from '../../chief-engineer/dashboard/all-sites/page';
import { getallSites } from '@/services/siteServices/siteManagement';
import SiteList from '@/components/module/sites/siteList';

const SiteEngineerPage = async () => {
//   const sites = await getallSites();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">All Sites</h1>

      {/* <SiteList
        sites={sites}
        onSiteClick={(site) => {
          // chief engineer: details / modal / nothing
          console.log("Chief viewing site:", site.name);
        }}
      /> */}
    </div>
  );
};


export default SiteEngineerPage;