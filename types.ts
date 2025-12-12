export type ScreenName = 'LOGIN' | 'OVERVIEW' | 'DEPLOYMENT' | 'COMBAT' | 'TRACING';

export interface User {
  username: string;
  token: string;
}

export interface TrapConfig {
  id: string;
  targetSystem: string;
  vulnType: '0day' | 'Existing';
  filePath: string;
  strategy: 'DENY' | 'TRACE';
  status: 'ACTIVE' | 'DORMANT' | 'TRIGGERED';
  deployedAt: string;
}

export interface Alert {
  id: string;
  trapId: string;
  timestamp: string;
  sourceIp: string;
  riskScore: number; // 0-100
  status: 'NEW' | 'HANDLED';
  description: string;
}

export interface CountermeasureResult {
  success: boolean;
  message: string;
  timestamp: string;
}

export enum ThemeColor {
  Background = '#051A1A',
  Primary = '#00FF41',
  Warning = '#FF6B6B',
  TextMuted = '#64748B',
}
