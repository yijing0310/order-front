"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center min-h-screen">
            <DotLottieReact
                src="https://lottie.host/c761c7bb-bb1e-4302-a301-79e92e85091a/QJ60kSBHQr.lottie"
                loop
                autoplay
                style={{ width: '500px', height: 'auto' }}
            />
            <form className="w-full max-w-md px-8 py-10 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl space-y-6">
                <Link href="/" className="inline-block"><FaHome className="text-secondary"/></Link>
                <h2 className="text-2xl font-bold text-center">登入 Login</h2>

                {/* 帳號欄位 */}
                <div className="flex flex-col">
                    <label
                        htmlFor="account"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        帳號
                    </label>
                    <input
                        type="text"
                        id="account"
                        name="account"
                        placeholder="請輸入帳號"
                        className="h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                </div>

                {/* 密碼欄位 */}
                <div className="flex flex-col relative">
                    <label
                        htmlFor="password"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        密碼
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="請輸入密碼"
                        className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-[38px] text-sm text-gray-500 hover:text-gray-800"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>

                {/* 錯誤訊息（靜態示範） */}
                <div className="text-sm text-red-500">
                    ⚠️ 帳號或密碼錯誤，請再試一次。
                </div>

                {/* 登入按鈕 */}
                <button
                    type="submit"
                    className="w-full py-2 bg-primary text-white font-semibold rounded-md shadow hover:bg-third transition-all"
                >
                    登入
                </button>

                {/* 其他連結 */}
                <div className="text-sm text-center text-gray-600">
                    尚未註冊？{" "}
                    <a href="#" className="text-primary hover:underline">
                        立即註冊
                    </a>
                </div>
            </form>
        </div>
    );
}
