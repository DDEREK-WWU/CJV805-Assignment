import React from "react";
import Header from "../components/header";
import HeroSection from "../components/herosection";
import FeaturedMedia from "../components/FeaturedMedia";
import ContentSection from "../components/ContentSection";
import Footer from "../components/Footer";
const HomePage = () => {



    return (
        <div>
            <Header />
            <HeroSection />
            <FeaturedMedia />
            <ContentSection />
            <Footer />
        </div>
    );
};

export default HomePage;