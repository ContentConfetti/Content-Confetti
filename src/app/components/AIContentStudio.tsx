import { ArrowLeft, Sparkles, Instagram, Twitter, Linkedin, Copy, Download, Wand2, FileText, Video, MessageSquare, Hash, Mail, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface AIContentStudioProps {
  fileName: string;
  onBack: () => void;
}

export function AIContentStudio({ fileName, onBack }: AIContentStudioProps) {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [brandVoice, setBrandVoice] = useState('professional');

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#FF1B8D' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: '#00D4FF' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#A855F7' },
    { id: 'tiktok', name: 'TikTok', icon: Video, color: '#10B981' },
    { id: 'blog', name: 'Blog', icon: FileText, color: '#FFD700' },
    { id: 'email', name: 'Email', icon: Mail, color: '#FF6B6B' },
  ];

  const brandVoices = [
    { id: 'professional', label: 'Professional', emoji: '💼' },
    { id: 'playful', label: 'Fun & Playful', emoji: '🎉' },
    { id: 'luxury', label: 'Luxury', emoji: '✨' },
    { id: 'educational', label: 'Educational', emoji: '📚' },
    { id: 'bold', label: 'Bold Creator', emoji: '🔥' },
  ];

  const mockTranscript = `[00:00] Hey everyone, welcome back to the show! Today we're diving deep into content repurposing and how it can completely transform your content strategy.

[00:15] You know, I used to think that creating content for every platform meant starting from scratch each time. But that's not sustainable, and honestly, it's not necessary.

[00:30] The key insight here is that one long-form piece of content - whether it's a podcast episode, a webinar, or a YouTube video - contains so much value that you can extract dozens of smaller pieces from it.

[00:50] Think about it: a 30-minute podcast episode has multiple quotable moments, several key insights, educational takeaways, and entertaining segments. Each of those can become its own social media post.

[01:15] The magic happens when you understand that different platforms require different approaches. Instagram wants visual storytelling. LinkedIn wants professional insights. Twitter wants punchy, shareable takes.

[01:40] But here's the thing - the core message stays the same. You're not diluting your content; you're amplifying it by meeting your audience where they are.`;

  const generatedContent = {
    instagram: [
      {
        id: 1,
        type: 'Caption',
        content: '✨ Content creation doesn\'t have to be overwhelming!\n\nI used to think I needed to create from scratch for every platform. Wrong. 🙅‍♀️\n\nHere\'s the truth: Your podcast episode is a GOLDMINE of content waiting to be discovered.\n\nOne 30-min episode = \n📝 5+ blog posts\n🐦 10+ tweets\n💼 3 LinkedIn articles\n📌 Endless Pinterest pins\n\nYou\'re not diluting your message.\nYou\'re AMPLIFYING it. 📣\n\nWho else needs to hear this? 👇\n\n#ContentStrategy #ContentCreation #DigitalMarketing #SocialMediaTips',
      },
      {
        id: 2,
        type: 'Reel Script',
        content: '🎬 HOOK: "Stop creating content from scratch"\n\n[Scene 1] You scrolling through content ideas at 2am\n[Scene 2] Text: "Here\'s what changed everything"\n[Scene 3] Point to overlay: "1 podcast = 20 posts"\n[Scene 4] Show multiple platform examples\n[Close] "Same message. Different formats. 10x reach."\n\nSOUND: Trending audio\nTEXT OVERLAY: "Content multiplication hack 🪄"',
      },
    ],
    twitter: [
      {
        id: 1,
        type: 'Thread',
        content: `1/7 🧵 Stop creating content from scratch for every platform.

Here's how to 10x your output without burning out:

2/7 The biggest mistake creators make? Thinking one format fits all.

Your audience is scattered across platforms, each with their own content preferences.

3/7 Here's the reality: A single 30-minute podcast contains enough value to create:

• 3-5 blog posts
• 10+ social posts
• 5-10 short clips
• An email newsletter
• Quote graphics

4/7 But here's the catch: You can't just copy-paste.

Each platform has its own:
→ Language
→ Rhythm
→ Expectations

5/7 Instagram wants visual storytelling.
LinkedIn wants professional insights.
Twitter wants punchy takes.

6/7 Think of your podcast as the tree.

Each repurposed piece? A branch.

Same roots, different directions.

7/7 Ready to multiply your content's impact?

Start treating every long-form piece as the BEGINNING of your content journey, not the end.

What's your biggest content challenge? Drop it below 👇`,
      },
    ],
    linkedin: [
      {
        id: 1,
        type: 'Post',
        content: `After years of creating content the traditional way, I discovered something that changed everything:

Your long-form content isn't just content—it's a strategic asset.

Here's what I learned about content repurposing:

🎯 One Episode = Multiple Touchpoints
A single podcast conversation can become blog posts, video clips, social content, and newsletter material. You're not creating more work; you're working smarter.

💡 Quality Doesn't Dilute
Some worry that repurposing means spreading yourself thin. The opposite is true. You're taking your best insights and making them accessible to people who consume content differently.

📊 Data-Driven Results
Since implementing a content transformation strategy:
→ 3x increase in content output
→ 5x growth in cross-platform engagement
→ 60% reduction in creation time

🚀 The Future is Multi-Format
We're moving away from single-format content. The most successful creators understand their audience exists across platforms.

The question isn't whether you should repurpose your content.

It's how quickly can you start?

What's your content strategy? I'd love to hear your approach in the comments.

#ContentStrategy #DigitalMarketing #ContentCreation`,
      },
    ],
  };

  const currentContent = generatedContent[selectedPlatform as keyof typeof generatedContent] || [];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Transcript */}
      <div className="w-96 border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-6">
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
          <h2 className="mb-1 text-xl font-bold text-gray-900">Transcript</h2>
          <p className="text-sm text-gray-600">{fileName}</p>
        </div>

        <div className="p-6">
          <div className="mb-4 rounded-xl bg-gradient-to-r from-[#FF1B8D]/10 to-[#00D4FF]/10 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Sparkles className="h-4 w-4 text-[#FF1B8D]" />
              AI Highlights
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                <span>Content repurposing strategy</span>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                <span>Platform-specific approaches</span>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                <span>Amplifying core message</span>
              </div>
            </div>
          </div>

          <div className="max-h-[600px] overflow-y-auto rounded-xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
            {mockTranscript}
          </div>
        </div>
      </div>

      {/* Right Panel - Generated Content */}
      <div className="flex-1 overflow-auto">
        <div className="border-b border-gray-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">AI Content Studio</h2>
            <p className="text-gray-600">Generate platform-perfect content instantly</p>
          </div>

          {/* Brand Voice Selector */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-gray-900">Brand Voice</label>
            <div className="flex flex-wrap gap-2">
              {brandVoices.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => setBrandVoice(voice.id)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all ${
                    brandVoice === voice.id
                      ? 'border-[#FF1B8D] bg-[#FF1B8D]/10 text-[#FF1B8D]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {voice.emoji} {voice.label}
                </button>
              ))}
            </div>
          </div>

          {/* Platform Tabs */}
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 font-semibold transition-all ${
                  selectedPlatform === platform.id
                    ? 'border-transparent shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                style={
                  selectedPlatform === platform.id
                    ? { background: `linear-gradient(135deg, ${platform.color}15, ${platform.color}05)`, color: platform.color }
                    : {}
                }
              >
                <platform.icon className="h-5 w-5" />
                {platform.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Generated Content</h3>
              <p className="text-sm text-gray-600">{currentContent.length} pieces ready to use</p>
            </div>
            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF1B8D] to-[#00D4FF] px-6 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105">
              <Wand2 className="h-5 w-5" />
              Generate More
            </button>
          </div>

          <div className="space-y-6">
            {currentContent.map((content) => (
              <div key={content.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-full bg-gradient-to-r from-[#FF1B8D]/10 to-[#00D4FF]/10 px-4 py-1 text-sm font-semibold text-[#FF1B8D]">
                    {content.type}
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-gray-200 p-2 text-gray-700 transition-colors hover:border-[#FF1B8D] hover:text-[#FF1B8D]">
                      <Copy className="h-5 w-5" />
                    </button>
                    <button className="rounded-lg border border-gray-200 p-2 text-gray-700 transition-colors hover:border-[#00D4FF] hover:text-[#00D4FF]">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-gray-700">{content.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
