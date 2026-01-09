/**
 * WexInputNumber Component Tests
 *
 * Comprehensive tests covering:
 * - Rendering and prop forwarding
 * - User interactions (typing, increment/decrement)
 * - Keyboard navigation (Arrow Up/Down, Home/End)
 * - Number formatting (decimal, currency, locale)
 * - Min/Max boundaries
 * - Button layouts (stacked, horizontal)
 * - Accessibility (spinbutton role, ARIA attributes)
 * - Variants and sizes
 * - Invalid and disabled states
 */

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { createRef, useState } from "react";
import { WexInputNumber, WexLabel } from "@/components/wex";

describe("WexInputNumber", () => {
  // ============================================
  // RENDERING TESTS
  // ============================================
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<WexInputNumber />);
      expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    });

    it("renders with default value", () => {
      render(<WexInputNumber defaultValue={42} />);
      expect(screen.getByRole("spinbutton")).toHaveValue("42");
    });

    it("renders with controlled value", () => {
      render(<WexInputNumber value={100} onValueChange={() => {}} />);
      expect(screen.getByRole("spinbutton")).toHaveValue("100");
    });

    it("renders with null value as empty", () => {
      render(<WexInputNumber value={null} onValueChange={() => {}} />);
      expect(screen.getByRole("spinbutton")).toHaveValue("");
    });

    it("accepts and applies className prop", () => {
      render(<WexInputNumber className="custom-class" />);
      const container = screen.getByRole("spinbutton").parentElement;
      expect(container).toHaveClass("custom-class");
    });

    it("forwards ref correctly", () => {
      const ref = createRef<HTMLInputElement>();
      render(<WexInputNumber ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("renders with placeholder text", () => {
      render(<WexInputNumber placeholder="Enter amount..." />);
      expect(screen.getByPlaceholderText("Enter amount...")).toBeInTheDocument();
    });
  });

  // ============================================
  // VARIANT TESTS
  // ============================================
  describe("Variants", () => {
    it("renders with default variant", () => {
      render(<WexInputNumber data-testid="input" />);
      const input = screen.getByRole("spinbutton");
      expect(input).toHaveClass("bg-wex-input-bg", "border");
    });

    it("renders with filled variant", () => {
      render(<WexInputNumber variant="filled" />);
      const input = screen.getByRole("spinbutton");
      expect(input).toHaveClass("bg-muted");
    });
  });

  // ============================================
  // SIZE TESTS
  // ============================================
  describe("Sizes", () => {
    it("renders with sm size", () => {
      render(<WexInputNumber inputSize="sm" />);
      expect(screen.getByRole("spinbutton")).toHaveClass("h-8");
    });

    it("renders with md (default) size", () => {
      render(<WexInputNumber inputSize="md" />);
      expect(screen.getByRole("spinbutton")).toHaveClass("h-11");
    });

    it("renders with lg size", () => {
      render(<WexInputNumber inputSize="lg" />);
      expect(screen.getByRole("spinbutton")).toHaveClass("h-12");
    });
  });

  // ============================================
  // STATE TESTS
  // ============================================
  describe("States", () => {
    it("applies invalid styling when invalid prop is true", () => {
      render(<WexInputNumber invalid />);
      const input = screen.getByRole("spinbutton");
      expect(input).toHaveClass("border-destructive");
    });

    it("sets aria-invalid when invalid", () => {
      render(<WexInputNumber invalid />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute("aria-invalid", "true");
    });

    it("disables input when disabled prop is true", () => {
      render(<WexInputNumber disabled />);
      expect(screen.getByRole("spinbutton")).toBeDisabled();
    });

    it("applies disabled styling when disabled", () => {
      render(<WexInputNumber disabled />);
      const input = screen.getByRole("spinbutton");
      expect(input).toHaveClass("disabled:cursor-not-allowed");
    });
  });

  // ============================================
  // USER INTERACTION TESTS
  // ============================================
  describe("User Interactions", () => {
    it("calls onValueChange when typing", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<WexInputNumber onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      await user.clear(input);
      await user.type(input, "123");
      
      expect(handleChange).toHaveBeenCalled();
    });

    it("updates display value when typing", async () => {
      const user = userEvent.setup();
      function ControlledInput() {
        const [value, setValue] = useState<number | null>(null);
        return <WexInputNumber value={value} onValueChange={setValue} />;
      }
      render(<ControlledInput />);
      
      const input = screen.getByRole("spinbutton");
      await user.type(input, "456");
      
      // Value should reflect typed input
      expect(input).toHaveValue("456");
    });

    it("clamps value to max when exceeding", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<WexInputNumber max={100} onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      await user.type(input, "150");
      await user.tab(); // Blur to trigger clamping
      
      // Should clamp to max
      expect(handleChange).toHaveBeenLastCalledWith(100);
    });

    it("clamps value to min when below", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<WexInputNumber min={10} onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      await user.type(input, "5");
      await user.tab(); // Blur to trigger clamping
      
      // Should clamp to min
      expect(handleChange).toHaveBeenLastCalledWith(10);
    });
  });

  // ============================================
  // KEYBOARD NAVIGATION TESTS
  // ============================================
  describe("Keyboard Navigation", () => {
    it("increments value on Arrow Up", async () => {
      const handleChange = vi.fn();
      render(<WexInputNumber defaultValue={50} onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      fireEvent.keyDown(input, { key: "ArrowUp" });
      
      expect(handleChange).toHaveBeenCalledWith(51);
    });

    it("decrements value on Arrow Down", async () => {
      const handleChange = vi.fn();
      render(<WexInputNumber defaultValue={50} onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      fireEvent.keyDown(input, { key: "ArrowDown" });
      
      expect(handleChange).toHaveBeenCalledWith(49);
    });

    it("sets to min value on Home key", async () => {
      const handleChange = vi.fn();
      render(<WexInputNumber defaultValue={50} min={10} onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      fireEvent.keyDown(input, { key: "Home" });
      
      expect(handleChange).toHaveBeenCalledWith(10);
    });

    it("sets to max value on End key", async () => {
      const handleChange = vi.fn();
      render(<WexInputNumber defaultValue={50} max={100} onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      fireEvent.keyDown(input, { key: "End" });
      
      expect(handleChange).toHaveBeenCalledWith(100);
    });

    it("respects step when incrementing", async () => {
      const handleChange = vi.fn();
      render(<WexInputNumber defaultValue={50} step={5} onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      fireEvent.keyDown(input, { key: "ArrowUp" });
      
      expect(handleChange).toHaveBeenCalledWith(55);
    });

    it("respects step when decrementing", async () => {
      const handleChange = vi.fn();
      render(<WexInputNumber defaultValue={50} step={5} onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      fireEvent.keyDown(input, { key: "ArrowDown" });
      
      expect(handleChange).toHaveBeenCalledWith(45);
    });

    it("does not go below min when decrementing", async () => {
      const handleChange = vi.fn();
      render(<WexInputNumber defaultValue={10} min={10} onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      fireEvent.keyDown(input, { key: "ArrowDown" });
      
      expect(handleChange).toHaveBeenCalledWith(10); // Should clamp to min
    });

    it("does not go above max when incrementing", async () => {
      const handleChange = vi.fn();
      render(<WexInputNumber defaultValue={100} max={100} onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      fireEvent.keyDown(input, { key: "ArrowUp" });
      
      expect(handleChange).toHaveBeenCalledWith(100); // Should clamp to max
    });

    it("does not respond to keyboard when disabled", async () => {
      const handleChange = vi.fn();
      render(<WexInputNumber defaultValue={50} disabled onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      fireEvent.keyDown(input, { key: "ArrowUp" });
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  // ============================================
  // BUTTON TESTS
  // ============================================
  describe("Buttons", () => {
    it("renders stacked buttons when showButtons and buttonLayout=stacked", () => {
      render(<WexInputNumber showButtons buttonLayout="stacked" />);
      
      expect(screen.getByLabelText("Increment")).toBeInTheDocument();
      expect(screen.getByLabelText("Decrement")).toBeInTheDocument();
    });

    it("renders horizontal buttons when showButtons and buttonLayout=horizontal", () => {
      render(<WexInputNumber showButtons buttonLayout="horizontal" />);
      
      expect(screen.getByLabelText("Increment")).toBeInTheDocument();
      expect(screen.getByLabelText("Decrement")).toBeInTheDocument();
    });

    it("increments value when clicking increment button", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexInputNumber
          defaultValue={50}
          showButtons
          buttonLayout="stacked"
          onValueChange={handleChange}
        />
      );
      
      await user.click(screen.getByLabelText("Increment"));
      
      expect(handleChange).toHaveBeenCalledWith(51);
    });

    it("decrements value when clicking decrement button", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <WexInputNumber
          defaultValue={50}
          showButtons
          buttonLayout="stacked"
          onValueChange={handleChange}
        />
      );
      
      await user.click(screen.getByLabelText("Decrement"));
      
      expect(handleChange).toHaveBeenCalledWith(49);
    });

    it("disables increment button when at max", () => {
      render(
        <WexInputNumber
          defaultValue={100}
          max={100}
          showButtons
          buttonLayout="stacked"
        />
      );
      
      expect(screen.getByLabelText("Increment")).toBeDisabled();
    });

    it("disables decrement button when at min", () => {
      render(
        <WexInputNumber
          defaultValue={0}
          min={0}
          showButtons
          buttonLayout="stacked"
        />
      );
      
      expect(screen.getByLabelText("Decrement")).toBeDisabled();
    });

    it("disables all buttons when input is disabled", () => {
      render(
        <WexInputNumber
          defaultValue={50}
          showButtons
          buttonLayout="stacked"
          disabled
        />
      );
      
      expect(screen.getByLabelText("Increment")).toBeDisabled();
      expect(screen.getByLabelText("Decrement")).toBeDisabled();
    });
  });

  // ============================================
  // FORMATTING TESTS
  // ============================================
  describe("Formatting", () => {
    it("formats with thousand separators by default", () => {
      render(<WexInputNumber defaultValue={1234567} />);
      const input = screen.getByRole("spinbutton");
      // Value should be formatted with grouping
      expect(input.getAttribute("value")).toMatch(/1[,.]?234[,.]?567/);
    });

    it("formats without thousand separators when useGrouping=false", () => {
      render(<WexInputNumber defaultValue={1234567} useGrouping={false} />);
      expect(screen.getByRole("spinbutton")).toHaveValue("1234567");
    });

    it("formats with suffix", () => {
      render(<WexInputNumber defaultValue={50} suffix="%" />);
      expect(screen.getByRole("spinbutton")).toHaveValue("50%");
    });

    it("formats with prefix", () => {
      render(<WexInputNumber defaultValue={100} prefix="$" />);
      expect(screen.getByRole("spinbutton")).toHaveValue("$100");
    });

    it("formats with min fraction digits", () => {
      render(<WexInputNumber defaultValue={10} minFractionDigits={2} />);
      const input = screen.getByRole("spinbutton");
      expect(input.getAttribute("value")).toMatch(/10[.,]00/);
    });
  });

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================
  describe("Accessibility", () => {
    it("has spinbutton role", () => {
      render(<WexInputNumber />);
      expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    });

    it("sets aria-valuenow with current value", () => {
      render(<WexInputNumber defaultValue={42} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute("aria-valuenow", "42");
    });

    it("sets aria-valuemin when min is provided", () => {
      render(<WexInputNumber min={10} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute("aria-valuemin", "10");
    });

    it("sets aria-valuemax when max is provided", () => {
      render(<WexInputNumber max={100} />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute("aria-valuemax", "100");
    });

    it("accepts aria-label", () => {
      render(<WexInputNumber aria-label="Quantity" />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute("aria-label", "Quantity");
    });

    it("accepts aria-labelledby", () => {
      render(
        <>
          <WexLabel id="qty-label">Quantity</WexLabel>
          <WexInputNumber aria-labelledby="qty-label" />
        </>
      );
      expect(screen.getByRole("spinbutton")).toHaveAttribute("aria-labelledby", "qty-label");
    });

    it("buttons have accessible labels", () => {
      render(<WexInputNumber showButtons buttonLayout="stacked" />);
      
      expect(screen.getByLabelText("Increment")).toBeInTheDocument();
      expect(screen.getByLabelText("Decrement")).toBeInTheDocument();
    });

    it("buttons have tabindex=-1 to not be in tab order", () => {
      render(<WexInputNumber showButtons buttonLayout="stacked" />);
      
      expect(screen.getByLabelText("Increment")).toHaveAttribute("tabIndex", "-1");
      expect(screen.getByLabelText("Decrement")).toHaveAttribute("tabIndex", "-1");
    });
  });

  // ============================================
  // CONTROLLED VS UNCONTROLLED TESTS
  // ============================================
  describe("Controlled vs Uncontrolled", () => {
    it("works as uncontrolled with defaultValue", async () => {
      const user = userEvent.setup();
      render(<WexInputNumber defaultValue={10} />);
      
      const input = screen.getByRole("spinbutton");
      fireEvent.keyDown(input, { key: "ArrowUp" });
      
      // Should increment internally
      expect(input).toHaveValue("11");
    });

    it("works as controlled with value and onValueChange", async () => {
      function ControlledInput() {
        const [value, setValue] = useState<number | null>(10);
        return <WexInputNumber value={value} onValueChange={setValue} />;
      }
      render(<ControlledInput />);
      
      const input = screen.getByRole("spinbutton");
      fireEvent.keyDown(input, { key: "ArrowUp" });
      
      expect(input).toHaveValue("11");
    });

    it("allows null value when allowEmpty is true", () => {
      render(<WexInputNumber allowEmpty defaultValue={null} />);
      expect(screen.getByRole("spinbutton")).toHaveValue("");
    });
  });

  // ============================================
  // EDGE CASES
  // ============================================
  describe("Edge Cases", () => {
    it("handles starting from null and incrementing", async () => {
      const handleChange = vi.fn();
      render(<WexInputNumber defaultValue={null} onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      fireEvent.keyDown(input, { key: "ArrowUp" });
      
      // Should start from 0 (or min if defined) and increment
      expect(handleChange).toHaveBeenCalled();
    });

    it("handles starting from null with min and incrementing", async () => {
      const handleChange = vi.fn();
      render(<WexInputNumber defaultValue={null} min={10} onValueChange={handleChange} />);
      
      const input = screen.getByRole("spinbutton");
      fireEvent.keyDown(input, { key: "ArrowUp" });
      
      // Should start from min (10) and increment
      expect(handleChange).toHaveBeenCalledWith(11);
    });

    it("handles negative numbers", () => {
      render(<WexInputNumber defaultValue={-50} />);
      expect(screen.getByRole("spinbutton")).toHaveValue("-50");
    });

    it("handles decimal numbers", () => {
      render(<WexInputNumber defaultValue={3.14} minFractionDigits={2} />);
      const input = screen.getByRole("spinbutton");
      expect(input.getAttribute("value")).toMatch(/3[.,]14/);
    });

    it("handles very large numbers", () => {
      render(<WexInputNumber defaultValue={9999999999} />);
      const input = screen.getByRole("spinbutton");
      expect(input).toBeInTheDocument();
    });
  });

  // ============================================
  // FLOAT LABEL INTEGRATION
  // ============================================
  describe("Float Label Integration", () => {
    it("renders with floatLabel prop", () => {
      render(<WexInputNumber floatLabel defaultValue={100} />);
      const input = screen.getByRole("spinbutton");
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue("100");
    });

    it("renders stacked buttons correctly with floatLabel", () => {
      render(
        <WexInputNumber 
          floatLabel 
          showButtons 
          buttonLayout="stacked" 
          defaultValue={5} 
        />
      );
      const input = screen.getByRole("spinbutton");
      expect(input).toHaveValue("5");
      
      // Check that increment/decrement buttons are present
      const incrementBtn = screen.getByRole("button", { name: /increment/i });
      const decrementBtn = screen.getByRole("button", { name: /decrement/i });
      expect(incrementBtn).toBeInTheDocument();
      expect(decrementBtn).toBeInTheDocument();
    });

    it("increments value with floatLabel and stacked buttons", async () => {
      const handleChange = vi.fn();
      render(
        <WexInputNumber 
          floatLabel 
          showButtons 
          buttonLayout="stacked" 
          defaultValue={5}
          onValueChange={handleChange}
        />
      );
      
      const incrementBtn = screen.getByRole("button", { name: /increment/i });
      fireEvent.pointerDown(incrementBtn);
      fireEvent.pointerUp(incrementBtn);
      
      expect(handleChange).toHaveBeenCalledWith(6);
    });

    it("decrements value with floatLabel and stacked buttons", async () => {
      const handleChange = vi.fn();
      render(
        <WexInputNumber 
          floatLabel 
          showButtons 
          buttonLayout="stacked" 
          defaultValue={5}
          onValueChange={handleChange}
        />
      );
      
      const decrementBtn = screen.getByRole("button", { name: /decrement/i });
      fireEvent.pointerDown(decrementBtn);
      fireEvent.pointerUp(decrementBtn);
      
      expect(handleChange).toHaveBeenCalledWith(4);
    });

    it("works with currency mode and floatLabel", () => {
      render(
        <WexInputNumber 
          floatLabel 
          mode="currency" 
          currency="USD" 
          locale="en-US"
          defaultValue={1500} 
        />
      );
      const input = screen.getByRole("spinbutton");
      // Currency formatting adds "$" prefix and comma grouping
      expect(input.getAttribute("value")).toMatch(/\$1,500/);
    });

    it("works with prefix/suffix and floatLabel", () => {
      render(
        <WexInputNumber 
          floatLabel 
          prefix="↑ "
          suffix="°C"
          defaultValue={21} 
        />
      );
      const input = screen.getByRole("spinbutton");
      expect(input.getAttribute("value")).toBe("↑ 21°C");
    });
  });
});

