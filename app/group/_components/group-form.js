'use client'
import { useState } from 'react';

export default function GroupForm() {
    const [formData, setFormData] = useState({
        name: '',
        item: '',
        quantity: 1,
        note: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('送出訂單:', formData);
        alert('訂單送出成功！');
        // 可加上 API 提交
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
                <h2 className="text-2xl font-semibold mb-6 text-center">填寫你的訂單</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* 姓名 */}
                    <div>
                        <label className="block mb-1 font-medium">姓名</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:outline-none"
                        />
                    </div>

                    {/* 品項 */}
                    <div>
                        <label className="block mb-1 font-medium">餐點名稱</label>
                        <input
                            type="text"
                            name="item"
                            value={formData.item}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:outline-none"
                        />
                    </div>

                    {/* 數量 */}
                    <div>
                        <label className="block mb-1 font-medium">數量</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="1"
                            className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:outline-none"
                        />
                    </div>

                    {/* 備註 */}
                    <div>
                        <label className="block mb-1 font-medium">備註</label>
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:outline-none"
                        />
                    </div>

                    {/* 提交按鈕 */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-third transition"
                    >
                        提交訂單
                    </button>
                </form>
            </div>
        </div>
    );
}
