# 示例集：TypeScript 函数 JSDoc

本文件用于放置较长示例，避免 `SKILL.md` 过长。

## 示例 1：普通导出函数（参数校验 + throws + 示例）

输入：

```ts
export function calculateDiscount(price: number, coupon?: string) {
  if (coupon === "SAVE10") return price * 0.9;
  return price;
}
```

输出（带完整 JSDoc）：

```ts
/**
 * 计算商品最终折扣价。
 *
 * 根据优惠码应用折扣规则；当未提供或不支持的优惠码时返回原价。
 *
 * @param price - 商品原价（必须 ≥ 0）
 * @param coupon - 可选优惠码；目前支持 "SAVE10"（减 10%）
 * @returns 应用折扣后的最终价格（保留两位小数）
 * @throws {RangeError} 当 price < 0 时抛出
 * @example
 * ```ts
 * calculateDiscount(100);            // -> 100
 * calculateDiscount(100, "SAVE10");  // -> 90
 * ```
 */
export function calculateDiscount(price: number, coupon?: string): number {
  if (price < 0) throw new RangeError("price must be >= 0");
  if (coupon === "SAVE10") return Math.round(price * 0.9 * 100) / 100;
  return price;
}
```

## 示例 2：对象参数（解构）+ 可选字段 + 默认值

```ts
export function formatUserLabel({
  name,
  role = "user",
  id,
}: {
  name: string;
  role?: "user" | "admin";
  id?: string;
}) {
  return id ? `${name} (${role}) #${id}` : `${name} (${role})`;
}
```

推荐 JSDoc（避免重复类型，强调字段语义）：

```ts
/**
 * 生成用户展示标签。
 *
 * @param options - 用户信息
 * @param options.name - 展示名称
 * @param options.role - 用户角色（默认 "user"）
 * @param options.id - 可选的业务标识，用于区分同名用户
 * @returns 可直接展示在 UI 的标签字符串
 * @example
 * ```ts
 * formatUserLabel({ name: "Alice" }); // -> "Alice (user)"
 * formatUserLabel({ name: "Bob", role: "admin", id: "42" }); // -> "Bob (admin) #42"
 * ```
 */
export function formatUserLabel({
  name,
  role = "user",
  id,
}: {
  name: string;
  role?: "user" | "admin";
  id?: string;
}): string {
  return id ? `${name} (${role}) #${id}` : `${name} (${role})`;
}
```

## 示例 3：泛型工具函数（保持输入/输出类型关联）

```ts
export function keyBy<T, K extends PropertyKey>(
  items: readonly T[],
  getKey: (item: T) => K,
) {
  return items.reduce<Record<K, T>>((acc, item) => {
    acc[getKey(item)] = item;
    return acc;
  }, {} as Record<K, T>);
}
```

推荐 JSDoc（强调泛型含义与约束，而不是重复类型）：

```ts
/**
 * 将数组按键函数映射为对象（字典）。
 *
 * 泛型 `T` 表示元素类型；`K` 表示键类型（限制为可作为对象键的类型），用于保持
 * `getKey` 返回值与结果对象 key 的类型关联。
 *
 * @param items - 待索引的元素列表
 * @param getKey - 从元素中提取唯一键的函数
 * @returns 以键为索引、元素为值的对象
 * @example
 * ```ts
 * const dict = keyBy([{ id: "a" }, { id: "b" }], x => x.id);
 * // dict["a"].id -> "a"
 * ```
 */
export function keyBy<T, K extends PropertyKey>(
  items: readonly T[],
  getKey: (item: T) => K,
): Record<K, T> {
  return items.reduce<Record<K, T>>((acc, item) => {
    acc[getKey(item)] = item;
    return acc;
  }, {} as Record<K, T>);
}
```

## 示例 4：async 函数（Promise 语义 + throws）

```ts
export async function fetchJson(input: RequestInfo | URL, init?: RequestInit) {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

推荐 JSDoc：

```ts
/**
 * 发起请求并解析 JSON 响应。
 *
 * @param input - `fetch` 的请求地址或 Request 对象
 * @param init - `fetch` 的可选初始化参数
 * @returns 解析后的 JSON 数据（以 `res.json()` 的结果为准）
 * @throws {Error} 当响应状态非 2xx 时抛出
 * @example
 * ```ts
 * const data = await fetchJson("/api/user");
 * ```
 */
export async function fetchJson(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<unknown> {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

## 示例 5：React 自定义 Hook（返回结构 + 副作用）

```ts
export function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}
```

推荐 JSDoc：

```ts
/**
 * 自定义 Hook：返回延迟更新的值（防抖）。
 *
 * 当 `value` 变化时，等待 `delayMs` 毫秒后更新返回值；若期间再次变化会重置计时。
 *
 * @param value - 需要防抖的输入值
 * @param delayMs - 防抖延迟毫秒数（应 ≥ 0）
 * @returns 防抖后的值
 * @example
 * ```tsx
 * function SearchBox() {
 *   const [q, setQ] = useState("");
 *   const debouncedQ = useDebouncedValue(q, 300);
 *   useEffect(() => {
 *     // 使用 debouncedQ 发起请求
 *   }, [debouncedQ]);
 *   return <input value={q} onChange={e => setQ(e.target.value)} />;
 * }
 * ```
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}
```
