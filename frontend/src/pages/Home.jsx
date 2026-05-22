import React from "react";
import MainLayout from "@/layouts/MainLayout";
import HeroSection from "@/components/home/hero/HeroSection";
import BookingSection from "@/components/home/booking/BookingSection";
import AboutSection from "@/components/home/about/AboutSection";
import InfoSection from "@/components/home/info/InfoSection";
import useBooking from "@/hooks/useBooking";

export default function Home() {
  const bookingProps = useBooking();

  return (
    <MainLayout>
      <HeroSection />
      <BookingSection bookingProps={bookingProps} />
      <AboutSection />
      <InfoSection />
    </MainLayout>
  );
}