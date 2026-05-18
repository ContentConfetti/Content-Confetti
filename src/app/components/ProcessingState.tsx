import { useEffect, useState } from 'react';
import { Sparkles, FileText, Video, MessageSquare, CheckCircle, Instagram, Twitter } from 'lucide-react';

interface ProcessingStateProps {
  fileName: string;
  onComplete: () => void;
}

export function ProcessingState({ fileName, onComplete }: ProcessingStateProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Sparkles, label: 'Transcribing audio', color: '#00D4FF' },
    { icon: FileText, label: 'Extracting key insights', color: '#FF1B8D' },
    { icon: Instagram, label: 'Generating Instagram content', color: '#A855F7' },
    { icon: Twitter, label: 'Creating Twitter threads', color: '#00D4FF' },
    { icon: MessageSquare, label: 'Crafting social posts', color: '#10B981' },
    { icon: Video, label: 'Creating video scripts', color: '#FFD700' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white p-8">
      <div className="mb-12 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1B8D] to-[#00D4FF] shadow-2xl shadow-pink-500/30">
          <Sparkles className="h-10 w-10 animate-pulse text-white" />
        </div>
        <h2 className="mb-3 text-4xl font-bold text-gray-900">
          Creating Your Content Magic ✨
        </h2>
        <p className="text-gray-600">Processing: {fileName}</p>
      </div>

      <div className="w-full max-w-2xl space-y-3">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              className={`flex items-center gap-4 rounded-2xl border p-5 transition-all ${
                isCurrent
                  ? 'scale-105 border-transparent bg-white shadow-xl'
                  : isCompleted
                  ? 'border-gray-200 bg-white'
                  : 'border-gray-100 bg-gray-50 opacity-60'
              }`}
            >
              <div
                className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-lg transition-all ${
                  isCurrent ? 'animate-pulse' : ''
                }`}
                style={{
                  background: isCompleted || isCurrent
                    ? `linear-gradient(135deg, ${step.color}, ${step.color}dd)`
                    : '#e5e7eb',
                }}
              >
                {isCompleted ? (
                  <CheckCircle className="h-7 w-7 text-white" />
                ) : (
                  <step.icon className="h-7 w-7 text-white" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-lg font-semibold ${isCurrent ? 'text-gray-900' : 'text-gray-700'}`}>
                  {step.label}
                </p>
              </div>
              {isCurrent && (
                <div className="flex gap-1.5">
                  <div
                    className="h-2.5 w-2.5 animate-bounce rounded-full"
                    style={{ backgroundColor: step.color, animationDelay: '0ms' }}
                  />
                  <div
                    className="h-2.5 w-2.5 animate-bounce rounded-full"
                    style={{ backgroundColor: step.color, animationDelay: '150ms' }}
                  />
                  <div
                    className="h-2.5 w-2.5 animate-bounce rounded-full"
                    style={{ backgroundColor: step.color, animationDelay: '300ms' }}
                  />
                </div>
              )}
              {isCompleted && (
                <div className="rounded-full bg-[#10B981]/10 px-3 py-1 text-sm font-semibold text-[#10B981]">
                  Done
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        Hang tight! We're creating amazing content for you...
      </div>
    </div>
  );
}
