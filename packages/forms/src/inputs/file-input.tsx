// "use client"

// import {
//   Controller,
//   FieldValues,
//   useFormContext,
//   type UseControllerProps,
// } from "react-hook-form"
// import { Button } from "@workspace/ui/components/button"
// import {
//   Field,
//   FieldError,
//   FieldLabel,
//   FieldDescription,
// } from "@workspace/ui/components/field"
// import {
//   FileUpload,
//   FileUploadProps,
//   FileUploadDropzone,
//   FileUploadItem,
//   FileUploadItemDelete,
//   FileUploadItemMetadata,
//   FileUploadItemPreview,
//   FileUploadItemProgress,
//   FileUploadList,
//   FileUploadTrigger,
// } from "@workspace/ui/components/file-upload"
// import { type ComponentProps } from "react"
// import { Upload, X } from "lucide-react"

// export type FileInputProps<T extends FieldValues> = FileUploadProps &
//   Omit<UseControllerProps<T>, "control"> & {
//     FieldProps?: ComponentProps<typeof Field>
//     label?: string
//     placeholder?: string
//     description?: string
//     disabled?: boolean
//     // Hide the error text when no file is provided; the field is still marked invalid
//     hideRequiredError?: boolean
//     // size?: "small" | "medium" | "large";
//   }

// export const FileInput = <T extends FieldValues>({
//   name,
//   label,
//   disabled = false,
//   placeholder,
//   FieldProps,
//   description,
//   maxFiles = 1,
//   maxSize = 5 * 1024 * 1024, // Default max file size: 5MB
//   hideRequiredError = false,
//   ...fileUploadProps
// }: FileInputProps<T>) => {
//   const { control, setError, clearErrors } = useFormContext<T>()
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState, formState }) => (
//         <Field data-invalid={fieldState.invalid} {...FieldProps}>
//           {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
//           <FileUpload
//             value={field.value}
//             onValueChange={(files) => {
//               clearErrors(name)
//               field.onChange(files)
//             }}
//             disabled={disabled}
//             accept="image/*"
//             maxFiles={maxFiles}
//             maxSize={maxSize}
//             onFileReject={(_, message) => {
//               setError(name, {
//                 type: "fileReject",
//                 message:
//                   message === "File type not accepted"
//                     ? "File format not supported"
//                     : message,
//               })
//             }}
//             multiple={maxFiles > 1}
//             {...fileUploadProps}
//           >
//             <FileUploadDropzone
//               className={`flex-col items-center justify-center gap-3 border-dotted py-8 text-center ${
//                 fieldState.invalid ? "border-destructive" : "border-input"
//               }`}
//             >
//               <Upload className="h-12 w-12 text-muted-foreground" />
//               {description && (
//                 <FieldDescription className="text-md text-foreground">
//                   {description}
//                 </FieldDescription>
//               )}
//               <div className="flex flex-col gap-1 text-sm text-muted-foreground">
//                 <div>
//                   Drag and drop or{" "}
//                   <FileUploadTrigger asChild>
//                     <Button
//                       variant="link"
//                       size="sm"
//                       className="p-0 underline"
//                       disabled={disabled}
//                     >
//                       {maxFiles === 1 ? "select file" : "select files"}
//                     </Button>
//                   </FileUploadTrigger>{" "}
//                   to upload
//                 </div>
//                 {maxSize && (
//                   <div className="text-xs">
//                     Maximum file size: {Math.round(maxSize / (1024 * 1024))} MB
//                   </div>
//                 )}
//               </div>
//             </FileUploadDropzone>
//             <FileUploadList>
//               {field.value?.map((file: File, index: number) => (
//                 <FileUploadItem key={index} value={file}>
//                   <FileUploadItemPreview />
//                   <FileUploadItemMetadata />
//                   <FileUploadItemProgress />
//                   <FileUploadItemDelete asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="size-7"
//                       disabled={disabled}
//                     >
//                       <X />
//                       <span className="sr-only">Delete</span>
//                     </Button>
//                   </FileUploadItemDelete>
//                 </FileUploadItem>
//               ))}
//             </FileUploadList>
//           </FileUpload>

//           {/* <FieldDescription>Upload up to 2 images up to 5MB each.</FieldDescription> */}
//           {fieldState.invalid &&
//             !(
//               hideRequiredError &&
//               ["invalid_type", "too_small"].includes(
//                 fieldState.error?.type ?? ""
//               )
//             ) && <FieldError errors={[fieldState.error]} />}
//         </Field>
//       )}
//     />
//   )
// }
