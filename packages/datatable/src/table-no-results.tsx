import * as React from "react"
import { SearchX } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

export interface TableNoResultsProps {
  onClear?: () => void
}

export function TableNoResults({ onClear }: TableNoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
      <SearchX className="h-16 w-16" />
      <p className="text-lg">
        No results found. Try adjusting your search or filters.
      </p>
      {onClear && (
        <Button variant="outline" onClick={onClear} className="mt-2">
          Clear Filters
        </Button>
      )}
    </div>
  )
}
