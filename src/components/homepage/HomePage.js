import React from 'react';
import HeroSection from './HeroSection';
import SpecialsSection from './SpecialsSection';
import TestimonialsSection from './TestimonialsSection';

function HomePage() {
  return (
    <main>
      <HeroSection />
      <SpecialsSection />
      <TestimonialsSection />
      <div>{true}</div>
    </main>
  );
}

export default HomePage;