"use client";
import React, { useState, useEffect } from "react";
import { ORDER_EDIT_POST } from "@/config/api-path";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { TbEyeglass2, TbEyeglassFilled } from "react-icons/tb";
import { useAuth } from "@/context/auth.js";
import { addGroupSchema } from "@/utils/schema/addGroupSchema";
export default function EditModal({
    isOpen,
    onClose,
    editData,
    setRefresh = () => {},
}) {
    if (!isOpen) return null;
    const defaultAddGroupForm = {
        title: "",
        restaurant: "",
        group_uuid: "",
        tel: "",
        menuLink: "",
        limit: 100,
        endTime: "",
        password: "",
        template: "drink",
        note: "",
        ...(editData && {
            title: editData.title,
            restaurant: editData.restaurant,
            group_uuid: editData.group_uuid,
            tel: editData.tel,
            menuLink: editData.menu_link,
            limit: editData.max_people,
            endTime: formatDateTimeLocal(editData.deadline),
            password: editData.password,
            template: editData.template,
            note: editData.description,
        }),
    };

    function formatDateTimeLocal(datetimeStr) {
        if (!datetimeStr) return "";
        const dt = new Date(datetimeStr);
        const offset = dt.getTimezoneOffset();
        const localDate = new Date(dt.getTime() - offset * 60000);
        return localDate.toISOString().slice(0, 16); // 截到 "YYYY-MM-DDTHH:mm"
    }

    useEffect(() => {
        if (editData) {
            setEditGroupForm({
                title: editData.title,
                restaurant: editData.restaurant,
                group_uuid: editData.group_uuid,
                tel: editData.tel,
                menuLink: editData.menu_link,
                limit: editData.max_people,
                endTime: formatDateTimeLocal(editData.deadline),
                password: editData.password,
                template: editData.template,
                note: editData.description,
            });
        }
    }, [editData]);
    const { auth, getAuthHeader } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [editGroupForm, setEditGroupForm] = useState(defaultAddGroupForm);
    // 確認是否到期
    const isExpired =
        new Date(editGroupForm.endTime).getTime() < new Date().getTime();
    const disabledClass = "disabled:bg-gray-100 disabled:text-gray-500";
    // 更動值
    const changeAddGroupForm = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === "limit") {
            newValue = value === "" ? "" : Number(value);
        }
        const newForm = { ...editGroupForm, [name]: newValue };
        setEditGroupForm(newForm);
    };
    function getCurrentDateTime() {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const localDate = new Date(now.getTime() - offset * 60000);
        return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const zResult = addGroupSchema.safeParse(editGroupForm);
        if (isExpired) return;
        if (!zResult.success) {
            const newError = {
                title: "",
                restaurant: "",
                tel: "",
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
            return;
        }
        const r = await fetch(ORDER_EDIT_POST, {
            method: "POST",
            body: JSON.stringify(editGroupForm),
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader(),
            },
        });
        const result = await r.json();
        console.log(result);
        setError(result.error);
        if (result.success) {
            setRefresh((pre) => !pre);
            onClose();
            setEditGroupForm(defaultAddGroupForm);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4 py-8"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-md shadow-lg w-full max-w-lg max-h-full overflow-y-auto p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-6 flex justify-start items-center">
                    <MdOutlineRestaurantMenu />
                    &nbsp;{editData.title}
                </h2>
                <form className="space-y-4" onSubmit={onSubmit}>
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
                            className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full disabled:bg-gray-100 disabled:text-gray-500"
                            maxLength={30}
                            value={editGroupForm.restaurant}
                            onChange={changeAddGroupForm}
                            disabled
                        />
                    </div>
                    {/* 揪團代號 */}
                    <div>
                        <label
                            htmlFor="group_uuid"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            揪團代號
                        </label>
                        <input
                            type="text"
                            id="group_uuid"
                            name="group_uuid"
                            className="h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full disabled:bg-gray-100 disabled:text-gray-500"
                            value={editGroupForm.group_uuid}
                            onChange={changeAddGroupForm}
                            disabled
                        />
                    </div>
                    {/* 聯絡方式 */}
                    <div>
                        <label
                            htmlFor="tel"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            聯絡方式
                            {/* ERROR */}
                            <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                                {error.tel}
                            </div>
                        </label>
                        <input
                            type="text"
                            id="tel"
                            name="tel"
                            placeholder="例如：06-5900112"
                            className={`h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full ${
                                isExpired ? disabledClass : ""
                            }`}
                            maxLength={30}
                            value={editGroupForm.tel}
                            onChange={changeAddGroupForm}
                            disabled={isExpired}
                        />
                    </div>
                    {/* 菜單連結 */}
                    <div>
                        <label
                            htmlFor="menuLink"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            菜單連結{/* ERROR */}
                            <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                                {error.menuLink}
                            </div>
                        </label>
                        <input
                            type="text"
                            id="menuLink"
                            name="menuLink"
                            placeholder="https://how-order.com/menu"
                            className={`h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full ${
                                isExpired ? disabledClass : ""
                            }`}
                            maxLength={100}
                            value={editGroupForm.menuLink}
                            onChange={changeAddGroupForm}
                            disabled={isExpired}
                        />
                    </div>

                    {/* 人數上限 */}
                    <div>
                        <label
                            htmlFor="limit"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            人數上限{/* ERROR */}
                            <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                                {error.limit}
                            </div>
                        </label>
                        <input
                            type="number"
                            id="limit"
                            name="limit"
                            placeholder="例如：10"
                            min={0}
                            className={`h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full ${
                                isExpired ? disabledClass : ""
                            }`}
                            value={editGroupForm.limit}
                            onChange={changeAddGroupForm}
                            disabled={isExpired}
                        />
                    </div>

                    {/* 結束時間 */}
                    <div>
                        <label
                            htmlFor="endTime"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            結束時間 *{/* ERROR */}
                            <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                                {error.endTime}
                            </div>
                        </label>
                        <input
                            type="datetime-local"
                            id="endTime"
                            name="endTime"
                            className={`h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full ${
                                isExpired ? disabledClass : ""
                            }`}
                            value={editGroupForm.endTime}
                            onChange={changeAddGroupForm}
                            min={
                                getCurrentDateTime() < editGroupForm.endTime
                                    ? getCurrentDateTime()
                                    : editGroupForm.endTime
                            }
                            disabled={isExpired}
                        />
                    </div>

                    {/* 密碼欄位 */}
                    <div className="flex flex-col relative">
                        <label
                            htmlFor="password"
                            className="mb-1 text-sm font-medium text-gray-700"
                        >
                            設置密碼
                            {/* ERROR */}
                            <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                                {error.password}
                            </div>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="輸入密碼"
                            className={`h-10 px-3 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full ${
                                isExpired ? disabledClass : ""
                            }`}
                            maxLength={10}
                            value={editGroupForm.password}
                            onChange={changeAddGroupForm}
                            disabled={isExpired}
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

                    {/* 備註 */}
                    <div>
                        <label
                            htmlFor="note"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            備註{/* ERROR */}
                            <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                                {error.note}
                            </div>
                        </label>
                        <textarea
                            id="note"
                            name="note"
                            rows={3}
                            placeholder="可輸入例如付款方式、地點說明等"
                            className={`mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                                isExpired ? disabledClass : ""
                            }`}
                            value={editGroupForm.note}
                            onChange={changeAddGroupForm}
                            disabled={isExpired}
                        />
                    </div>

                    {/* 送出按鈕 */}
                    <div className="pt-4">
                        {isExpired ? (
                            ""
                        ) : (
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-third transition"
                                disabled={isExpired}
                            >
                                確定修改
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
