import { FieldSchema, FormSchema, FormValues } from "./types";

export function isFieldVisible<TValues extends FormValues>(
  field: FieldSchema<TValues>,
  values: TValues
): boolean {
  return field.visibleWhen ? field.visibleWhen(values) : true;
}

export function isFieldDisabled<TValues extends FormValues>(
  field: FieldSchema<TValues>,
  values: TValues
): boolean {
  return field.disabledWhen ? field.disabledWhen(values) : false;
}

export function getDefaultValueForField<TValues extends FormValues>(
  field: FieldSchema<TValues>
): unknown {
  if (field.defaultValue !== undefined) return field.defaultValue;
  switch (field.type) {
    case "checkbox":
      return false;
    case "number":
      return undefined;
    case "select":
      return "";
    case "textarea":
    case "text":
    default:
      return "";
  }
}

export function buildInitialValues<TValues extends FormValues>(
  schema: FormSchema<TValues>
): TValues {
  const entries = schema.fields.map((f) => [f.name, getDefaultValueForField(f)]);
  return Object.fromEntries(entries) as TValues;
}

