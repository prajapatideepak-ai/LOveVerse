import { describe, expect, it } from "vitest";
import { decodeData, encodeData, resolveData } from "@/lib/love";

describe("share links", () => {
  it("round-trips names and messages including emoji", () => {
    const d = { from: "Arjun", to: "Priya 💗", msg: "तुम मेरी हो" };
    expect(decodeData(encodeData(d))).toEqual(d);
  });
  it("falls back to defaults for empty or broken links", () => {
    expect(resolveData("marry", "%%%").q).toBe("Will you marry me?");
    expect(resolveData("marry", encodeData({ q: "Marry me, Priya?" })).q).toBe("Marry me, Priya?");
  });
});
