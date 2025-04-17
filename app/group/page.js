"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateGroupWelcomePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-6">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                <h2 className="text-3xl font-bold mb-4 text-gray-800 py-6"> 歡迎揪團一起來點餐！</h2>
                <p className="text-gray-600 mb-6 py-3">
                    想點什麼？建立一個新揪團，<br/>邀請大家一起訂購美食或飲料吧 🍜🥤
                </p>

                <div className="flex  gap-4 justify-center">
                    <button
                        onClick={() => router.push("/member-center/add-group")}
                        className="border border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded transition"
                    >
                        開始開團
                    </button>
                    <button
                        onClick={() => router.push("/member-center")}
                        className="border border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded transition"
                    >
                        查看我的揪團
                    </button>
                    <button
                        onClick={() => router.push("/join-group")}
                        className="border border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded transition"
                    >
                        進入點餐
                    </button>
                </div>
            </div>
        </div>
    );
}
