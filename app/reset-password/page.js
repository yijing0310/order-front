"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { TbEyeglass2, TbEyeglassFilled } from "react-icons/tb";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { PASSWORD_RESET_POST } from "@/config/api-path";
import { resetPasswordschema } from "@/utils/schema/resetPasswordschema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ResetPasswordPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        passwordCheck: "",
    });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFormData = {
            ...formData,
            [name]: value,
        };
        setFormData(newFormData);

        if (
            newFormData.password &&
            newFormData.passwordCheck &&
            newFormData.password !== newFormData.passwordCheck
        ) {
            setError("⚠️密碼不一致");
        } else {
            setError("");
        }
    };
    // 獲取token
    useEffect(() => {
        if (typeof window !== "undefined") {
            const tokenFromUrl = new URLSearchParams(
                window.location.search
            ).get("token");
            setToken(tokenFromUrl || "");
        }
    }, []);
    const notify = () => {
        toast.success("修改成功 ! 準備跳轉至登入頁");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const zResult = resetPasswordschema.safeParse({
            token,
            ...formData,
        });
        if (!zResult.success) {
            setError(zResult.error.issues[0].message);
            return;
        }
        const res = await fetch(PASSWORD_RESET_POST, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                ...formData,
            }),
        });
        const result = await res.json();
        if (result.success) {
            setMessage(result.message);
            setError("");
            setFormData({ password: "", passwordCheck: "" });
            notify();
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } else {
            setError(result.error);
        }
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
                                {error === "⚠️密碼不一致" ? (
                                    <IoIosCloseCircle className="text-[12px] text-red-500" />
                                ) : formData.passwordCheck?.length > 0 ? (
                                    <IoIosCheckmarkCircle className="text-[12px] text-green-500" />
                                ) : (
                                    ""
                                )}
                            </div>
                            {/* ERROR */}
                            {error ? (
                                <div className="text-[12px] text-red-500 h-3 mt-2 inline pb-1 mb-2 ml-1 ">
                                    {error === "連結已過期，請重新發送連結" ||
                                    error === "無效的連結" ? (
                                        <>
                                            {error}
                                            <Link
                                                href="/forget-password"
                                                className="ml-2 text-gray-800 hover:underline"
                                            >
                                                忘記密碼?
                                            </Link>
                                        </>
                                    ) : (
                                        error
                                    )}
                                </div>
                            ) : (
                                ""
                            )}
                            {message ? (
                                <div className="text-[12px] text-green-700 h-3 mt-4 ml-3 inline pb-1 mb-2 ">
                                    {message}
                                </div>
                            ) : (
                                ""
                            )}
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
