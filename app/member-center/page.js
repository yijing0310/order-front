'use client'
import React from "react";
import Select from "./_components/select";
import Table from "./_components/table";
export default function page() {
    return (
        
        <>
        <div className="sm:px-6 w-10/12">
            <div className="px-4 md:px-10 py-4 md:py-7">
                <div className="flex items-center justify-between">
                    <p
                        tabIndex={0}
                        className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal"
                    >
                        揪團總覽
                    </p>
                    <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        <p>Sort By:</p>
                        <select
                            aria-label="select"
                            className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
                        >
                            <option className="text-sm text-indigo-800">
                                Latest
                            </option>
                            <option className="text-sm text-indigo-800">
                                Oldest
                            </option>
                            <option className="text-sm text-indigo-800">
                                Latest
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <Select />
                <div className="mt-7 overflow-x-auto">
                <Table/>
                </div>
            </div>
        </div>
        </>
    );
}
