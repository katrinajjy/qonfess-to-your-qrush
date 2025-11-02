
import React, { useState, useCallback } from 'react';
import { AppStep, CrushDetails } from './types';
import WelcomeStep from './components/WelcomeStep';
import CameraStep from './components/CameraStep';
import CrushFormStep from './components/CrushFormStep';
import QonfessionStep from './components/QonfessionStep';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('welcome');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [crushDetails, setCrushDetails] = useState<CrushDetails | null>(null);

  const handleStart = useCallback(() => {
    setStep('camera');
  }, []);

  const handlePhotoCapture = useCallback((image: string) => {
    setUserImage(image);
    setStep('form');
  }, []);

  const handleFormSubmit = useCallback((details: CrushDetails) => {
    setCrushDetails(details);
    setStep('qonfession');
  }, []);

  const handleReset = useCallback(() => {
    setUserImage(null);
    setCrushDetails(null);
    setStep('welcome');
  }, []);

  const renderStep = () => {
    switch (step) {
      case 'camera':
        return <CameraStep onPhotoCapture={handlePhotoCapture} />;
      case 'form':
        return <CrushFormStep onFormSubmit={handleFormSubmit} />;
      case 'qonfession':
        if (!userImage || !crushDetails) {
            handleReset(); // Should not happen, but as a fallback
            return null;
        }
        return <QonfessionStep userImage={userImage} crushDetails={crushDetails} onReset={handleReset} />;
      case 'welcome':
      default:
        return <WelcomeStep onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#9E1839] w-full flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full max-w-md mx-auto">
        {renderStep()}
      </main>
    </div>
  );
};

export default App;
