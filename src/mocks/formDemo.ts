import { Option } from "@/components/form-system/types";

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function mockFetchDepartments(): Promise<Option[]> {
  await sleep(450);
  return [
    { label: "研发", value: "dev" },
    { label: "产品", value: "pm" },
    { label: "设计", value: "design" },
    { label: "运营", value: "ops" },
  ];
}

export async function mockFetchCities(): Promise<Option[]> {
  await sleep(650);
  return [
    { label: "北京", value: "beijing" },
    { label: "上海", value: "shanghai" },
    { label: "杭州", value: "hangzhou" },
    { label: "深圳", value: "shenzhen" },
  ];
}

