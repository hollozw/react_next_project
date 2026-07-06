"use client";

import { useCallback, useMemo, useState } from "react";
import {
  FieldSchema,
  FormSchema,
  FormValues,
  Validator,
} from "./types";
import { buildInitialValues, isFieldVisible } from "./utils";

type Errors = Record<string, string | null | undefined>;
type Touched = Record<string, boolean | undefined>;

function runRequiredCheck(args: {
  value: unknown;
  required?: boolean;
  type: FieldSchema["type"];
}): string | null {
  if (!args.required) return null;
  if (args.type === "checkbox") {
    return args.value === true ? null : "请勾选后继续";
  }
  if (args.value === null || args.value === undefined) return "此项为必填";
  if (typeof args.value === "string" && args.value.trim() === "") return "此项为必填";
  return null;
}

function runValidator<TValues extends FormValues>(
  field: FieldSchema<TValues>,
  values: TValues,
  validator?: Validator<TValues>
): string | null {
  const requiredError = runRequiredCheck({
    value: values[field.name],
    required: field.required,
    type: field.type,
  });
  if (requiredError) return requiredError;
  if (!validator) return null;
  return (
    validator({
      value: values[field.name],
      values,
      field,
    }) ?? null
  );
}

export function useForm<TValues extends FormValues>(schema: FormSchema<TValues>) {
  const initialValues = useMemo(() => buildInitialValues(schema), [schema]);

  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldsByName = useMemo(() => {
    const map = new Map<string, FieldSchema<TValues>>();
    for (const f of schema.fields) map.set(f.name, f);
    return map;
  }, [schema.fields]);

  const setValue = useCallback(
    (name: string, value: unknown) => {
      setValues((prev) => ({ ...prev, [name]: value }));
    },
    [setValues]
  );

  const markTouched = useCallback((name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const validateField = useCallback(
    (name: string): string | null => {
      const field = fieldsByName.get(name);
      if (!field) return null;
      if (!isFieldVisible(field, values)) {
        setErrors((prev) => ({ ...prev, [name]: null }));
        return null;
      }
      const msg = runValidator(field, values, field.validate);
      setErrors((prev) => ({ ...prev, [name]: msg }));
      return msg;
    },
    [fieldsByName, values]
  );

  const validateAll = useCallback((): boolean => {
    const next: Errors = {};
    for (const f of schema.fields) {
      if (!isFieldVisible(f, values)) {
        next[f.name] = null;
        continue;
      }
      next[f.name] = runValidator(f, values, f.validate);
    }
    setErrors(next);
    return Object.values(next).every((e) => !e);
  }, [schema.fields, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (onValid: (values: TValues) => Promise<void> | void) => {
      setIsSubmitting(true);
      setTouched((prev) => {
        const all: Touched = { ...prev };
        for (const f of schema.fields) all[f.name] = true;
        return all;
      });
      const ok = validateAll();
      if (!ok) {
        setIsSubmitting(false);
        return;
      }
      try {
        await onValid(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [schema.fields, validateAll, values]
  );

  return {
    values,
    setValue,
    errors,
    touched,
    markTouched,
    validateField,
    validateAll,
    reset,
    handleSubmit,
    isSubmitting,
    schema,
  };
}

