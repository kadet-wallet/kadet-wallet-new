import React from "react";
import type * as CSS from "csstype";

type FillerProps = {
  flexGrow: number;
  children?: React.ReactNode;
};

const Filler = (props: FillerProps) => {
  const cssProperties: CSS.Properties = {
    flexGrow: props.flexGrow,
  };
  return <div style={cssProperties}>{props.children}</div>;
};

export default Filler;
