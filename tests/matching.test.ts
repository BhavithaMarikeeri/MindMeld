import { describe, it, expect } from "vitest";
import { calculateCompatibility } from "../src/lib/algorithms/matching";
import { DEMO_STUDENTS } from "../src/lib/demo/demoData";

describe("AI Compatibility Matching Engine", () => {
  const studentA = DEMO_STUDENTS[0]; // Aria Vance (AI/ML Engineer, Stanford)
  const studentB = DEMO_STUDENTS[1]; // Marcus Sterling (Full-Stack PM, MIT)
  const studentC = DEMO_STUDENTS[2]; // Elena Rostova (UI/UX Designer, Berkeley)

  it("calculates a normalized compatibility score between 0 and 100", () => {
    const result = calculateCompatibility(studentA, studentB);
    expect(result.totalScore).toBeGreaterThanOrEqual(0);
    expect(result.totalScore).toBeLessThanOrEqual(100);
  });

  it("identifies complementary skills correctly", () => {
    const result = calculateCompatibility(studentA, studentC);
    // Elena has UI/UX Design and Figma which Aria doesn't list
    expect(result.complementarySkills.length).toBeGreaterThan(0);
    expect(result.skillComplementarity).toBeGreaterThan(0);
  });

  it("accurately detects shared interests", () => {
    const result = calculateCompatibility(studentA, studentB);
    // Both share Startups and Hackathons
    expect(result.sharedInterestsList).toContain("Hackathons");
    expect(result.sharedInterests).toBeGreaterThanOrEqual(10);
  });

  it("generates a transparent human-readable explanation", () => {
    const result = calculateCompatibility(studentA, studentB);
    expect(typeof result.explanation).toBe("string");
    expect(result.explanation.length).toBeGreaterThan(20);
  });
});

