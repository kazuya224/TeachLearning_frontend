// src/utils/learningHelpers.ts

import type { WeakStatus, StudyStatus, AiLevel } from '../types/learning';

export const getStatusColor = (
  status: WeakStatus,
  studyStatus: StudyStatus = 'todo'
) => {
  if (studyStatus === 'done') {
    return 'bg-gray-50 border-gray-300 text-gray-600';
  }
  switch (status) {
    case 'mastered':
      return 'bg-green-100 border-green-400 text-green-800';
    case 'vague':
      return 'bg-yellow-100 border-yellow-400 text-yellow-800';
    case 'weak':
      return 'bg-red-100 border-red-400 text-red-800';
    case 'partial':
      return 'bg-blue-100 border-blue-400 text-blue-800';
    default:
      return 'bg-gray-100 border-gray-400 text-gray-800';
  }
};

export const getAiLevelInfo = (aiLevel: AiLevel) => {
  switch (aiLevel) {
    case 'critical':
      return {
        symbol: '✕',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        label: '重要度: 高',
      };
    case 'weak':
      return {
        symbol: '△',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        label: '重要度: 中',
      };
    case 'minor':
      return {
        symbol: '○',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        label: '重要度: 低',
      };
    default:
      return {
        symbol: '・',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        label: '重要度: -',
      };
  }
};

export const getStudyStatusInfo = (studyStatus: StudyStatus) => {
  switch (studyStatus) {
    case 'todo':
      return { label: '未着手', color: 'bg-gray-200 text-gray-700' };
    case 'doing':
      return { label: '学習中', color: 'bg-blue-100 text-blue-700' };
    case 'done':
      return { label: '克服済み', color: 'bg-green-100 text-green-700' };
  }
};

export const getStarColor = (status: WeakStatus) => {
  switch (status) {
    case 'mastered':
      return 'from-blue-200 to-white';
    case 'partial':
      return 'from-blue-300 to-blue-100';
    case 'vague':
      return 'from-yellow-300 to-yellow-100';
    case 'weak':
      return 'from-red-400 to-red-200';
    default:
      return 'from-gray-300 to-gray-100';
  }
};

export const getStarShadow = (status: WeakStatus) => {
  switch (status) {
    case 'mastered':
      return 'shadow-[0_0_15px_rgba(59,130,246,0.8)]';
    case 'partial':
      return 'shadow-[0_0_10px_rgba(96,165,250,0.6)]';
    case 'vague':
      return 'shadow-[0_0_10px_rgba(250,204,21,0.6)]';
    case 'weak':
      return 'shadow-[0_0_12px_rgba(239,68,68,0.7)]';
    default:
      return 'shadow-lg';
  }
};

export const getStatusSymbol = (status: WeakStatus) => {
  switch (status) {
    case 'mastered':
      return '◎';
    case 'vague':
      return '△';
    case 'weak':
      return '✕';
    case 'partial':
      return '○';
    default:
      return '・';
  }
};
