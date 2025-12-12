import { TrapConfig, Alert } from './types';

export const APP_NAME = "ShockMonitor";
export const APP_VERSION = "v3.1.0";

export const MOCK_TRAPS: TrapConfig[] = [
  { id: 'TRAP-X99', targetSystem: 'DB-Core-01', vulnType: '0day', filePath: '/etc/shadow.bak', strategy: 'DENY', status: 'ACTIVE', deployedAt: '2023-10-26 14:00' },
  { id: 'TRAP-A12', targetSystem: 'Web-Front-02', vulnType: 'Existing', filePath: '/var/www/html/admin.php', strategy: 'TRACE', status: 'TRIGGERED', deployedAt: '2023-10-25 09:30' },
  { id: 'TRAP-B05', targetSystem: 'API-Gateway', vulnType: '0day', filePath: '/config/keys.json', strategy: 'TRACE', status: 'ACTIVE', deployedAt: '2023-10-27 11:15' },
];

export const MOCK_ALERTS: Alert[] = [
  { id: 'ALT-8821', trapId: 'TRAP-A12', timestamp: '10:42:15', sourceIp: '192.168.44.12', riskScore: 95, status: 'NEW', description: 'Unauthorized access attempt on decoy admin panel.' },
  { id: 'ALT-8820', trapId: 'TRAP-B05', timestamp: '09:15:00', sourceIp: '45.33.22.11', riskScore: 75, status: 'HANDLED', description: 'Port scan detected on honeycomb node.' },
];
