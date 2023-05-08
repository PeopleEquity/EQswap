export type Position = "top" | "top-right" | "bottom" | "top-left";

export interface PositionProps {
  position?: Position;
}

export interface DropdownProps extends PositionProps {
  target: React.ReactElement;
}
