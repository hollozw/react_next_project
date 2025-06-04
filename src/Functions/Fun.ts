export const getType = (val: unknown): string => {
  const typeString = Object.prototype.toString.call(val);
  const match = typeString.match(/\[object (\w+)\]/);
  return match ? match[1] : "Unknown"; // 如果匹配成功，返回type，否则返回'Unknown'
};
