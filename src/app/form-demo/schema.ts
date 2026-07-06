import type { FormSchema } from "@/components/form-system/types";
import { mockFetchCities, mockFetchDepartments } from "@/mocks/formDemo";

export type DemoValues = {
  name: string;
  age?: number;
  department: string;
  city: string;
  note: string;
  needInvoice: boolean;
  invoiceTitle: string;
  agreement: boolean;
};

export const demoSchema: FormSchema<DemoValues> = {
  title: "自定义表单系统 Demo",
  description:
    "全部由代码 schema 配置渲染；包含必填校验、跨字段联动、异步 options（mock）、提交结果展示。",
  fields: [
    {
      name: "name",
      label: "姓名",
      type: "text",
      required: true,
      placeholder: "请输入姓名",
      validate: ({ value }) => {
        const v = String(value ?? "").trim();
        if (v.length < 2) return "姓名至少 2 个字符";
        return null;
      },
    },
    {
      name: "age",
      label: "年龄",
      type: "number",
      placeholder: "可选，18~60",
      validate: ({ value }) => {
        if (value === undefined || value === null || value === "") return null;
        const n = typeof value === "number" ? value : Number(value);
        if (Number.isNaN(n)) return "请输入数字";
        if (n < 18 || n > 60) return "年龄需在 18~60 之间";
        return null;
      },
    },
    {
      name: "department",
      label: "部门",
      type: "select",
      required: true,
      placeholder: "请选择部门（mock 异步加载）",
      options: { kind: "async", load: mockFetchDepartments },
    },
    {
      name: "city",
      label: "城市",
      type: "select",
      required: true,
      placeholder: "请选择城市（mock 异步加载）",
      options: { kind: "async", load: mockFetchCities },
      disabledWhen: (values) => values.department === "",
      helpText: "示例联动：未选择部门前禁用城市选择。",
    },
    {
      name: "note",
      label: "备注",
      type: "textarea",
      placeholder: "可选，写点补充信息",
      validate: ({ value, values }) => {
        const v = String(value ?? "");
        if (values.department === "dev" && v.trim() === "") {
          return "当部门为【研发】时，备注建议填写需求背景（示例跨字段规则）";
        }
        return null;
      },
    },
    {
      name: "needInvoice",
      label: "需要发票",
      type: "checkbox",
      helpText: "示例联动：勾选后才显示“发票抬头”。",
    },
    {
      name: "invoiceTitle",
      label: "发票抬头",
      type: "text",
      required: true,
      placeholder: "请输入发票抬头",
      visibleWhen: (values) => values.needInvoice === true,
      validate: ({ value, values }) => {
        if (values.needInvoice !== true) return null;
        const v = String(value ?? "").trim();
        if (v.length < 4) return "发票抬头至少 4 个字符";
        return null;
      },
    },
    {
      name: "agreement",
      label: "协议确认",
      type: "checkbox",
      required: true,
      helpText: "示例：checkbox 的 required 表示必须勾选。",
    },
  ],
};

