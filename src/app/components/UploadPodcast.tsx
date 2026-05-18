import { useCallback, useState } from 'react';
import { Upload, Mic, X, FileAudio } from 'lucide-react';

interface UploadPodcastProps {
  onUpload: (file: File) => void;
}

export function UploadPodcast({ onUpload }: UploadPodcastProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleProcess = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-8">
      <div className="mb-8 text-center">
        <h2 className="mb-3 bg-gradient-to-r from-[#FF1B8D] via-[#FF69B4] to-[#00D4DD] bg-clip-text text-transparent">
          Upload Your Podcast
        </h2>
        <p className="text-white/70">
          Drag and drop your audio file or click to browse
        </p>
      </div>

      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative w-full max-w-2xl rounded-3xl border-2 border-dashed p-12 transition-all ${
          isDragging
            ? 'border-[#00D4DD] bg-[#00D4DD]/10'
            : 'border-white/20 bg-white/5'
        }`}
      >
        {!selectedFile ? (
          <div className="flex flex-col items-center gap-6">
            <div className="rounded-full bg-gradient-to-br from-[#FF1B8D] to-[#00D4DD] p-6">
              <Upload className="h-12 w-12 text-white" />
            </div>
            <div className="text-center">
              <p className="mb-2 text-white">
                Drop your podcast file here
              </p>
              <p className="text-sm text-white/50">
                or
              </p>
            </div>
            <label className="cursor-pointer rounded-full bg-white/10 px-6 py-3 text-white transition-all hover:bg-white/20">
              <span>Browse Files</span>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            <p className="text-sm text-white/40">
              Supported formats: MP3, WAV, M4A • Max 3 hours
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
              <div className="rounded-xl bg-gradient-to-br from-[#FF1B8D] to-[#00D4DD] p-3">
                <FileAudio className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white">{selectedFile.name}</p>
                <p className="text-sm text-white/50">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={handleProcess}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#FF1B8D] to-[#00D4DD] px-8 py-4 shadow-2xl transition-transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-20" />
              <div className="relative flex items-center justify-center gap-3">
                <Mic className="h-6 w-6 text-white" />
                <span className="text-white">Generate Content</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
