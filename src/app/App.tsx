import { useEffect, useRef, useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { UploadModal } from './components/UploadModal';
import { ProcessingState } from './components/ProcessingState';
import { AIContentStudio } from './components/AIContentStudio';

type AppState = 'landing' | 'dashboard' | 'processing' | 'studio';

const COLORS = ['#FF1B8D', '#00D4FF', '#FFD700', '#A855F7', '#10B981', '#FF6B6B'];

function ConfettiPiece({ id }: { id: number }) {
  const color = COLORS[id % COLORS.length];
  const left = `${Math.random() * 100}%`;
  const delay = `${Math.random() * 3}s`;
  const duration = `${3 + Math.random() * 4}s`;
  const size = `${6 + Math.random() * 8}px`;
  const isCircle = Math.random() > 0.5;
  return (
    <div
      style={{
        position: 'fixed',
        left,
        top: '-20px',
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: isCircle ? '50%' : '2px',
        animation: `confettiFall ${duration} ${delay} linear infinite`,
        zIndex: 50,
        pointerEvents: 'none',
        rotate: `${Math.random() * 360}deg`,
      }}
    />
  );
}

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedType, setUploadedType] = useState<string>('');
  const pieces = useRef(Array.from({ length: 40 }, (_, i) => i));

  const handleGetStarted = () => {
    setCurrentState('dashboard');
  };

  const handleOpenUpload = () => {
    setShowUploadModal(true);
  };

  const handleCloseUpload = () => {
    setShowUploadModal(false);
  };

  const handleUploadComplete = (file: File, type: string) => {
    setUploadedFile(file);
    setUploadedType(type);
    setShowUploadModal(false);
    setCurrentState('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentState('studio');
  };

  const handleBackToDashboard = () => {
    setCurrentState('dashboard');
    setUploadedFile(null);
    setUploadedType('');
  };

  const handleOpenProject = (id: string) => {
    // Simulate opening an existing project
    const mockFile = new File(['mock'], 'Existing Project.mp3', { type: 'audio/mpeg' });
    setUploadedFile(mockFile);
    setUploadedType('podcast');
    setCurrentState('studio');
  };

  return (
    <div className="relative size-full bg-white">
      <style>{`@keyframes confettiFall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`}</style>
      {pieces.current.map(id => <ConfettiPiece key={id} id={id} />)}

      <div className="relative z-10 min-h-full">
        {currentState === 'landing' && (
          <LandingPage onGetStarted={handleGetStarted} />
        )}

        {currentState === 'dashboard' && (
          <Dashboard
            onOpenUpload={handleOpenUpload}
            onOpenProject={handleOpenProject}
          />
        )}

        {currentState === 'processing' && uploadedFile && (
          <ProcessingState
            fileName={uploadedFile.name}
            onComplete={handleProcessingComplete}
          />
        )}

        {currentState === 'studio' && uploadedFile && (
          <AIContentStudio
            fileName={uploadedFile.name}
            onBack={handleBackToDashboard}
          />
        )}

        {showUploadModal && (
          <UploadModal
            onClose={handleCloseUpload}
            onUploadComplete={handleUploadComplete}
          />
        )}
      </div>
    </div>
  );
}
