import OpenAI from 'openai';

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Transcribe audio file using Whisper
export async function transcribeAudio(audioFile: File | Blob): Promise<string> {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      response_format: 'text',
    });

    return transcription;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
}

// Generate content for different platforms
export async function generateContent(
  transcript: string,
  platform: string,
  brandVoice: string = 'professional'
): Promise<any[]> {
  const prompts = {
    instagram: {
      caption: `Based on this podcast/video transcript, create 3 engaging Instagram captions. Each should be:
- Eye-catching with the right emojis
- 150-300 words
- Include a strong hook in the first line
- End with a call-to-action
- Include 5-10 relevant hashtags

Brand voice: ${brandVoice}

Transcript:
${transcript.slice(0, 3000)}

Format as JSON array with objects containing: title, content, hashtags`,

      reel: `Based on this transcript, create 2 Instagram Reel scripts. Each should be:
- 30-60 seconds long
- Include hook, scene descriptions, and text overlays
- Engaging and shareable
- Include suggested audio/music type

Brand voice: ${brandVoice}

Transcript:
${transcript.slice(0, 3000)}

Format as JSON array with objects containing: title, content (the script), duration`
    },

    twitter: {
      thread: `Based on this transcript, create 2 Twitter/X threads. Each should be:
- 5-8 tweets per thread
- First tweet is a strong hook
- Each tweet under 280 characters
- Engaging and informative
- Include relevant hashtags

Brand voice: ${brandVoice}

Transcript:
${transcript.slice(0, 3000)}

Format as JSON array with objects containing: title, content (full thread with numbered tweets)`
    },

    linkedin: {
      post: `Based on this transcript, create 2 LinkedIn posts. Each should be:
- Professional but engaging
- 1200-1500 characters
- Include key insights or lessons
- Strong opening hook
- Call-to-action at the end

Brand voice: ${brandVoice}

Transcript:
${transcript.slice(0, 3000)}

Format as JSON array with objects containing: title, content`
    },

    blog: {
      article: `Based on this transcript, create a blog post. It should be:
- 800-1200 words
- Engaging title
- Clear structure with sections
- SEO-friendly
- Include key takeaways

Brand voice: ${brandVoice}

Transcript:
${transcript.slice(0, 4000)}

Format as JSON with: title, content`
    },

    email: {
      newsletter: `Based on this transcript, create an email newsletter. It should be:
- Catchy subject line
- Engaging preview text
- 400-600 words
- Conversational tone
- Clear call-to-action

Brand voice: ${brandVoice}

Transcript:
${transcript.slice(0, 3000)}

Format as JSON with: title (subject line), content (email body)`
    }
  };

  try {
    const platformPrompts = prompts[platform as keyof typeof prompts];
    if (!platformPrompts) {
      throw new Error(`Platform ${platform} not supported`);
    }

    const results = [];

    // Generate content for each content type in the platform
    for (const [contentType, prompt] of Object.entries(platformPrompts)) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert content creator specializing in social media and content repurposing. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      });

      const content = completion.choices[0].message.content;
      if (content) {
        try {
          const parsed = JSON.parse(content);
          // If it's an array, add each item
          if (Array.isArray(parsed)) {
            results.push(...parsed.map((item: any) => ({
              ...item,
              content_type: contentType,
              platform
            })));
          } else if (parsed.items && Array.isArray(parsed.items)) {
            results.push(...parsed.items.map((item: any) => ({
              ...item,
              content_type: contentType,
              platform
            })));
          } else {
            // Single item
            results.push({
              ...parsed,
              content_type: contentType,
              platform
            });
          }
        } catch (parseError) {
          console.error('Failed to parse OpenAI response:', parseError);
        }
      }
    }

    return results;
  } catch (error) {
    console.error('Content generation error:', error);
    throw new Error('Failed to generate content');
  }
}

// Extract key insights and highlights from transcript
export async function extractInsights(transcript: string): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at analyzing content and extracting key insights. Respond with JSON only.'
        },
        {
          role: 'user',
          content: `Analyze this transcript and extract 3-5 key insights, memorable quotes, or main topics that would make great social media content.

Transcript:
${transcript.slice(0, 4000)}

Format as JSON: { "insights": ["insight1", "insight2", ...] }`
        }
      ],
      temperature: 0.5,
      response_format: { type: 'json_object' }
    });

    const content = completion.choices[0].message.content;
    if (content) {
      const parsed = JSON.parse(content);
      return parsed.insights || [];
    }

    return [];
  } catch (error) {
    console.error('Insight extraction error:', error);
    return [];
  }
}

// Generate hashtags for a given content
export async function generateHashtags(content: string, platform: string): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a social media expert. Generate relevant, trending hashtags. Respond with JSON only.'
        },
        {
          role: 'user',
          content: `Generate 10-15 relevant hashtags for this ${platform} content:

${content.slice(0, 1000)}

Format as JSON: { "hashtags": ["hashtag1", "hashtag2", ...] } (without # symbol)`
        }
      ],
      temperature: 0.6,
      response_format: { type: 'json_object' }
    });

    const result = completion.choices[0].message.content;
    if (result) {
      const parsed = JSON.parse(result);
      return parsed.hashtags || [];
    }

    return [];
  } catch (error) {
    console.error('Hashtag generation error:', error);
    return [];
  }
}
