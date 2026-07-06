"use client";

import { ChangeEvent } from "react";
import { FieldShell } from "../FieldShell";

export function InputField(props: {
  label: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  error?: string | null;
  disabled?: boolean;
  value: string;
  onBlur: () => void;
  onChange: (val: string) => void;
  type?: "text" | "number";
}) {
  return (
    <FieldShell
      label={props.label}
      required={props.required}
      helpText={props.helpText}
      error={props.error}
    >
      <input
        className="w-full rounded-md border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
        disabled={props.disabled}
        placeholder={props.placeholder}
        value={props.value}
        type={props.type ?? "text"}
        onBlur={props.onBlur}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          props.onChange(e.target.value)
        }
      />
    </FieldShell>
  );
}

