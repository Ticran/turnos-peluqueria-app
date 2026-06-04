import React from "react";
import MainLayout from "@/layouts/MainLayout";
import HeroSection from "@/components/home/hero/HeroSection";
import BookingSection from "@/components/home/booking/BookingSection";
import AboutSection from "@/components/home/about/AboutSection";
import InfoSection from "@/components/home/info/InfoSection";
import useBooking from "@/hooks/useBooking";

export default function Home() {
  // Extraemos toda la data del hook
  const bookingProps = useBooking();
  const { businessInfo, isLoading } = bookingProps;

  // Mientras viaja la info desde Spring Boot, mostramos algo simple
  if (isLoading || !businessInfo) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
          <p className="text-slate-500 animate-pulse">Cargando información del local...</p>
        </div>
      </MainLayout>
    );
  }
  console.log("DATOS QUE LLEGAN DEL BACKEND:", businessInfo);
  return (
    <MainLayout>
      {/* Le "pasamos" la variable businessInfo a los componentes que la necesitan */}
      <HeroSection businessInfo={businessInfo} />
      <BookingSection bookingProps={bookingProps} />
      <AboutSection businessInfo={businessInfo} />
      <InfoSection businessInfo={businessInfo} />
    </MainLayout>
  );
}