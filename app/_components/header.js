"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/auth.js";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";

import Link from "next/link";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { auth, logout } = useAuth();
    const pathname = usePathname();
    const hiddenPaths = ["/member-center", "/login", "/register", "/group"];
    const shouldHide = hiddenPaths.some((path) => pathname.startsWith(path));

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
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12"></div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {auth.id ? (
                            <>
                                <Link
                                    href="/member-center"
                                    className="text-sm/6 font-semibold mr-4 text-gray-500"
                                >
                                    H i ! {auth.name}
                                </Link>
                                <div
                                    className="text-sm/6 font-semibold cursor-pointer hover:text-primary "
                                    onClick={logout}
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
                <Dialog
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                    className="lg:hidden"
                >
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon
                                    aria-hidden="true"
                                    className="size-6"
                                />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="py-6">
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
        </>
    );
}
