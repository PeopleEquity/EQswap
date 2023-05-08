import React from "react";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return <img src="/images/logo/logo.png" style={{ width: "32px", height: "32px" }} {...props} alt="" />;
};

export default Icon;
