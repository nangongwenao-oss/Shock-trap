import React, { useState } from 'react';
import { ScreenName } from './types';
import { MatrixRain } from './components/Shared';
import { Navigation } from './components/Navigation';
import { LoginScreen } from './screens/LoginScreen';
import { OverviewScreen } from './screens/OverviewScreen';
import { DeploymentScreen } from './screens/DeploymentScreen';
import { CombatScreen } from './screens/CombatScreen';
import { TracingScreen } from './screens/TracingScreen';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('OVERVIEW');

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'OVERVIEW':
        return <OverviewScreen onNavigateToCombat={() => setCurrentScreen('COMBAT')} />;
      case 'DEPLOYMENT':
        return <DeploymentScreen />;
      case 'COMBAT':
        return <CombatScreen />;
      case 'TRACING':
        return <TracingScreen />;
      default:
        return <OverviewScreen onNavigateToCombat={() => setCurrentScreen('COMBAT')} />;
    }
  };

  if (!token) {
    return (
      <div className="antialiased min-h-screen relative text-gray-200">
        <MatrixRain />
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="antialiased min-h-screen relative text-gray-200">
      <MatrixRain />
      
      <main className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
};

export default App;
