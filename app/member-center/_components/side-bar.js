"use client";
import React, { forwardRef } from "react";
import { IoMdReorder } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useAuth } from "@/context/auth.js";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SideBar = forwardRef(function SideBar({ toggleSidebar }, ref) {
    const { auth, logout } = useAuth();
    const router = useRouter();
    return (
        <>
            {/* Sidebar：電腦固定、手機滑動 */}
            <aside
                id="logo-sidebar"
                className="fixed  top-0 left-0 z-40 lg:w-2/12  lg:h-screen h-screen lg:translate-x-0 px-3 py-4 flex flex-col items-center"
                aria-label="Sidebar"
                ref={ref}
                style={{ transform: "translateX(0px)" }}
            >
                <div className="bg-side m-4 flex flex-col items-center justify-between px-4 py-6 w-full h-full rounded-md shadow-md mt-10 lg:mt-0">
                    {/* 上半部 */}
                    <div className="w-full">
                        {/* 使用者歡迎區塊 */}
                        <Link
                            href="/"
                            className="flex flex-col items-center gap-2 text-white font-bold"
                            onClick={() => {
                                if (window.innerWidth < 1024) {
                                    toggleSidebar();
                                }
                            }}
                        >
                            <p className="text-sm opacity-70">WELCOME!</p>
                            <p className="text-lg">{auth.name}</p>
                        </Link>

                        {/* 選單列表 */}
                        <ul className="mt-8 w-full flex flex-col gap-2 md:min-h-80">
                            <li className="w-full text-right pr-4 py-2 rounded-md font-semibold text-white hover:bg-third hover:text-white transition  cursor-pointer">
                                <Link
                                    href="/member-center "
                                    className="flex items-center justify-center"
                                    onClick={() => {
                                        if (window.innerWidth < 1024) {
                                            toggleSidebar();
                                        }
                                    }}
                                >
                                    <IoMdReorder /> &nbsp;&nbsp;我的揪團
                                </Link>
                            </li>
                            <li className="w-full text-right pr-4 py-2 rounded-md font-semibold text-white hover:bg-third hover:text-white transition  cursor-pointer">
                                <Link
                                    href="/member-center/add-group "
                                    className="flex items-center justify-center"
                                    onClick={() => {
                                        if (window.innerWidth < 1024) {
                                            toggleSidebar();
                                        }
                                    }}
                                >
                                    <FaPlus /> &nbsp;&nbsp;新增揪團
                                </Link>
                            </li>
                            <li className="w-full text-right pr-4 py-2 rounded-md font-semibold text-white hover:bg-third hover:text-white transition  cursor-pointer">
                                <Link
                                    href="/member-center/add-group "
                                    className="flex items-center justify-center"
                                    onClick={() => {
                                        if (window.innerWidth < 1024) {
                                            toggleSidebar();
                                        }
                                    }}
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
                            onClick={() => {
                                if (window.innerWidth < 1024) {
                                    toggleSidebar();
                                }
                            }}
                        >
                            <FaHome size={18} />
                        </Link>

                        <div
                            onClick={() => {
                                logout;
                                if (window.innerWidth < 1024) {
                                    toggleSidebar();
                                }
                                router.push("/");
                            }}
                            className="flex items-center justify-center w-10 h-10 bg-lightSec  rounded-full hover:scale-110 transition duration-200 cursor-pointer"
                        >
                            <MdLogout size={18} />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
});
export default SideBar;
