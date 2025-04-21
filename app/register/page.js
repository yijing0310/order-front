"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth.js";
import { registerSchema } from "@/utils/schema/rschema";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaHome } from "react-icons/fa";
import { TbEyeglass2, TbEyeglassFilled } from "react-icons/tb";
import { REGISTER_POST } from "@/config/api-path";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Register() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const defaultRegisterForm = {
        name: "",
        email: "",
        account: "",
        password: "",
        passwordCheck: "",
    };
    const [registerForm, setRegisterForm] = useState(defaultRegisterForm);
    const notify = () => {
        toast.success("註冊成功 ! 準備前往登入頁");
    };
    const changeRegisterForm = (e) => {
        const { name, value } = e.target;
        const newForm = { ...registerForm, [name]: value };
        setRegisterForm(newForm);
        // 即時比對 password
        if (
            (name === "password" || name === "passwordCheck") &&
            newForm.password &&
            newForm.passwordCheck
        ) {
            if (newForm.password !== newForm.passwordCheck) {
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
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const zResult = registerSchema.safeParse(registerForm);
        if (!zResult.success) {
            const newError = {
                name: "",
                email: "",
                account: "",
                password: "",
                passwordCheck: "",
            };
            const errMap = new Map();

            zResult.error?.issues.forEach((item) => {
                const pathKey = item.path[0];
                if (!errMap.has(pathKey)) {
                    errMap.set(pathKey, item.message);
                    newError[pathKey] = item.message;
                }
            });
            setError(newError);
            setTimeout(() => setIsSubmitting(false), 2000);
            return;
        }
        const r = await fetch(REGISTER_POST, {
            method: "POST",
            body: JSON.stringify(registerForm),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await r.json();
        console.log(result);
        setError(result.error);
        setTimeout(() => setIsSubmitting(false), 2000);
        if (result.success) {
            notify();
            setTimeout(() => {
                router.push("/login");
            }, 2000);

            setRegisterForm(defaultRegisterForm);
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
                <h2 className="text-2xl font-bold text-center">
                    註冊 Register
                </h2>
                {/* 姓名欄位 */}
                <div className="flex flex-col">
                    <label
                        htmlFor="name"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        姓名
                        {/* ERROR */}
                        <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                            {error.name}
                        </div>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="請輸入姓名"
                        className="h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={registerForm.name}
                        onChange={changeRegisterForm}
                        maxLength={10}
                    />
                </div>

                {/* email欄位 */}
                <div className="flex flex-col">
                    <label
                        htmlFor="email"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        電子郵件
                        {/* ERROR */}
                        <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                            {error.email}
                        </div>
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="請輸入電子郵件"
                        className="h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={registerForm.email}
                        onChange={changeRegisterForm}
                        maxLength={30}
                    />
                </div>

                {/* 帳號欄位 */}
                <div className="flex flex-col">
                    <label
                        htmlFor="account"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        帳號
                        {/* ERROR */}
                        <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                            {error.account}
                        </div>
                    </label>
                    <input
                        type="text"
                        id="account"
                        name="account"
                        placeholder="請輸入帳號"
                        className="h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={registerForm.account}
                        onChange={changeRegisterForm}
                        maxLength={20}
                    />
                </div>

                {/* 密碼欄位 */}
                <div className="flex flex-col relative">
                    <label
                        htmlFor="password"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        密碼
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
                        value={registerForm.password}
                        onChange={changeRegisterForm}
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
                        確認密碼
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
                        value={registerForm.passwordCheck}
                        onChange={changeRegisterForm}
                        maxLength={20}
                    />
                    <div className="absolute right-3 top-[38px] text-sm text-gray-500">
                        {error.passwordCheck === "密碼不一致" ? (
                            <IoIosCloseCircle className="text-[12px] text-red-500" />
                        ) : registerForm.passwordCheck?.length > 0 ? (
                            <IoIosCheckmarkCircle className="text-[12px] text-green-500" />
                        ) : (
                            ""
                        )}
                    </div>
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
                    <Link
                        href="/login"
                        className="text-primary hover:underline"
                    >
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
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
