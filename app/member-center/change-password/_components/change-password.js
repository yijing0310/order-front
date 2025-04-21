"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TbEyeglass2, TbEyeglassFilled } from "react-icons/tb";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { PASSWORD_EDIT_POST } from "@/config/api-path";
import { useAuth } from "@/context/auth.js";
import { editPasswordschema } from "@/utils/schema/editPasswordschema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePasswordForm() {
    const router = useRouter()
    const { auth, getAuthHeader, logout } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);

    const [formData, setFormData] = useState({
        oldpassword: "",
        password: "",
        passwordCheck: "",
    });
    const [error, setError] = useState("");
    const [generalError, setGeneralError] = useState("");
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
    const notify = () => {
        toast.success("修改成功 ! 請重新登入");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const zResult = editPasswordschema.safeParse(formData);
        if (!zResult.success) {
            const newError = {
                oldpassword: "",
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
            return;
        }
        try {
            const r = await fetch(PASSWORD_EDIT_POST, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeader(),
                },
                body: JSON.stringify(formData),
            });
            if (!r.ok) {
                throw new Error("fail to edit password");
            }
            const result = await r.json();
            setError(result.error);
            if (result.success) {
                setError({});
                setGeneralError("");
                setFormData({});
                notify();
                setTimeout(() => {
                    logout();
                }, 1000);
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            } else {
                setGeneralError(result.message);
            }
        } catch (err) {
            setError("發送請求時發生錯誤:", error);
        }
    };
    return (
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 mb-4">
            {/* 表單內容 */}
            <form className="space-y-6 " onSubmit={handleSubmit} method="post">
                {/* old密碼欄位 */}
                <div className="flex flex-col relative">
                    <label
                        htmlFor="oldpassword"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        輸入舊密碼
                        {/* ERROR */}
                        <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                            {error.oldpassword}
                        </div>
                    </label>
                    <input
                        type={showOldPassword ? "text" : "password"}
                        id="oldpassword"
                        name="oldpassword"
                        placeholder="請輸入舊密碼"
                        className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={formData.oldpassword}
                        onChange={handleChange}
                        maxLength={20}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-[38px] text-sm text-gray-500 hover:text-gray-800"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                        {showOldPassword ? (
                            <TbEyeglass2 />
                        ) : (
                            <TbEyeglassFilled />
                        )}
                    </button>
                </div>
                {/* 密碼欄位 */}
                <div className="flex flex-col relative">
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
                        {showPassword ? <TbEyeglass2 /> : <TbEyeglassFilled />}
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

                {/* 送出按鈕 */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-third transition"
                    >
                        確定修改
                    </button>
                    {/* ERROR */}
                    <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                        {generalError}
                    </div>
                </div>
            </form>
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
