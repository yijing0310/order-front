"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { TbEyeglass2, TbEyeglassFilled } from "react-icons/tb";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
export default function ResetPasswordPage() {
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
        <div className="sm:px-6 w-full h-screen flex justify-center items-center">
            <div className="px-4 md:px-10 py-4 md:py-7 w-3/5 ">
                <div className="max-w-md bg-white p-8 text-sm  flex flex-col gap-5 rounded-lg shadow-md mx-auto">
                    <Link
                        href="/"
                        className=" flex items-center text-secondary"
                    >
                        <FaHome className="" />
                    </Link>
                    {/* 標題 */}
                    <div className="text-center font-semibold text-xl my-3 leading-relaxed">
                        Reset Password <br />
                        重設密碼
                    </div>

                    {/* 表單 */}
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                        method="post"
                    >
                        {/* 密碼欄位 */}
                        <div className="flex flex-col relative ">
                            <label
                                htmlFor="password"
                                className="mb-1 text-sm font-medium text-gray-700"
                            >
                                輸入新密碼
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
                                {showPassword ? (
                                    <TbEyeglass2 />
                                ) : (
                                    <TbEyeglassFilled />
                                )}
                            </button>
                        </div>

                        {/* 確認密碼欄位 */}
                        <div className="flex flex-col relative">
                            <label
                                htmlFor="passwordCheck"
                                className="mb-1 text-sm font-medium text-gray-700"
                            >
                                確認新密碼
                                {/* ERROR */}
                                <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                                    {error.passwordCheck}
                                </div>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="passwordCheck"
                                name="passwordCheck"
                                placeholder="請再次輸入新密碼"
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

                        <button
                            type="submit"
                            className="flex justify-center items-center text-white bg-primary hover:bg-third transition-all w-full py-3 mt-2 rounded-md shadow-sm active:scale-95"
                        >
                            重設密碼
                        </button>
                    </form>

                    {/* 註冊連結 */}
                    <div className="text-sm text-center ">
                        還沒有帳號嗎？{" "}
                        <Link
                            href="/register"
                            className="text-primary hover:underline"
                        >
                            立即註冊
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
