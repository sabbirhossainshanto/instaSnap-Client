import { Input } from "@heroui/react";
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
};

const TextField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  radius = "sm",
  labelPlacement = "outside",
}: TTextFieldsProps<T>) => {
  const control = useGenericFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
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

export default TextField;
