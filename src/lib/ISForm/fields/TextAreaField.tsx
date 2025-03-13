import { Textarea } from "@heroui/react";
import React from "react";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useGenericFormContext } from "../customContext";

type TTextFieldsProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  type?: "text" | "email" | "number" | "password" | "url";
  placeholder: string;
  radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
  labelPlacement?: "inside" | "outside" | "outside-left" | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  variant?: "flat" | "bordered" | "faded" | "underlined" | undefined;
};

const TextAreaField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  radius = "sm",
  labelPlacement = "outside",
  size = "md",
  variant,
}: TTextFieldsProps<T>) => {
  const control = useGenericFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Textarea
          variant={variant}
          size={size}
          labelPlacement={labelPlacement}
          label={label}
          type={type}
          radius={radius}
          className="w-full"
          placeholder={placeholder}
          {...field}
          isInvalid={!!fieldState.error}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
};

export default TextAreaField;
