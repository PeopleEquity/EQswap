import React from "react";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return <img src="/images/logo/logoText.png" style={{ minWidth: "122px", height: "32px" }} alt="" {...props} />;
};

export default Icon;