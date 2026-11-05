// "use client"

// import {
//   Controller,
//   FieldValues,
//   useFormContext,
//   type UseControllerProps,
// } from "react-hook-form"
// import {
//   Editable,
//   EditableArea,
//   EditableInput,
//   EditablePreview,
// } from "@workspace/ui/components/editable"
// import {
//   Field,
//   FieldError,
//   FieldLabel,
// } from "@workspace/ui/components/field"
// import { type ComponentProps } from "react"
// import { Loader2 } from "lucide-react"

// export type EditableTextInputProps<T extends FieldValues> = Omit<
//   UseControllerProps<T>,
//   "control"
// > & {
//   FieldProps?: ComponentProps<typeof Field>
//   label?: string
//   placeholder?: string
//   disabled?: boolean
//   className?: string
// }

// export const EditableTextInput = <T extends FieldValues>({
//   name,
//   label,
//   disabled = false,
//   placeholder,
//   FieldProps,
//   className,
//   ...props
// }: EditableTextInputProps<T>) => {
//   const { control } = useFormContext<T>()
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState, formState }) => (
//         <Field data-invalid={fieldState.invalid} {...FieldProps}>
//           {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
//           <Editable
//             value={field.value ?? ""}
//             onValueChange={field.onChange}
//             disabled={disabled || formState.isSubmitting}
//             placeholder={placeholder}
//           >
//             <EditableArea className="w-full">
//               <EditablePreview className={`${className ?? ""} pr-8`} />
//               <EditableInput
//                 className={`${className ?? ""} pr-8`}
//                 id={name}
//                 name={field.name}
//                 onBlur={field.onBlur}
//                 aria-invalid={fieldState.invalid}
//               />
//               {formState.isSubmitting && (
//                 <Loader2 className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
//               )}
//             </EditableArea>
//           </Editable>
//           {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//         </Field>
//       )}
//     />
//   )
// }
