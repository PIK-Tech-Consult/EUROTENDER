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
  FieldDescription,
} from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"
import { type ComponentProps } from "react"

export type TextAreaInputProps<T extends FieldValues> =
  ComponentProps<typeof InputGroupTextarea> &
    Omit<UseControllerProps<T>, "control"> & {
      FieldProps?: ComponentProps<typeof Field>
      label?: string
      placeholder?: string
      disabled?: boolean
      description?: string
      rows?: number
      maxLength?: number
    }

export const TextAreaInput = <T extends FieldValues>({
  name,
  label,
  description,
  disabled = false,
  placeholder,
  rows = 6,
  maxLength,
  FieldProps,
  ...props
}: TextAreaInputProps<T>) => {
  const { control } = useFormContext<T>()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} {...FieldProps}>
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
          <InputGroup>
            <InputGroupTextarea
              {...field}
              {...props}
              id={name}
              placeholder={placeholder}
              rows={rows}
              maxLength={maxLength}
              className="max-h-52 min-h-18 resize-none"
              aria-invalid={fieldState.invalid}
              disabled={disabled}
            />
            {maxLength !== undefined && (
              <InputGroupAddon align="block-end">
                <InputGroupText className="tabular-nums">
                  {field.value?.length || 0} / {maxLength} characters
                </InputGroupText>
              </InputGroupAddon>
            )}
          </InputGroup>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
