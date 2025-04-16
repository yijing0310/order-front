"use client";
import React, { useState } from "react";
import { TbEyeglass2, TbEyeglassFilled } from "react-icons/tb";
import radioStyles from "./radio.module.css";
import { useAuth } from "@/context/auth.js";
import { ADD_GROUP_POST } from "@/config/api-path";
import { addGroupSchema } from "@/utils/schema/addGroupSchema";
export default function AddGroupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const defaultAddGroupForm = {
        title: "",
        restaurant: "",
        menuLink: "",
        limit: 100,
        endTime: "",
        password: "",
        template: "drink", //預設到時候要改
        note: "",
    };
    const { auth, getAuthHeader } = useAuth();
    const [error, setError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [addGroupForm, setAddGroupForm] = useState(defaultAddGroupForm);
    const changeAddGroupForm = (e) => {
        const { name, value } = e.target;
        const newForm = { ...addGroupForm, [name]: value };
        setAddGroupForm(newForm);
    };
    function getCurrentDateTime() {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const localDate = new Date(now.getTime() - offset * 60000);
        return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const zResult = addGroupSchema.safeParse(addGroupForm);
        if (!zResult.success) {
            const newError = {
                title: "",
                restaurant: "",
                menuLink: "",
                limit: "",
                endTime: "",
                password: "",
                template: "",
                note: "",
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
        }
        const r = await fetch(ADD_GROUP_POST, {
            method: "POST",
            body: JSON.stringify(addGroupForm),
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader(),
            },
        });
        const result = await r.json();
        console.log(result);
        setError(result.error);
        setTimeout(() => setIsSubmitting(false), 2000);
        if (result.success) {
            alert("新增成功");
            setAddGroupForm(defaultAddGroupForm);
            setTimeout(() => setIsSubmitting(false), 2000);
        }
    };
    return (
        <>
            <div className="sm:px-6 w-10/12">
                <div className="px-4 md:px-10 py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p
                            tabIndex={0}
                            className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal w-full"
                        >
                            新增揪團
                        </p>
                    </div>
                </div>
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 mb-4">
                    {/* 表單內容 */}
                    <form
                        className="space-y-6 "
                        onSubmit={onSubmit}
                        method="post"
                    >
                        {/* 揪團名稱 */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                揪團名稱 *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="例如：午餐訂餐"
                                className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                                maxLength={30}
                                value={addGroupForm.title}
                                onChange={changeAddGroupForm}
                            />
                        </div>

                        {/* 餐廳名稱 */}
                        <div>
                            <label
                                htmlFor="restaurant"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                餐廳名稱 *
                            </label>
                            <input
                                type="text"
                                id="restaurant"
                                name="restaurant"
                                placeholder="例如：丹丹漢堡"
                                className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                                maxLength={30}
                                value={addGroupForm.restaurant}
                                onChange={changeAddGroupForm}
                            />
                        </div>

                        {/* 菜單連結 */}
                        <div>
                            <label
                                htmlFor="menuLink"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                菜單連結
                            </label>
                            <input
                                type="text"
                                id="menuLink"
                                name="menuLink"
                                placeholder="http:// how-order/menu"
                                className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                                maxLength={100}
                                value={addGroupForm.menuLink}
                                onChange={changeAddGroupForm}
                            />
                        </div>

                        {/* 人數上限 */}
                        <div>
                            <label
                                htmlFor="limit"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                人數上限
                            </label>
                            <input
                                type="number"
                                id="limit"
                                name="limit"
                                placeholder="例如：10"
                                min={0}
                                className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                                value={addGroupForm.limit}
                                onChange={changeAddGroupForm}
                            />
                        </div>

                        {/* 結束時間 */}
                        <div>
                            <label
                                htmlFor="endTime"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                結束時間 *
                            </label>
                            <input
                                type="datetime-local"
                                id="endTime"
                                name="endTime"
                                className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full"
                                value={addGroupForm.endTime}
                                onChange={changeAddGroupForm}
                                min={getCurrentDateTime()}
                            />
                        </div>

                        {/* 密碼欄位 */}
                        <div className="flex flex-col relative">
                            <label
                                htmlFor="password"
                                className="mb-1 text-sm font-medium text-gray-700"
                            >
                                設置密碼
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="輸入密碼"
                                className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                maxLength={20}
                                value={addGroupForm.password}
                                onChange={changeAddGroupForm}
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
                        {/* 模板選擇 */}
                        <div
                            className={`flex flex-col ${radioStyles.radioBtn}`}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                選擇訂購模板 *
                            </label>
                            <div className="flex  gap-2 pl-2">
                                <label className="inline-flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="template"
                                        value="basic"
                                        checked={
                                            addGroupForm.template === "basic"
                                        }
                                        onChange={changeAddGroupForm}
                                    />
                                    <span>基本模板</span>
                                </label>
                                <label className="inline-flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="template"
                                        value="drink"
                                        checked={
                                            addGroupForm.template === "drink"
                                        }
                                        onChange={changeAddGroupForm}
                                    />
                                    <span>飲料模板</span>
                                </label>
                                <label className="inline-flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="template"
                                        value="custom"
                                        checked={
                                            addGroupForm.template === "custom"
                                        }
                                        disabled
                                        onChange={changeAddGroupForm}
                                    />
                                    <span>自訂模板</span>
                                </label>
                            </div>
                        </div>

                        {/* 備註 */}
                        <div>
                            <label
                                htmlFor="note"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                備註
                            </label>
                            <textarea
                                id="note"
                                name="note"
                                rows={3}
                                placeholder="可輸入例如付款方式、地點說明等"
                                className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                value={addGroupForm.note}
                                onChange={changeAddGroupForm}
                            />
                        </div>

                        {/* 送出按鈕 */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-third transition"
                            >
                                建立揪團
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
