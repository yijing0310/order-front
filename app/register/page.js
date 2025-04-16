"use client";
import React from "react";
import { useAuth } from "@/context/auth.js";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { TbEyeglass2, TbEyeglassFilled } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Register() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const { auth, login } = useAuth();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registerForm, setRegisterForm] = useState({
        account: "",
        password: "",
    });
    const changeRegisterForm = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (registerForm.password.length <= 0 && registerForm.account.length <= 0) {
            setError("⚠️ 帳號密碼不得為空");
            setTimeout(() => setIsSubmitting(false), 2000);
            return;
        }
        const { success, error, code } = await login(
            registerForm.account,
            registerForm.password
        );
        if (success) {
            alert("登入成功");
            setError("");
            router.push("/");
            setTimeout(() => setIsSubmitting(false), 2000);
        } else {
            if (code === 400) {
                setError("⚠️ 帳號密碼不得為空");
            } else if (code === 410 || code === 420) {
                setError("⚠️ 帳號或密碼錯誤，請再試一次。");
            } else {
                setError("⚠️ 登入失敗，請稍後再試");
            }
            setTimeout(() => setIsSubmitting(false), 2000);
        }
    };
    return (
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center min-h-screen">
            <form
                className="w-full max-w-md px-8 py-10 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl space-y-6 my-7"
                method="post"
                onSubmit={onSubmit}
            >
                <Link href="/" className="inline-block">
                    <FaHome className="text-secondary" />
                </Link>
                <h2 className="text-2xl font-bold text-center">註冊 Register</h2>
                {/* 姓名欄位 */}
                <div className="flex flex-col">
                    <label
                        htmlFor="name"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        姓名
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="請輸入姓名"
                        className="h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={registerForm.name}
                        onChange={changeRegisterForm}
                        max={10}
                    />
                </div>

                 {/* email欄位 */}
                 <div className="flex flex-col">
                    <label
                        htmlFor="email"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        電子郵件
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="請輸入電子郵件"
                        className="h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={registerForm.email}
                        onChange={changeRegisterForm}
                        max={30}
                    />
                </div>


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
                        value={registerForm.account}
                        onChange={changeRegisterForm}
                        max={20}
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
                        value={registerForm.password}
                        onChange={changeRegisterForm}
                        max={20}
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
                        確認密碼
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="passwordCheck"
                        name="passwordCheck"
                        placeholder="請再次輸入密碼"
                        className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={registerForm.passwordCheck}
                        onChange={changeRegisterForm}
                        max={20}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-[38px] text-sm text-gray-500 hover:text-gray-800"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <TbEyeglass2 /> : <TbEyeglassFilled />}
                    </button>
                </div>

                <div className="text-sm text-red-500 h-5">
                    {error ? error : ""}
                </div>

                {/* 註冊按鈕 */}
                <button
                    type="submit"
                    className="w-full py-2 bg-primary text-white font-semibold rounded-md shadow hover:bg-third transition-all"
                    disabled={isSubmitting}
                >
                    註冊
                </button>

                {/* 其他連結 */}
                <div className="text-sm text-center text-gray-600">
                    已有帳號？{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        立即登入
                    </Link>
                </div>
            </form>
            <DotLottieReact
                src="https://lottie.host/c761c7bb-bb1e-4302-a301-79e92e85091a/QJ60kSBHQr.lottie"
                loop
                autoplay
                style={{ width: "500px", height: "auto" }}
                className="order-1"
            />
        </div>
    );
}
