import React from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import NavBar from './components/NavBar';
import WelcomeSection from './components/WelcomeSection';
import CardsSection from './components/CardsSection';
import UniverseCanvas from './components/UniverseCanvas';

const App = () => {
  return (
    <>
      <BackgroundCanvas />
      <NavBar />
      <div className="container">
        <WelcomeSection />
        <CardsSection />
        <div id="universe-container">
          <UniverseCanvas />
        </div>
      </div>
    </>
  );
};

export default App;