"use client";
import React, { useState } from "react";
import { RiDrinks2Fill } from "react-icons/ri";
export default function OrderModal({ isOpen, onClose, templateFields }) {
    const [formData, setFormData] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);

    if (!isOpen) return null;
    const handleClear = () => {
        setFormData({});
        setQuantity(1);
        setPrice("");
    };
    const handleChange = (label, value) => {
        setFormData((prev) => ({ ...prev, [label]: value }));
    };

    const handleOptionSelect = (label, value) => {
        setFormData((prev) => ({ ...prev, [label]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const total = quantity * (parseInt(price) || 0);
        const finalData = {
            ...formData,
            quantity,
            price: parseInt(price),
            total,
        };
        console.log("送出訂單：", finalData);
        alert("訂購成功！");
        onClose();
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
                    <RiDrinks2Fill/>&nbsp;飲料訂購單
                    <span
                        className="ml-3 px-2 text-xs text-gray-700 cursor-pointer font-light"
                        onClick={handleClear}
                    >
                        清除資料
                    </span>
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {templateFields.map((field, i) => {
                        const { label, type, options = [] } = field;

                        switch (type) {
                            case "text":
                                return (
                                    <div key={i}>
                                        <label className="block mb-1 font-medium">
                                            {label}
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border rounded px-3 py-2"
                                            onChange={(e) =>
                                                handleChange(
                                                    label,
                                                    e.target.value
                                                )
                                            }
                                            required={field.required}
                                        />
                                    </div>
                                );
                            case "radio":
                                return (
                                    <div key={i}>
                                        <label className="block mb-1 font-medium">
                                            {label}
                                        </label>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {options.map((opt, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    className={`px-3 py-1 rounded border ${
                                                        formData[label] === opt
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
                                            className="w-full border rounded px-3 py-2"
                                            rows={3}
                                            onChange={(e) =>
                                                handleChange(
                                                    label,
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
                            <label className="font-medium">單價：</label>
                            <input
                                type="number"
                                className="w-24 border rounded px-2 py-1"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                min={0}
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
            </div>
        </div>
    );
}
