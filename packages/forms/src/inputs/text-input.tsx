"use client"

import {
  Controller,
  FieldValues,
  useFormContext,
  type UseControllerProps,
} from "react-hook-form"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { type ComponentProps } from "react"

export type TextInputProps<T extends FieldValues> = ComponentProps<typeof Input> &
  Omit<UseControllerProps<T>, "control"> & {
    FieldProps?: ComponentProps<typeof Field>
    label?: string
    placeholder?: string
    disabled?: boolean
    // size?: "small" | "medium" | "large";
  }

export const TextInput = <T extends FieldValues>({
  name,
  label,
  disabled = false,
  placeholder,
  FieldProps,
  ...props
}: TextInputProps<T>) => {
  const { control } = useFormContext<T>()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} {...FieldProps}>
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
          <Input
            {...props}
            {...field}
            id={name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
            disabled={disabled}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
