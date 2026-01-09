/**
 * WexInputMask Component Tests
 *
 * Essential tests covering core functionality:
 * - Rendering with mask patterns
 * - Input validation (digits, alpha, alphanumeric)
 * - Completion callbacks
 * - States (disabled, invalid)
 * - Float label integration
 * - Accessibility
 */

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { createRef } from "react";
import { WexInputMask, WexLabel } from "@/components/wex";

describe("WexInputMask", () => {
  // ============================================
  // RENDERING & BASIC FUNCTIONALITY
  // ============================================
  describe("Rendering", () => {
    it("renders with mask placeholder", () => {
      render(<WexInputMask mask="99-99" />);
      // When unfocused and empty, mask shows as native placeholder, value is empty
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("");
      expect(input).toHaveAttribute("placeholder", "__-__");
    });

    it("renders with default value", () => {
      render(<WexInputMask mask="999-9999" defaultValue="1234567" />);
      expect(screen.getByRole("textbox")).toHaveValue("123-4567");
    });

    it("forwards ref correctly", () => {
      const ref = createRef<HTMLInputElement>();
      render(<WexInputMask mask="999" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("renders with custom slot character", () => {
      render(<WexInputMask mask="99/99" slotChar="-" />);
      // When unfocused and empty, mask shows as native placeholder
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("");
      expect(input).toHaveAttribute("placeholder", "--/--");
    });
  });

  // ============================================
  // MASK PATTERN VALIDATION
  // ============================================
  describe("Mask Patterns", () => {
    it("accepts only digits for '9' mask character", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<WexInputMask mask="999" onValueChange={handleChange} />);
      
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, "12a");
      
      // Only digits accepted, 'a' rejected
      expect(handleChange).toHaveBeenLastCalledWith("12", false);
    });

    it("accepts only letters for 'a' mask character", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<WexInputMask mask="aaa" onValueChange={handleChange} />);
      
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, "AB1");
      
      // Only letters accepted, '1' rejected
      expect(handleChange).toHaveBeenLastCalledWith("AB", false);
    });

    it("accepts alphanumeric for '*' mask character", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<WexInputMask mask="***" onValueChange={handleChange} />);
      
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, "A1B");
      
      expect(handleChange).toHaveBeenLastCalledWith("A1B", true);
    });

    it("handles phone number mask correctly", async () => {
      const user = userEvent.setup();
      render(<WexInputMask mask="(999) 999-9999" />);
      
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, "5551234567");
      
      expect(input).toHaveValue("(555) 123-4567");
    });
  });

  // ============================================
  // COMPLETION & CALLBACKS
  // ============================================
  describe("Completion", () => {
    it("calls onComplete when mask is filled", async () => {
      const user = userEvent.setup();
      const handleComplete = vi.fn();
      render(<WexInputMask mask="999" onComplete={handleComplete} />);
      
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, "123");
      
      expect(handleComplete).toHaveBeenCalledWith("123");
    });

    it("provides isComplete flag in onValueChange", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<WexInputMask mask="99" onValueChange={handleChange} />);
      
      const input = screen.getByRole("textbox");
      await user.click(input);
      
      await user.type(input, "1");
      expect(handleChange).toHaveBeenCalledWith("1", false);
      
      await user.type(input, "2");
      expect(handleChange).toHaveBeenCalledWith("12", true);
    });
  });

  // ============================================
  // STATES
  // ============================================
  describe("States", () => {
    it("sets aria-invalid when invalid", () => {
      render(<WexInputMask mask="999" invalid />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    });

    it("disables input when disabled", () => {
      render(<WexInputMask mask="999" disabled />);
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("does not accept input when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<WexInputMask mask="999" disabled onValueChange={handleChange} />);
      
      await user.type(screen.getByRole("textbox"), "123");
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  // ============================================
  // KEYBOARD & AUTOCLEAR
  // ============================================
  describe("Keyboard & AutoClear", () => {
    it("handles backspace to delete previous character", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<WexInputMask mask="999" defaultValue="123" onValueChange={handleChange} />);
      
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.keyboard("{Backspace}");
      
      expect(handleChange).toHaveBeenCalledWith("12", false);
    });

    it("clears incomplete value on blur when autoClear is true", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<WexInputMask mask="999" autoClear onValueChange={handleChange} />);
      
      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.type(input, "12");
      await user.tab();
      
      expect(handleChange).toHaveBeenLastCalledWith("", false);
    });
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================
  describe("Accessibility", () => {
    it("supports aria-label", () => {
      render(<WexInputMask mask="999" aria-label="Phone number" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-label", "Phone number");
    });

    it("works with WexLabel component", () => {
      render(
        <>
          <WexLabel htmlFor="phone">Phone Number</WexLabel>
          <WexInputMask id="phone" mask="(999) 999-9999" />
        </>
      );
      expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    });
  });

  // ============================================
  // FLOAT LABEL INTEGRATION
  // ============================================
  describe("Float Label", () => {
    it("applies float label height and padding", () => {
      render(<WexInputMask mask="999" floatLabel />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("!h-14", "!pt-5", "!pb-2");
    });

    it("hides mask when unfocused and empty in float label mode", async () => {
      const user = userEvent.setup();
      render(<WexInputMask mask="99-99" floatLabel />);
      const input = screen.getByRole("textbox");
      
      // Hidden when unfocused
      expect(input).toHaveValue("");
      
      // Shows when focused
      await user.click(input);
      expect(input).toHaveValue("__-__");
    });
  });

  // ============================================
  // CONTROLLED COMPONENT
  // ============================================
  describe("Controlled", () => {
    it("handles external value updates", () => {
      const { rerender } = render(
        <WexInputMask mask="999" value="12" onValueChange={() => {}} />
      );
      expect(screen.getByRole("textbox")).toHaveValue("12_");
      
      rerender(<WexInputMask mask="999" value="123" onValueChange={() => {}} />);
      expect(screen.getByRole("textbox")).toHaveValue("123");
    });
  });
});
