"use client";

import { FieldShell } from "../FieldShell";

export function CheckboxField(props: {
  label: string;
  required?: boolean;
  helpText?: string;
  error?: string | null;
  disabled?: boolean;
  checked: boolean;
  onBlur: () => void;
  onChange: (val: boolean) => void;
}) {
  return (
    <FieldShell
      label={props.label}
      required={props.required}
      helpText={props.helpText}
      error={props.error}
    >
      <label className="inline-flex items-center gap-2 text-sm">
        <input
          className="h-4 w-4 rounded border border-[var(--border-primary)] accent-blue-600 disabled:opacity-60"
          disabled={props.disabled}
          type="checkbox"
          checked={props.checked}
          onBlur={props.onBlur}
          onChange={(e) => props.onChange(e.target.checked)}
        />
        <span className="text-[var(--text-secondary)]">已阅读并同意</span>
      </label>
    </FieldShell>
  );
}

