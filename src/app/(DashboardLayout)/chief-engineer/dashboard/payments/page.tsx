import PaymentsManagementView from "@/components/module/payment/paymentsManagementView";

// Read-only: only a SITE_ENGINEER can settle a payment (the backend guards
// /payments/worker-pay with auth(SITE_ENGINEER)), so no Pay button here.
const ChiefEngineerPaymentsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  return <PaymentsManagementView searchParams={searchParamsObj} />;
};

export default ChiefEngineerPaymentsPage;