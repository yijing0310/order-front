"use client";
import React, { useState, useEffect } from "react";
import { PROFILE_GET } from "@/config/api-path";
import Link from "next/link";
import { useAuth } from "@/context/auth.js";
import { FaHome } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
export default function GroupHeader() {
    const { auth, logout, getAuthHeader } = useAuth();
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    useEffect(() => {
        const fetchProfileData = async () => {
            if (!auth) return;
            try {
                const r = await fetch(PROFILE_GET, {
                    headers: { ...getAuthHeader() },
                });
                if (!r.ok) {
                    throw new Error("fail to fetch profile");
                }
                const result = await r.json();
                setError(result.error);
                if (result && !result.error) {
                    setName(result.result.name);
                } else {
                    setError(result.error || "取得資料失敗");
                }
            } catch (err) {
                setError("發送請求時發生錯誤:", error);
            }
        };
        fetchProfileData();
    }, [auth]);
    return (
        <>
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="w-[90px] flex items-center text-sm mt-2 hover:text-primary"
                    >
                        <FaHome /> &nbsp;&nbsp;{" "}
                        <span className="mt-2 ">回到首頁</span>
                    </Link>

                    <Link
                        href="/join-group"
                        className="w-[120px] flex items-center text-sm mt-2 hover:text-primary"
                    >
                        <MdOutlineRestaurantMenu /> &nbsp;&nbsp;{" "}
                        <span className="mt-2">其他揪團點餐</span>
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end  mt-2">
                    {auth.id ? (
                        <>
                            <Link
                                href="/member-center"
                                className="text-sm font-semibold mr-4 mt-2 text-gray-700"
                            >
                                H i ! {name}
                            </Link>
                            <div
                                className="text-sm  cursor-pointer hover:text-primary mt-2"
                                onClick={logout}
                            >
                                {" "}
                                登出{" "}
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
}
