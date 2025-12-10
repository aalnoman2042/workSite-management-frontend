import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className="w-full py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Why Choose Worksite Manager?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            Our platform ensures smooth worker management, effortless monitoring, and real-time tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-neutral-900 border-neutral-800 shadow-xl rounded-2xl p-2">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Image
                src="/images/secure.svg"
                alt="secure"
                width={80}
                height={80}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-400 text-sm">
                Your data is protected with top-grade security and encrypted storage.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800 shadow-xl rounded-2xl p-2">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Image
                src="/images/fast.svg"
                alt="fast"
                width={80}
                height={80}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Fast & Efficient</h3>
              <p className="text-gray-400 text-sm">
                Powerful streamlined tools help you save time and manage workers instantly.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800 shadow-xl rounded-2xl p-2">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Image
                src="/images/support.svg"
                alt="support"
                width={80}
                height={80}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-400 text-sm">
                Our support team is always ready to help keep your workflow smooth.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-white text-black hover:bg-gray-200 font-semibold px-6 py-5 rounded-xl text-lg flex items-center gap-2">
            Get Started <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}