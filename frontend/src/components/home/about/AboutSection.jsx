import React from "react";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Award from "lucide-react/dist/esm/icons/award";
import Coffee from "lucide-react/dist/esm/icons/coffee";
import SectionTitle from "@/components/ui/SectionTitle";
import FeatureCard from "./FeatureCard";
import AboutGallery from "./AboutGallery";

export default function AboutSection({ businessInfo }) {
  return (
    <section id="local" className="bg-white border-y border-slate-100 py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <SectionTitle 
            uppercaseText="Cultura & Espacio" 
            mainText="Nuestra Identidad" 
          />
          
          <div className="text-sm text-slate-600 font-light leading-relaxed space-y-4">
            {businessInfo?.description ? (
               <p>{businessInfo.description}</p>
            ) : (
               <p>El local aún no ha cargado su descripción.</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <FeatureCard icon={ShieldCheck} title="Seguridad" desc="Higiene garantizada." />
            <FeatureCard icon={Award} title="Premium" desc="Calidad mundial." />
            <FeatureCard icon={Coffee} title="Confort" desc="Atención de autor." />
          </div>
        </div>

        <AboutGallery />
      </div>
    </section>
  );
}