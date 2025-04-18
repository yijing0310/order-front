"use client";
import React, { useState } from "react";
import { RiDrinks2Fill } from "react-icons/ri";
import { addOrderSchema } from "@/utils/schema/addOrderSchema";
import { ORDER_ADD_POST } from "@/config/api-path";
import { useParams } from "next/navigation";
import { MdOutlineRestaurantMenu } from "react-icons/md";
export default function OrderModal({
    isOpen,
    onClose,
    templateFields,
    setRefresh = () => {},
    refresh = false,
    isEnd = false,
}) {
    const { group_uuid } = useParams();
    const defaultValue = { name: "", item_name: "", note: "" };
    const [formData, setFormData] = useState(defaultValue);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [error, setError] = useState("");
    if (!isOpen) return null;
    const handleClear = () => {
        setFormData(defaultValue);
        setQuantity(1);
        setPrice("");
    };
    const handleChange = (label, value) => {
        setFormData((prev) => ({ ...prev, [label]: value }));
    };

    const handleOptionSelect = (label, value) => {
        let note = formData.note || "";
        const parts = note.split(" / ").filter(Boolean);

        // 移除相同 label 的舊項目
        const filtered = parts.filter((part) => !part.startsWith(`${label}:`));
        filtered.push(`${label}:${value}`);

        setFormData((prev) => ({
            ...prev,
            note: filtered.join(" / "),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            quantity: parseInt(quantity),
            price: parseInt(price),
            group_uuid: group_uuid,
            template: templateFields.template,
        };

        const zResult = addOrderSchema.safeParse(finalData);
        if (!zResult.success) {
            const newError = {
                group_uuid: "",
                name: "",
                item_name: "",
                quantity: "",
                price: "",
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
        try {
            const res = await fetch(ORDER_ADD_POST, {
                method: "POST",
                body: JSON.stringify(finalData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                setError("新增資料錯誤");
            }
            const result = await res.json();
            setError(result.error);
            if (result.success) {
                setRefresh(!refresh);
                alert("訂購成功！");
                onClose();
                handleClear();
            }
        } catch (ex) {
            setError("連接錯誤:", ex);
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
                <h2 className="text-xl font-semibold mb-4 flex justify-start items-center">
                    <MdOutlineRestaurantMenu />
                    &nbsp;訂購單
                    <span
                        className="ml-3 px-2 text-xs text-gray-700 cursor-pointer font-light"
                        onClick={handleClear}
                    >
                        清除資料
                    </span>
                </h2>
                {isEnd ? (
                    <span className="py-1 px-2 text-sm text-red-700 bg-red-100 rounded">
                        已截止
                    </span>
                ) : (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {templateFields?.fields.map((field, i) => {
                            const { label, type, options = [] } = field;
                            const [labelText, fieldNameRaw] = label.split(",");
                            const fieldName =
                                fieldNameRaw?.trim() || labelText?.trim();
                            switch (type) {
                                case "text":
                                    return (
                                        <div key={i}>
                                            <label className="block mb-1 font-medium">
                                                {labelText}
                                                {/* ERROR */}
                                                <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                                                    {error[fieldName]}
                                                </div>
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full border rounded px-3 py-2 focus:ring-primary focus:border-transparent focus:outline-none focus:ring-2 transition-all"
                                                value={
                                                    formData[fieldName] || ""
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        fieldName,
                                                        e.target.value
                                                    )
                                                }
                                                // required={field.required}
                                            />
                                        </div>
                                    );
                                case "radio":
                                    return (
                                        <div key={i}>
                                            <label className="block mb-1 font-medium">
                                                {label}
                                                {/* ERROR */}
                                                <div className="text-[12px] text-red-500 h-4  ml-3 inline-block mb-2 ">
                                                    {error.note}
                                                </div>
                                            </label>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {options.map((opt, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        className={`px-3 py-1 rounded border ${
                                                            (
                                                                formData.note ||
                                                                ""
                                                            ).includes(
                                                                `${label}:${opt}`
                                                            )
                                                                ? "bg-primary text-white"
                                                                : "bg-gray-100 text-gray-700"
                                                        }`}
                                                        onClick={() =>
                                                            handleOptionSelect(
                                                                label,
                                                                opt
                                                            )
                                                        }
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                case "checkbox":
                                    return (
                                        <div key={i}>
                                            <label className="block mb-1 font-medium">
                                                {label}
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {options.map((opt, i) => (
                                                    <label
                                                        key={i}
                                                        className="flex items-center gap-1"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            value={opt}
                                                            onChange={() =>
                                                                handleCheckboxChange(
                                                                    label,
                                                                    opt
                                                                )
                                                            }
                                                        />
                                                        {opt}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                case "textarea":
                                    return (
                                        <div key={i}>
                                            <label className="block mb-1 font-medium">
                                                {label}
                                            </label>
                                            <textarea
                                                name="note"
                                                className="w-full border rounded px-3 py-2 focus:ring-primary focus:border-transparent focus:outline-none focus:ring-2 transition-all"
                                                rows={3}
                                                value={formData.note || ""} 
                                                onChange={(e) =>
                                                    handleChange(
                                                        "note",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        })}

                        {/* 數量 + 金額 */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">數量：</span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity((q) => Math.max(1, q - 1))
                                    }
                                    className="px-2 py-1 bg-gray-200 rounded"
                                >
                                    –
                                </button>
                                <span className="px-2">{quantity}</span>
                                <button
                                    type="button"
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="px-2 py-1 bg-gray-200 rounded"
                                >
                                    +
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="font-medium">
                                    {/* ERROR */}
                                    <div className="text-[12px] text-red-500 h-3 mt-2 mr-3 inline pb-1 ">
                                        {error.price}
                                    </div>
                                    單價：
                                </label>
                                <input
                                    type="number"
                                    className="w-24 border rounded px-2 py-1 focus:ring-primary focus:border-transparent focus:outline-none focus:ring-2 transition-all"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    min={0}
                                    required
                                />
                            </div>
                        </div>

                        <div className="text-right font-semibold text-lg mt-2 mr-2">
                            總金額：
                            <span className="text-green-600 ">
                                ${quantity * (parseInt(price) || 0)}
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded hover:bg-third transition"
                        >
                            送出訂單
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
