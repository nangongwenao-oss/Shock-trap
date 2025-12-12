import React, { useState } from 'react';
import { Lock, Fingerprint, ShieldAlert } from 'lucide-react';
import { api } from '../services/api';
import { Button } from '../components/Shared';
import { motion } from 'framer-motion';

interface LoginScreenProps {
  onLoginSuccess: (token: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('luoyuan881105');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await api.login(username, password);
      if (user) {
        onLoginSuccess(user.token);
      } else {
        setError('ACCESS DENIED: Invalid Security Clearance');
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      }
    } catch (err) {
      setError('System Error: Connection Refused');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden z-10">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm glass-panel p-8 rounded-2xl border border-[#00FF41]/30 shadow-[0_0_50px_rgba(0,255,65,0.1)]"
      >
        <div className="flex justify-center mb-8">
            <div className="relative">
                <div className="absolute inset-0 bg-[#00FF41] blur-lg opacity-20 animate-pulse"></div>
                <ShieldAlert size={64} className="text-[#00FF41] relative z-10" />
            </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-white mb-2 tracking-wider">SHOCK<span className="text-[#00FF41]">MONITOR</span></h1>
        <p className="text-center text-xs text-[#00FF41]/70 font-mono mb-8 border-t border-b border-[#00FF41]/20 py-2">
          TRAP VULNERABILITY CATCHER
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-400 ml-1">OPERATOR ID</label>
            <div className="relative">
              <Fingerprint className="absolute left-3 top-3 text-[#00FF41]/50" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#051A1A]/80 border border-[#00FF41]/30 rounded-lg py-3 pl-10 pr-4 text-[#00FF41] placeholder-gray-600 focus:outline-none focus:border-[#00FF41] focus:ring-1 focus:ring-[#00FF41] font-mono text-sm transition-all"
                placeholder="Enter ID"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-400 ml-1">ACCESS KEY</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-[#00FF41]/50" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#051A1A]/80 border border-[#00FF41]/30 rounded-lg py-3 pl-10 pr-4 text-[#00FF41] placeholder-gray-600 focus:outline-none focus:border-[#00FF41] focus:ring-1 focus:ring-[#00FF41] font-mono text-sm transition-all"
                placeholder="••••••"
              />
            </div>
          </div>

          {error && (
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#FF6B6B]/10 border border-[#FF6B6B] text-[#FF6B6B] p-3 rounded text-xs font-mono flex items-center"
            >
                <ShieldAlert size={16} className="mr-2" />
                {error}
            </motion.div>
          )}

          <Button type="submit" block isLoading={loading}>
            INITIALIZE SESSION
          </Button>
        </form>

        <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-600 font-mono">
                SECURE CONNECTION // ENCRYPTED AES-256
            </p>
        </div>
      </motion.div>
    </div>
  );
};
