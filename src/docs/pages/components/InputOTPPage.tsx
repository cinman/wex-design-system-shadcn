import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { WexInputOTP } from "@/components/wex";

export default function InputOTPPage() {
  return (
    <ComponentPage
      title="Input OTP"
      description="Accessible one-time password input component."
      status="stable"
      registryKey="input-otp"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="space-y-2">
            <label id="otp-label" className="text-sm font-medium text-foreground">
              Enter verification code
            </label>
            <WexInputOTP maxLength={6} aria-labelledby="otp-label">
              <WexInputOTP.Group>
                <WexInputOTP.Slot index={0} />
                <WexInputOTP.Slot index={1} />
                <WexInputOTP.Slot index={2} />
                <WexInputOTP.Slot index={3} />
                <WexInputOTP.Slot index={4} />
                <WexInputOTP.Slot index={5} />
              </WexInputOTP.Group>
            </WexInputOTP>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Keyboard Support</h3>
          <p className="text-sm text-muted-foreground">
            Supports keyboard navigation, paste from clipboard, and automatic
            focus advancement.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexInputOTP } from "@/components/wex";

<WexInputOTP maxLength={6}>
  <WexInputOTP.Group>
    <WexInputOTP.Slot index={0} />
    <WexInputOTP.Slot index={1} />
    <WexInputOTP.Slot index={2} />
    <WexInputOTP.Slot index={3} />
    <WexInputOTP.Slot index={4} />
    <WexInputOTP.Slot index={5} />
  </WexInputOTP.Group>
</WexInputOTP>`}
        />
      </Section>
    </ComponentPage>
  );
}

