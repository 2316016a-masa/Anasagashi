
import React from 'react';
import { ProfessorType } from '../types';
import { PROFESSOR_CONFIGS } from '../constants';

interface Props {
  selected: ProfessorType;
  onSelect: (type: ProfessorType) => void;
}

export const ProfessorSelection: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-yellow-500 rounded"></span>
        担当教授を選択
      </h3>
      <div className="space-y-3">
        {(Object.keys(PROFESSOR_CONFIGS) as ProfessorType[]).map((type) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all group ${
              selected === type
                ? 'bg-yellow-500/10 border-yellow-500'
                : 'bg-slate-700/50 border-transparent hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`font-bold ${selected === type ? 'text-yellow-500' : 'text-slate-200'}`}>
                {type}
              </span>
              {selected === type && (
                <span className="text-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 group-hover:text-slate-300">
              {PROFESSOR_CONFIGS[type].description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
