"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { PASSWORD_FORGET_POST } from "@/config/api-path";

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const onChange = (e) => {
        setEmail(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        const res = await fetch(PASSWORD_FORGET_POST, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const result = await res.json();
        setMessage(result.message);
        setError(result.error);
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
                        Forget Password <br />
                        忘記密碼
                    </div>

                    {/* 表單 */}
                    <form
                        className="flex flex-col"
                        onSubmit={handleSubmit}
                        method="post"
                    >
                        <div className="flex flex-col gap-1 relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                <MdOutlineEmail />
                            </div>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="請輸入電子郵件"
                                required
                                className="h-10 pl-10 pr-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                                maxLength={30}
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        {/* ERROR */}
                        {error ? (
                            <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1  mb-4 ">
                                {error}
                            </div>
                        ) : (
                            ""
                        )}
                        {message ? (
                            <div className="text-[12px] text-green-700 h-3 mt-4 ml-3 inline pb-1 mb-2">
                                {message}
                            </div>
                        ) : (
                            ""
                        )}
                        <button
                            type="submit"
                            className="flex justify-center items-center text-white bg-primary hover:bg-third transition-all w-full py-3 mt-4 rounded-md shadow-sm active:scale-95 "
                        >
                            寄送重設密碼連結
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
