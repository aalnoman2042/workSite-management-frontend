// import Image from "next/image";
import { Button } from "@/components/ui/button";
import workerImage from "../../../assets/homePage/worker.jpeg";
import Image from "next/image";

export function WorksiteHero() {
  return (
    <section className="w-full bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <span className="text-sm tracking-widest text-gray-400 uppercase">
            Worksite Management System
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Manage Your <span className="text-white/80">Workers & Sites</span>  
            Effortlessly.
          </h1>

          <p className="text-gray-400 text-lg max-w-lg">
            Track attendance, monitor daily activity, manage workers, and 
            streamline your entire construction workflow — all in one unified dashboard.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-6 rounded-xl">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border-white bg-white text-black px-8 py-6 rounded-xl "
            >
              Live Demo
            </Button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-6 pt-6">
            <div>
              <p className="text-3xl font-bold">120+</p>
              <p className="text-gray-400 text-sm">Active Sites</p>
            </div>
            <div>
              <p className="text-3xl font-bold">450+</p>
              <p className="text-gray-400 text-sm">Workers</p>
            </div>
            <div>
              <p className="text-3xl font-bold">98%</p>
              <p className="text-gray-400 text-sm">Accuracy</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-white/10">
          <Image
            src={workerImage}
            alt="Worker at Construction Site"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
