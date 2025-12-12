import React, { useState } from 'react';
import { SectionHeader, GlassCard, Button } from '../components/Shared';
import { MOCK_ALERTS } from '../constants';
import { AlertTriangle, Clock, MapPin, Zap, Eye, Crosshair } from 'lucide-react';
import { api } from '../services/api';
import { AnimatePresence, motion } from 'framer-motion';

export const CombatScreen: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState<{msg: string, type: 'success' | 'error'} | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleAction = async (action: 'DENY' | 'TRACE' | 'BAS') => {
    if (!selectedAlert) return;
    setProcessing(true);
    
    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate([50, 50, 50]);

    try {
        const result = await api.executeCountermeasure(MOCK_ALERTS.find(a => a.id === selectedAlert)?.trapId || '', action);
        setActionStatus({ msg: result.message, type: 'success' });
    } catch (e) {
        setActionStatus({ msg: 'Action Failed', type: 'error' });
    } finally {
        setProcessing(false);
        // Clear status after 3s
        setTimeout(() => setActionStatus(null), 3000);
    }
  };

  return (
    <div className="pb-24 pt-4 px-4 h-screen flex flex-col">
      <SectionHeader title="Combat Center" subtitle="Real-time Incident Response" />

      {/* Alert Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {MOCK_ALERTS.map((alert) => (
          <GlassCard 
            key={alert.id} 
            isAlert={alert.status === 'NEW'}
            onClick={() => setSelectedAlert(alert.id)}
            className={`cursor-pointer transition-all ${selectedAlert === alert.id ? 'ring-1 ring-[#00FF41] bg-[#00FF41]/5' : ''}`}
          >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className={alert.status === 'NEW' ? 'text-[#FF6B6B] animate-pulse' : 'text-gray-400'} />
                    <span className="font-mono font-bold text-[#FF6B6B]">RISK: {alert.riskScore}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400">{alert.timestamp}</span>
            </div>
            <p className="text-sm font-bold text-white mb-1">{alert.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400 font-mono mt-2">
                <span className="flex items-center gap-1"><MapPin size={10} /> {alert.sourceIp}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {alert.trapId}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Action Modal / Bottom Sheet */}
      <AnimatePresence>
        {selectedAlert && (
            <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed bottom-[80px] left-0 right-0 p-4 z-40"
            >
                <div className="bg-[#051A1A] border border-[#00FF41]/50 rounded-xl p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
                    {/* Background effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B6B] via-[#00FF41] to-[#FF6B6B] opacity-50"></div>
                    
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[#00FF41] font-mono font-bold">RESPONSE OPTIONS</h3>
                        <button onClick={() => setSelectedAlert(null)} className="text-gray-500 hover:text-white">✕</button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <Button variant="danger" onClick={() => handleAction('DENY')} isLoading={processing} className="flex-col py-4 text-[10px]">
                            <Zap size={20} className="mb-1" />
                            IMMEDIATE DENY
                        </Button>
                        <Button variant="primary" onClick={() => handleAction('TRACE')} isLoading={processing} className="flex-col py-4 text-[10px]">
                            <Eye size={20} className="mb-1" />
                            STICKY TRACE
                        </Button>
                        <Button variant="ghost" onClick={() => handleAction('BAS')} isLoading={processing} className="flex-col py-4 text-[10px] border border-[#00FF41]/30">
                            <Crosshair size={20} className="mb-1" />
                            BAS VERIFY
                        </Button>
                    </div>

                    {actionStatus && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`mt-3 text-center text-xs font-mono p-2 rounded ${
                                actionStatus.type === 'success' ? 'bg-[#00FF41]/10 text-[#00FF41]' : 'bg-[#FF6B6B]/10 text-[#FF6B6B]'
                            }`}
                        >
                            {actionStatus.msg}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
