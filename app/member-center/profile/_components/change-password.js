"use client";
import React, { useState } from "react";
import { TbEyeglass2, TbEyeglassFilled } from "react-icons/tb";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

export default function ChangePasswordForm() {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        passwordCheck: "",
    });
    const [error, setError] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const newFormData = {
                ...prev,
                [name]: value,
            };

            if (
                (name === "password" || name === "passwordCheck") &&
                newFormData.password &&
                newFormData.passwordCheck
            ) {
                if (newFormData.password !== newFormData.passwordCheck) {
                    setError((prev) => ({
                        ...prev,
                        passwordCheck: "密碼不一致",
                    }));
                } else {
                    setError((prev) => ({
                        ...prev,
                        passwordCheck: "",
                    }));
                }
            }

            return newFormData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };
    return (
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 mb-4">
            {/* 表單內容 */}
            <form className="space-y-6 " onSubmit={handleSubmit} method="post">
                {/* 密碼欄位 */}
                <div className="flex flex-col relative">
                    <label
                        htmlFor="password"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        變更密碼
                        {/* ERROR */}
                        <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                            {error.password}
                        </div>
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="8個字元且需包含英文字母及數字"
                        className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={formData.password}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-[38px] text-sm text-gray-500 hover:text-gray-800"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <TbEyeglass2 /> : <TbEyeglassFilled />}
                    </button>
                </div>

                {/* 確認密碼欄位 */}
                <div className="flex flex-col relative">
                    <label
                        htmlFor="passwordCheck"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        變更密碼
                        {/* ERROR */}
                        <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                            {error.passwordCheck}
                        </div>
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="passwordCheck"
                        name="passwordCheck"
                        placeholder="請再次輸入密碼"
                        className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={formData.passwordCheck}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    <div className="absolute right-3 top-[38px] text-sm text-gray-500">
                        {error.passwordCheck === "密碼不一致" ? (
                            <IoIosCloseCircle className="text-[12px] text-red-500" />
                        ) : formData.passwordCheck?.length > 0 ? (
                            <IoIosCheckmarkCircle className="text-[12px] text-green-500" />
                        ) : (
                            ""
                        )}
                    </div>
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
    );
}
