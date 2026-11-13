-- ====================================================================
-- MINDMELD - THE HUMAN CONNECTION ENGINE
-- PostgreSQL Database Schema & Row-Level Security (RLS) Policies
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    college TEXT NOT NULL,
    department TEXT NOT NULL,
    academic_year TEXT NOT NULL CHECK (academic_year IN ('1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate')),
    bio TEXT,
    location TEXT,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    is_available BOOLEAN NOT NULL DEFAULT true,
    profile_visibility TEXT NOT NULL DEFAULT 'public' CHECK (profile_visibility IN ('public', 'college-only', 'private')),
    experience_level TEXT NOT NULL DEFAULT 'Intermediate' CHECK (experience_level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
    available_hours INT NOT NULL DEFAULT 15,
    preferred_domain TEXT NOT NULL DEFAULT 'Artificial Intelligence',
    preferred_role TEXT NOT NULL DEFAULT 'Full-Stack Developer',
    preferred_team_size INT NOT NULL DEFAULT 4,
    project_goals TEXT[] DEFAULT '{}',
    xp INT NOT NULL DEFAULT 0,
    level INT NOT NULL DEFAULT 1,
    streak_days INT NOT NULL DEFAULT 1,
    last_active TIMESTAMPTZ DEFAULT NOW(),
    personality_archetype TEXT,
    personality_traits JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for lightning-fast search & discovery
CREATE INDEX IF NOT EXISTS idx_profiles_college ON public.profiles(college);
CREATE INDEX IF NOT EXISTS idx_profiles_department ON public.profiles(department);
CREATE INDEX IF NOT EXISTS idx_profiles_xp ON public.profiles(xp DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 2. SKILLS & TAXONOMY
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    category TEXT
);

CREATE TABLE IF NOT EXISTS public.profile_skills (
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
    proficiency TEXT DEFAULT 'Intermediate',
    PRIMARY KEY (profile_id, skill_id)
);

-- 3. INTERESTS
CREATE TABLE IF NOT EXISTS public.interests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.profile_interests (
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    interest_id UUID REFERENCES public.interests(id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id, interest_id)
);

-- 4. CONNECTIONS & REQUESTS
CREATE TABLE IF NOT EXISTS public.connection_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_connection_request UNIQUE (sender_id, receiver_id),
    CONSTRAINT prevent_self_request CHECK (sender_id <> receiver_id)
);

CREATE TABLE IF NOT EXISTS public.connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user1_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    user2_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_connection_pair UNIQUE (user1_id, user2_id),
    CONSTRAINT prevent_self_connection CHECK (user1_id <> user2_id)
);

-- 5. TEAMS & MEMBERS
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    domain TEXT NOT NULL,
    leader_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    max_members INT NOT NULL DEFAULT 5,
    tech_stack TEXT[] DEFAULT '{}',
    project_goals TEXT[] DEFAULT '{}',
    compatibility_score INT DEFAULT 85,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('recruiting', 'in_progress', 'completed', 'archived')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'Contributor',
    is_leader BOOLEAN NOT NULL DEFAULT false,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_team_membership UNIQUE (team_id, student_id)
);

-- 6. TASKS (KANBAN WORKSPACE)
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'To Do' CHECK (status IN ('To Do', 'In Progress', 'In Review', 'Completed')),
    priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
    assigned_to_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    due_date DATE,
    created_by_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. MISSIONS & CHALLENGES
CREATE TABLE IF NOT EXISTS public.missions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard', 'Expert')),
    suggested_solutions TEXT[] DEFAULT '{}',
    recommended_tech_stack TEXT[] DEFAULT '{}',
    estimated_duration TEXT NOT NULL,
    required_skills TEXT[] DEFAULT '{}',
    potential_impact TEXT NOT NULL,
    xp_reward INT NOT NULL DEFAULT 100,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.team_missions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    mission_id UUID NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    progress_percentage INT NOT NULL DEFAULT 0,
    CONSTRAINT unique_active_team_mission UNIQUE (team_id, mission_id)
);

-- 8. GAMIFICATION & ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    xp_value INT NOT NULL,
    tier TEXT NOT NULL CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum'))
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, achievement_id)
);

CREATE TABLE IF NOT EXISTS public.xp_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount INT NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. MESSAGING & NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. ANONYMOUS FEEDBACK & MODERATION
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    target_student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    ratings JSONB NOT NULL,
    constructive_note TEXT NOT NULL,
    is_moderated BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reported_student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone authenticated can read public profiles; only owner or admin can update
CREATE POLICY "Public profiles are readable"
ON public.profiles FOR SELECT
USING (profile_visibility = 'public' OR auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Tasks: Team members can read and write tasks in their teams
CREATE POLICY "Team members can view team tasks"
ON public.tasks FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.team_members
        JOIN public.profiles ON public.profiles.id = public.team_members.student_id
        WHERE public.team_members.team_id = public.tasks.team_id
        AND public.profiles.user_id = auth.uid()
    )
);

CREATE POLICY "Team members can manage tasks"
ON public.tasks FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.team_members
        JOIN public.profiles ON public.profiles.id = public.team_members.student_id
        WHERE public.team_members.team_id = public.tasks.team_id
        AND public.profiles.user_id = auth.uid()
    )
);

-- Messages: Users can see direct messages to/from them or team messages where they are members
CREATE POLICY "Users can view authorized messages"
ON public.messages FOR SELECT
USING (
    sender_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR recipient_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR (
        team_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM public.team_members
            JOIN public.profiles ON public.profiles.id = public.team_members.student_id
            WHERE public.team_members.team_id = public.messages.team_id
            AND public.profiles.user_id = auth.uid()
        )
    )
);

-- Notifications: Only receiver can see and update their notifications
CREATE POLICY "Users can manage own notifications"
ON public.notifications FOR ALL
USING (user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

