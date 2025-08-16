"use client"

import { useState } from "react";
import Paginate from "./Paginate";

export default function PaginateDemo() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 237; // pretend from API

  return (
    <div className="p-6    border-t-4 mt-4">
      <Paginate
        totalItems={totalItems}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(n) => {
          setPageSize(n);
          setPage(1); // reset to first page when size changes
        }}
      />

      <div className="mt-6 text-sm text-muted-foreground">
        <div>Current page: {page}</div>
        <div>Page size: {pageSize}</div>
        <div>Showing items {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalItems)}</div>
      </div>
    </div>
  )
}