import React from "react";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import Footer from "../components/Footer/Footer";
import FetchShowcase from "../components/FetchShowcase/FetchShowcase";
import AIFlow from "../components/AIFlow/AIFlow";

const Home = () => {
  return (
    <div className="overflow-x-hidden bg-gray-50">
      <Hero />
      <FetchShowcase />
      <AIFlow />
      <Services />
      <Footer />
    </div>
  );
};

export default Home;