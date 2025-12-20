/**
 * WexEmpty Component Tests
 * 
 * WexEmpty is a compound component for building empty states.
 * It does not render default content - use WexEmpty.Title, etc.
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexEmpty } from "@/components/wex";

describe("WexEmpty", () => {
  it("renders without crashing", () => {
    render(
      <WexEmpty data-testid="empty">
        <WexEmpty.Header>
          <WexEmpty.Title>No data available</WexEmpty.Title>
        </WexEmpty.Header>
      </WexEmpty>
    );
    expect(screen.getByTestId("empty")).toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(
      <WexEmpty>
        <WexEmpty.Header>
          <WexEmpty.Title>No items found</WexEmpty.Title>
          <WexEmpty.Description>Try a different search</WexEmpty.Description>
        </WexEmpty.Header>
      </WexEmpty>
    );
    expect(screen.getByText("No items found")).toBeInTheDocument();
    expect(screen.getByText("Try a different search")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(
      <WexEmpty className="custom-class" data-testid="empty">
        <WexEmpty.Header>
          <WexEmpty.Title>Empty</WexEmpty.Title>
        </WexEmpty.Header>
      </WexEmpty>
    );
    expect(screen.getByTestId("empty")).toHaveClass("custom-class");
  });
});

