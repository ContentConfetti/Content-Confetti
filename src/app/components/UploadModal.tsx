import { X, Upload, Mic, Video, FileText, Link2, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface UploadModalProps {
  onClose: () => void;
  onUploadComplete: (file: File, type: string) => void;
}

export function UploadModal({ onClose, onUploadComplete }: UploadModalProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const contentTypes = [
    {
      id: 'podcast',
      title: 'Podcast Audio',
      description: 'MP3, WAV, M4A files',
      icon: Mic,
      gradient: 'from-[#FF1B8D] to-[#FF6B6B]',
      accepts: 'audio/*',
    },
    {
      id: 'video',
      title: 'Video File',
      description: 'MP4, MOV, AVI files',
      icon: Video,
      gradient: 'from-[#00D4FF] to-[#A855F7]',
      accepts: 'video/*',
    },
    {
      id: 'youtube',
      title: 'YouTube Link',
      description: 'Paste any YouTube URL',
      icon: Link2,
      gradient: 'from-[#FFD700] to-[#FF6B6B]',
      accepts: null,
    },
    {
      id: 'text',
      title: 'Written Content',
      description: 'Blog posts, articles, docs',
      icon: FileText,
      gradient: 'from-[#10B981] to-[#00D4FF]',
      accepts: '.txt,.doc,.docx,.pdf',
    },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setSelectedType(type);
    }
  };

  const handleProcess = () => {
    if (uploadedFile && selectedType) {
      onUploadComplete(uploadedFile, selectedType);
    } else if (youtubeUrl && selectedType === 'youtube') {
      // Create a placeholder file for YouTube URL
      const blob = new Blob([youtubeUrl], { type: 'text/plain' });
      const file = new File([blob], 'youtube-video.txt', { type: 'text/plain' });
      onUploadComplete(file, 'youtube');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1B8D] to-[#00D4FF] shadow-lg">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-gray-900">
              Upload Your Content
            </h2>
            <p className="text-gray-600">
              Choose your content type and let AI do the magic
            </p>
          </div>

          {!selectedType ? (
            <>
              <div className="mb-6 rounded-2xl border-2 border-dashed border-[#FFD700] bg-gradient-to-r from-[#FFD700]/10 to-[#FF6B6B]/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1 font-bold text-gray-900">Don't have a file?</h3>
                    <p className="text-sm text-gray-600">Try our sample podcast episode</p>
                  </div>
                  <button
                    onClick={() => {
                      const sampleFile = new File(['sample podcast content'], 'Sample Podcast - Building in Public.mp3', { type: 'audio/mpeg' });
                      setUploadedFile(sampleFile);
                      setSelectedType('podcast');
                    }}
                    className="rounded-full bg-gradient-to-r from-[#FFD700] to-[#FF6B6B] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105"
                  >
                    Use Sample File
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {contentTypes.map((type) => (
                  <label
                    key={type.id}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-[#FF1B8D]/50 hover:shadow-xl"
                  >
                    {type.accepts ? (
                      <input
                        type="file"
                        accept={type.accepts}
                        onChange={(e) => handleFileSelect(e, type.id)}
                        className="hidden"
                      />
                    ) : (
                      <div onClick={() => setSelectedType(type.id)} />
                    )}

                    <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${type.gradient} shadow-lg transition-transform group-hover:scale-110`}>
                      <type.icon className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-gray-900">{type.title}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>

                    <div className="absolute bottom-4 right-4 text-[#FF1B8D] opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </label>
                ))}
              </div>
            </>
          ) : selectedType === 'youtube' && !uploadedFile ? (
            <div>
              <button
                onClick={() => {
                  setSelectedType(null);
                  setYoutubeUrl('');
                }}
                className="mb-6 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                ← Back to content types
              </button>

              <div className="mb-6 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FF6B6B] shadow-lg">
                  <Link2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Paste YouTube URL</h3>
                <p className="mb-6 text-gray-600">We'll download and transcribe it for you</p>

                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-center outline-none transition-colors focus:border-[#FF1B8D] focus:ring-2 focus:ring-[#FF1B8D]/20"
                />
              </div>

              {youtubeUrl && (
                <button
                  onClick={handleProcess}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF1B8D] to-[#00D4FF] px-8 py-4 font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105"
                >
                  <Sparkles className="h-5 w-5" />
                  Process Video
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
            </div>
          ) : uploadedFile ? (
            <div>
              <button
                onClick={() => {
                  setSelectedType(null);
                  setUploadedFile(null);
                }}
                className="mb-6 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                ← Choose different file
              </button>

              <div className="mb-6 rounded-2xl border-2 border-[#10B981] bg-[#10B981]/5 p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#10B981] text-2xl">
                    ✓
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{uploadedFile.name}</div>
                    <div className="text-sm text-gray-600">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 font-semibold text-gray-900">AI will generate:</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    '📝 Instagram captions',
                    '🐦 Twitter threads',
                    '💼 LinkedIn posts',
                    '📌 Pinterest descriptions',
                    '🎬 TikTok scripts',
                    '📧 Email newsletters',
                    '🔑 SEO keywords',
                    '# Hashtag suggestions',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#FF1B8D]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleProcess}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF1B8D] to-[#00D4FF] px-8 py-4 font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105"
              >
                <Sparkles className="h-5 w-5" />
                Generate Content
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
