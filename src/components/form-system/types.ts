export type FormValues = Record<string, unknown>;

export type FieldType = "text" | "textarea" | "select" | "checkbox" | "number";

export type FieldPath = string;

export type VisiblePredicate<TValues extends FormValues = FormValues> = (
  values: TValues
) => boolean;

export type DisabledPredicate<TValues extends FormValues = FormValues> = (
  values: TValues
) => boolean;

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export type OptionsSource =
  | { kind: "static"; options: Option[] }
  | { kind: "async"; load: () => Promise<Option[]> };

export type Validator<TValues extends FormValues = FormValues> = (args: {
  value: unknown;
  values: TValues;
  field: FieldSchema<TValues>;
}) => string | null;

export interface FieldSchema<TValues extends FormValues = FormValues> {
  /** 字段唯一 key（用作 values/errors 的路径） */
  name: FieldPath;
  /** UI label */
  label: string;
  /** 渲染类型 */
  type: FieldType;
  /** 占位提示（部分字段类型生效） */
  placeholder?: string;
  /** 说明文字 */
  helpText?: string;
  /** 默认值（缺省会按字段类型给一个合理默认值） */
  defaultValue?: unknown;
  /** 是否必填（对 checkbox 表示必须为 true） */
  required?: boolean;
  /** 是否展示（动态） */
  visibleWhen?: VisiblePredicate<TValues>;
  /** 是否禁用（动态） */
  disabledWhen?: DisabledPredicate<TValues>;
  /** 下拉选项来源（仅 select 生效） */
  options?: OptionsSource;
  /** 自定义校验 */
  validate?: Validator<TValues>;
}

export interface FormSchema<TValues extends FormValues = FormValues> {
  title?: string;
  description?: string;
  fields: Array<FieldSchema<TValues>>;
}

