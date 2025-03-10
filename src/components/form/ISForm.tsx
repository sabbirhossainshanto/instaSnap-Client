"use client";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface IFormConfig {
  defaultValues?: Record<string, unknown>;
  resolver?: any;
}

interface TProps extends IFormConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
}
const ISForm = ({ children, onSubmit, defaultValues, resolver }: TProps) => {
  const formConfig: IFormConfig = {};
  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default ISForm;
