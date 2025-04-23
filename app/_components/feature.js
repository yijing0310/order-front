"use client";
import { IoMdFlower } from "react-icons/io";
import { TbEyeglass2, TbEyeglassFilled } from "react-icons/tb";
import Link from "next/link";
import { useState } from "react";

export default function FeatureWithJoinForm() {
    const features = [
        { title: " ✅   自動彙整訂單", subtitle: "自動統計每個人的點餐項目與數量" },
        { title: " ✅   智慧分帳金額", subtitle: "自動計算每人應付金額，免去手動麻煩" },
        { title: " ✅   一鍵匯出明細", subtitle: "輕鬆複製、分享訂單給外送平台或團員" },
        { title: " ✅   手機也好操作", subtitle: "行動裝置友善介面，隨時揪團沒問題" },
    ];

    const [groupId, setGroupId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({ group_uuid: "", password: "" });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("送出表單");
        // 可接 API
    };

    return (
        <section className="py-16 px-4 lg:px-20  min-h-screen flex  justify-center items-center" >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center justify-center">
                {/* 功能特色 */}
                <div className="w-full lg:w-1/2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white bg-third rounded-xl px-4 py-3 inline-flex items-center justify-center mb-8 w-full">
                        <IoMdFlower className="mr-2" /> 功能特色，一看就懂！ <IoMdFlower className="ml-2" />
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className="bg-white shadow rounded-md p-4">
                                <h4 className="font-semibold text-lg tex">{f.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{f.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 進入揪團表單 */}
                <div className="bg-white p-8 rounded-xl shadow-xl w-full lg:w-[400px]">
                    <h2 className="text-2xl font-semibold mb-4 text-center">進入揪團！</h2>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                揪團 ID *
                                {error.group_uuid && (
                                    <span className="text-xs text-red-500 ml-2">{error.group_uuid}</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md px-3 py-2  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="請輸入揪團ID"
                                value={groupId}
                                onChange={(e) => setGroupId(e.target.value)}
                                maxLength={10}
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium mb-1">
                                揪團密碼（如有）
                                {error.password && (
                                    <span className="text-xs text-red-500 ml-2">{error.password}</span>
                                )}
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full border border-gray-300 rounded-md px-3 py-2  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="請輸入密碼"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-9 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <TbEyeglass2 /> : <TbEyeglassFilled />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-md hover:bg-third transition"
                        >
                            進入揪團
                        </button>
                    </form>
                    <p className="text-sm text-center text-gray-600 mt-4">
                        想創建屬於自己的團嗎？{" "}
                        <Link href="/login" className="text-primary hover:underline">
                            登入後立即開團！
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
