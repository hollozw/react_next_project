import React from "react";
import { ConfigContext } from "./context";

const ProviderChilder: React.FC<any> = (props) => {
  return <ConfigContext.Provider value={{}} {...props} />;
};

export default ProviderChilder;
