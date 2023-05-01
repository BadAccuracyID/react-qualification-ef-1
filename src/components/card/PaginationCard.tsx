import {ArrowSmallLeftIcon, ArrowSmallRightIcon} from "@heroicons/react/20/solid";
import React from "react";

type Props = {
    page: number;
    totalCount: number;
    mod: number;
    prevPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    nextPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function PaginationCard({page, totalCount, mod, prevPage, nextPage}: Props) {
    return (
        <div className="bg-blue-950 rounded-md flex flex-row justify-center items-center gap-4 w-max h-max">
            <button
                className="hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-l"
                onClick={prevPage}
                disabled={page === 0}
            >
                <ArrowSmallLeftIcon className="h-8 w-8"/>
            </button>
            <p className="text-l font-bold">
                Page: {page + 1} / {totalCount < mod ? 1 : totalCount % mod + 1}
            </p>
            <button
                className="hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-r"
                onClick={nextPage}
                disabled={page === totalCount}
            >
                <ArrowSmallRightIcon className="h-8 w-8"/>
            </button>
        </div>
    );
}
