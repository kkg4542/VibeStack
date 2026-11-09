import { describe, expect, it } from "vitest";
import { countToolsWithFreePlan, freePlanLabel } from "@/lib/stack-facts";

const tools = [
  { slug: "a", pricing: "Free" },
  { slug: "b", pricing: "Freemium" },
  { slug: "c", pricing: "Paid" },
  { slug: "d", pricing: "freemium" },
];

describe("countToolsWithFreePlan", () => {
  it("counts Free and Freemium, case-insensitively", () => {
    expect(countToolsWithFreePlan(["a", "b", "c", "d"], tools)).toBe(3);
  });

  it("returns null when any tool is missing from the loaded list", () => {
    expect(countToolsWithFreePlan(["a", "missing"], tools)).toBeNull();
  });

  it("returns null for an empty stack or a tool without pricing", () => {
    expect(countToolsWithFreePlan([], tools)).toBeNull();
    expect(countToolsWithFreePlan(["x"], [{ slug: "x", pricing: null }])).toBeNull();
  });
});

describe("freePlanLabel", () => {
  it("describes none, some and all", () => {
    expect(freePlanLabel(0, 3)).toBe("No free plan");
    expect(freePlanLabel(2, 3)).toBe("2 of 3 with a free plan");
    expect(freePlanLabel(3, 3)).toBe("All have a free plan");
    expect(freePlanLabel(1, 1)).toBe("Has a free plan");
  });
});
