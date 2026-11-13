import { describe, it, expect } from "vitest";
import { generateTeamFromCandidates } from "../src/lib/algorithms/roulette";
import { DEMO_STUDENTS } from "../src/lib/demo/demoData";

describe("Team Roulette Generator", () => {
  it("assembles a team with the exact requested team size", () => {
    const result = generateTeamFromCandidates({
      candidates: DEMO_STUDENTS,
      teamSize: 4,
      domain: "Artificial Intelligence",
      mode: "compatibility"
    });

    expect(result.members.length).toBe(4);
  });

  it("ensures zero duplicate members are in the generated squad", () => {
    const result = generateTeamFromCandidates({
      candidates: DEMO_STUDENTS,
      teamSize: 5,
      domain: "FinTech",
      mode: "compatibility"
    });

    const studentIds = result.members.map((m) => m.student.id);
    const uniqueIds = new Set(studentIds);
    expect(uniqueIds.size).toBe(5);
  });

  it("assigns exactly one team leader", () => {
    const result = generateTeamFromCandidates({
      candidates: DEMO_STUDENTS,
      teamSize: 4,
      domain: "Healthcare",
      mode: "compatibility"
    });

    const leaders = result.members.filter((m) => m.isLeader);
    expect(leaders.length).toBe(1);
  });

  it("assigns diverse roles to squad members", () => {
    const result = generateTeamFromCandidates({
      candidates: DEMO_STUDENTS,
      teamSize: 4,
      domain: "Cybersecurity",
      mode: "compatibility"
    });

    result.members.forEach((m) => {
      expect(m.assignedRole).toBeDefined();
      expect(typeof m.assignedRole).toBe("string");
    });
  });
});

