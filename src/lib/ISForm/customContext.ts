import { createContext, useContext } from "react";
import { Control, FieldValues } from "react-hook-form";

export type TGenericFormContext<TFormValues extends FieldValues = any> = {
  control: Control<TFormValues>;
};

export const GenericFormContext = createContext<TGenericFormContext | null>(
  null
);

export const useGenericFormContext = <
  TFormValues extends FieldValues = any,
>() => {
  const context = useContext(GenericFormContext);
  if (!context) {
    throw new Error("useGenericFormContext must be used in GenericForm!!");
  }
  return context.control as Control<TFormValues>;
};
