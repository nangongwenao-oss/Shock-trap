import React from 'react';
import { SectionHeader, GlassCard } from '../components/Shared';
import { MOCK_TRAPS, MOCK_ALERTS } from '../constants';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Mock data for the chart
const data = [
  { name: '00:00', exploits: 2 },
  { name: '04:00', exploits: 1 },
  { name: '08:00', exploits: 5 },
  { name: '12:00', exploits: 12 },
  { name: '16:00', exploits: 8 },
  { name: '20:00', exploits: 15 },
  { name: '24:00', exploits: 10 },
];

export const OverviewScreen: React.FC<{ onNavigateToCombat: () => void }> = ({ onNavigateToCombat }) => {
  const activeTraps = MOCK_TRAPS.length;
  const recentAlerts = MOCK_ALERTS.length;
  const maxRisk = Math.max(...MOCK_ALERTS.map(a => a.riskScore));

  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between bg-[#00FF41]/10 px-4 py-2 rounded-full border border-[#00FF41]/30 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00FF41] rounded-full animate-pulse"></div>
            <span className="text-[#00FF41] text-xs font-bold font-mono tracking-wider">ACTIVE DEFENSE: ONLINE</span>
        </div>
        <span className="text-[10px] text-[#00FF41]/60 font-mono">SYS_v3.1.0</span>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        <GlassCard className="flex flex-col items-center justify-center py-4 border-l-0 border-t-2 border-t-[#00FF41]">
            <ShieldCheck className="text-[#00FF41] mb-2" size={24} />
            <span className="text-2xl font-bold font-mono text-white">{activeTraps}</span>
            <span className="text-[10px] text-gray-400 uppercase">Traps</span>
        </GlassCard>
        <GlassCard className="flex flex-col items-center justify-center py-4 border-l-0 border-t-2 border-t-[#FF6B6B]">
            <Activity className="text-[#FF6B6B] mb-2" size={24} />
            <span className="text-2xl font-bold font-mono text-white">{recentAlerts}</span>
            <span className="text-[10px] text-gray-400 uppercase">Hits (24h)</span>
        </GlassCard>
        <GlassCard 
            onClick={onNavigateToCombat}
            className="flex flex-col items-center justify-center py-4 border-l-0 border-t-2 border-t-[#FF6B6B] cursor-pointer hover:bg-[#FF6B6B]/10 transition-colors"
        >
            <AlertTriangle className="text-[#FF6B6B] mb-2 animate-pulse" size={24} />
            <span className="text-2xl font-bold font-mono text-[#FF6B6B]">{maxRisk}</span>
            <span className="text-[10px] text-gray-400 uppercase">Max Risk</span>
        </GlassCard>
      </div>

      <div>
        <SectionHeader title="Trap Distribution" subtitle="Network Topology Visualization" />
        <div className="relative h-64 glass-panel rounded-xl overflow-hidden flex items-center justify-center bg-[#051A1A]">
            {/* Abstract Tech Map */}
            <svg viewBox="0 0 300 200" className="w-full h-full opacity-80">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                {/* Connections */}
                <path d="M150,100 L50,150" stroke="#00FF41" strokeWidth="1" strokeOpacity="0.3" />
                <path d="M150,100 L250,150" stroke="#00FF41" strokeWidth="1" strokeOpacity="0.3" />
                <path d="M150,100 L150,40" stroke="#00FF41" strokeWidth="1" strokeOpacity="0.3" />
                <path d="M50,150 L50,180" stroke="#00FF41" strokeWidth="1" strokeOpacity="0.2" />
                <path d="M250,150 L280,120" stroke="#00FF41" strokeWidth="1" strokeOpacity="0.2" />
                
                {/* Central Node */}
                <circle cx="150" cy="100" r="8" fill="#00FF41" filter="url(#glow)">
                    <animate attributeName="r" values="8;10;8" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                </circle>
                
                {/* Satellite Nodes */}
                <circle cx="50" cy="150" r="5" fill="#051A1A" stroke="#00FF41" strokeWidth="2" />
                <circle cx="250" cy="150" r="5" fill="#051A1A" stroke="#00FF41" strokeWidth="2" />
                <circle cx="150" cy="40" r="5" fill="#051A1A" stroke="#00FF41" strokeWidth="2" />
                
                {/* Alert Node (Blinking Red) */}
                <circle cx="280" cy="120" r="6" fill="#FF6B6B">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
                </circle>
            </svg>
            
            <div className="absolute top-2 left-2 flex flex-col gap-1">
                 <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#00FF41]"></div>
                    <span className="text-[10px] text-gray-400">Secure</span>
                 </div>
                 <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#FF6B6B] animate-pulse"></div>
                    <span className="text-[10px] text-gray-400">Compromised</span>
                 </div>
            </div>
        </div>
      </div>

      <div>
        <SectionHeader title="Vuln Trends" subtitle="Exploit Attempts over 24h" />
        <GlassCard className="h-56 p-2">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorExploits" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00FF41" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#00FF41" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tick={{fill: '#64748B', fontSize: 10}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fill: '#64748B', fontSize: 10}} axisLine={false} tickLine={false} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#051A1A', borderColor: '#00FF41', color: '#fff' }} 
                        itemStyle={{ color: '#00FF41' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="exploits" 
                        stroke="#00FF41" 
                        fillOpacity={1} 
                        fill="url(#colorExploits)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
};
