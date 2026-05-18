-- Content Confetti Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'creator', 'pro', 'agency')),
  uploads_used INTEGER DEFAULT 0,
  uploads_limit INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Brand voices table
CREATE TABLE public.brand_voices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('professional', 'playful', 'luxury', 'educational', 'bold')),
  custom_instructions TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Projects table
CREATE TABLE public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('podcast', 'video', 'youtube', 'text')),
  file_url TEXT,
  file_size BIGINT,
  duration INTEGER, -- in seconds
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  transcript TEXT,
  transcript_url TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Generated content table
CREATE TABLE public.generated_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'twitter', 'linkedin', 'tiktok', 'pinterest', 'facebook', 'blog', 'email')),
  content_type TEXT NOT NULL CHECK (content_type IN ('caption', 'thread', 'post', 'script', 'article', 'newsletter', 'description')),
  title TEXT,
  content TEXT NOT NULL,
  metadata JSONB, -- For additional data like hashtags, character count, etc.
  brand_voice_id UUID REFERENCES public.brand_voices(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Analytics table
CREATE TABLE public.analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_voices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Brand voices policies
CREATE POLICY "Users can view own brand voices" ON public.brand_voices
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own brand voices" ON public.brand_voices
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own brand voices" ON public.brand_voices
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own brand voices" ON public.brand_voices
  FOR DELETE USING (auth.uid() = user_id);

-- Projects policies
CREATE POLICY "Users can view own projects" ON public.projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON public.projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON public.projects
  FOR DELETE USING (auth.uid() = user_id);

-- Generated content policies
CREATE POLICY "Users can view own generated content" ON public.generated_content
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = generated_content.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own generated content" ON public.generated_content
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = generated_content.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own generated content" ON public.generated_content
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = generated_content.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own generated content" ON public.generated_content
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = generated_content.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Analytics policies
CREATE POLICY "Users can view own analytics" ON public.analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics" ON public.analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Functions

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Storage buckets setup
-- Run these separately in Supabase Dashboard > Storage

-- Create storage bucket for uploads
-- INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', false);

-- Storage policies for uploads bucket
-- CREATE POLICY "Users can upload own files" ON storage.objects
--   FOR INSERT WITH CHECK (
--     bucket_id = 'uploads' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- CREATE POLICY "Users can view own files" ON storage.objects
--   FOR SELECT USING (
--     bucket_id = 'uploads' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- CREATE POLICY "Users can delete own files" ON storage.objects
--   FOR DELETE USING (
--     bucket_id = 'uploads' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );
