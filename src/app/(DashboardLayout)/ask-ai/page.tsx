import { getCookie } from "@/services/auth/tokenHandler";
import jwt from "jsonwebtoken";
import { notFound } from "next/navigation";
import AskAIForm from "@/components/module/AI/AskAIForm";

const AskAIPage = async () => {
  const accessToken = await getCookie("accessToken");
  if (!accessToken) {
    notFound();
  }

  const decoded = jwt.decode(accessToken!) as { role?: string } | null;
  const role = decoded?.role;

  if (role !== "ADMIN" && role !== "CHIEF_ENGINEER") {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Ask AI</h1>
      <p className="text-gray-500 mb-6">
        Search workers, engineers, admins, and sites in plain English.
        Try: <span className="italic">&quot;plumbers at Site A&quot;</span> or{" "}
        <span className="italic">&quot;worker with NID 12345&quot;</span>.
      </p>

      <AskAIForm />
    </div>
  );
};

export default AskAIPage;