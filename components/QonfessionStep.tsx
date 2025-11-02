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
    'Fabricating impressive achievements...',
    'Consulting the romance oracle...',
    'Calibrating charm levels...',
    'Brewing a love potion...',
    'Downloading rizz.exe...',
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
      '../images/m1.jpg', // Assuming images are in public/images/
      '../images/m2.jpg',
      '../images/m3.jpg',
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

  // Success State View
  if (showSuccess) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-8 bg-slate-100/70 backdrop-blur-sm z-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl animate-fade-in max-w-lg w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            She said YES! (kinda)
          </h2>
          <p className="text-slate-600 mb-8">
            You've successfully navigated your own simulation. Now go ask them for
            real! You got this.
          </p>
          <button
            onClick={onReset}
            className="w-full bg-rose-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-rose-600 transition-all duration-300"
          >
            Start Over
          </button>
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
          <div className="text-center flex-grow flex items-center justify-center mb-12 max-w-2xl">
            {loading && <LoadingMessage />}
            {error && <p className="text-red-500 text-2xl">{error}</p>}
            {accomplishments && !loading && (
              <p className="text-slate-700 italic text-2xl font-serif leading-relaxed">"{accomplishments}"</p>
            )}
          </div>

          {/* Buttons Area */}
          <div className="mt-auto md:mt-12 text-center w-full max-w-md">
            <p className="text-3xl font-extrabold text-slate-800 mb-6">
              Will you go out with me?
            </p>
            <div
              className={`grid ${
                isDodging ? 'grid-cols-1' : 'grid-cols-2'
              } gap-6 h-16`}
            >
              <button
                onClick={() => setShowSuccess(true)}
                className="w-full bg-green-500 text-white font-bold text-xl py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                Yes
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
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QonfessionStep;