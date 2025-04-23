"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth.js";
import { usePathname,useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { PROFILE_GET } from "@/config/api-path";

import Link from "next/link";

export default function Header() {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const { auth, logout,getAuthHeader } = useAuth();
    const router = useRouter() 
    const pathname = usePathname();
    const hiddenPaths = ["/member-center", "/login", "/register", "/group"];
    const shouldHide = hiddenPaths.some((path) => pathname.startsWith(path));
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
    if (shouldHide) return null;
    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50">
                <nav
                    aria-label="Global"
                    className="flex items-center justify-between p-5 lg:px-8"
                >
                    <div className="flex lg:flex-1">
                        {pathname.startsWith("/join-group") ? (
                            <Link
                                href="/"
                                className="w-[90px] flex items-center text-sm hover:text-primary"
                            >
                                <FaHome /> &nbsp;&nbsp;{" "}
                                <span className="mt-1">回到首頁</span>
                            </Link>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex gap-x-12"></div>
                    <div className="flex flex-1 justify-end">
                        {auth.id ? (
                            <>
                                <Link
                                    href="/member-center"
                                    className="text-sm/6 font-semibold mr-4 text-gray-500"
                                >
                                    H i ! {name}
                                </Link>
                                <div
                                    className="text-sm/6 font-semibold cursor-pointer hover:text-primary "
                                    onClick={()=>{
                                        logout()
                                        router.push("/")
                                    }}
                                >
                                    {" "}
                                    登出{" "}
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="text-sm/6 font-semibold "
                            >
                                Log in <span aria-hidden="true">&rarr;</span>
                            </Link>
                        )}
                    </div>
                </nav>
                
            </header>
        </>
    );
}
