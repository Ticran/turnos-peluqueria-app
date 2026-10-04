import React from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import HeroSection from "@/components/home/hero/HeroSection";
import BookingSection from "@/components/home/booking/BookingSection";
import AboutSection from "@/components/home/about/AboutSection";
import InfoSection from "@/components/home/info/InfoSection";
import useBooking from "@/hooks/useBooking";

// Página de reservas de un local: /{slug}
export default function Home() {
  const { slug } = useParams();
  const bookingProps = useBooking(slug);
  const { businessInfo, isLoading, loadError } = bookingProps;

  if (isLoading || !businessInfo) {
    return (
      <MainLayout>
        <div className="flex flex-col gap-4 items-center justify-center min-h-[60vh] bg-slate-50 px-6 text-center">
          {loadError ? (
            <>
              <p className="text-slate-500">{loadError}</p>
              <Link to="/" className="text-sm font-medium text-rose-800 hover:underline">Ver todos los locales</Link>
            </>
          ) : (
            <p className="text-slate-500 animate-pulse">Cargando información del local...</p>
          )}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout businessName={businessInfo.name}>
      <HeroSection businessInfo={businessInfo} />
      <BookingSection bookingProps={bookingProps} />
      <AboutSection businessInfo={businessInfo} />
      <InfoSection businessInfo={businessInfo} />
    </MainLayout>
  );
}
