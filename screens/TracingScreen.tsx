import React, { useState } from 'react';
import { SectionHeader, GlassCard, Button } from '../components/Shared';
import { api } from '../services/api';
import { FileText, UserX, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const TracingScreen: React.FC = () => {
    const [generating, setGenerating] = useState(false);
    const [reportReady, setReportReady] = useState(false);

    const handleGenerateReport = async () => {
        setGenerating(true);
        await api.generateTraceReport();
        setGenerating(false);
        setReportReady(true);
    };

    return (
        <div className="pb-24 pt-4 px-4 space-y-6">
            <SectionHeader title="Actor Profiling" subtitle="Attack Path & Attribution" />

            {/* Attack Path Visualization */}
            <div className="relative h-64 border border-[#00FF41]/30 rounded-xl bg-[#051A1A]/50 backdrop-blur overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="100%" height="100%" viewBox="0 0 400 200">
                        {/* Define Gradients/Filters */}
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#00FF41" />
                            </marker>
                        </defs>
                        
                        {/* Nodes */}
                        <g>
                            {/* Attacker */}
                            <circle cx="50" cy="100" r="20" fill="#FF6B6B" opacity="0.2" />
                            <circle cx="50" cy="100" r="5" fill="#FF6B6B" />
                            <text x="50" y="140" textAnchor="middle" fill="#FF6B6B" fontSize="10" fontFamily="monospace">UNKNOWN ACTOR</text>

                            {/* Firewall (Bypassed) */}
                            <rect x="120" y="80" width="10" height="40" fill="#444" />
                            
                            {/* Trap Node */}
                            <circle cx="250" cy="100" r="15" fill="#00FF41" opacity="0.2">
                                <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="250" cy="100" r="6" fill="#00FF41" />
                            <text x="250" y="140" textAnchor="middle" fill="#00FF41" fontSize="10" fontFamily="monospace">HONEYPOT DB</text>

                            {/* Links */}
                            <path d="M70,100 L120,100" stroke="#FF6B6B" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="5,2" />
                            <path d="M130,100 L230,100" stroke="#00FF41" strokeWidth="2" markerEnd="url(#arrow)">
                                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" />
                            </path>
                        </g>
                    </svg>
                 </div>
                 <div className="absolute top-2 right-2 px-2 py-1 bg-[#00FF41]/20 rounded text-[10px] text-[#00FF41] font-mono border border-[#00FF41]">
                    TRACE: ACTIVE
                 </div>
            </div>

            {/* Profile Card */}
            <GlassCard className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[#00FF41]/20 pb-4">
                    <div className="p-3 bg-[#FF6B6B]/10 rounded-full border border-[#FF6B6B]/50">
                        <UserX className="text-[#FF6B6B]" size={24} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold font-mono">APT-28 SIMULACRUM</h3>
                        <p className="text-xs text-gray-400">Confidence Score: 92%</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <h4 className="text-[#00FF41] text-xs font-bold font-mono">OBSERVED TTPs (MITRE ATT&CK)</h4>
                    <div className="flex flex-wrap gap-2">
                        {['T1190 Exploit Public App', 'T1059 Command & Scripting', 'T1083 File Discovery'].map(tag => (
                            <span key={tag} className="px-2 py-1 bg-[#051A1A] border border-gray-700 text-gray-300 text-[10px] rounded font-mono">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="pt-2">
                     <div className="flex items-center justify-between text-xs bg-[#00FF41]/10 p-2 rounded border border-[#00FF41]/30">
                        <span className="text-[#00FF41]">SENSITIVE DATA STATUS</span>
                        <span className="font-bold text-[#00FF41]">BLOCKED</span>
                     </div>
                </div>
            </GlassCard>

            <Button onClick={handleGenerateReport} isLoading={generating} block>
                {reportReady ? (
                    <span className="flex items-center gap-2"><Share2 size={16}/> SHARE FORENSIC REPORT</span>
                ) : (
                    <span className="flex items-center gap-2"><FileText size={16}/> GENERATE FULL REPORT</span>
                )}
            </Button>
        </div>
    );
};
