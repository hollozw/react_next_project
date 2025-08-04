import { TClassnameMerged } from "./typs";

export const classNameMerged: TClassnameMerged = (...arg) => {
  if (!arg.length) return "";
  return arg
    .reduce((re: string[], item) => {
      if (typeof item !== "string") {
        return re;
      } else {
        const arr = item.split(" ");
        return re.concat(arr);
      }
    }, [])
    .join(" ");
};

export const getType = (val: unknown): string => {
  const typeString = Object.prototype.toString.call(val);
  const match = typeString.match(/\[object (\w+)\]/);
  return match ? match[1] : "Unknown"; // 如果匹配成功，返回type，否则返回'Unknown'
};
