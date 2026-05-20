import NavBar from "../components/NavBar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import ServicesSection from "../components/ServicesSection.jsx";
import BookingSection from "../components/BookingSection.jsx";

function Home() {

    return (
        <>
            <NavBar />
            <HeroSection />
            <ServicesSection />
            <BookingSection />
        </>
    );
}

export default Home;