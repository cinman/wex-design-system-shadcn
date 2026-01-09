/**
 * WexMultiSelect Component Tests
 *
 * Essential tests covering core functionality:
 * - Rendering with different display modes
 * - Selection and deselection
 * - Select all functionality
 * - Filter functionality
 * - States (disabled, invalid)
 * - Keyboard navigation
 * - Float label integration
 * - Accessibility
 */

import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { WexMultiSelect, WexLabel } from "@/components/wex";

// Test data
const cities = [
  { label: "New York", value: "ny" },
  { label: "Los Angeles", value: "la" },
  { label: "Chicago", value: "chi" },
  { label: "Houston", value: "hou" },
];

const citiesWithDisabled = [
  { label: "New York", value: "ny" },
  { label: "Los Angeles", value: "la" },
  { label: "Chicago", value: "chi", disabled: true },
  { label: "Houston", value: "hou" },
];

const groupedCities = [
  { label: "New York", value: "ny", group: "East" },
  { label: "Boston", value: "bos", group: "East" },
  { label: "Los Angeles", value: "la", group: "West" },
  { label: "Seattle", value: "sea", group: "West" },
];

describe("WexMultiSelect", () => {
  // ============================================
  // RENDERING
  // ============================================
  describe("Rendering", () => {
    it("renders with placeholder", () => {
      render(
        <WexMultiSelect
          options={cities}
          placeholder="Select cities..."
          aria-label="City selector"
        />
      );
      expect(screen.getByRole("combobox")).toHaveTextContent("Select cities...");
    });

    it("renders with selected values in comma mode", () => {
      render(
        <WexMultiSelect
          options={cities}
          value={["ny", "la"]}
          display="comma"
          aria-label="City selector"
        />
      );
      expect(screen.getByRole("combobox")).toHaveTextContent("New York, Los Angeles");
    });

    it("shows count when exceeding maxSelectedLabels", () => {
      render(
        <WexMultiSelect
          options={cities}
          value={["ny", "la", "chi", "hou"]}
          maxSelectedLabels={3}
          aria-label="City selector"
        />
      );
      expect(screen.getByRole("combobox")).toHaveTextContent("4 items selected");
    });

    it("renders with chips mode", () => {
      render(
        <WexMultiSelect
          options={cities}
          value={["ny", "la"]}
          display="chips"
          aria-label="City selector"
        />
      );
      expect(screen.getByRole("combobox")).toHaveTextContent("New York");
      expect(screen.getByRole("combobox")).toHaveTextContent("Los Angeles");
    });

    it("shows all labels when under maxSelectedLabels threshold", () => {
      render(
        <WexMultiSelect
          options={cities}
          value={["ny", "la"]}
          display="comma"
          maxSelectedLabels={3}
          aria-label="City selector"
        />
      );
      expect(screen.getByRole("combobox")).toHaveTextContent("New York, Los Angeles");
    });

    it("shows count display when chips mode exceeds maxSelectedLabels", () => {
      render(
        <WexMultiSelect
          options={cities}
          value={["ny", "la", "chi", "hou"]}
          display="chips"
          maxSelectedLabels={3}
          aria-label="City selector"
        />
      );
      expect(screen.getByRole("combobox")).toHaveTextContent("4 items selected");
    });
  });

  // ============================================
  // SELECTION
  // ============================================
  describe("Selection", () => {
    it("selects an option on click", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexMultiSelect
          options={cities}
          value={[]}
          onValueChange={handleChange}
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByRole("option", { name: "New York" }));

      expect(handleChange).toHaveBeenCalledWith(["ny"]);
    });

    it("deselects an option on click", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexMultiSelect
          options={cities}
          value={["ny"]}
          onValueChange={handleChange}
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByRole("option", { name: "New York" }));

      expect(handleChange).toHaveBeenCalledWith([]);
    });

    it("handles multiple selections", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexMultiSelect
          options={cities}
          value={["ny"]}
          onValueChange={handleChange}
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByRole("option", { name: "Los Angeles" }));

      expect(handleChange).toHaveBeenCalledWith(["ny", "la"]);
    });

    it("respects disabled options", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexMultiSelect
          options={citiesWithDisabled}
          value={[]}
          onValueChange={handleChange}
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      const disabledOption = screen.getByRole("option", { name: "Chicago" });
      expect(disabledOption).toHaveAttribute("aria-disabled", "true");
      
      await user.click(disabledOption);
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("removes chip in chips mode", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexMultiSelect
          options={cities}
          value={["ny", "la"]}
          onValueChange={handleChange}
          display="chips"
          aria-label="City selector"
        />
      );

      const removeButton = screen.getByRole("button", { name: "Remove New York" });
      await user.click(removeButton);

      expect(handleChange).toHaveBeenCalledWith(["la"]);
    });
  });

  // ============================================
  // SELECT ALL
  // ============================================
  describe("Select All", () => {
    it("shows select all checkbox when enabled", async () => {
      const user = userEvent.setup();
      render(
        <WexMultiSelect
          options={cities}
          value={[]}
          showSelectAll
          selectAllLabel="Select All Cities"
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByText("Select All Cities")).toBeInTheDocument();
    });

    it("selects all options on select all click", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexMultiSelect
          options={cities}
          value={[]}
          onValueChange={handleChange}
          showSelectAll
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByRole("checkbox", { name: /select all/i }));

      expect(handleChange).toHaveBeenCalledWith(["ny", "la", "chi", "hou"]);
    });

    it("deselects all options when all are selected", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexMultiSelect
          options={cities}
          value={["ny", "la", "chi", "hou"]}
          onValueChange={handleChange}
          showSelectAll
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByRole("checkbox", { name: /select all/i }));

      expect(handleChange).toHaveBeenCalledWith([]);
    });

    it("shows indeterminate state when some options selected", async () => {
      const user = userEvent.setup();
      render(
        <WexMultiSelect
          options={cities}
          value={["ny", "la"]}
          showSelectAll
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      const selectAllCheckbox = screen.getByRole("checkbox", { name: /select all/i });
      expect(selectAllCheckbox).toHaveAttribute("aria-checked", "mixed");
    });
  });

  // ============================================
  // FILTER
  // ============================================
  describe("Filter", () => {
    it("shows filter input when enabled", async () => {
      const user = userEvent.setup();
      render(
        <WexMultiSelect
          options={cities}
          filter
          filterPlaceholder="Search cities..."
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByPlaceholderText("Search cities...")).toBeInTheDocument();
    });

    it("filters options based on input", async () => {
      const user = userEvent.setup();
      render(
        <WexMultiSelect
          options={cities}
          filter
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      await user.type(screen.getByRole("textbox"), "new");

      expect(screen.getByRole("option", { name: "New York" })).toBeInTheDocument();
      expect(screen.queryByRole("option", { name: "Los Angeles" })).not.toBeInTheDocument();
    });

    it("shows empty state when no options match", async () => {
      const user = userEvent.setup();
      render(
        <WexMultiSelect
          options={cities}
          filter
          emptyText="No cities found"
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      await user.type(screen.getByRole("textbox"), "xyz");

      expect(screen.getByText("No cities found")).toBeInTheDocument();
    });
  });

  // ============================================
  // STATES
  // ============================================
  describe("States", () => {
    it("disables the component when disabled prop is true", () => {
      render(
        <WexMultiSelect
          options={cities}
          disabled
          aria-label="City selector"
        />
      );
      expect(screen.getByRole("combobox")).toBeDisabled();
    });

    it("does not open when disabled", async () => {
      const user = userEvent.setup();
      render(
        <WexMultiSelect
          options={cities}
          disabled
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("sets aria-invalid when invalid prop is true", () => {
      render(
        <WexMultiSelect
          options={cities}
          invalid
          aria-label="City selector"
        />
      );
      expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
    });
  });

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================
  describe("Keyboard Navigation", () => {
    it("opens dropdown on Enter key", async () => {
      const user = userEvent.setup();
      render(
        <WexMultiSelect
          options={cities}
          aria-label="City selector"
        />
      );

      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{Enter}");

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("opens dropdown on Space key", async () => {
      const user = userEvent.setup();
      render(
        <WexMultiSelect
          options={cities}
          aria-label="City selector"
        />
      );

      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard(" ");

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("opens dropdown on ArrowDown", async () => {
      const user = userEvent.setup();
      render(
        <WexMultiSelect
          options={cities}
          aria-label="City selector"
        />
      );

      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{ArrowDown}");

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("closes dropdown on Escape", async () => {
      const user = userEvent.setup();
      render(
        <WexMultiSelect
          options={cities}
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  // ============================================
  // FLOAT LABEL
  // ============================================
  describe("Float Label", () => {
    it("applies float label height and padding", () => {
      render(
        <WexMultiSelect
          options={cities}
          floatLabel
          aria-label="City selector"
        />
      );
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("!min-h-14", "!pt-5", "!pb-2");
    });

    it("applies small float label classes", () => {
      render(
        <WexMultiSelect
          options={cities}
          floatLabel
          size="sm"
          aria-label="City selector"
        />
      );
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("!min-h-12", "!pt-5", "!pb-1");
    });

    it("applies large float label classes", () => {
      render(
        <WexMultiSelect
          options={cities}
          floatLabel
          size="lg"
          aria-label="City selector"
        />
      );
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("!min-h-16", "!pt-6", "!pb-2");
    });

    it("sets data-has-value when values selected", () => {
      render(
        <WexMultiSelect
          options={cities}
          value={["ny"]}
          floatLabel
          aria-label="City selector"
        />
      );
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("data-has-value");
    });

    it("does not show placeholder text when floatLabel is true and no value", () => {
      render(
        <WexMultiSelect
          options={cities}
          value={[]}
          placeholder="Select cities..."
          floatLabel
          aria-label="City selector"
        />
      );
      const trigger = screen.getByRole("combobox");
      expect(trigger).not.toHaveTextContent("Select cities...");
    });
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================
  describe("Accessibility", () => {
    it("supports aria-label", () => {
      render(
        <WexMultiSelect
          options={cities}
          aria-label="Select your cities"
        />
      );
      expect(screen.getByRole("combobox")).toHaveAttribute("aria-label", "Select your cities");
    });

    it("works with WexLabel component", () => {
      render(
        <>
          <WexLabel htmlFor="city-select">Cities</WexLabel>
          <WexMultiSelect
            id="city-select"
            options={cities}
          />
        </>
      );
      // The label is associated via htmlFor/id
      const label = screen.getByText("Cities");
      expect(label).toHaveAttribute("for", "city-select");
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("id", "city-select");
    });

    it("has correct ARIA attributes on dropdown", async () => {
      const user = userEvent.setup();
      render(
        <WexMultiSelect
          options={cities}
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      
      const listbox = screen.getByRole("listbox");
      expect(listbox).toHaveAttribute("aria-multiselectable", "true");
    });

    it("has correct aria-selected on options", async () => {
      const user = userEvent.setup();
      render(
        <WexMultiSelect
          options={cities}
          value={["ny"]}
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      
      const selectedOption = screen.getByRole("option", { name: "New York" });
      const unselectedOption = screen.getByRole("option", { name: "Los Angeles" });
      
      expect(selectedOption).toHaveAttribute("aria-selected", "true");
      expect(unselectedOption).toHaveAttribute("aria-selected", "false");
    });
  });

  // ============================================
  // GROUPED OPTIONS
  // ============================================
  describe("Grouped Options", () => {
    it("renders options in groups", async () => {
      const user = userEvent.setup();
      render(
        <WexMultiSelect
          options={groupedCities}
          aria-label="City selector"
        />
      );

      await user.click(screen.getByRole("combobox"));
      
      expect(screen.getByText("East")).toBeInTheDocument();
      expect(screen.getByText("West")).toBeInTheDocument();
    });
  });
});

