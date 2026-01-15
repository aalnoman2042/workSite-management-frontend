// import PaymentsTable from "./payments-table";
import PaymentsTable from "@/components/module/payment/payments.table";
import { serverFetch } from "@/lib/server-fetch";

const Page = async () => {
  const allPayments = await serverFetch.get("/payments/all?status=DUE");
  const res = await allPayments.json();

  console.log(res);
  
  return (
    <div>
      <h1>Due Payments</h1>
      <PaymentsTable payments={res?.data} />
    </div>
  );
};

export default Page;
