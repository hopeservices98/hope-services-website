import React from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Problem from './components/Problem.tsx';
import Solution from './components/Solution.tsx';
import HowItWorks from './components/HowItWorks.tsx';
import Stack from './components/Stack.tsx';
import UseCases from './components/UseCases.tsx';
import Services from './components/Services.tsx';
import RevolutionaryServices from './components/RevolutionaryServices.tsx';
import Documentation from './components/Documentation.tsx';
import Scheduling from './components/CTA.tsx';
import Footer from './components/Footer.tsx';

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