import { StudentProfile, MatchScoreBreakdown } from "@/types";

/**
 * Deterministic, explainable multi-factor compatibility algorithm.
 * Evaluates two student profiles across 6 weighted dimensions (0-100 total):
 * 1. Skill Complementarity (30 pts)
 * 2. Shared Interests (20 pts)
 * 3. Project Goals (20 pts)
 * 4. Availability Alignment (15 pts)
 * 5. Experience Compatibility (10 pts)
 * 6. Collaboration Preferences (5 pts)
 */
export function calculateCompatibility(
  studentA: StudentProfile,
  studentB: StudentProfile
): MatchScoreBreakdown {
  if (!studentA || !studentB) {
    return {
      totalScore: 0,
      skillComplementarity: 0,
      sharedInterests: 0,
      projectGoals: 0,
      availabilityMatch: 0,
      experienceCompatibility: 0,
      collaborationPreferences: 0,
      overlapSkills: [],
      complementarySkills: [],
      sharedInterestsList: [],
      sharedGoalsList: [],
      explanation: "Incomplete student profile data."
    };
  }

  // 1. Skill Complementarity (30%)
  // High value when both share a strong baseline + each brings unique skills
  const skillsA = new Set(studentA.skills.map((s) => s.toLowerCase()));
  const skillsB = new Set(studentB.skills.map((s) => s.toLowerCase()));

  const overlapSkills: string[] = [];
  const complementarySkills: string[] = [];

  studentA.skills.forEach((skill) => {
    if (skillsB.has(skill.toLowerCase())) {
      overlapSkills.push(skill);
    }
  });

  studentB.skills.forEach((skill) => {
    if (!skillsA.has(skill.toLowerCase())) {
      complementarySkills.push(skill);
    }
  });

  // Calculate skill score:
  // Ideal ratio: some overlap (synergy/communication) + strong unique complementary skills
  let skillComplementarity = 0;
  const totalCombinedSkills = new Set([...Array.from(skillsA), ...Array.from(skillsB)]).size;
  if (totalCombinedSkills > 0) {
    const overlapRatio = overlapSkills.length / Math.min(skillsA.size, skillsB.size || 1);
    const uniqueRatio = complementarySkills.length / Math.max(skillsB.size, 1);
    
    // Balanced synergy: 10 pts for baseline common ground + 20 pts for unique superpowers
    const baselineScore = Math.min(10, overlapRatio * 10);
    const uniquenessScore = Math.min(20, uniqueRatio * 20);
    skillComplementarity = Math.min(30, Math.round(baselineScore + uniquenessScore));
  }

  // 2. Shared Interests (20%)
  const interestsA = new Set(studentA.interests.map((i) => i.toLowerCase()));
  const sharedInterestsList: string[] = [];
  studentB.interests.forEach((interest) => {
    if (interestsA.has(interest.toLowerCase())) {
      sharedInterestsList.push(interest);
    }
  });

  const maxPossibleInterests = Math.max(studentA.interests.length, studentB.interests.length, 1);
  const interestRatio = sharedInterestsList.length / maxPossibleInterests;
  const sharedInterests = Math.min(20, Math.round(interestRatio * 25)); // slight boost for matching 2+ interests

  // 3. Project Goals (20%)
  const goalsA = new Set((studentA.projectGoals || []).map((g) => g.toLowerCase()));
  const sharedGoalsList: string[] = [];
  (studentB.projectGoals || []).forEach((goal) => {
    if (goalsA.has(goal.toLowerCase())) {
      sharedGoalsList.push(goal);
    }
  });

  const maxPossibleGoals = Math.max(
    (studentA.projectGoals || []).length,
    (studentB.projectGoals || []).length,
    1
  );
  const goalRatio = sharedGoalsList.length / maxPossibleGoals;
  const projectGoals = Math.min(20, Math.round(goalRatio * 25));

  // 4. Availability Alignment (15%)
  // Closer weekly hours availability = better harmony
  const hoursA = studentA.availableHoursPerWeek || 10;
  const hoursB = studentB.availableHoursPerWeek || 10;
  const hourDiff = Math.abs(hoursA - hoursB);
  let availabilityMatch = 15;
  if (hourDiff > 15) {
    availabilityMatch = 5;
  } else if (hourDiff > 8) {
    availabilityMatch = 9;
  } else if (hourDiff > 4) {
    availabilityMatch = 12;
  }

  // 5. Experience Compatibility (10%)
  // Complementary or matching experience:
  const expWeights: Record<string, number> = {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
    Expert: 4
  };
  const expA = expWeights[studentA.experienceLevel] || 2;
  const expB = expWeights[studentB.experienceLevel] || 2;
  const expDiff = Math.abs(expA - expB);
  let experienceCompatibility = 10;
  if (expDiff === 0) {
    experienceCompatibility = 10; // Peers
  } else if (expDiff === 1) {
    experienceCompatibility = 9; // Great mentorship / peer pairing
  } else if (expDiff === 2) {
    experienceCompatibility = 7;
  } else {
    experienceCompatibility = 5;
  }

  // 6. Collaboration Preferences (5%)
  let collaborationPreferences = 0;
  if (studentA.preferredDomain === studentB.preferredDomain) {
    collaborationPreferences += 3;
  }
  // Different roles preferred = complementary team setup
  if (studentA.preferredRole !== studentB.preferredRole) {
    collaborationPreferences += 2;
  } else {
    collaborationPreferences += 1;
  }
  collaborationPreferences = Math.min(5, collaborationPreferences);

  // Total Score Calculation (capped 0 - 100)
  const totalScore = Math.min(
    100,
    Math.max(
      0,
      skillComplementarity +
        sharedInterests +
        projectGoals +
        availabilityMatch +
        experienceCompatibility +
        collaborationPreferences
    )
  );

  // Generate transparent human-readable explanation
  let explanation = "";
  if (totalScore >= 85) {
    explanation = `Exceptional match! You share passion in ${sharedInterestsList.slice(0, 2).join(" & ") || "core areas"} while ${studentB.fullName.split(" ")[0]} adds key technical superpowers in ${complementarySkills.slice(0, 2).join(", ") || "complementary tech"} with synchronized availability.`;
  } else if (totalScore >= 70) {
    explanation = `Strong synergy. Balanced cross-functional compatibility with shared interest in ${sharedInterestsList[0] || "tech"} and complementary skills in ${complementarySkills[0] || "specialized tools"}.`;
  } else if (totalScore >= 50) {
    explanation = `Moderate compatibility. Overlapping baseline skills with different domain angles that can enrich project diversity.`;
  } else {
    explanation = `Divergent focus areas. Great if you want to explore contrasting perspectives or build an unconventional interdisciplinary squad.`;
  }

  return {
    totalScore,
    skillComplementarity,
    sharedInterests,
    projectGoals,
    availabilityMatch,
    experienceCompatibility,
    collaborationPreferences,
    overlapSkills,
    complementarySkills,
    sharedInterestsList,
    sharedGoalsList,
    explanation
  };
}

/**
 * Returns the top suggested collaborators for a target student from a list of profiles.
 */
export function getTopMatches(
  currentStudent: StudentProfile,
  allStudents: StudentProfile[],
  limit = 5
): { student: StudentProfile; match: MatchScoreBreakdown }[] {
  return allStudents
    .filter((s) => s.id !== currentStudent.id)
    .map((s) => ({
      student: s,
      match: calculateCompatibility(currentStudent, s)
    }))
    .sort((a, b) => b.match.totalScore - a.match.totalScore)
    .slice(0, limit);
}

