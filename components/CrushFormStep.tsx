
import React, { useState, useCallback } from 'react';
import { CrushDetails, PerformativeLevel } from '../types';

interface CrushFormStepProps {
  onFormSubmit: (details: CrushDetails) => void;
}

const CrushFormStep: React.FC<CrushFormStepProps> = ({ onFormSubmit }) => {
  const [major, setMajor] = useState('');
  const [interests, setInterests] = useState('');
  const [performativeLevel, setPerformativeLevel] = useState<PerformativeLevel>(PerformativeLevel.Medium);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (major && interests) {
      onFormSubmit({ major, interests, performativeLevel });
    }
  }, [major, interests, performativeLevel, onFormSubmit]);

  const levelOptions = [
    { value: PerformativeLevel.Low, label: 'Subtle Flex', description: 'Humble but intriguing.' },
    { value: PerformativeLevel.Medium, label: 'Impressive', description: 'Grounded but notable.' },
    { value: PerformativeLevel.High, label: 'God Tier', description: 'Absolutely unhinged.' },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Step 2: The Intel</h2>
      <p className="text-slate-500 mb-6 text-center">Tell us about your crush to tailor the perfect lies.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="major" className="block text-sm font-medium text-slate-700 mb-1">
            Crush's Major
          </label>
          <input
            type="text"
            id="major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="e.g., Computer Science, Art History"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 transition"
          />
        </div>

        <div>
          <label htmlFor="interests" className="block text-sm font-medium text-slate-700 mb-1">
            Crush's Interests
          </label>
          <textarea
            id="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g., Hiking, vintage films, bouldering"
            required
            rows={3}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 transition"
          />
        </div>
        
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Performative Male Meter</label>
            <div className="space-y-2">
                {levelOptions.map(opt => (
                     <label key={opt.value} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${performativeLevel === opt.value ? 'bg-rose-100 border-rose-500 ring-2 ring-rose-300' : 'border-slate-300 hover:bg-slate-50'}`}>
                        <input
                            type="radio"
                            name="performativeLevel"
                            value={opt.value}
                            checked={performativeLevel === opt.value}
                            onChange={() => setPerformativeLevel(opt.value)}
                            className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-slate-300"
                        />
                        <span className="ml-3 text-sm">
                            <span className="font-bold text-slate-800">{opt.label}</span>
                            <span className="text-slate-500 block">{opt.description}</span>
                        </span>
                    </label>
                ))}
            </div>
        </div>


        <button
          type="submit"
          disabled={!major || !interests}
          className="w-full bg-rose-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-300 shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none"
        >
          Generate Qonfession
        </button>
      </form>
    </div>
  );
};

export default CrushFormStep;
