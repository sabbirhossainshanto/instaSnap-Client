import { Divider } from "@heroui/react";
import { ComponentProps } from "react";

type TDivider = ComponentProps<typeof Divider>;

const ISDivider = (props: TDivider) => {
  return <Divider {...props} />;
};

export default ISDivider;
