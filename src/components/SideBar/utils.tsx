import React from "react";

export function getChildren(val: string | React.ReactElement | Function): React.ReactElement {
  if(typeof val === 'function') return getChildren(val());
  return <>{val}</>
}
