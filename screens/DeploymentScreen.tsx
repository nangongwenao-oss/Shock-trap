import React, { useState } from 'react';
import { SectionHeader, Button, GlassCard } from '../components/Shared';
import { api } from '../services/api';
import { TrapConfig } from '../types';
import { Target, FileCode, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const DeploymentScreen: React.FC = () => {
  const [target, setTarget] = useState('Web-Server-01');
  const [type, setType] = useState<TrapConfig['vulnType']>('Existing');
  const [path, setPath] = useState('/var/www/html/backup.zip');
  const [strategy, setStrategy] = useState<TrapConfig['strategy']>('DENY');
  const [isDeploying, setIsDeploying] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleDeploy = async () => {
    setIsDeploying(true);
    setSuccessMsg('');
    try {
      await api.deployTrap({
        targetSystem: target,
        vulnType: type,
        filePath: path,
        strategy: strategy,
      });
      setSuccessMsg(`TRAP DEPLOYED SUCCESSFULLY ON ${target}`);
      if (navigator.vibrate) navigator.vibrate(200);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      <SectionHeader title="Trap Configuration" subtitle="Remote Deployment Center (VPT/ASM)" />

      <GlassCard className="space-y-6">
        {/* Target System */}
        <div className="space-y-2">
            <label className="text-xs text-[#00FF41] font-mono flex items-center gap-2">
                <Target size={14} /> TARGET SYSTEM
            </label>
            <div className="relative">
                <select 
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full bg-[#051A1A] border border-[#00FF41]/30 text-white text-sm rounded p-3 focus:outline-none focus:border-[#00FF41] appearance-none"
                >
                    <option>Web-Server-01</option>
                    <option>DB-Cluster-Main</option>
                    <option>Gateway-Edge</option>
                    <option>HR-Internal-Portal</option>
                </select>
                <div className="absolute right-3 top-3 pointer-events-none text-[#00FF41] text-xs">▼</div>
            </div>
        </div>

        {/* Vulnerability Type */}
        <div className="space-y-2">
            <label className="text-xs text-[#00FF41] font-mono flex items-center gap-2">
                <Shield size={14} /> VULNERABILITY TYPE
            </label>
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => setType('Existing')}
                    className={`p-3 rounded border text-xs font-mono transition-all ${
                        type === 'Existing' 
                        ? 'bg-[#00FF41]/20 border-[#00FF41] text-[#00FF41]' 
                        : 'border-[#00FF41]/20 text-gray-400 hover:border-[#00FF41]/50'
                    }`}
                >
                    EXISTING CVE
                </button>
                <button
                    onClick={() => setType('0day')}
                    className={`p-3 rounded border text-xs font-mono transition-all ${
                        type === '0day' 
                        ? 'bg-[#00FF41]/20 border-[#00FF41] text-[#00FF41]' 
                        : 'border-[#00FF41]/20 text-gray-400 hover:border-[#00FF41]/50'
                    }`}
                >
                    SIMULATED 0DAY
                </button>
            </div>
        </div>

        {/* File Path */}
        <div className="space-y-2">
            <label className="text-xs text-[#00FF41] font-mono flex items-center gap-2">
                <FileCode size={14} /> FILE TRAP PATH
            </label>
            <input 
                type="text" 
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="w-full bg-[#051A1A] border border-[#00FF41]/30 text-white text-sm rounded p-3 font-mono focus:outline-none focus:border-[#00FF41]"
            />
        </div>

        {/* Strategy */}
        <div className="space-y-2">
            <label className="text-xs text-[#00FF41] font-mono mb-2 block">DEFENSE STRATEGY</label>
            <div className="flex bg-[#051A1A] p-1 rounded-lg border border-[#00FF41]/20">
                <button
                    onClick={() => setStrategy('DENY')}
                    className={`flex-1 py-2 text-xs font-bold rounded transition-all ${
                        strategy === 'DENY' ? 'bg-[#FF6B6B] text-white shadow-lg' : 'text-gray-500'
                    }`}
                >
                    DENY (BLOCK)
                </button>
                <button
                    onClick={() => setStrategy('TRACE')}
                    className={`flex-1 py-2 text-xs font-bold rounded transition-all ${
                        strategy === 'TRACE' ? 'bg-[#00FF41] text-[#051A1A] shadow-lg' : 'text-gray-500'
                    }`}
                >
                    TRACE (HONEY)
                </button>
            </div>
        </div>

        <Button 
            onClick={handleDeploy} 
            isLoading={isDeploying} 
            block
            className="mt-4"
        >
            INITIALIZE DEPLOYMENT
        </Button>
      </GlassCard>

      {successMsg && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-[#00FF41]/10 border border-[#00FF41] text-[#00FF41] text-xs font-mono rounded text-center"
          >
              {successMsg}
          </motion.div>
      )}
    </div>
  );
};
