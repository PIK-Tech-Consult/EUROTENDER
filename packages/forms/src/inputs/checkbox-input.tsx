"use client"

import {
  Controller,
  FieldValues,
  useFormContext,
  type UseControllerProps,
} from "react-hook-form"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Field,
  FieldError,
  FieldLabel,
  FieldDescription,
  FieldContent,
} from "@workspace/ui/components/field"
import { ComponentPropsWithoutRef } from "react"

export type CheckboxInputProps<T extends FieldValues> =
  ComponentPropsWithoutRef<typeof Checkbox> &
    Omit<UseControllerProps<T>, "control"> & {
      FieldProps?: ComponentPropsWithoutRef<typeof Field>
      label?: string
      description?: string
      disabled?: boolean
    }

export const CheckboxInput = <T extends FieldValues>({
  name,
  label,
  description,
  disabled = false,
  FieldProps,
  ...props
}: CheckboxInputProps<T>) => {
  const { control } = useFormContext<T>()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          orientation="horizontal"
          {...FieldProps}
        >
          <Checkbox
            {...props}
            id={name}
            checked={field.value}
            onCheckedChange={field.onChange}
            ref={field.ref}
            disabled={disabled}
            aria-invalid={fieldState.invalid}
          />
          <FieldContent>
            {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
        </Field>
      )}
    />
  )
}
