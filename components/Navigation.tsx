import React from 'react';
import { ScreenName } from '../types';
import { Shield, Radar, Target, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'OVERVIEW', icon: Shield, label: 'System' },
    { id: 'DEPLOYMENT', icon: Target, label: 'Deploy' },
    { id: 'COMBAT', icon: Activity, label: 'Combat' },
    { id: 'TRACING', icon: Radar, label: 'Trace' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 px-4 pb-4 pt-2 bg-gradient-to-t from-[#051A1A] to-[#051A1A]/90 backdrop-blur-md border-t border-[#00FF41]/20">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ScreenName)}
              className="relative flex flex-col items-center justify-center p-2 w-16"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-[#00FF41]/10 rounded-lg blur-md"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <item.icon
                size={24}
                color={isActive ? '#00FF41' : '#475569'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] mt-1 font-mono ${isActive ? 'text-[#00FF41]' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
