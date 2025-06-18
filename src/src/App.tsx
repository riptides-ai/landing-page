import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WaitlistForm from './components/WaitlistForm';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-montserrat text-gray-900 overflow-hidden relative min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-white">
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <WaitlistForm />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;