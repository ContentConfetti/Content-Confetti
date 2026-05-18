import { supabase } from '../lib/supabase';
import type { Profile } from '../lib/supabase';

export class AuthService {
  // Sign up with email and password
  static async signUp(email: string, password: string, fullName?: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  // Sign in with email and password
  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  // Sign in with Google
  static async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  // Sign out
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Get current user
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  // Get current session
  static async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  }

  // Reset password
  static async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  // Update password
  static async updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  }
}

export class ProfileService {
  // Get user profile
  static async getProfile(userId?: string): Promise<Profile | null> {
    try {
      let id = userId;
      if (!id) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;
        id = user.id;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }

  // Update profile
  static async updateProfile(updates: Partial<Profile>): Promise<Profile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  // Get plan limits
  static getPlanLimits(plan: string): { uploads: number; features: string[] } {
    const limits = {
      free: {
        uploads: 1,
        features: ['Basic AI tools', '10 generated posts', 'Community support']
      },
      creator: {
        uploads: 10,
        features: ['Unlimited captions', 'All platforms', 'Priority support', 'Brand voice']
      },
      pro: {
        uploads: 999999, // unlimited
        features: ['Advanced AI tools', 'Scheduling', 'Analytics', 'Team features']
      },
      agency: {
        uploads: 999999, // unlimited
        features: ['Multi-brand workspace', 'White-label', 'Team permissions', 'Dedicated support', 'Custom AI']
      }
    };

    return limits[plan as keyof typeof limits] || limits.free;
  }

  // Check if user can upload
  static async canUpload(): Promise<boolean> {
    try {
      const profile = await this.getProfile();
      if (!profile) return false;

      return profile.uploads_used < profile.uploads_limit;
    } catch (error) {
      console.error('Error checking upload permission:', error);
      return false;
    }
  }
}
