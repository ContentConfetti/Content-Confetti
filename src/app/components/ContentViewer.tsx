import { ArrowLeft, Copy, Download, Share2, FileText, Video, MessageSquare } from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'blog' | 'video' | 'social';
  title: string;
  preview: string;
  wordCount?: number;
  duration?: string;
  platform?: string;
}

interface ContentViewerProps {
  item: ContentItem;
  onBack: () => void;
}

export function ContentViewer({ item, onBack }: ContentViewerProps) {
  const getFullContent = () => {
    if (item.type === 'blog') {
      return `# ${item.title}

${item.preview}

## Introduction

In today's rapidly evolving digital landscape, content creation has become more important than ever. This comprehensive guide will walk you through everything you need to know about transforming your podcast episodes into multiple content formats.

## Key Points

1. **Maximizing Reach**: By repurposing your podcast content, you can reach audiences across different platforms who prefer different content formats.

2. **Time Efficiency**: Instead of creating content from scratch for each platform, leverage your existing podcast episodes as a foundation.

3. **Consistent Messaging**: Maintain your core message across all content types while adapting the format to suit each platform's unique characteristics.

## The Process

The content transformation process involves several key steps:

- **Transcription**: Converting audio to text using advanced AI technology
- **Analysis**: Identifying key themes, quotes, and memorable moments
- **Adaptation**: Reformatting content for different platforms and audiences
- **Optimization**: Ensuring each piece is optimized for its intended platform

## Best Practices

When repurposing podcast content, keep these tips in mind:

- Always maintain the authentic voice and tone of your original content
- Adapt the length and format to suit each platform's best practices
- Include compelling visuals and formatting to enhance readability
- Add platform-specific elements like hashtags for social media

## Conclusion

Content repurposing is not just about efficiency—it's about maximizing the impact of your message. By transforming a single podcast episode into multiple content formats, you can engage your audience wherever they are and however they prefer to consume content.

Ready to transform your content? Start with your next podcast episode and watch your reach multiply!`;
    } else if (item.type === 'video') {
      return `**Video Clip Details**

**Title:** ${item.title}
**Duration:** ${item.duration}

**Description:**
${item.preview}

**Suggested Platforms:**
- YouTube Shorts
- Instagram Reels
- TikTok
- LinkedIn Video

**Optimizations Applied:**
✓ Vertical format (9:16)
✓ Auto-generated captions
✓ Engaging hook in first 3 seconds
✓ Strong visual elements
✓ Clear call-to-action

**Transcript:**
[00:00] "Let me share something that completely changed how I think about content..."

[00:05] The key insight here is that your podcast is not just audio content—it's a goldmine of ideas waiting to be discovered by different audiences.

[00:15] Think about it: someone scrolling Instagram might never listen to a 45-minute podcast, but they'll watch a 30-second clip.

[00:25] That's the power of content transformation. You're not diluting your message; you're amplifying it.

[00:35] By meeting your audience where they are, with the format they prefer, you maximize the impact of every single episode you create.

[00:45] So stop thinking of your podcast as just a podcast. It's your content hub. Your idea factory. Your multiplier.

**Suggested Caption:**
"Your podcast is more than just audio—it's a content goldmine 💎 Here's why you should be repurposing every episode... #ContentCreation #PodcastTips #DigitalMarketing"`;
    } else {
      return `**${item.platform} Post**

${item.preview}

${item.platform === 'Twitter/X' ? `

2/8 The biggest mistake creators make? Thinking one format fits all. Your audience is scattered across platforms, each with their own content preferences.

3/8 Here's what most people don't realize: A single 30-minute podcast episode contains enough value to create:
• 3-5 blog posts
• 10+ social media posts
• 5-10 short video clips
• An email newsletter
• Quote graphics

4/8 But here's the catch: You can't just copy-paste. Each platform has its own language, its own rhythm, its own expectations.

5/8 Instagram wants visual storytelling. LinkedIn wants professional insights. Twitter wants punchy, shareable takes.

6/8 The key is adapting your core message to speak each platform's language while maintaining your authentic voice.

7/8 Think of your podcast as the tree, and each repurposed piece as a branch. Same roots, different directions.

8/8 Ready to multiply your content's impact? Start treating your podcast episodes as the beginning, not the end, of your content journey.

What's your biggest challenge with content repurposing? Drop it below 👇` : item.platform === 'LinkedIn' ? `

Exciting insights from today's podcast on the future of AI-powered content creation.

After years of creating content the traditional way, I've discovered something that completely changed my approach: Your podcast isn't just audio—it's a strategic asset.

Here's what I've learned:

🎯 **One Episode = Multiple Touchpoints**
A single podcast conversation can become blog posts, video clips, social content, and newsletter material. You're not creating more work; you're working smarter.

💡 **Quality Doesn't Dilute**
Some worry that repurposing means spreading yourself thin. The opposite is true. You're taking your best insights and making them accessible to people who consume content differently.

📊 **Data-Driven Results**
Since implementing a content transformation strategy:
• 3x increase in content output
• 5x growth in cross-platform engagement
• 60% reduction in content creation time

🚀 **The Future is Multi-Format**
We're moving away from single-format content. The most successful creators understand that their audience exists across platforms, and they need to meet them where they are.

The question isn't whether you should repurpose your content. It's how quickly can you start.

What's your content strategy for 2024? I'd love to hear your approach in the comments.

#ContentStrategy #PodcastMarketing #DigitalTransformation #ContentCreation #MarketingStrategy` : `

✨ New episode alert! We dove deep into content transformation and the results are mind-blowing 🤯

If you've ever felt like creating content for every platform is overwhelming, this one's for you!

In this episode, we break down:
💫 How to turn ONE podcast into 20+ pieces of content
🎨 The art of platform-specific storytelling
⚡ Why repurposing isn't recycling (and why that matters)
🔥 Real strategies from creators who've 10x'd their reach

Swipe through for the key takeaways ➡️

The biggest lesson? Your content has MORE value than you think. You just need to know how to unlock it.

Link in bio to listen to the full episode! 🎧

Who else is tired of the content creation hamster wheel? Let's chat in the comments! 👇

#PodcastLife #ContentCreator #DigitalMarketing #SocialMediaTips #ContentStrategy #PodcastTips #CreatorEconomy #MarketingHacks #ContentRepurposing #PodcastersOfInstagram`}`;
    }
  };

  const getIcon = () => {
    switch (item.type) {
      case 'blog': return FileText;
      case 'video': return Video;
      case 'social': return MessageSquare;
    }
  };

  const getColor = () => {
    switch (item.type) {
      case 'blog': return 'from-[#FF1B8D] to-[#FF69B4]';
      case 'video': return 'from-[#00D4DD] to-[#00E5EE]';
      case 'social': return 'from-[#FF69B4] to-[#00D4DD]';
    }
  };

  const Icon = getIcon();

  return (
    <div className="min-h-screen w-full p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Results</span>
          </button>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${getColor()} shadow-lg`}>
                <Icon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="mb-2 text-white">{item.title}</h2>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  {item.wordCount && <span>{item.wordCount} words</span>}
                  {item.duration && <span>{item.duration}</span>}
                  {item.platform && <span>{item.platform}</span>}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20">
                <Copy className="h-5 w-5" />
              </button>
              <button className="rounded-lg bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="rounded-lg bg-gradient-to-r from-[#FF1B8D] to-[#00D4DD] px-6 py-2 text-white transition-transform hover:scale-105">
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  <span>Download</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 p-8 backdrop-blur-sm">
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-white/80">
              {getFullContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
