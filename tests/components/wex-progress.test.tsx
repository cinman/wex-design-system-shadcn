/**
 * WexProgress Component Tests
 * 
 * Note: Radix Progress manages value internally via transform styles.
 * We verify rendering and role, not internal implementation details.
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexProgress } from "@/components/wex";

describe("WexProgress", () => {
  it("renders without crashing", () => {
    render(<WexProgress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexProgress value={50} className="custom-class" />);
    expect(screen.getByRole("progressbar")).toHaveClass("custom-class");
  });

  it("renders with various values", () => {
    const { rerender } = render(<WexProgress value={75} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    rerender(<WexProgress value={0} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    rerender(<WexProgress value={100} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("has indicator child element", () => {
    const { container } = render(<WexProgress value={50} />);
    // The indicator is a child div that shows the progress
    const indicator = container.querySelector("[data-state]");
    expect(indicator).toBeInTheDocument();
  });
});

