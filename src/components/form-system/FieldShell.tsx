"use client";

import { ReactNode } from "react";
import { classNameMerged } from "@/utils/utils";

export function FieldShell(props: {
  label: string;
  required?: boolean;
  helpText?: string;
  error?: string | null;
  children: ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center gap-2">
        <label className="text-sm font-medium text-[var(--text-primary)]">
          {props.label}
        </label>
        {props.required ? (
          <span className="text-xs text-red-500">必填</span>
        ) : null}
      </div>

      {props.children}

      {props.helpText ? (
        <div className="mt-1 text-xs text-[var(--text-secondary)]">
          {props.helpText}
        </div>
      ) : null}

      {props.error ? (
        <div className={classNameMerged("mt-1 text-xs text-red-500")}>
          {props.error}
        </div>
      ) : null}
    </div>
  );
}

