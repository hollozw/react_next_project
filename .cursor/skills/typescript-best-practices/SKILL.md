---
name: typescript-best-practices
description: Enforces modern TypeScript best practices and clean-code refactors with strict type-safety for TS/TSX (React/Next.js). Use when writing or refactoring TypeScript/React code, doing code review, improving code style, type-safety, avoiding any, reducing type assertions, removing non-null assertions, adding generics/utility types, or writing tests.
---

# TypeScript 最佳实践与代码规范助手

## 何时应该调用我

当用户在 TypeScript / TSX（尤其是 React / Next.js）场景里出现以下需求或关键词时启用：

- 新写或修改 TS/TSX：组件、hooks、工具函数、类型定义、API 类型
- 代码 review：规范、风格、类型安全、modern TS、clean code、重构
- 问题代码：`any`、大量 `as`、大量 `!` 非空断言、`interface` 滥用、类型过宽或过窄
- 泛型/工具类型：`ReturnType` / `Parameters` / `ConstructorParameters`、模板字面量类型、品牌类型（branded types）
- 测试：vitest/jest + @testing-library，工具函数纯函数测试、组件行为测试

## 核心原则（必须严格遵守）

1. **严格类型安全第一**
   - 禁止引入新的 `any`。已有 `any` 需优先替换为更精确的类型。
   - `unknown` 仅在边界（IO/第三方/解析）使用，并立刻通过类型守卫收窄。
   - 默认禁止非空断言 `!`；仅在“明确受控”的 DOM 引用或第三方无类型库场景允许，并解释原因。

2. **优先使用现代 TypeScript（TS 5+）**
   - 用 `satisfies` 代替不必要的类型断言来校验形状且保留字面量推断。
   - 需要时使用模板字面量类型提升约束表达能力。
   - 合理使用内置工具类型（`ReturnType`/`Parameters`/`ConstructorParameters` 等）提升可维护性。
   - 当需要区分同形状类型时，使用 branded/nominal typing。

3. **命名与结构规范**
   - 类型/接口：PascalCase（例：`UserProfile`）
   - 函数/变量：camelCase
   - 常量：项目约定优先（常见：`SCREAMING_SNAKE_CASE` 或 `UpperCamelCase`）
   - 文件命名：遵循项目现状；组件倾向 `PascalCase`，其余 `kebab-case`
   - **类型别名优先于 interface**（除非需要声明合并）

4. **避免常见反模式**
   - 少用类型断言 `as`；优先类型守卫、判别联合（discriminated union）、`satisfies`。
   - 避免滥用 `Partial<T>` / `Pick<T>` / `Omit<T>`；若必须使用，解释“为什么这是正确边界”。
   - 需要“无法发生”的分支用 `never`（例如 `assertNever`）来保证穷尽检查。

5. **React / 前端特有规则（检测到 React 项目时适用）**
   - Props 优先 `type Props = { ... }`。
   - JSX 返回类型优先 `ReactNode`（除非明确需要 `JSX.Element`）。
   - 事件处理器使用精确事件类型（例：`React.MouseEvent<HTMLButtonElement>`）。
   - 谨慎使用 `React.FC`：只有当项目明确约定使用时才用；否则用普通函数组件类型推断即可。

6. **测试相关**
   - 工具函数：优先纯函数测试（输入/输出、边界条件）。
   - 组件：写行为测试（用户交互、可见结果），避免测实现细节。

## 工作流程（按这个顺序执行）

1. **先理解项目约定**
   - 优先阅读相关文件（已有类型风格、组件写法、目录结构、状态管理、UI 体系、lint 规则）。

2. **明确改动范围与输出形态**
   - 新增代码：先给出文件结构规划（放哪、导出方式、依赖关系）。
   - 重构/修复：先列出风险点（类型破坏、运行时行为变化、API 兼容性）。

3. **编码/重构时的硬约束**
   - 不引入 `any`、不靠 `as` 逃避类型系统、不使用 `!`（除非允许场景）。
   - 优先用类型系统表达约束（判别联合、泛型约束、模板字面量类型、品牌类型）。

4. **输出要求**
   - 公共 API（对外导出的函数/类型/组件）需包含简短 JSDoc，说明“意图、参数、返回值、边界条件”。
   - 复杂逻辑允许少量行内注释，仅解释非显而易见的约束/权衡。

5. **完成后主动追问**
   - 是否需要补单元测试/行为测试？
   - 是否要进一步统一类型风格与导出策略？
   - 是否需要生成/整理 `.d.ts`（库/SDK 场景）？

## 输出风格示例

```ts
// src/utils/formatDate.ts
/**
 * 格式化日期为 YYYY-MM-DD HH:mm:ss
 * @param date - Date 对象、时间戳或可解析的日期字符串
 * @returns 格式化后的字符串
 */
export function formatDate(date: Date | number | string): string {
  const d = new Date(date);
  return d.toISOString().replace("T", " ").slice(0, 19);
}

export const API_ENDPOINTS = {
  users: "/api/users",
  posts: "/api/posts",
} as const satisfies Record<string, `/${string}`>;
```
