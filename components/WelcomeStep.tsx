import React from 'react';
import logoUrl from '../images/logo.svg'; 


interface WelcomeStepProps {
  onStart: () => void;
}

const HeartIcon = () => (
    <img
        src={logoUrl} // Use the imported URL
        alt="Logo"
        className="w-16 h-16 animate-float"
    />
);


const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="text-center p-8 bg-white rounded-2xl shadow-xl animate-fade-in">
        <div className="flex justify-center mb-6">
            <HeartIcon />
        </div>
        <h1 className="text-5xl font-extrabold text-rose-600 mb-4">Qonfess to your Qrush!?!</h1>
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
