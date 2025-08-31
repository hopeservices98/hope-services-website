import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import Stack from './components/Stack';
import UseCases from './components/UseCases';
import Services from './components/Services';
import RevolutionaryServices from './components/RevolutionaryServices';
import Documentation from './components/Documentation';
import Scheduling from './components/CTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-brand-dark text-gray-300 font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Stack />
        <UseCases />
        <Services />
        <RevolutionaryServices />
        <Documentation />
        <Scheduling />
      </main>
      <Footer />
    </div>
  );
};

export default App;
