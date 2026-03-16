import React from "react";

type Renderable =
  | React.ReactNode
  | (() => React.ReactNode);

export function getChildren(val: Renderable): React.ReactElement {
  if (typeof val === "function") return getChildren(val());
  return <>{val}</>;
}
