import { TClassnameMerged } from "./typs";

/**
 * 合并多个 className 片段为一个空格分隔的字符串。
 *
 * - 仅处理字符串参数；非字符串会被忽略。
 * - 当未传入任何参数时返回空字符串。
 *
 * @param arg - 可能包含空格的 className 片段列表
 * @returns 合并后的 className 字符串
 * @example
 * ```ts
 * classNameMerged("btn primary", undefined, "active");
 * // => "btn primary active"
 * ```
 */
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

/**
 * 获取值的内部类型标签（基于 `Object.prototype.toString`）。
 *
 * @param val - 任意值
 * @returns 类型标签字符串（如 `"Array"`、`"Object"`、`"Number"`）；无法解析时返回 `"Unknown"`
 * @example
 * ```ts
 * getType([]); // "Array"
 * getType(null); // "Null"
 * getType(undefined); // "Undefined"
 * ```
 */
export const getType = (val: unknown): string => {
  const typeString = Object.prototype.toString.call(val);
  const match = typeString.match(/\[object (\w+)\]/);
  return match ? match[1] : "Unknown";
};
