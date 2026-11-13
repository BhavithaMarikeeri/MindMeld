import { PersonalityProfile } from "@/types";

export interface QuizQuestion {
  id: number;
  question: string;
  category: "teamwork" | "leadership" | "communication" | "problemSolving" | "adaptability";
  options: {
    label: string;
    description: string;
    weights: {
      teamwork: number;
      leadership: number;
      communication: number;
      problemSolving: number;
      adaptability: number;
    };
  }[];
}

export const PERSONALITY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When starting a complex 48-hour hackathon project, what is your immediate instinct?",
    category: "problemSolving",
    options: [
      {
        label: "Architect the system diagram and data contracts first",
        description: "Focus on technical clarity and eliminating downstream bottlenecks.",
        weights: { teamwork: 15, leadership: 20, communication: 15, problemSolving: 30, adaptability: 20 }
      },
      {
        label: "Brainstorm wild 10x ideas and unique value propositions",
        description: "Prioritize novelty, moonshot innovation and high-energy pitch potential.",
        weights: { teamwork: 15, leadership: 25, communication: 25, problemSolving: 20, adaptability: 15 }
      },
      {
        label: "Jump straight into the repo, scaffold the repo and ship a quick prototype",
        description: "Value rapid iteration, working code, and tangible progress.",
        weights: { teamwork: 20, leadership: 15, communication: 15, problemSolving: 25, adaptability: 25 }
      },
      {
        label: "Check in with everyone to ensure aligned goals and balanced work distributions",
        description: "Prioritize team morale, transparent communication, and psychological safety.",
        weights: { teamwork: 30, leadership: 20, communication: 30, problemSolving: 10, adaptability: 10 }
      }
    ]
  },
  {
    id: 2,
    question: "How do you prefer to handle technical disagreements or competing architecture opinions?",
    category: "communication",
    options: [
      {
        label: "Run a quick benchmark or build a spike to let empirical evidence decide",
        description: "Objective benchmarks over subjective debates.",
        weights: { teamwork: 20, leadership: 15, communication: 20, problemSolving: 30, adaptability: 15 }
      },
      {
        label: "Facilitate a structured discussion and synthesize the best components of both",
        description: "Consensus-building that leverages the strengths of diverse viewpoints.",
        weights: { teamwork: 25, leadership: 25, communication: 30, problemSolving: 15, adaptability: 20 }
      },
      {
        label: "Take ownership, make an executive decision, and keep momentum flowing",
        description: "Decisiveness and velocity are better than analysis paralysis.",
        weights: { teamwork: 10, leadership: 30, communication: 15, problemSolving: 25, adaptability: 15 }
      },
      {
        label: "Adapt to the peer's approach and focus on elevating execution quality",
        description: "High flexibility and collaborative support.",
        weights: { teamwork: 30, leadership: 10, communication: 25, problemSolving: 15, adaptability: 30 }
      }
    ]
  },
  {
    id: 3,
    question: "When sudden scope creep threatens a project deadline, what is your move?",
    category: "adaptability",
    options: [
      {
        label: "Ruthlessly trim to the core MVP and double down on flawless stability",
        description: "Simplicity and bulletproof reliability over bloated half-features.",
        weights: { teamwork: 15, leadership: 25, communication: 15, problemSolving: 30, adaptability: 20 }
      },
      {
        label: "Pivot creatively and repackage what we built into a fresh compelling narrative",
        description: "High agility, storytelling, and framing the pivots as deliberate innovations.",
        weights: { teamwork: 20, leadership: 20, communication: 25, problemSolving: 20, adaptability: 30 }
      },
      {
        label: "Hunker down, divide sub-tasks cleanly, and execute the remaining modules",
        description: "High grit, intense execution, and task velocity.",
        weights: { teamwork: 25, leadership: 15, communication: 20, problemSolving: 25, adaptability: 20 }
      },
      {
        label: "Call a rapid 5-minute sync to re-align expectations and re-distribute energy",
        description: "Clear expectations keep everyone calm and motivated under pressure.",
        weights: { teamwork: 30, leadership: 25, communication: 30, problemSolving: 15, adaptability: 20 }
      }
    ]
  },
  {
    id: 4,
    question: "What gives you the highest satisfaction at the end of a project showcase?",
    category: "leadership",
    options: [
      {
        label: "Knowing the system architecture was pristine and mathematically sound",
        description: "Craftsmanship, clean code, and zero runtime surprises.",
        weights: { teamwork: 15, leadership: 15, communication: 10, problemSolving: 35, adaptability: 15 }
      },
      {
        label: "Hearing judges and users gasp at how imaginative and novel the concept is",
        description: "Visionary impact, novelty, and inspiring others.",
        weights: { teamwork: 15, leadership: 25, communication: 30, problemSolving: 20, adaptability: 15 }
      },
      {
        label: "Seeing our live demo work smoothly under intense stress testing",
        description: "Real-world utility, dependability, and tangible user value.",
        weights: { teamwork: 25, leadership: 20, communication: 15, problemSolving: 30, adaptability: 20 }
      },
      {
        label: "The feeling of pride in how tightly knit and happy our team remained throughout",
        description: "Culture, shared triumph, and lasting friendships.",
        weights: { teamwork: 35, leadership: 20, communication: 30, problemSolving: 10, adaptability: 20 }
      }
    ]
  }
];

export function computePersonalityProfile(
  answers: { questionId: number; selectedOptionIndex: number }[]
): PersonalityProfile {
  let teamwork = 50;
  let leadership = 50;
  let communication = 50;
  let problemSolving = 50;
  let adaptability = 50;

  answers.forEach((ans) => {
    const q = PERSONALITY_QUIZ_QUESTIONS.find((item) => item.id === ans.questionId);
    if (q && q.options[ans.selectedOptionIndex]) {
      const w = q.options[ans.selectedOptionIndex].weights;
      teamwork += w.teamwork;
      leadership += w.leadership;
      communication += w.communication;
      problemSolving += w.problemSolving;
      adaptability += w.adaptability;
    }
  });

  // Normalize between 40 and 98
  const norm = (val: number) => Math.min(98, Math.max(45, Math.round((val / 160) * 100)));

  const finalTraits = {
    teamwork: norm(teamwork),
    leadership: norm(leadership),
    communication: norm(communication),
    problemSolving: norm(problemSolving),
    adaptability: norm(adaptability)
  };

  // Determine Archetype
  if (finalTraits.problemSolving >= finalTraits.communication && finalTraits.problemSolving >= finalTraits.leadership) {
    return {
      archetype: "The Strategic Architect",
      tagline: "Master of system design, elegant abstractions, and rock-solid foundational logic.",
      traits: finalTraits,
      preferredWorkStyle: "Thrives with clear specifications, deep focus blocks, and peer reviews centered on architectural integrity.",
      strengths: ["Complex systems decomposition", "Data integrity & performance", "Technical foresight"],
      growthAreas: ["Communicating technical nuances to non-engineers", "Rapid imperfect prototyping"]
    };
  }

  if (finalTraits.leadership >= finalTraits.teamwork && finalTraits.communication >= 70) {
    return {
      archetype: "The Catalyst Visionary",
      tagline: "Inspiring product leader who connects disparate dots and turns ambiguity into momentum.",
      traits: finalTraits,
      preferredWorkStyle: "Excels when pitching high-stakes ideas, organizing roadmaps, and motivating teams toward ambitious milestones.",
      strengths: ["Pitching & storytelling", "Product vision & scope", "Cross-functional orchestration"],
      growthAreas: ["Patience with low-level implementation details", "Avoiding premature scope changes"]
    };
  }

  if (finalTraits.teamwork >= 75 && finalTraits.communication >= 70) {
    return {
      archetype: "The Harmonizing Coordinator",
      tagline: "The cultural glue of the squad who ensures every voice is amplified and unblocked.",
      traits: finalTraits,
      preferredWorkStyle: "Blossoms in inclusive, transparent environments with daily syncs and collaborative pair programming.",
      strengths: ["Empathic conflict resolution", "Team morale & psychological safety", "Unblocking team bottlenecks"],
      growthAreas: ["Making tough unilateral decisions", "Enforcing strict code cutoffs"]
    };
  }

  return {
    archetype: "The Pragmatic Builder",
    tagline: "High-velocity powerhouse who translates conceptual ideas into shipped software with speed and grit.",
    traits: finalTraits,
    preferredWorkStyle: "Prefers concise requirements, fast feedback loops, and tangible demos over protracted theory meetings.",
    strengths: ["High shipping velocity", "Full-stack agility", "Graceful handling of shifting requirements"],
    growthAreas: ["Documentation of edge cases", "Long-term architectural refactoring"]
  };
}

