"use client"

import { useEffect } from "react";
import { a, b } from "./util/util";

const Index = () => {
  useEffect(() => {
    console.log(a, 'a');
    console.log(b, 'b');
  }, [])
  return <>FunctionMode</>;
};

export default Index;
