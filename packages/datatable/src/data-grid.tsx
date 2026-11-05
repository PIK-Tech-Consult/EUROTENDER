import * as React from "react"
import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Skeleton } from "@workspace/ui/components/skeleton"

type PaginationState = {
  pageIndex: number
  pageSize: number
}

export type DataGridProps<T extends { id: string | number }> = {
  data: T[]
  renderItem: (item: T) => React.ReactNode
  pageCount?: number
  pagination?: PaginationState
  onPaginationChange?: React.Dispatch<React.SetStateAction<PaginationState>>
  isLoading?: boolean
  emptyState?: React.ReactNode
  itemMinWidth?: string
  skeletonCount?: number
  className?: string
}

export function DataGrid<T extends { id: string | number }>({
  data,
  renderItem,
  pageCount,
  pagination: externalPagination,
  onPaginationChange: setExternalPagination,
  isLoading = false,
  emptyState,
  itemMinWidth = "18rem",
  skeletonCount,
  className,
}: DataGridProps<T>) {
  const [internalPagination, setInternalPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    })

  const pagination = externalPagination ?? internalPagination
  const setPagination = setExternalPagination ?? setInternalPagination
  const isControlledPagination = externalPagination !== undefined

  const resolvedPageCount =
    pageCount ?? Math.max(1, Math.ceil(data.length / pagination.pageSize))
  const from = pagination.pageIndex * pagination.pageSize
  const to = from + pagination.pageSize
  const visibleItems = isControlledPagination ? data : data.slice(from, to)
  const itemCount = skeletonCount ?? pagination.pageSize

  const hasItems = visibleItems.length > 0

  return (
    <div
      className={`flex flex-col gap-4 overflow-auto ${className ?? ""}`.trim()}
    >
      <div className="overflow-hidden rounded-lg">
        <div
          className="grid gap-4 p-px"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${itemMinWidth}), 1fr))`,
          }}
        >
          {isLoading ? (
            Array.from({ length: itemCount }).map((_, index) => (
              <div key={`skeleton-card-${index}`} className="h-full">
                <Skeleton className="h-64 w-full rounded-xl" />
              </div>
            ))
          ) : hasItems ? (
            visibleItems.map((item) => (
              <div key={item.id} className="h-full">
                {renderItem(item)}
              </div>
            ))
          ) : (
            <div className="col-span-full flex min-h-100 items-center justify-center">
              {emptyState || (
                <div className="flex items-center justify-center text-muted-foreground">
                  No results.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex" />
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${pagination.pageSize}`}
              onValueChange={(value) => {
                setPagination({
                  ...pagination,
                  pageSize: Number(value),
                  pageIndex: 0,
                })
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue placeholder={pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {pagination.pageIndex + 1} of {resolvedPageCount}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setPagination({ ...pagination, pageIndex: 0 })}
              disabled={pagination.pageIndex <= 0}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() =>
                setPagination({
                  ...pagination,
                  pageIndex: Math.max(0, pagination.pageIndex - 1),
                })
              }
              disabled={pagination.pageIndex <= 0}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() =>
                setPagination({
                  ...pagination,
                  pageIndex: Math.min(
                    resolvedPageCount - 1,
                    pagination.pageIndex + 1
                  ),
                })
              }
              disabled={pagination.pageIndex >= resolvedPageCount - 1}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() =>
                setPagination({
                  ...pagination,
                  pageIndex: resolvedPageCount - 1,
                })
              }
              disabled={pagination.pageIndex >= resolvedPageCount - 1}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
