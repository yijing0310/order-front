"use client";
import React, { useState } from "react";
import { TbEyeglass2, TbEyeglassFilled } from "react-icons/tb";
import radioStyles from "./radio.module.css";
export default function AddGroupPage() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <div className="sm:px-6 w-10/12">
                <div className="px-4 md:px-10 py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p
                            tabIndex={0}
                            className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal w-full"
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
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                揪團名稱 *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="例如：午餐訂餐"
                                className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                                maxLength={30}
                            />
                        </div>

                        {/* 餐廳名稱 */}
                        <div>
                            <label
                                htmlFor="restaurant"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                餐廳名稱 *
                            </label>
                            <input
                                type="text"
                                id="restaurant"
                                name="restaurant"
                                placeholder="例如：丹丹漢堡"
                                className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                                maxLength={30}
                            />
                        </div>

                        {/* 菜單連結 */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                菜單連結
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="http:// how-order/menu"
                                className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                                maxLength={100}
                            />
                        </div>

                        {/* 人數上限 */}
                        <div>
                            <label
                                htmlFor="limit"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                人數上限
                            </label>
                            <input
                                type="number"
                                id="limit"
                                name="limit"
                                placeholder="例如：10"
                                min={0}
                                className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                            />
                        </div>

                        {/* 結束時間 */}
                        <div>
                            <label
                                htmlFor="endTime"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                結束時間 *
                            </label>
                            <input
                                type="datetime-local"
                                id="endTime"
                                name="endTime"
                                className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                            />
                        </div>

                        {/* 密碼欄位 */}
                        <div className="flex flex-col relative">
                            <label
                                htmlFor="password"
                                className="mb-1 text-sm font-medium text-gray-700"
                            >
                                設置密碼
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="輸入密碼"
                                className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                maxLength={20}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-[38px] text-sm text-gray-500 hover:text-gray-800"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <TbEyeglass2 />
                                ) : (
                                    <TbEyeglassFilled />
                                )}
                            </button>
                        </div>
                        {/* 模板選擇 */}
                        <div
                            className={`flex flex-col ${radioStyles.radioBtn}`}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                選擇訂購模板 *
                            </label>
                            <div className="flex  gap-2 pl-2">
                                <label className="inline-flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="template"
                                        value="basic"
                                        disabled
                                    />
                                    <span>基本模板</span>
                                </label>
                                <label className="inline-flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="template"
                                        value="drink"
                                        defaultChecked
                                    />
                                    <span>飲料模板</span>
                                </label>
                                <label className="inline-flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="template"
                                        value="custom"
                                        disabled
                                    />
                                    <span>自訂模板</span>
                                </label>
                            </div>
                        </div>

                        {/* 備註 */}
                        <div>
                            <label
                                htmlFor="note"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                備註
                            </label>
                            <textarea
                                id="note"
                                name="note"
                                rows={3}
                                placeholder="可輸入例如付款方式、地點說明等"
                                className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
