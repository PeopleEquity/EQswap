import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { LogoWithTextIcon, LogoIcon } from "../../../components/Svg";
import { MenuContext } from "../context";
import {useMatchBreakpointsContext} from "../../../contexts";

interface Props {
  isDark: boolean;
  href: string;
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); }
  50% { transform:  scaleY(0.1); }
`;

const StyledLink = styled.a`
  align-items: center;
  display: flex;
  align-items: center;
  .eye {
    animation-delay: 20ms;
  }
  &:hover {
    .eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
`;

const Logo: React.FC<React.PropsWithChildren<Props>> = ({ isDark, href }) => {
  const { linkComponent } = useContext(MenuContext);
  const { isDesktop } = useMatchBreakpointsContext()

  return (
    <>
      <StyledLink as={linkComponent} href={href} aria-label="EquitySwap page">
        <LogoWithTextIcon />
      </StyledLink>
    </>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
