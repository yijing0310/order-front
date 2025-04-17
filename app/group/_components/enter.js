"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnterGroup() {
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 模擬驗證流程（可改成 API）
        if (password === "1234") {
            router.push("/group-form"); // 導向填寫畫面
        } else {
            alert("密碼錯誤，請再試一次");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    開始點餐 !
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 揪團ID欄位 */}
                    <div className="flex flex-col mb-3">
                        <label
                            htmlFor="ID"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            揪團ID
                            {/* ERROR */}
                            {/* <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                            
                        </div> */}
                        </label>
                        <input
                            type="text"
                            id="ID"
                            name="ID"
                            placeholder="請輸入揪團ID"
                            className="h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            // value={registerForm.name}
                            // onChange={}
                            maxLength={10}
                        />
                    </div>
                    {/* 揪團密碼欄位 */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="password"
                            className="mb-2 text-sm font-medium text-gray-700"
                        >
                            揪團密碼
                            {/* ERROR */}
                            {/* <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                            
                        </div> */}
                        </label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            placeholder="請輸入揪團密碼"
                            className="h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            // value={registerForm.name}
                            // onChange={}
                            maxLength={10}
                        />
                    </div>

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
