import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CrushDetails } from '../types';
import { generateAccomplishments } from '../services/geminiService';

interface QonfessionStepProps {
  userImage: string;
  crushDetails: CrushDetails;
  onReset: () => void;
}

// --- Loading Message Component ---
const LoadingMessage: React.FC = () => {
  const messages = [
    'Compiling impressive achievements...',
    'Imaging our futures together...',
    'Consulting LinkedIns...',
    'Please please please...',
    'Chat is this rizz...',
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

// --- Qonfession Step Component ---
const QonfessionStep: React.FC<QonfessionStepProps> = ({
  userImage,
  crushDetails,
  onReset,
}) => {
  const [loading, setLoading] = useState(true);
  const [accomplishments, setAccomplishments] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  // ADDED: New state for the certificate view
  const [showCertificate, setShowCertificate] = useState(false); 
  const [noButtonPosition, setNoButtonPosition] = useState({
    top: 0,
    left: 0,
    position: 'relative' as 'relative' | 'absolute',
  });
  const [isDodging, setIsDodging] = useState(false);
  
  // STATE ADDED for Random Background Image
  const [selectedBackground, setSelectedBackground] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Effect to generate accomplishments and select random background
  useEffect(() => {
    // 1. Random Background Selection Logic
    const backgroundImages = [
      '/images/m1.jpg', // Assuming images are in public/images/
      '/images/m2.jpg',
      '/images/m3.jpg',
    ];
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setSelectedBackground(backgroundImages[randomIndex]);


    // 2. Accomplishments Generation Logic
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

  // Callback to move the "No" button
  const moveNoButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;
    if (!isDodging) setIsDodging(true);

    const container = containerRef.current;
    const button = noButtonRef.current;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // Calculate new random position within the container bounds
    const newTop = Math.random() * (containerRect.height - buttonRect.height);
    const newLeft = Math.random() * (containerRect.width - buttonRect.width);

    setNoButtonPosition({
      top: newTop,
      left: newLeft,
      position: 'absolute',
    });
  }, [isDodging]);

  // NEW HANDLER: To manage the two-stage success transition
  const handleYes = useCallback(() => {
    setShowSuccess(true);
    // Delay the appearance of the certificate
    setTimeout(() => {
      setShowCertificate(true);
    }, 1500);
  }, []);

  // --- Success State View STAGE 1 (Immediate Success Message) ---
  if (showSuccess && !showCertificate) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-8 bg-[#3AA563] backdrop-blur-sm z-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl animate-fade-in max-w-lg w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            You said YES!!!
          </h2>
          <p className="text-slate-600 mb-8">
            Our date is now legally binding 💍
          </p>
        </div>
      </div>
    );
  }

  // --- Success State View STAGE 2 (Marriage Certificate) ---
  if (showCertificate) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-8 bg-[#3AA563]/80 backdrop-blur-sm z-50">
        <div 
            // Certificate styling for slow emergence
            className="p-12 bg-white rounded-lg shadow-2xl w-full max-w-2xl border-8 border-double border-rose-500 transform scale-0 animate-fade-in"
            style={{ animationFillMode: 'forwards', animationDuration: '0.8s' }} 
        >
          <div className="text-center font-serif">
            <h1 className="text-5xl font-extrabold text-rose-700 mb-4 tracking-wider">
              CERTIFICATE OF LEGALLY BINDING DATE
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              This document certifies the immediate and unbreakable **Commitment to Co-create Meaningful Experiences** between:
            </p>
            
            {/* Signature Area */}
            <div className="mt-12 space-y-10">
              <p className="text-3xl font-display text-slate-900 mb-2 border-b border-dashed border-slate-400 pb-1">
                {crushDetails?.name || "ME:)))"}
              </p>
              <p className="text-lg text-slate-500 mb-8">
                The Recipient of Optimal Attention
              </p>
              
              <div className="relative border-b-2 border-slate-900 mx-auto max-w-sm">
                <input 
                    type="text" 
                    placeholder="Sign your name here..." 
                    className="w-full text-center text-2xl font-handwriting bg-transparent focus:outline-none"
                />
              </div>
              <p className="text-lg text-slate-500">
                The Proactive Confessor (Sign Above)
              </p>
            </div>
            
            <button
              onClick={onReset}
              className="mt-12 w-full bg-rose-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-rose-600 transition-all duration-300"
            >
              Document Complete: Begin Dating
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Confession View
  return (
    // Fixed Centering Wrapper with 2rem margin (p-8)
    <div className="fixed inset-0 flex items-center justify-center p-8">
      {/* THE CARD CONTENT DIV - Relative size, horizontal layout */}
      <div
        ref={containerRef}
        className="relative p-8 bg-white rounded-2xl shadow-xl animate-fade-in
                   w-full h-full max-w-7xl max-h-5xl
                   flex flex-col md:flex-row gap-8 md:gap-12 overflow-hidden"
      >
        {/* Image Area - Given 2/5 width on md screens (WIDER) */}
        <div
          className="relative w-full md:w-2/5 h-1/3 md:h-full rounded-lg overflow-hidden shrink-0 bg-rose-200 bg-cover bg-center"
          style={{
            // Dynamic Background Image URL
            backgroundImage: `url('${selectedBackground}')`,
          }}
        >
          <img
            src={userImage} // Still uses the prop for the user's face
            alt="Your face"
            // PROFILE PHOTO POSITIONING: Moved to top-1/4 for higher placement, centered horizontally
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div
            className="absolute bottom-8 left-8 text-white font-display text-4xl"
            style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.7)' }}
          >
            Be Mine?
          </div>
        </div>

        {/* Content Area - Takes remaining 3/5 width, centered vertically */}
        <div className="flex flex-col w-full md:w-3/5 justify-center items-center md:items-start text-center md:text-left p-4 md:p-0">
          
          {/* Accomplishments/Loading Area */}
          <div className="text-center flex-grow flex items-center justify-center flex-col mb-4 max-w-2xl">
            {loading && <LoadingMessage />}
            {error && <p className="text-red-500 text-2xl">{error}</p>}
            
            {accomplishments && !loading && (
              <>
                {/* TITLE */}
                <h3 className="text-xl font-extrabold text-slate-800 mb-4">
                  A Non-Exhaustive List of My Socio-Cultural Achievements
                </h3>
                
                {/* BULLET LIST */}
                <ul className="text-left text-slate-700 font-serif leading-relaxed space-y-2 text-xl md:text-lg">
                  {accomplishments
                    .split('\n')
                    .filter(line => line.startsWith('-'))
                    .map((line, index) => (
                      <li key={index} className="list-disc ml-6">
                        {line.trim().substring(2).trim()}
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>

          {/* Buttons Area */}
          <div className="mt-4 md:mt-4 text-center w-full max-w-xl">
            <p className="text-7xl font-extrabold text-slate-800 mb-6">
              WILL YOU GO OUT WITH ME?
            </p>
            <div
              className={`grid ${
                isDodging ? 'grid-cols-1' : 'grid-cols-2'
              } gap-6 h-16`}
            >
              <button
                onClick={handleYes} // USING NEW HANDLER
                className="w-full bg-green-500 text-white font-bold text-xl py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                Yes 🥰
              </button>
              <button
                ref={noButtonRef}
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="w-full bg-red-500 text-white font-bold text-xl py-3 px-6 rounded-lg hover:bg-red-600 transition-all duration-300"
                style={
                  noButtonPosition.position === 'absolute'
                    ? {
                        position: 'absolute',
                        top: noButtonPosition.top,
                        left: noButtonPosition.left,
                        transition: 'none', // Disable transition when dodging
                      }
                    : {}
                }
              >
                No 🥺
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QonfessionStep;