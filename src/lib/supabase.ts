import { createClient } from '@supabase/supabase-js';

// Client-side Supabase client (uses anon key)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Server-side Supabase client (uses service role key for admin operations)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  plan: 'free' | 'creator' | 'pro' | 'agency';
  uploads_used: number;
  uploads_limit: number;
  created_at: string;
  updated_at: string;
}

export interface BrandVoice {
  id: string;
  user_id: string;
  name: string;
  type: 'professional' | 'playful' | 'luxury' | 'educational' | 'bold';
  custom_instructions?: string;
  is_default: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  content_type: 'podcast' | 'video' | 'youtube' | 'text';
  file_url?: string;
  file_size?: number;
  duration?: number;
  status: 'processing' | 'completed' | 'failed';
  transcript?: string;
  transcript_url?: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface GeneratedContent {
  id: string;
  project_id: string;
  platform: 'instagram' | 'twitter' | 'linkedin' | 'tiktok' | 'pinterest' | 'facebook' | 'blog' | 'email';
  content_type: 'caption' | 'thread' | 'post' | 'script' | 'article' | 'newsletter' | 'description';
  title?: string;
  content: string;
  metadata?: any;
  brand_voice_id?: string;
  created_at: string;
}
