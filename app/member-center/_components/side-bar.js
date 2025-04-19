"use client";
import React from "react";
import { IoMdReorder } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useAuth } from "@/context/auth.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SideBar() {
    const { auth, logout } = useAuth();
    const router = useRouter()
    return (
        <aside
            id="logo-sidebar"
            className="fixed  top-0 left-0 z-40 w-2/12 h-screen transition-transform -translate-x-full sm:translate-x-0 px-3 py-4 flex flex-col items-center"
            aria-label="Sidebar"
        >
            <div className="bg-side m-4 flex flex-col items-center justify-between px-4 py-6 w-full h-full rounded-md shadow-md ">
                {/* 上半部 */}
                <div className="w-full">
                    {/* 使用者歡迎區塊 */}
                    <Link
                        href="/"
                        className="flex flex-col items-center gap-2 text-white font-bold"
                    >
                        <p className="text-sm opacity-70">WELCOME!</p>
                        <p className="text-lg">{auth.name}</p>
                    </Link>

                    {/* 選單列表 */}
                    <ul className="mt-8 w-full flex flex-col gap-2 min-h-80">
                        <li className="w-full text-right pr-4 py-2 rounded-md font-semibold text-white hover:bg-third hover:text-white transition  cursor-pointer">
                            <Link
                                href="/member-center "
                                className="flex items-center justify-center"
                            >
                                <IoMdReorder /> &nbsp;&nbsp;我的揪團
                            </Link>
                        </li>
                        <li className="w-full text-right pr-4 py-2 rounded-md font-semibold text-white hover:bg-third hover:text-white transition  cursor-pointer">
                            <Link
                                href="/member-center/add-group "
                                className="flex items-center justify-center"
                            >
                                <FaPlus /> &nbsp;&nbsp;新增揪團
                            </Link>
                        </li>
                        <li className="w-full text-right pr-4 py-2 rounded-md font-semibold text-white hover:bg-third hover:text-white transition  cursor-pointer">
                            <Link
                                href="/member-center/add-group "
                                className="flex items-center justify-center"
                            >
                                <IoSettingsOutline /> &nbsp;&nbsp;我的資料
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* 功能區 */}
                <div className="flex gap-4">
                    <Link
                        href="/"
                        className="flex items-center justify-center w-10 h-10 bg-lightSec  rounded-full hover:scale-110 transition duration-200"
                    >
                        <FaHome size={18} />
                    </Link>

                    <div
                        onClick={logout}
                        className="flex items-center justify-center w-10 h-10 bg-lightSec  rounded-full hover:scale-110 transition duration-200 cursor-pointer"
                    >
                        <MdLogout size={18} onClick={() => {router.push("/")}}/>
                    </div>
                </div>
            </div>
        </aside>
    );
}
