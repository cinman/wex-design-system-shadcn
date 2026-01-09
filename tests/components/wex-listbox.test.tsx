/**
 * WexListbox Component Tests
 *
 * Tests covering core functionality:
 * - Rendering with options
 * - Single and multiple selection
 * - Filter functionality
 * - Keyboard navigation
 * - States (disabled, invalid)
 * - Accessibility
 */

import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { WexListbox, type ListboxOptionData } from "@/components/wex";

// Test data
const cities: ListboxOptionData[] = [
  { label: "New York", value: "ny" },
  { label: "Los Angeles", value: "la" },
  { label: "Chicago", value: "chi" },
  { label: "Houston", value: "hou" },
];

const citiesWithDisabled: ListboxOptionData[] = [
  { label: "New York", value: "ny" },
  { label: "Los Angeles", value: "la", disabled: true },
  { label: "Chicago", value: "chi" },
];

const groupedCities: ListboxOptionData[] = [
  { label: "New York", value: "ny", group: "East" },
  { label: "Boston", value: "bos", group: "East" },
  { label: "Los Angeles", value: "la", group: "West" },
  { label: "San Francisco", value: "sf", group: "West" },
];

describe("WexListbox", () => {
  // ============================================
  // RENDERING
  // ============================================
  describe("Rendering", () => {
    it("renders with options", () => {
      render(
        <WexListbox options={cities} aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getAllByRole("option")).toHaveLength(4);
    });

    it("renders with default value selected", () => {
      render(
        <WexListbox options={cities} value="la" aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );
      const laOption = screen.getByRole("option", { name: "Los Angeles" });
      expect(laOption).toHaveAttribute("aria-selected", "true");
    });

    it("accepts className prop", () => {
      render(
        <WexListbox options={cities} className="custom-class" aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );
      const container = screen.getByRole("listbox").parentElement;
      expect(container).toHaveClass("custom-class");
    });

    it("renders empty state when no options", () => {
      render(
        <WexListbox options={[]} aria-label="Empty">
          <WexListbox.Options />
        </WexListbox>
      );
      expect(screen.getByText("No options found")).toBeInTheDocument();
    });

    it("renders with grouped options", () => {
      render(
        <WexListbox options={groupedCities} aria-label="Grouped Cities">
          <WexListbox.Options />
        </WexListbox>
      );
      expect(screen.getByText("East")).toBeInTheDocument();
      expect(screen.getByText("West")).toBeInTheDocument();
    });
  });

  // ============================================
  // SINGLE SELECTION
  // ============================================
  describe("Single Selection", () => {
    it("selects an option on click", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexListbox options={cities} onValueChange={handleChange} aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );

      await user.click(screen.getByRole("option", { name: "Chicago" }));
      expect(handleChange).toHaveBeenCalledWith("chi");
    });

    it("updates selection when clicking different option", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexListbox options={cities} value="ny" onValueChange={handleChange} aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );

      await user.click(screen.getByRole("option", { name: "Houston" }));
      expect(handleChange).toHaveBeenCalledWith("hou");
    });

    it("shows checkmark when checkmark prop is true", () => {
      render(
        <WexListbox options={cities} value="la" checkmark aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );
      const laOption = screen.getByRole("option", { name: "Los Angeles" });
      // Checkmark icon should be present in selected option
      const checkIcon = laOption.querySelector("svg");
      expect(checkIcon).toBeInTheDocument();
    });
  });

  // ============================================
  // MULTIPLE SELECTION
  // ============================================
  describe("Multiple Selection", () => {
    it("allows selecting multiple options", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexListbox 
          options={cities} 
          value={[]} 
          onValueChange={handleChange} 
          multiple 
          aria-label="Cities"
        >
          <WexListbox.Options />
        </WexListbox>
      );

      await user.click(screen.getByRole("option", { name: "New York" }));
      expect(handleChange).toHaveBeenCalledWith(["ny"]);
    });

    it("deselects an already selected option", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexListbox 
          options={cities} 
          value={["ny", "la"]} 
          onValueChange={handleChange} 
          multiple 
          aria-label="Cities"
        >
          <WexListbox.Options />
        </WexListbox>
      );

      await user.click(screen.getByRole("option", { name: "Los Angeles" }));
      expect(handleChange).toHaveBeenCalledWith(["ny"]);
    });

    it("shows checkbox when checkbox prop is true", () => {
      render(
        <WexListbox 
          options={cities} 
          value={["la"]} 
          multiple 
          checkbox 
          aria-label="Cities"
        >
          <WexListbox.Options />
        </WexListbox>
      );
      // All options should have checkbox divs
      const options = screen.getAllByRole("option");
      options.forEach((option) => {
        const checkboxDiv = option.querySelector(".rounded-sm.border");
        expect(checkboxDiv).toBeInTheDocument();
      });
    });

    it("sets aria-multiselectable on listbox", () => {
      render(
        <WexListbox options={cities} multiple aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );
      expect(screen.getByRole("listbox")).toHaveAttribute("aria-multiselectable", "true");
    });
  });

  // ============================================
  // FILTER
  // ============================================
  describe("Filter", () => {
    it("renders filter input", () => {
      render(
        <WexListbox options={cities} aria-label="Cities">
          <WexListbox.Header>
            <WexListbox.Filter placeholder="Search..." />
          </WexListbox.Header>
          <WexListbox.Options />
        </WexListbox>
      );
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    it("filters options based on input", async () => {
      const user = userEvent.setup();
      render(
        <WexListbox options={cities} aria-label="Cities">
          <WexListbox.Header>
            <WexListbox.Filter placeholder="Search..." />
          </WexListbox.Header>
          <WexListbox.Options />
        </WexListbox>
      );

      await user.type(screen.getByPlaceholderText("Search..."), "New");
      
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent("New York");
    });

    it("shows empty message when no results", async () => {
      const user = userEvent.setup();
      render(
        <WexListbox options={cities} aria-label="Cities">
          <WexListbox.Header>
            <WexListbox.Filter placeholder="Search..." />
          </WexListbox.Header>
          <WexListbox.Options />
          <WexListbox.Empty>No cities found</WexListbox.Empty>
        </WexListbox>
      );

      await user.type(screen.getByPlaceholderText("Search..."), "xyz");
      expect(screen.getByText("No cities found")).toBeInTheDocument();
    });
  });

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================
  describe("Keyboard Navigation", () => {
    it("navigates with ArrowDown", async () => {
      const user = userEvent.setup();
      render(
        <WexListbox options={cities} aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );

      const firstOption = screen.getByRole("option", { name: "New York" });
      await user.click(firstOption);
      await user.keyboard("{ArrowDown}");

      expect(screen.getByRole("option", { name: "Los Angeles" })).toHaveFocus();
    });

    it("navigates with ArrowUp", async () => {
      const user = userEvent.setup();
      render(
        <WexListbox options={cities} aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );

      const secondOption = screen.getByRole("option", { name: "Los Angeles" });
      await user.click(secondOption);
      await user.keyboard("{ArrowUp}");

      expect(screen.getByRole("option", { name: "New York" })).toHaveFocus();
    });

    it("navigates to first option with Home", async () => {
      const user = userEvent.setup();
      render(
        <WexListbox options={cities} aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );

      const lastOption = screen.getByRole("option", { name: "Houston" });
      await user.click(lastOption);
      await user.keyboard("{Home}");

      expect(screen.getByRole("option", { name: "New York" })).toHaveFocus();
    });

    it("navigates to last option with End", async () => {
      const user = userEvent.setup();
      render(
        <WexListbox options={cities} aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );

      const firstOption = screen.getByRole("option", { name: "New York" });
      await user.click(firstOption);
      await user.keyboard("{End}");

      expect(screen.getByRole("option", { name: "Houston" })).toHaveFocus();
    });

    it("selects with Enter key", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexListbox options={cities} onValueChange={handleChange} aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );

      const firstOption = screen.getByRole("option", { name: "New York" });
      await user.click(firstOption);
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      expect(handleChange).toHaveBeenCalledWith("la");
    });

    it("selects with Space key", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexListbox options={cities} onValueChange={handleChange} aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );

      const firstOption = screen.getByRole("option", { name: "New York" });
      await user.click(firstOption);
      await user.keyboard(" ");

      expect(handleChange).toHaveBeenCalledWith("ny");
    });
  });

  // ============================================
  // STATES
  // ============================================
  describe("States", () => {
    it("disables the entire listbox when disabled prop is true", () => {
      render(
        <WexListbox options={cities} disabled aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );
      
      expect(screen.getByRole("listbox")).toHaveAttribute("aria-disabled", "true");
      const container = screen.getByRole("listbox").parentElement;
      expect(container).toHaveClass("opacity-50", "cursor-not-allowed");
    });

    it("does not select when listbox is disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexListbox options={cities} onValueChange={handleChange} disabled aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );

      await user.click(screen.getByRole("option", { name: "Chicago" }));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("disables individual options", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexListbox 
          options={citiesWithDisabled} 
          onValueChange={handleChange} 
          aria-label="Cities"
        >
          <WexListbox.Options />
        </WexListbox>
      );

      const disabledOption = screen.getByRole("option", { name: "Los Angeles" });
      expect(disabledOption).toHaveAttribute("aria-disabled", "true");
      expect(disabledOption).toHaveClass("pointer-events-none", "opacity-50");

      await user.click(disabledOption);
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("applies invalid styling when invalid prop is true", () => {
      render(
        <WexListbox options={cities} invalid aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );
      
      const container = screen.getByRole("listbox").parentElement;
      expect(container).toHaveClass("border-destructive");
    });
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================
  describe("Accessibility", () => {
    it("has proper listbox role", () => {
      render(
        <WexListbox options={cities} aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(
        <WexListbox options={cities} aria-label="Select your city">
          <WexListbox.Options aria-label="City options" />
        </WexListbox>
      );
      expect(screen.getByRole("listbox")).toHaveAttribute("aria-label", "City options");
    });

    it("supports aria-labelledby", () => {
      render(
        <>
          <label id="cities-label">Cities</label>
          <WexListbox options={cities}>
            <WexListbox.Options aria-labelledby="cities-label" />
          </WexListbox>
        </>
      );
      expect(screen.getByRole("listbox")).toHaveAttribute("aria-labelledby", "cities-label");
    });

    it("sets aria-selected on options", () => {
      render(
        <WexListbox options={cities} value="chi" aria-label="Cities">
          <WexListbox.Options />
        </WexListbox>
      );
      
      const selectedOption = screen.getByRole("option", { name: "Chicago" });
      const otherOption = screen.getByRole("option", { name: "New York" });
      
      expect(selectedOption).toHaveAttribute("aria-selected", "true");
      expect(otherOption).toHaveAttribute("aria-selected", "false");
    });
  });

  // ============================================
  // MANUAL OPTIONS
  // ============================================
  describe("Manual Options", () => {
    it("renders manual options with uKey", () => {
      render(
        <WexListbox aria-label="Options">
          <WexListbox.Options>
            <WexListbox.Option uKey="opt1">Option One</WexListbox.Option>
            <WexListbox.Option uKey="opt2">Option Two</WexListbox.Option>
          </WexListbox.Options>
        </WexListbox>
      );
      
      expect(screen.getByRole("option", { name: "Option One" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Option Two" })).toBeInTheDocument();
    });

    it("selects manual option on click", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexListbox onValueChange={handleChange} aria-label="Options">
          <WexListbox.Options>
            <WexListbox.Option uKey="opt1">Option One</WexListbox.Option>
            <WexListbox.Option uKey="opt2">Option Two</WexListbox.Option>
          </WexListbox.Options>
        </WexListbox>
      );

      await user.click(screen.getByRole("option", { name: "Option One" }));
      expect(handleChange).toHaveBeenCalledWith("opt1");
    });
  });
});

