import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import OpportunityList from "../components/OpportunityList";
import RegistrationForm from "../components/RegistrationForm";
import SuccessMessage from "../components/SuccessMessage";
import AboutSection from "../components/AboutSection";
import useLocalStorage from '../hooks/useLocalStorage';
import { useRegistrations } from "../store/useRegistrations";

const scrollTo = (id) => setTimeout(() => document.getElementById(id)?.scrollIntoView?.({ behavior: "smooth" }), 50);

export default function HomePage() {
  const { opportunities, addRegistration } = useRegistrations();
  const location = useLocation();
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useLocalStorage("vc.category", "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => { document.title = "VolunConnect | Volunteer Registration Portal"; }, []);

  // Scroll to a section when arriving via /#section links
  useEffect(() => { if (location.hash) scrollTo(location.hash.slice(1)); }, [location.hash]);

  // Pre-select a drive when arriving from the details page
  useEffect(() => {
    const id = location.state?.opportunityId;
    if (id) {
      setSelectedOpportunity(opportunities.find((o) => o.id === id) || null);
      scrollTo("register");
    }
  }, [location.state]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = useCallback((opp) => {
    setSelectedOpportunity(opp); setIsRegistered(false); setSubmitError(""); scrollTo("register");
  }, []);

  const handleSuccess = (data) => {
    const result = addRegistration(data);
    if (!result.ok) { setSubmitError(result.error); return; }
    setSubmitError(""); setRegistrationData(data); setIsRegistered(true); scrollTo("register");
  };

  const handleReset = () => {
    setIsRegistered(false); setRegistrationData(null); setSelectedOpportunity(null); scrollTo("register");
  };

  return (
    <>
      <Hero onExploreClick={() => scrollTo("opportunities")} onRegisterClick={() => scrollTo("register")} />
      <StatsSection />
      <OpportunityList
        opportunities={opportunities}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectOpportunity={handleSelect}
      />
      {submitError && (
        <div className="container"><div className="alert alert-danger" role="alert">{submitError}</div></div>
      )}
      {isRegistered ? (
        <SuccessMessage registrationData={registrationData} onReset={handleReset} />
      ) : (
        <RegistrationForm
          opportunities={opportunities}
          selectedOpportunity={selectedOpportunity}
          onRegisterSuccess={handleSuccess}
          onClearSelectedOpportunity={() => setSelectedOpportunity(null)}
        />
      )}
      <AboutSection />
    </>
  );
}
