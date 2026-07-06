"use client";

import { ChangeEvent } from "react";
import { FieldShell } from "../FieldShell";
import { Option } from "../types";

export function SelectField(props: {
  label: string;
  required?: boolean;
  helpText?: string;
  error?: string | null;
  disabled?: boolean;
  value: string;
  placeholder?: string;
  options: Option[];
  loading?: boolean;
  onBlur: () => void;
  onChange: (val: string) => void;
}) {
  return (
    <FieldShell
      label={props.label}
      required={props.required}
      helpText={props.helpText}
      error={props.error}
    >
      <select
        className="w-full rounded-md border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
        disabled={props.disabled || props.loading}
        value={props.value}
        onBlur={props.onBlur}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          props.onChange(e.target.value)
        }
      >
        <option value="" disabled>
          {props.loading ? "加载中..." : props.placeholder ?? "请选择"}
        </option>
        {props.options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

