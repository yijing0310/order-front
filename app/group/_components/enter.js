'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EnterGroup() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 模擬驗證流程（可改成 API）
        if (password === '1234') {
            router.push('/group-form'); // 導向填寫畫面
        } else {
            alert('密碼錯誤，請再試一次');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">輸入揪團密碼</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="請輸入密碼"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-third transition"
                    >
                        進入揪團
                    </button>
                </form>
            </div>
        </div>
    );
}
