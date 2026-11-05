import { useForm, FieldValues, DefaultValues, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export type FormProps<T extends FieldValues> = {
	id: string;
	defaultValues?: DefaultValues<T>;
	values?: T;
	children?: React.ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	schema: z.ZodType<T, any, any>;
	mode?: 'onSubmit' | 'onBlur' | 'onChange' | 'onTouched' | 'all' | undefined;
	onSubmit: SubmitHandler<T>;
	disableWhileSubmitting?: boolean;
};
export function Form<T extends FieldValues>({
	id,
	children,
	defaultValues,
	values,
	schema,
	onSubmit,
	mode = 'onSubmit',
	disableWhileSubmitting = true,
}: FormProps<T>) {
	const resolver = zodResolver(schema);

	const form = useForm<T>({
		resolver: resolver,
		defaultValues,
		values,
		mode,
	});

	return (
		<FormProvider {...form}>
			<form id={id} onSubmit={form.handleSubmit(onSubmit)}>
				<fieldset
					disabled={disableWhileSubmitting && form.formState.isSubmitting}
					style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}
				>
					{children}
				</fieldset>
			</form>
		</FormProvider>
	);
}
