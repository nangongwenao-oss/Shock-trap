import { TrapConfig, CountermeasureResult } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  login: async (username: string, password: string): Promise<{ token: string } | null> => {
    await delay(1500); // Simulate network latency
    if (username === 'luoyuan881105' && password === '123456') {
      return { token: 'shk_token_' + Math.random().toString(36).substr(2) };
    }
    return null;
  },

  deployTrap: async (config: Omit<TrapConfig, 'id' | 'status' | 'deployedAt'>): Promise<TrapConfig> => {
    await delay(2000);
    return {
      ...config,
      id: `TRAP-${Math.floor(Math.random() * 1000)}`,
      status: 'ACTIVE',
      deployedAt: new Date().toLocaleString(),
    };
  },

  executeCountermeasure: async (trapId: string, actionType: 'DENY' | 'TRACE' | 'BAS'): Promise<CountermeasureResult> => {
    await delay(1200);
    // Simulate logic
    let message = '';
    if (actionType === 'DENY') {
      message = `[BLOCK] Active Defense Triggered. IO Stream Severed for ${trapId}.`;
    } else if (actionType === 'TRACE') {
      message = `[TRACE] Sticky Tag Applied. Tracking logic injected into session.`;
    } else {
      message = `[BAS] Breach Simulation initiated against ${trapId}.`;
    }

    return {
      success: true,
      message,
      timestamp: new Date().toLocaleTimeString(),
    };
  },
  
  generateTraceReport: async (): Promise<boolean> => {
      await delay(3000);
      return true;
  }
};
