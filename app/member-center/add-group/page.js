"use client";
import React from "react";

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
                            新增揪團
                        </p>
                    </div>
                </div>
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 mb-4">
                    {/* 表單內容 */}
                    <form className="space-y-6 ">
                        {/* 揪團名稱 */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                揪團名稱
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="例如：午餐訂餐"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            />
                        </div>

                        {/* 餐廳名稱 */}
                        <div>
                            <label
                                htmlFor="restaurant"
                                className="block text-sm font-medium text-gray-700"
                            >
                                餐廳名稱
                            </label>
                            <input
                                type="text"
                                id="restaurant"
                                name="restaurant"
                                placeholder="例如：丹丹漢堡"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            />
                        </div>

                        {/* 人數上限 */}
                        <div>
                            <label
                                htmlFor="limit"
                                className="block text-sm font-medium text-gray-700"
                            >
                                人數上限
                            </label>
                            <input
                                type="number"
                                id="limit"
                                name="limit"
                                placeholder="例如：10"
                                min={0}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            />
                        </div>

                        {/* 結束時間 */}
                        <div>
                            <label
                                htmlFor="endTime"
                                className="block text-sm font-medium text-gray-700"
                            >
                                結束時間
                            </label>
                            <input
                                type="datetime-local"
                                id="endTime"
                                name="endTime"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            />
                        </div>

                        {/* 備註 */}
                        <div>
                            <label
                                htmlFor="note"
                                className="block text-sm font-medium text-gray-700"
                            >
                                備註
                            </label>
                            <textarea
                                id="note"
                                name="note"
                                rows={3}
                                placeholder="可輸入例如付款方式、地點說明等"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            />
                        </div>

                        {/* 送出按鈕 */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-third transition"
                            >
                                建立揪團
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
