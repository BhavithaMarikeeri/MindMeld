import { describe, it, expect } from "vitest";
import { checkEligibleAchievements } from "../src/lib/algorithms/gamification";
import { calculateLevel } from "../src/lib/utils";

describe("Gamification & Level Progress Engine", () => {
  it("calculates levels and progress percentage accurately", () => {
    // 0 XP -> Level 1, 0%
    const lvl1 = calculateLevel(0);
    expect(lvl1.level).toBe(1);
    expect(lvl1.progress).toBe(0);

    // 250 XP -> Level 2, 0%
    const lvl2 = calculateLevel(250);
    expect(lvl2.level).toBe(2);
    expect(lvl2.progress).toBe(0);

    // 375 XP -> Level 2, 50%
    const lvl2Mid = calculateLevel(375);
    expect(lvl2Mid.level).toBe(2);
    expect(lvl2Mid.progress).toBe(50);
  });

  it("unlocks CONNECTOR badge when user forms 5 or more connections", () => {
    const eligible = checkEligibleAchievements({
      connectionCount: 5,
      generatedMissionsCount: 1,
      teamsCreatedCount: 1,
      streakDays: 3,
      completedTasksCount: 2,
      completedMissionsCount: 0,
      alreadyUnlockedCodes: []
    });

    const hasConnector = eligible.some((a) => a.code === "CONNECTOR");
    expect(hasConnector).toBe(true);
  });

  it("does not unlock achievements if criteria are not met", () => {
    const eligible = checkEligibleAchievements({
      connectionCount: 2,
      generatedMissionsCount: 1,
      teamsCreatedCount: 0,
      streakDays: 2,
      completedTasksCount: 1,
      completedMissionsCount: 0,
      alreadyUnlockedCodes: []
    });

    expect(eligible.length).toBe(0);
  });
});

