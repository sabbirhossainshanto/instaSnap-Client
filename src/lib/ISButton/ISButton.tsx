import { Button } from "@heroui/button";
import { ComponentProps } from "react";

type TButtonProps = ComponentProps<typeof Button>;

const ISButton = (props: TButtonProps) => {
  return <Button {...props} />;
};

export default ISButton;
