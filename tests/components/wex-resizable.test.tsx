/**
 * WexResizable Component Tests
 * 
 * Note: Full rendering tests are skipped due to JSDOM/cssstyle incompatibility
 * with react-resizable-panels CSS parsing. Tested via visual inspection.
 */

import { describe, it, expect } from "vitest";
import { WexResizable } from "@/components/wex";

describe("WexResizable", () => {
  it("exports Group component", () => {
    expect(WexResizable.Group).toBeDefined();
    expect(typeof WexResizable.Group).toBe("function");
  });

  it("exports Panel component", () => {
    expect(WexResizable.Panel).toBeDefined();
    expect(typeof WexResizable.Panel).toBe("function");
  });

  it("exports Handle component", () => {
    expect(WexResizable.Handle).toBeDefined();
    expect(typeof WexResizable.Handle).toBe("function");
  });
});

