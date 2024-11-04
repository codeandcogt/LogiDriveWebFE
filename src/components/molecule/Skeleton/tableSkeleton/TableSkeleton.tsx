import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";


export const TableSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[100px] ml-auto" />
        <Skeleton className="h-10 w-[100px] ml-2" />
      </div>
      <div className="rounded-lg border">
        <Table className="bg-white rounded-lg">
          <TableHeader>
            <TableRow>
              {[...Array(5)].map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-4 w-[100px]" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {[...Array(5)].map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-4 w-[200px] flex-1" />
        <div className="space-x-2">
          <Skeleton className="h-10 w-[100px] inline-block" />
          <Skeleton className="h-10 w-[100px] inline-block" />
        </div>
      </div>
    </div>
  );
};