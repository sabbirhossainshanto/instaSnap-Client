import { SVGProps } from "react";
export * from "./register.type";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TResponse<T> = {
  message: string;
  success: string;
  data: T;
};
