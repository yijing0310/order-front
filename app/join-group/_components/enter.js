"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TbEyeglass2, TbEyeglassFilled } from "react-icons/tb";

export default function EnterGroup() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [groupId, setGroupId] = useState("");
    const [password, setPassword] = useState("");

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
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}
                            maxLength={10}
                        />
                    </div>
                    {/* 揪團密碼欄位 */}
                    <div className="flex flex-col relative">
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
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="請輸入揪團密碼"
                            className="h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength={10}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[40px] text-sm text-gray-500 hover:text-gray-800"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <TbEyeglass2 />
                            ) : (
                                <TbEyeglassFilled />
                            )}
                        </button>
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
