
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CrushDetails } from '../types';
import { generateAccomplishments } from '../services/geminiService';

interface QonfessionStepProps {
  userImage: string;
  crushDetails: CrushDetails;
  onReset: () => void;
}

const LoadingMessage: React.FC = () => {
    const messages = [
        "Fabricating impressive achievements...",
        "Consulting the romance oracle...",
        "Calibrating charm levels...",
        "Brewing a love potion...",
        "Downloading rizz.exe...",
    ];
    const [message, setMessage] = useState(messages[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(messages[Math.floor(Math.random() * messages.length)]);
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    return <p className="text-center text-slate-500">{message}</p>;
};

const QonfessionStep: React.FC<QonfessionStepProps> = ({ userImage, crushDetails, onReset }) => {
  const [loading, setLoading] = useState(true);
  const [accomplishments, setAccomplishments] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0, position: 'relative' as 'relative' | 'absolute' });
  const [isDodging, setIsDodging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const getAccomplishments = async () => {
      try {
        setLoading(true);
        const result = await generateAccomplishments(crushDetails);
        setAccomplishments(result);
      } catch (e) {
        setError('Failed to generate your confession. Please try again.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getAccomplishments();
  }, [crushDetails]);
  
  const moveNoButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;
    if (!isDodging) setIsDodging(true);

    const container = containerRef.current;
    const button = noButtonRef.current;
    
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const newTop = Math.random() * (containerRect.height - buttonRect.height);
    const newLeft = Math.random() * (containerRect.width - buttonRect.width);

    setNoButtonPosition({ 
        top: newTop, 
        left: newLeft,
        position: 'absolute'
    });
  }, [isDodging]);

  if (showSuccess) {
    return (
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl animate-fade-in">
             <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">She said YES! (kinda)</h2>
            <p className="text-slate-600 mb-8">
                You've successfully navigated your own simulation. Now go ask them for real! You got this.
            </p>
            <button
                onClick={onReset}
                className="w-full bg-rose-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-rose-600 transition-all duration-300"
            >
                Start Over
            </button>
        </div>
    )
  }

  return (
    <div ref={containerRef} className="relative p-6 bg-white rounded-2xl shadow-xl animate-fade-in w-full max-w-md mx-auto">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-rose-200 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/valentines/400/300')"}}>
            <img src={userImage} alt="Your face" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg" />
            <div className="absolute top-4 left-4 text-white font-display text-2xl" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Be Mine?</div>
        </div>
        
        <div className="text-center min-h-[100px] flex items-center justify-center">
        {loading && <LoadingMessage />}
        {error && <p className="text-red-500">{error}</p>}
        {accomplishments && !loading && (
            <p className="text-slate-700 italic">"{accomplishments}"</p>
        )}
        </div>

        <div className="mt-6 text-center">
            <p className="text-xl font-bold text-slate-800 mb-4">Will you go out with me?</p>
            <div className={`grid ${isDodging ? 'grid-cols-1' : 'grid-cols-2'} gap-4 h-12`}>
                <button 
                    onClick={() => setShowSuccess(true)}
                    className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-300">
                    Yes
                </button>
                <button 
                    ref={noButtonRef}
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                    className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300"
                    style={noButtonPosition.position === 'absolute' ? { position: 'absolute', top: `${noButtonPosition.top}px`, left: `${noButtonPosition.left}px` } : {}}
                >
                    No
                </button>
            </div>
        </div>
    </div>
  );
};

export default QonfessionStep;
