import RegisterForm from "@/components/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an account — WorkSite Manager",
  description:
    "Create your WorkSite Manager account to track attendance, manage sites and get paid on time.",
};

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
          <p className="text-sm text-muted-foreground">
            Register as a worker. An engineer will approve you before you start receiving tasks.
          </p>
        </div>

        <div className="rounded-xl border p-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;