import { FileText, Video, MessageSquare, Download, Copy, Eye, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface ContentItem {
  id: string;
  type: 'blog' | 'video' | 'social';
  title: string;
  preview: string;
  wordCount?: number;
  duration?: string;
  platform?: string;
}

interface ResultsDashboardProps {
  fileName: string;
  onBack: () => void;
  onViewContent: (item: ContentItem) => void;
}

export function ResultsDashboard({ fileName, onBack, onViewContent }: ResultsDashboardProps) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'blog' | 'video' | 'social'>('all');

  const mockResults: ContentItem[] = [
    {
      id: '1',
      type: 'blog',
      title: '5 Key Takeaways from Today\'s Episode',
      preview: 'In this episode, we explored the fascinating world of content creation and how AI is transforming the way we communicate...',
      wordCount: 1200,
    },
    {
      id: '2',
      type: 'blog',
      title: 'The Complete Episode Summary',
      preview: 'A comprehensive breakdown of all the main topics discussed, including expert insights and actionable tips...',
      wordCount: 2500,
    },
    {
      id: '3',
      type: 'video',
      title: 'Best Moment: The Big Reveal',
      preview: 'Clip of the most engaging 60 seconds where the main insight was revealed',
      duration: '0:58',
    },
    {
      id: '4',
      type: 'video',
      title: 'Introduction Snippet',
      preview: 'Perfect for YouTube Shorts or Instagram Reels',
      duration: '0:45',
    },
    {
      id: '5',
      type: 'video',
      title: 'Key Quote Highlight',
      preview: 'The most shareable quote from the episode',
      duration: '0:30',
    },
    {
      id: '6',
      type: 'social',
      title: 'Twitter Thread',
      preview: '1/8 🧵 Just dropped a new episode about content transformation. Here are the key insights...',
      platform: 'Twitter/X',
    },
    {
      id: '7',
      type: 'social',
      title: 'LinkedIn Post',
      preview: 'Exciting insights from today\'s podcast on the future of AI-powered content creation...',
      platform: 'LinkedIn',
    },
    {
      id: '8',
      type: 'social',
      title: 'Instagram Caption',
      preview: '✨ New episode alert! We dove deep into content transformation and the results are mind-blowing...',
      platform: 'Instagram',
    },
  ];

  const filteredResults = selectedTab === 'all'
    ? mockResults
    : mockResults.filter(item => item.type === selectedTab);

  const getIcon = (type: string) => {
    switch (type) {
      case 'blog': return FileText;
      case 'video': return Video;
      case 'social': return MessageSquare;
      default: return FileText;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'blog': return 'from-[#FF1B8D] to-[#FF69B4]';
      case 'video': return 'from-[#00D4DD] to-[#00E5EE]';
      case 'social': return 'from-[#FF69B4] to-[#00D4DD]';
      default: return 'from-[#FF1B8D] to-[#00D4DD]';
    }
  };

  const stats = {
    blog: mockResults.filter(r => r.type === 'blog').length,
    video: mockResults.filter(r => r.type === 'video').length,
    social: mockResults.filter(r => r.type === 'social').length,
  };

  return (
    <div className="min-h-screen w-full p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={onBack}
              className="mb-4 flex items-center gap-2 text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>New Upload</span>
            </button>
            <h2 className="mb-2 bg-gradient-to-r from-[#FF1B8D] via-[#FF69B4] to-[#00D4DD] bg-clip-text text-transparent">
              Your Content is Ready!
            </h2>
            <p className="text-white/70">Generated from: {fileName}</p>
          </div>
          <button className="rounded-full bg-gradient-to-r from-[#FF1B8D] to-[#00D4DD] px-6 py-3 text-white transition-transform hover:scale-105">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              <span>Download All</span>
            </div>
          </button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <button
            onClick={() => setSelectedTab('all')}
            className={`rounded-2xl p-6 text-left transition-all ${
              selectedTab === 'all' ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="mb-2 text-3xl text-white">{mockResults.length}</div>
            <div className="text-white/70">Total Items</div>
          </button>
          <button
            onClick={() => setSelectedTab('blog')}
            className={`rounded-2xl p-6 text-left transition-all ${
              selectedTab === 'blog' ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="mb-2 text-3xl text-[#FF1B8D]">{stats.blog}</div>
            <div className="text-white/70">Blog Posts</div>
          </button>
          <button
            onClick={() => setSelectedTab('video')}
            className={`rounded-2xl p-6 text-left transition-all ${
              selectedTab === 'video' ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="mb-2 text-3xl text-[#00D4DD]">{stats.video}</div>
            <div className="text-white/70">Video Clips</div>
          </button>
          <button
            onClick={() => setSelectedTab('social')}
            className={`rounded-2xl p-6 text-left transition-all ${
              selectedTab === 'social' ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="mb-2 text-3xl text-[#FF69B4]">{stats.social}</div>
            <div className="text-white/70">Social Posts</div>
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredResults.map((item) => {
            const Icon = getIcon(item.type);
            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${getColor(item.type)} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-white">{item.title}</h3>
                <p className="mb-4 line-clamp-2 text-sm text-white/60">
                  {item.preview}
                </p>
                <div className="mb-4 flex items-center gap-4 text-xs text-white/40">
                  {item.wordCount && <span>{item.wordCount} words</span>}
                  {item.duration && <span>{item.duration}</span>}
                  {item.platform && <span>{item.platform}</span>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewContent(item)}
                    className="flex-1 rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </div>
                  </button>
                  <button className="rounded-lg bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
