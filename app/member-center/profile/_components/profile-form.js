"use client";
import React, { useState, useEffect } from "react";

export default function ProfileForm({ data }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        account: "",
    });
    let defaultData;
    useEffect(() => {
        if (data) {
            defaultData = {
                name: "",
                email: "",
                account: "",
                ...data,
            };
            setFormData(defaultData);
        }
    }, [data]);

    const [error, setError] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("個人資料送出：", formData);
        // Call API or update state
    };
    return (
        <>
            <div className="flex items-center mb-4">
                <p
                    tabIndex={0}
                    className="focus:outline-none text-base sm:text-lg md:text-xl  font-bold leading-normal"
                >
                    個人資料
                </p>
                <span
                    className="ml-4 px-2 py-1 text-xs  rounded bg-primary text-white cursor-pointer transition hover:bg-third"
                    onClick={() => setFormData(defaultData)}
                >
                    重設
                </span>
            </div>
            <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 mb-4">
                {/* 表單內容 */}
                <form
                    className="space-y-6 "
                    onSubmit={handleSubmit}
                    method="post"
                >
                    {/* 姓名 */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            姓名{/* ERROR */}
                            <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                                {error.name}
                            </div>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="請輸入名字"
                            className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                            maxLength={30}
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            電子郵件{/* ERROR */}
                            <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                                {error.email}
                            </div>
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="請輸入電子郵件"
                            className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                            maxLength={30}
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    {/* 帳號 */}
                    <div>
                        <label
                            htmlFor="account"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            帳號{/* ERROR */}
                            <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                                {error.account}
                            </div>
                        </label>
                        <input
                            type="text"
                            id="account"
                            name="account"
                            className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full disabled:bg-gray-100 disabled:text-gray-500"
                            value={formData.account}
                            onChange={handleChange}
                            disabled
                        />
                    </div>

                    {/* 送出按鈕 */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-third transition"
                        >
                            確定修改
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
