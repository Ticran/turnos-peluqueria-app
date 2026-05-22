import React from "react";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Award from "lucide-react/dist/esm/icons/award";
import Coffee from "lucide-react/dist/esm/icons/coffee";
import SectionTitle from "@/components/ui/SectionTitle";
import FeatureCard from "./FeatureCard";
import AboutGallery from "./AboutGallery";

export default function AboutSection() {
  return (
    <section id="local" className="bg-white border-y border-slate-100 py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <SectionTitle 
            uppercaseText="Cultura & Espacio" 
            mainText="Un Ritual con Identidad Propia" 
          />
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            LUMEN nació bajo la premisa de devolverle al hombre el verdadero valor del ritual de cuidado personal. No somos una cadena masiva de estética rápida; somos un salón de autor donde el diseño de imagen, el perfeccionismo técnico y las conversaciones honestas se fusionan bajo un entorno premium.
          </p>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Cada sillón cuenta con instrumental de máxima gama esterilizado y líneas cosméticas importadas, asegurando confort total desde que ingresas hasta que dejas nuestra estación de trabajo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <FeatureCard icon={ShieldCheck} title="Seguridad" desc="Protocolos estrictos de higiene." />
            <FeatureCard icon={Award} title="Premium" desc="Líneas capilares mundiales." />
            <FeatureCard icon={Coffee} title="Confort" desc="Café e infraestructura de autor." />
          </div>
        </div>

        <AboutGallery />
      </div>
    </section>
  );
}