import React from "react";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import FetchShowcase from "../components/FetchShowcase/FetchShowcase";
import AIFlow from "../components/AIFlow/AIFlow";

const Home = () => {
  return (
    <div className="overflow-x-hidden bg-gray-50 -mx-4 -mt-8">
      <div className="mb-16">
        <Hero />
      </div>
      
      <div className="mb-16">
        <FetchShowcase />
      </div>
      
      <div className="mb-16">
        <AIFlow />
      </div>
      
      <div className="mb-16">
        <Services />
      </div>
    </div>
  );
};

export default Home;