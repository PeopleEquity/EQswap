import React, { ChangeEvent, useCallback } from "react";
import styled from 'styled-components'
import { Box } from "../Box";
import SliderProps from "./types";

const StyledScrollBar = styled.div<{ size: number }>`
  position: absolute;
  top: 8px;
  left: ${({ size }) => size}%;
  z-index: 1;
  & > div {
    width: 20px;
    height: 20px;
    background-size: 20px;
    background-color: #1fc7d4;
    border-radius: 50%;
    transform: translateX(-25%);
  }
`

const StyledLine = styled.div<{ size: number }>`
  position: absolute;
  top: 17px;
  left: 2px;
  height: 4px;
  width: ${({ size }) => size}%;
  background: #1fc7d4;
  z-index: 1;
  & > span {
    display: block;
    position: absolute;
    top: -6px;
    height: 16px;
    width: 4px;
    background: #1fc7d4;
  }
`

const StlyedLine2 = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #e7e9ef;
  top: 17px;
`

const StyledSpan = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  justify-content: space-between;
  top: 11px;
  left: 2px;
  & > span {
    display: block;
    width: 4px;
    height: 16px;
    background: #e7e9ef;
    border-radius: 1px;
  }
`

const StyledRangeInput = styled.input`
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
  cursor: pointer;
  position: absolute;
  z-index: 2;

  &:focus {
    outline: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 28px;
    width: 28px;
    background-color: transparent;
    border: none;
    margin-top: 2px;
    transform: translateY(-50%);
    color: #e7e9ef;
  }

  &::-moz-range-thumb {
    height: 28px;
    width: 28px;
    background-color: transparent;
    margin-top: 2px;
    border: none;
    color: #e7e9ef;
  }

  &::-ms-thumb {
    height: 28px;
    width: 28px;
    background-color: transparent;
    margin-top: 2px;
    color: #e7e9ef;
  }

  &::-webkit-slider-runnable-track {
    background: transparent;
    height: 4px;
  }

  &::-moz-range-track {
    background: transparent;
    height: 4px;
  }

  &::-ms-track {
    width: 100%;
    border-color: transparent;
    color: transparent;

    background: transparent;
    height: 4px;
  }
  &::-ms-fill-lower {
    background: #e7e9ef;
  }
  &::-ms-fill-upper {
    background: #e7e9ef;
  }
`

const Slider: React.FC<React.PropsWithChildren<SliderProps>> = ({
  name,
  min,
  max,
  value,
  onValueChanged,
  valueLabel,
  step = "any",
  disabled = false,
  ...props
}) => {
  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      onValueChanged(parseFloat(target.value));
    },
    [onValueChanged]
  );

  return (
    <Box position="relative" height="48px" {...props}>
      <StyledRangeInput
          type="range"
          value={value}
          style={{ width: '100%', padding: '15px 0' }}
          onChange={handleChange}
          aria-labelledby="input slider"
          step={step}
          min={min}
          max={max}
      />
      <StyledLine size={value}>
        <span />
      </StyledLine>
      <StyledScrollBar size={value}>
        <div />
      </StyledScrollBar>
      <StyledSpan>
        <span />
        <span />
      </StyledSpan>
      <StlyedLine2 />
    </Box>
  );
};

export default Slider;
