
import React, { useRef, useEffect, useState, useCallback } from 'react';

interface CameraStepProps {
  onPhotoCapture: (image: string) => void;
}

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
        <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
        <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.152-.177.465-.067.87-.327 1.11-.71l.821-1.317a3.001 3.001 0 0 1 2.332-1.39ZM12 15.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
    </svg>
);


const CameraStep: React.FC<CameraStepProps> = ({ onPhotoCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 400, height: 400 } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access the camera. Please check permissions and try again.");
      }
    };
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePicture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        // Flip the image horizontally for a mirror effect
        context.translate(video.videoWidth, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        // Reset transform to avoid affecting other canvas operations
        context.setTransform(1, 0, 0, 1, 0, 0);
      }
      setHasPhoto(true);
    }
  }, []);

  const confirmPhoto = useCallback(() => {
    if (canvasRef.current) {
      const image = canvasRef.current.toDataURL('image/png');
      onPhotoCapture(image);
    }
  }, [onPhotoCapture]);
  
  const retakePhoto = useCallback(() => {
    setHasPhoto(false);
  }, []);

  if (error) {
    return (
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Camera Error</h2>
            <p className="text-slate-600">{error}</p>
        </div>
    )
  }

  return (
    <div className="text-center p-6 bg-white rounded-2xl shadow-xl animate-fade-in">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Step 1: The Face Card</h2>
        <p className="text-slate-500 mb-4">Smile!</p>
        
        <div className="relative w-full aspect-square bg-slate-200 rounded-lg overflow-hidden mb-4">
            <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover transform -scale-x-100 ${hasPhoto ? 'hidden' : ''}`}></video>
            <canvas ref={canvasRef} className={`w-full h-full object-cover ${!hasPhoto ? 'hidden' : ''}`}></canvas>
        </div>

        {!hasPhoto ? (
            <button onClick={takePicture} className="w-full flex items-center justify-center bg-rose-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <CameraIcon />
                Take Picture
            </button>
        ) : (
            <div className="grid grid-cols-2 gap-4">
                <button onClick={retakePhoto} className="w-full bg-slate-300 text-slate-800 font-bold py-3 px-6 rounded-lg hover:bg-slate-400 transition-all duration-300">
                    Retake
                </button>
                <button onClick={confirmPhoto} className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-[#3AA563] transition-all duration-300">
                    Oh yeah babey
                </button>
            </div>
        )}
    </div>
  );
};

export default CameraStep;
