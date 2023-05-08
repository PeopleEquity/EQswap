import React from "react";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
      <svg viewBox="0 0 20 20" {...props} fill="none">
        <g clipPath="url(#clip0_5487_77511)">
          <path d="M2.4248 2.80273V5.83303H5.45511" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1.66699 10.0003C1.66699 14.6027 5.39795 18.3337 10.0003 18.3337C14.6027 18.3337 18.3337 14.6027 18.3337 10.0003C18.3337 5.39795 14.6027 1.66699 10.0003 1.66699C6.91616 1.66699 4.22328 3.34245 2.78231 5.83287" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.0025 5L10.002 10.0037L13.535 13.5368" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_5487_77511">
            <rect width="20" height="20" fill="white"/>
          </clipPath>
        </defs>
      </svg>
  );
};

export default Icon;
