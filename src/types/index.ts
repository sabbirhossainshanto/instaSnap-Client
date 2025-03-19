import { SVGProps } from "react";
export * from "./register.type";
export * from "./user.type";
export * from "./follow.type";
export * from "./comment.type";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TResponse<T> = {
  message: string;
  success: string;
  data: T;
};
