
import React from 'react';

interface WelcomeStepProps {
  onStart: () => void;
}

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-rose-500 animate-float">
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-1.344-.688 18.25 18.25 0 0 1-4.433-3.64C2.007 13.91 1.036 11.139 1.59 8.239c.545-2.853 2.859-5.167 5.76-5.759 2.164-.436 4.398.396 5.657 2.243a.75.75 0 0 0 1.254-.627V3.75a.75.75 0 0 0-.75-.75h-.5a.75.75 0 0 0-.75.75v.223c-1.328-2.228-3.799-3.417-6.31-2.922-3.34.668-5.996 3.49-6.495 6.883-1.02 6.725 3.183 11.233 8.354 14.122a16.74 16.74 0 0 0 1.636.852l.095.044a.75.75 0 0 0 .864-.13L21.92 12.37a.75.75 0 1 0-1.06-1.06l-8.156 8.157-.015-.008Z" />
    </svg>
);


const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="text-center p-8 bg-white rounded-2xl shadow-xl animate-fade-in">
        <div className="flex justify-center mb-6">
            <HeartIcon />
        </div>
        <h1 className="text-5xl font-display text-rose-600 mb-4">Qonfess to your Qrush!?!</h1>
        <p className="text-slate-600 mb-8 max-w-xs mx-auto">
            Are you ready to win over your crush with the perfect confession?
        </p>
        <button
            onClick={onStart}
            className="w-full bg-rose-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-300 shadow-lg"
        >
            Let's begin the rizz
        </button>
    </div>
  );
};

export default WelcomeStep;
