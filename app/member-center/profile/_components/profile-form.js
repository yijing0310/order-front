"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PROFILE_EDIT_POST } from "@/config/api-path";
import { useAuth } from "@/context/auth.js";
import { editProfileSchema } from "@/utils/schema/editProfileSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileForm({ data }) {
    const { auth, getAuthHeader, logout } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        account: "",
    });
    const router = useRouter();
    useEffect(() => {
        if (data) {
            setFormData({ ...data });
        }
    }, [data]);

    const [error, setError] = useState("");
    const [generalError, setGeneralError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const notify = () => {
        toast.success("修改成功 ! 請重新登入");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isChanged =
            formData.name !== data.name || formData.email !== data.email;
        if (!isChanged) {
            setGeneralError("你沒有修改任何資料");
            return;
        }
        const zResult = editProfileSchema.safeParse(formData);
        if (!zResult.success) {
            const newError = {
                name: "",
                email: "",
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
            const r = await fetch(PROFILE_EDIT_POST, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeader(),
                },
                body: JSON.stringify(formData),
            });
            if (!r.ok) {
                throw new Error("fail to edit profile");
            }
            const result = await r.json();
            setError(result.error);
            setGeneralError(result.message)
            if (result.success) {
                setError("");
                setFormData(result.data);
                notify();
                setTimeout(() => {
                    logout();
                }, 1000);
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                setGeneralError(result.error || "取得資料失敗");
            }
        } catch (err) {
            setError("發送請求時發生錯誤:", error);
        }
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
                    onClick={() => setFormData({ ...data })}
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
                        <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                            {generalError}
                        </div>
                    </div>
                </form>
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
        </>
    );
}
