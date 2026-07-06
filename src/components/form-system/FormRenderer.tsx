"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckboxField } from "./fields/CheckboxField";
import { InputField } from "./fields/InputField";
import { SelectField } from "./fields/SelectField";
import { TextareaField } from "./fields/TextareaField";
import { FieldSchema, FormSchema, FormValues, Option } from "./types";
import { isFieldDisabled, isFieldVisible } from "./utils";
import { useForm } from "./useForm";

type OptionsState = Record<
  string,
  { loading: boolean; options: Option[]; error?: string }
>;

function asString(val: unknown): string {
  if (val === null || val === undefined) return "";
  return typeof val === "string" ? val : String(val);
}

function asBoolean(val: unknown): boolean {
  return val === true;
}

export function FormRenderer<TValues extends FormValues>(props: {
  schema: FormSchema<TValues>;
  onSubmit: (values: TValues) => Promise<void> | void;
}) {
  const form = useForm(props.schema);
  const [optionsState, setOptionsState] = useState<OptionsState>({});

  const visibleFields = useMemo(() => {
    return props.schema.fields.filter((f) => isFieldVisible(f, form.values));
  }, [props.schema.fields, form.values]);

  useEffect(() => {
    let cancelled = false;

    async function ensureOptions(field: FieldSchema<TValues>) {
      const source = field.type === "select" ? field.options : undefined;
      if (!source) return;
      if (source.kind === "static") {
        setOptionsState((prev) => ({
          ...prev,
          [field.name]: { loading: false, options: source.options },
        }));
        return;
      }
      setOptionsState((prev) => ({
        ...prev,
        [field.name]: { loading: true, options: prev[field.name]?.options ?? [] },
      }));
      try {
        const options = await source.load();
        if (cancelled) return;
        setOptionsState((prev) => ({
          ...prev,
          [field.name]: { loading: false, options },
        }));
      } catch (e) {
        if (cancelled) return;
        setOptionsState((prev) => ({
          ...prev,
          [field.name]: {
            loading: false,
            options: [],
            error: e instanceof Error ? e.message : "加载失败",
          },
        }));
      }
    }

    for (const field of visibleFields) {
      void ensureOptions(field);
    }

    return () => {
      cancelled = true;
    };
  }, [visibleFields]);

  return (
    <div className="w-full">
      {props.schema.title ? (
        <div className="mb-2 text-lg font-semibold">{props.schema.title}</div>
      ) : null}
      {props.schema.description ? (
        <div className="mb-6 text-sm text-[var(--text-secondary)]">
          {props.schema.description}
        </div>
      ) : null}

      <div className="flex flex-col gap-5">
        {visibleFields.map((field) => {
          const disabled = isFieldDisabled(field, form.values) || form.isSubmitting;
          const showError = form.touched[field.name] ? form.errors[field.name] : null;
          const common = {
            label: field.label,
            required: field.required,
            helpText: field.helpText,
            error: showError ?? null,
            disabled,
          };

          if (field.type === "text") {
            return (
              <InputField
                key={field.name}
                {...common}
                placeholder={field.placeholder}
                value={asString(form.values[field.name])}
                onBlur={() => {
                  form.markTouched(field.name);
                  form.validateField(field.name);
                }}
                onChange={(v) => {
                  form.setValue(field.name, v);
                  if (form.touched[field.name]) form.validateField(field.name);
                }}
              />
            );
          }

          if (field.type === "number") {
            return (
              <InputField
                key={field.name}
                {...common}
                placeholder={field.placeholder}
                value={asString(form.values[field.name])}
                type="number"
                onBlur={() => {
                  form.markTouched(field.name);
                  form.validateField(field.name);
                }}
                onChange={(v) => {
                  const n = v === "" ? undefined : Number(v);
                  form.setValue(field.name, Number.isNaN(n) ? undefined : n);
                  if (form.touched[field.name]) form.validateField(field.name);
                }}
              />
            );
          }

          if (field.type === "textarea") {
            return (
              <TextareaField
                key={field.name}
                {...common}
                placeholder={field.placeholder}
                value={asString(form.values[field.name])}
                onBlur={() => {
                  form.markTouched(field.name);
                  form.validateField(field.name);
                }}
                onChange={(v) => {
                  form.setValue(field.name, v);
                  if (form.touched[field.name]) form.validateField(field.name);
                }}
              />
            );
          }

          if (field.type === "checkbox") {
            return (
              <CheckboxField
                key={field.name}
                {...common}
                checked={asBoolean(form.values[field.name])}
                onBlur={() => {
                  form.markTouched(field.name);
                  form.validateField(field.name);
                }}
                onChange={(v) => {
                  form.setValue(field.name, v);
                  if (form.touched[field.name]) form.validateField(field.name);
                }}
              />
            );
          }

          if (field.type === "select") {
            const state = optionsState[field.name] ?? { loading: false, options: [] };
            return (
              <SelectField
                key={field.name}
                {...common}
                placeholder={field.placeholder}
                value={asString(form.values[field.name])}
                loading={state.loading}
                options={state.options}
                onBlur={() => {
                  form.markTouched(field.name);
                  form.validateField(field.name);
                }}
                onChange={(v) => {
                  form.setValue(field.name, v);
                  if (form.touched[field.name]) form.validateField(field.name);
                }}
              />
            );
          }

          return null;
        })}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          disabled={form.isSubmitting}
          onClick={() => void form.handleSubmit(props.onSubmit)}
        >
          {form.isSubmitting ? "提交中..." : "提交"}
        </button>

        <button
          className="rounded-md border border-[var(--border-primary)] bg-[var(--bg-primary)] px-4 py-2 text-sm font-medium disabled:opacity-60"
          disabled={form.isSubmitting}
          onClick={() => form.reset()}
        >
          重置
        </button>
      </div>
    </div>
  );
}

