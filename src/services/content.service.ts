import { supabase, supabaseAdmin } from '../lib/supabase';
import type { Project, GeneratedContent } from '../lib/supabase';

export class ContentService {
  // Create a new project
  static async createProject(data: {
    title: string;
    content_type: 'podcast' | 'video' | 'youtube' | 'text';
    file?: File;
  }): Promise<Project | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check upload limits
      const { data: profile } = await supabase
        .from('profiles')
        .select('uploads_used, uploads_limit')
        .eq('id', user.id)
        .single();

      if (profile && profile.uploads_used >= profile.uploads_limit) {
        throw new Error('Upload limit reached. Please upgrade your plan.');
      }

      let fileUrl = null;
      let fileSize = null;

      // Upload file to Supabase Storage if provided
      if (data.file) {
        const fileName = `${user.id}/${Date.now()}-${data.file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(fileName, data.file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('uploads')
          .getPublicUrl(fileName);

        fileUrl = publicUrl;
        fileSize = data.file.size;
      }

      // Create project record
      const { data: project, error } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          title: data.title,
          content_type: data.content_type,
          file_url: fileUrl,
          file_size: fileSize,
          status: 'processing'
        })
        .select()
        .single();

      if (error) throw error;

      // Increment uploads_used
      await supabase
        .from('profiles')
        .update({ uploads_used: (profile?.uploads_used || 0) + 1 })
        .eq('id', user.id);

      return project;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // Get user's projects
  static async getUserProjects(): Promise<Project[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  // Get project by ID
  static async getProject(projectId: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  }

  // Update project status
  static async updateProjectStatus(
    projectId: string,
    status: 'processing' | 'completed' | 'failed',
    errorMessage?: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          status,
          error_message: errorMessage,
        })
        .eq('id', projectId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating project status:', error);
      throw error;
    }
  }

  // Save transcript
  static async saveTranscript(projectId: string, transcript: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ transcript })
        .eq('id', projectId);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving transcript:', error);
      throw error;
    }
  }

  // Save generated content
  static async saveGeneratedContent(
    projectId: string,
    contents: Omit<GeneratedContent, 'id' | 'project_id' | 'created_at'>[]
  ): Promise<GeneratedContent[]> {
    try {
      const contentData = contents.map(content => ({
        ...content,
        project_id: projectId,
      }));

      const { data, error } = await supabase
        .from('generated_content')
        .insert(contentData)
        .select();

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error saving generated content:', error);
      throw error;
    }
  }

  // Get generated content for a project
  static async getGeneratedContent(projectId: string): Promise<GeneratedContent[]> {
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching generated content:', error);
      return [];
    }
  }

  // Delete project
  static async deleteProject(projectId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }
}
