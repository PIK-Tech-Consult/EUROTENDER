import { useFormState } from "react-hook-form"
import { Button } from "@workspace/ui/components/button"
import { type ComponentProps, type ReactNode } from "react"

export type FormSubmitProps = ComponentProps<typeof Button> & {
  label?: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}
export function FormSubmit({
  label = "Submit",
  leftIcon,
  rightIcon,
  ...props
}: FormSubmitProps) {
  const { isDirty, isValid, isSubmitting, errors } = useFormState()

  return (
    <Button
      type="submit"
      disabled={!isDirty || !isValid || isSubmitting}
      {...props}
    >
      {leftIcon}
      {label}
      {rightIcon}
    </Button>
  )
}
