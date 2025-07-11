import React from 'react'
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
    return (
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8 px-4">
            <Button
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
            >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
            </Button>

            <div className="text-sm text-gray-300 font-medium">
                Page <span className="text-white font-semibold">{currentPage}</span> of{" "}
                <span className="text-white font-semibold">{totalPages}</span>
            </div>

            <Button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
            >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
