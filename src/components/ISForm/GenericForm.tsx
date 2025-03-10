import { ReactNode, Ref, useImperativeHandle } from "react";
import {
  Control,
  DefaultValues,
  FieldValues,
  FormState,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { GenericFormContext } from "./customContext";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type TGenericFormRef<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  form: UseFormReturn<TFormValues>;
  formState: FormState<TFormValues>;
  getValues: () => TFormValues;
  setValues: (
    name: Path<TFormValues>,
    value: TFormValues[Path<TFormValues>]
  ) => TFormValues;
  reset: (values: Partial<TFormValues> | undefined) => void;
};

export type TGenericFormProps<TSchema extends ZodType> = {
  schema: TSchema;
  initialValues?: Partial<z.infer<TSchema>>;
  onSubmit: SubmitHandler<z.infer<TSchema>>;
  mode?: "onChange" | "onBlur" | "onSubmit";
  children: ReactNode;
  ref?: Ref<TGenericFormRef<z.infer<TSchema>>>;
};

export const GenericForm = <TSchema extends ZodType>(
  props: TGenericFormProps<TSchema>
) => {
  const {
    children,
    initialValues,
    onSubmit,
    schema,
    mode = "onChange",
    ref,
  } = props;
  type TFormValues = z.infer<TSchema>;
  const form = useForm<TFormValues>({
    mode,
    resolver: zodResolver(schema),
    defaultValues: initialValues as DefaultValues<TFormValues>,
  });

  useImperativeHandle(ref, () => ({
    control: form.control,
    form: form,
    formState: form.formState,
    getValues: form.getValues,
    setValues: (
      name: Path<TFormValues>,
      value: TFormValues[Path<TFormValues>]
    ) => {
      form.setValue(name, value);
    },
    reset: (values: Partial<TFormValues> | undefined) => {
      form.reset(values as TFormValues);
    },
  }));

  return (
    <GenericFormContext.Provider value={{ control: form.control }}>
      {/* <Form className="w-full" {...form}> */}
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
      {/* </Form> */}
    </GenericFormContext.Provider>
  );
};

GenericForm.displayName = "GenericForm";
