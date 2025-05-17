import React from 'react'
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage : React.Dispatch<React.SetStateAction<number>>;
}

export function Pagination(
    { currentPage, totalPages, setCurrentPage }: PaginationProps) {
    return (
        <div className="flex justify-center space-x-2 mt-4" >
            <Button
                onClick={() => setCurrentPage(prev => prev -1)}
                disabled={currentPage === 1}
                variant="default"
            >
                <ChevronLeft />
                Previous
            </Button>
            <span className="flex items-center">
                Page {currentPage} of {totalPages}
            </span>
            <Button
                onClick={() => setCurrentPage(prev => prev +1)}
                disabled={currentPage === totalPages}
                variant="default"
            >
                Next
                <ChevronRight />
            </Button>
        </div >
    )
}