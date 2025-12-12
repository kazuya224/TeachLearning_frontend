// src/types/learning.ts

export type Screen = 'home' | 'themeInput' | 'chat' | 'weakpoints' | 'map' | 'history';
export type MessageRole = 'assistant' | 'user';
export type WeakStatus = 'mastered' | 'vague' | 'weak' | 'partial';
export type StudyStatus = 'todo' | 'doing' | 'done';
export type AiLevel = 'critical' | 'weak' | 'minor' | '-';

export interface ChatMessage {
  role: MessageRole;
  text: string;
  turn: number;
}

export interface WeakPoint {
  id: string;
  concept: string;
  status: WeakStatus;
  reason: string;
  relatedTurns: number[];
  suggestion: string;
  aiLevel: AiLevel;
  studyStatus: StudyStatus;
}

export interface UnderstandingNode {
  id: string;
  concept: string;
  status: WeakStatus;
  x: number;
  y: number;
  explanation: string;
  relatedTo: string[];
}

export interface UnderstandingMap {
  center: UnderstandingNode;
  nodes: UnderstandingNode[];
}

export interface SessionData {
  id: string;
  theme: string | null;
  timestamp: string;
  chatMessages: ChatMessage[];
  weakPoints: WeakPoint[];
  understandingMap: UnderstandingMap;
}
