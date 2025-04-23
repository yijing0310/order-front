"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdFlower } from "react-icons/io";
import { TbEyeglass2, TbEyeglassFilled } from "react-icons/tb";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useJoin } from "@/context/join";
gsap.registerPlugin(ScrollTrigger);
export default function FeatureWithJoinForm() {
    const router = useRouter();

    const features = [
        {
            title: " ✅   自動彙整訂單",
            subtitle: "自動統計每個人的點餐項目與數量",
        },
        {
            title: " ✅   智慧分帳金額",
            subtitle: "自動計算每人應付金額，免去手動麻煩",
        },
        {
            title: " ✅   一鍵匯出明細",
            subtitle: "輕鬆複製、分享訂單給外送平台或團員",
        },
        {
            title: " ✅   手機也好操作",
            subtitle: "行動裝置友善介面，隨時揪團沒問題",
        },
    ];
    const { joinin } = useJoin();
    const [groupId, setGroupId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({ group_uuid: "", password: "" });
    const [isloading, setIsloading] = useState(false);

    const formRef = useRef(null);
    const featureRef = useRef(null);

    useEffect(() => {
        const featuresArray = featureRef.current.children;

        gsap.utils.toArray(featuresArray).forEach((feature, index) => {
            gsap.fromTo(
                feature,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: feature,
                        start: "top 80%",
                        toggleActions: "play none none reset",
                    },
                    delay: index * 0.2,
                }
            );
        });
        gsap.fromTo(
            formRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reset", // 每次滑入都能觸發
                },
            }
        );
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!groupId.length) {
            setError({ group_uuid: "請輸入揪團ID" });
            return;
        }
        const fetchJoinGroup = async () => {
            const r = await joinin(groupId, password);
            if (r.success == true) {
                setIsloading(true);
                router.push(`/group/${groupId}`);
                setIsloading(false);
                setGroupId("");
                setPassword("");
                setError("");
            } else {
                setError(r.error);
            }
        };
        fetchJoinGroup();
    };

    return (
        <section className="py-16 px-4 lg:px-20  min-h-screen flex justify-center items-center">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center justify-center">
                {/* 功能特色 */}
                <div ref={featureRef} className="w-full lg:w-1/2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white bg-third rounded-xl px-4 py-3 inline-flex items-center justify-center mb-8 w-full">
                        <IoMdFlower className="mr-2" /> 功能特色，一看就懂！{" "}
                        <IoMdFlower className="ml-2" />
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="bg-white shadow rounded-md p-4"
                            >
                                <h4 className="font-semibold text-lg">
                                    {f.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    {f.subtitle}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 進入揪團表單 */}
                <div
                    ref={formRef}
                    className="bg-white p-8 rounded-xl shadow-xl w-full lg:w-[400px]"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        進入揪團！
                    </h2>
                    <form onSubmit={onSubmit} className="space-y-4">
                        {/* 揪團ID欄位 */}
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="ID"
                                className="mb-2 text-sm font-medium text-gray-700"
                            >
                                揪團ID *{/* ERROR */}
                                <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                                    {error.group_uuid ? error.group_uuid : ""}
                                </div>
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
                                <div className="text-[12px] text-red-500 h-3 mt-2 ml-3 inline pb-1 ">
                                    {error.password ? error.password : ""}
                                </div>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="請輸入揪團密碼(如有才需填寫)"
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
                            {isloading ? "請稍後..." : "進入揪團"}
                        </button>
                    </form>
                    <p className="text-sm text-center text-gray-600 mt-4">
                        想創建屬於自己的團嗎？{" "}
                        <Link
                            href="/login"
                            className="text-primary hover:underline"
                        >
                            登入後立即開團！
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
