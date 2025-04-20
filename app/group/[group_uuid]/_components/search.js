"use client";
import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function Search({ onSearch }) {
    const [keyword, setKeyword] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setKeyword(value);
        onSearch(value);
    };

    const clearInput = () => {
        setKeyword("");
        onSearch("");
    };

    return (
        <div className="relative w-full max-w-md sm:mr-3 flex justify-end">
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="搜尋訂購人或品項..."
                value={keyword}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
            {keyword && (
                <button
                    onClick={clearInput}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    <FaTimes />
                </button>
            )}
        </div>
    );
}
