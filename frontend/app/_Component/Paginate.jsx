import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../../components/ui/pagination";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";

export default function Paginate({
  totalItems,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50, 100],
  className = "",
}) {
  const totalPages = Math.max(1, Math.ceil((totalItems || 0) / Math.max(1, pageSize)));
  const clamp = (n) => Math.min(Math.max(1, n), totalPages);

  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrlParams = (newPage, newLimit) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newPage) params.set("page", newPage);
    if (newLimit) params.set("limit", newLimit);
    router.push(`?${params.toString()}`);
  };

  const goTo = (n) => {
    onPageChange(clamp(n));
    updateUrlParams(clamp(n), pageSize);
  };

  const prev = () => goTo(page - 1);
  const next = () => goTo(page + 1);

  const pageWindow = 1;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    const isEdge = i <= 2 || i > totalPages - 2;
    const inWindow = Math.abs(i - page) <= pageWindow;
    if (isEdge || inWindow) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }

  const [gotoValue, setGotoValue] = useState(String(page));
  useEffect(() => {
    setGotoValue(String(page));
  }, [page]);

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Top Row: Page size selector and item summary */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Label htmlFor="page-size" className="whitespace-nowrap">Rows per page</Label>
          <Select
            value={String(pageSize)}
            onValueChange={(val) => {
              const limit = Number(val);
              onPageSizeChange(limit);
              updateUrlParams(page, limit);
            }}
          >
            <SelectTrigger id="page-size" className="w-[90px] sm:w-[110px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((opt) => (
                <SelectItem key={opt} value={String(opt)}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-xs sm:text-sm text-muted-foreground break-words">
          {totalItems.toLocaleString()} items • Page {page} of {totalPages}
        </div>
      </div>

      {/* Pagination Bar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Pagination className="order-2 lg:order-1 flex-wrap justify-center sm:justify-start">
          <PaginationContent className="flex-wrap">
            <PaginationItem>
              <Button variant="ghost" size="sm" onClick={() => goTo(1)} disabled={page <= 1}>
                First
              </Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious onClick={prev} aria-disabled={page <= 1} />
            </PaginationItem>

            {pages.map((p, idx) =>
              p === "ellipsis" ? (
                <PaginationItem key={`e-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => goTo(p)}
                    aria-label={`Go to page ${p}`}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext onClick={next} aria-disabled={page >= totalPages} />
            </PaginationItem>
            <PaginationItem>
              <Button variant="ghost" size="sm" onClick={() => goTo(totalPages)} disabled={page >= totalPages}>
                Last
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* Go to page */}
        <div className="order-1 lg:order-2 flex flex-wrap items-center gap-2 justify-center sm:justify-end">
          <Label htmlFor="goto" className="whitespace-nowrap text-xs sm:text-sm">Go to</Label>
          <Input
            id="goto"
            type="number"
            inputMode="numeric"
            min={1}
            max={totalPages}
            value={gotoValue}
            onChange={(e) => setGotoValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const n = Number(gotoValue);
                if (!Number.isNaN(n)) goTo(n);
              }
            }}
            className="w-16 sm:w-20"
          />
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => {
              const n = Number(gotoValue);
              if (!Number.isNaN(n)) goTo(n);
            }}
          >
            Go
          </Button>
        </div>
      </div>
    </div>
  );
}
