/**
 * WexSeparator Component Tests
 * 
 * Note: Radix Separator uses role="none" when decorative={true} (default).
 * Use decorative={false} to get role="separator".
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexSeparator } from "@/components/wex";

describe("WexSeparator", () => {
  it("renders without crashing", () => {
    render(<WexSeparator data-testid="separator" />);
    expect(screen.getByTestId("separator")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<WexSeparator className="custom-class" data-testid="separator" />);
    expect(screen.getByTestId("separator")).toHaveClass("custom-class");
  });

  it("renders horizontal by default", () => {
    render(<WexSeparator data-testid="separator" />);
    expect(screen.getByTestId("separator")).toHaveAttribute("data-orientation", "horizontal");
  });

  it("renders vertical when specified", () => {
    render(<WexSeparator orientation="vertical" data-testid="separator" />);
    expect(screen.getByTestId("separator")).toHaveAttribute("data-orientation", "vertical");
  });

  it("has role separator when not decorative", () => {
    render(<WexSeparator decorative={false} />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});

