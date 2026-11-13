-- ====================================================================
-- MINDMELD - INITIAL SEED DATA
-- ====================================================================

-- 1. ACHIEVEMENTS
INSERT INTO public.achievements (id, code, title, description, icon, xp_value, tier) VALUES
('b0000000-0000-0000-0000-000000000001', 'CONNECTOR', 'The Connector', 'Form 5 verified collaborative connections with fellow students.', 'Users', 150, 'bronze'),
('b0000000-0000-0000-0000-000000000002', 'IDEA_MACHINE', 'Idea Machine', 'Generate 10 custom startup or hackathon missions in the engine.', 'Lightbulb', 200, 'silver'),
('b0000000-0000-0000-0000-000000000003', 'TEAM_BUILDER', 'Team Builder', 'Successfully assemble and save 3 balanced project squads.', 'ShieldAlert', 250, 'silver'),
('b0000000-0000-0000-0000-000000000004', 'CONSISTENT', 'Consistent Mind', 'Maintain an active 7-day collaboration streak on the platform.', 'Flame', 300, 'gold'),
('b0000000-0000-0000-0000-000000000005', 'CODE_MASTER', 'Code Master', 'Complete 5 technical project tasks across your workspaces.', 'Code2', 350, 'gold'),
('b0000000-0000-0000-0000-000000000006', 'CHAMPION', 'Vanguard Champion', 'Complete an Expert-tier cross-functional innovation mission.', 'Trophy', 500, 'platinum')
ON CONFLICT (code) DO NOTHING;

-- 2. CORE SKILLS
INSERT INTO public.skills (name, category) VALUES
('Python', 'Programming Languages'),
('TypeScript', 'Programming Languages'),
('JavaScript', 'Programming Languages'),
('C++', 'Programming Languages'),
('Java', 'Programming Languages'),
('React', 'Frontend Frameworks'),
('Next.js', 'Frontend Frameworks'),
('Tailwind CSS', 'Frontend Frameworks'),
('Node.js', 'Backend & APIs'),
('FastAPI', 'Backend & APIs'),
('PostgreSQL', 'Databases'),
('Database Management', 'Databases'),
('Machine Learning', 'AI & Data'),
('Artificial Intelligence', 'AI & Data'),
('PyTorch', 'AI & Data'),
('Data Science', 'AI & Data'),
('UI/UX Design', 'Design'),
('Cloud Computing', 'Infrastructure'),
('Docker', 'Infrastructure'),
('Cybersecurity', 'Security')
ON CONFLICT (name) DO NOTHING;

-- 3. CORE MISSIONS
INSERT INTO public.missions (id, title, problem_statement, description, category, difficulty, suggested_solutions, recommended_tech_stack, estimated_duration, required_skills, potential_impact, xp_reward) VALUES
(
    'c0000000-0000-0000-0000-000000000001',
    'Project BioSentry: Real-Time Sepsis Onset Predictor',
    'ICU patient telemetry is filled with noisy sensor data, leading to critical sepsis alerts being identified 4 to 6 hours too late.',
    'Build an edge-compatible streaming inference pipeline that consumes real-time heart rate, blood pressure, and lactate telemetry to forecast septic shock probability with high specificity.',
    'Healthcare',
    'Expert',
    ARRAY['Lightweight temporal convolutional neural network (TCN)', 'Low-overhead MQTT telemetry broker', 'Interactive bedside alert dashboard'],
    ARRAY['Python', 'PyTorch', 'FastAPI', 'React', 'Tailwind CSS'],
    '3 weeks',
    ARRAY['Python', 'Machine Learning', 'Data Science', 'React'],
    'Has potential to save over 12,000 hospital patient lives annually through earlier antibiotic intervention.',
    500
),
(
    'c0000000-0000-0000-0000-000000000002',
    'NeuroFlow: Zero-Knowledge Micro-Grants for Collegiate Labs',
    'University research grants take 6-9 months for approval, forcing promising student researchers to abandon urgent breakthrough experiments.',
    'Develop a peer-validated micro-grant platform where collegiate researchers can submit milestone proofs cryptographically validated by fellow academics, unlocking immediate donor liquidity.',
    'FinTech',
    'Hard',
    ARRAY['Zero-knowledge milestone verifier', 'Dynamic quadratic funding pool calculation', 'Real-time research progress tracking kanban'],
    ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Cybersecurity'],
    '2 weeks',
    ARRAY['TypeScript', 'Next.js', 'PostgreSQL', 'Cybersecurity'],
    'Unlocks $10M+ in stagnant student grant liquidity across 40 participating universities.',
    350
),
(
    'c0000000-0000-0000-0000-000000000003',
    'TerraMesh: Autonomous Wildfire Early Warning Sensor Grid',
    'California and Mediterranean forest fires often spread undetected for hours in dense canopy before satellite thermal sensors detect them.',
    'Engineer a low-cost mesh-network sensor protocol that detects volatile organic compounds and thermal anomalies at ground level, routing emergency alerts via LoRaWAN.',
    'Environment',
    'Hard',
    ARRAY['LoRa mesh network packet deduplication', 'Geospatial fire spread simulator using wind vector analysis', 'High-contrast first responder mobile map'],
    ARRAY['C++', 'Python', 'React', 'Mapbox GL'],
    '2 weeks',
    ARRAY['C++', 'Python', 'Cloud Computing', 'React'],
    'Cuts median wildfire response dispatch from 180 minutes down to under 12 minutes.',
    350
)
ON CONFLICT (id) DO NOTHING;

