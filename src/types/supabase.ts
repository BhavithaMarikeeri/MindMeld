export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          email: string
          avatar_url: string | null
          college: string
          department: string
          academic_year: string
          bio: string | null
          location: string | null
          role: string
          is_available: boolean
          profile_visibility: string
          experience_level: string
          available_hours: number
          preferred_domain: string
          preferred_role: string
          preferred_team_size: number
          xp: number
          level: number
          streak_days: number
          last_active: string
          personality_archetype: string | null
          personality_traits: Json | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string | null
        }
        Insert: { id?: string; name: string; category?: string | null }
        Update: Partial<Database['public']['Tables']['skills']['Insert']>
      }
      profile_skills: {
        Row: {
          profile_id: string
          skill_id: string
        }
        Insert: { profile_id: string; skill_id: string }
        Update: Partial<Database['public']['Tables']['profile_skills']['Insert']>
      }
      teams: {
        Row: {
          id: string
          name: string
          tagline: string | null
          description: string | null
          domain: string
          leader_id: string
          max_members: number
          status: string
          compatibility_score: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['teams']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['teams']['Insert']>
      }
      tasks: {
        Row: {
          id: string
          team_id: string
          title: string
          description: string | null
          status: string
          priority: string
          assigned_to_id: string | null
          due_date: string | null
          created_by_id: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['tasks']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['tasks']['Insert']>
      }
      missions: {
        Row: {
          id: string
          title: string
          problem_statement: string
          description: string
          category: string
          difficulty: string
          estimated_duration: string
          potential_impact: string
          xp_reward: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['missions']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['missions']['Insert']>
      }
      connections: {
        Row: {
          id: string
          user1_id: string
          user2_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['connections']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['connections']['Insert']>
      }
      connection_requests: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          status: string
          message: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['connection_requests']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['connection_requests']['Insert']>
      }
    }
  }
}

