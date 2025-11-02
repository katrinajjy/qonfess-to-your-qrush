
export enum PerformativeLevel {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export interface CrushDetails {
  major: string;
  interests: string;
  performativeLevel: PerformativeLevel;
}

export type AppStep = 'welcome' | 'camera' | 'form' | 'qonfession';
