import PaymentsManagementView from "@/components/module/payment/paymentsManagementView";

const SiteEngineerPaymentsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  return <PaymentsManagementView searchParams={searchParamsObj} canPay />;
};

export default SiteEngineerPaymentsPage;