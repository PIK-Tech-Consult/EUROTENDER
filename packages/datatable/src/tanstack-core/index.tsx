import {
	aggregationFns,
	createFacetedRowModel,
	createFacetedUniqueValues,
	createFilteredRowModel,
	createPaginatedRowModel,
	createSortedRowModel,
	filterFns,
	sortFns,
	stockFeatures,
	tableFeatures,
} from '@tanstack/react-table';
import type { CellData, ColumnDef as TanstackColumnDef, RowData } from '@tanstack/react-table';

export * from '@tanstack/react-table';

// Shared feature set for every table created via @stepin/datatable, so consumers can keep
// defining columns with a plain two-generic `ColumnDef<TData>` like in TanStack Table v8.
export const features = tableFeatures({
	...stockFeatures,
	filteredRowModel: createFilteredRowModel(),
	sortedRowModel: createSortedRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
	facetedRowModel: createFacetedRowModel(),
	facetedUniqueValues: createFacetedUniqueValues(),
	filterFns,
	sortFns,
	aggregationFns,
});

export type Features = typeof features;

export type ColumnDef<
	TData extends RowData,
	TValue extends CellData = CellData,
> = TanstackColumnDef<Features, TData, TValue>;
