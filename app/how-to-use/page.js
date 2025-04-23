"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaLink, FaUtensils, FaFileAlt } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { MdLogin, MdOutlinePrint } from "react-icons/md";
export default function HowToUsePage() {
    const ownerSteps = [
        {
            icon: <MdLogin />,
            title: "登入帳號",
            desc: "使用你的帳號登入平台。",
        },
        {
            icon: <FaUserPlus />,
            title: "創建揪團",
            desc: "設定點餐資訊，快速建立團單。",
        },
        {
            icon: <FaLink />,
            title: "分享連結",
            desc: "複製連結給夥伴們加入點餐。",
        },
        {
            icon: <FaUtensils />,
            title: "開始點餐",
            desc: "查看明細、管理訂單內容。",
        },
        {
            icon: <MdOutlinePrint />,
            title: "列印統計表",
            desc: "快速輸出表格，便於分帳與配送。",
        },
    ];

    const memberSteps = [
        {
            icon: <FaUtensils />,
            title: "進入點餐頁面",
            desc: "打開揪團連結，準備選餐。",
        },
        {
            icon: <BsPeopleFill />,
            title: "輸入群組ID與密碼",
            desc: "加入正確的點餐團隊。",
        },
        {
            icon: <FaUtensils />,
            title: "開始點餐",
            desc: "選擇你的品項，提交訂單！",
        },
    ];

    const cardVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2 },
        }),
    };

    return (
        <section className="min-h-screen px-6 py-20  text-gray-800">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-14 ">
                    使用說明
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* 團主區塊 */}
                    <div className="bg-third/5 rounded-2xl p-8 shadow-md border border-third/20">
                        <h3 className="text-2xl font-semibold  mb-6 text-left">
                            🧑‍💼 成為團主
                        </h3>
                        <div className="space-y-5">
                            {ownerSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={cardVariant}
                                >
                                    <div className="bg-third text-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow">
                                        {step.icon}
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-semibold text-lg mb-1">
                                            {step.title}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* 點餐者區塊 */}
                    <div className="bg-third/5 rounded-2xl p-8 shadow-md border border-third/20">
                        <h3 className="text-2xl font-semibold  mb-6 text-left">
                            🍱 我要點餐
                        </h3>
                        <div className="space-y-5">
                            {memberSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={cardVariant}
                                >
                                    <div className="bg-third text-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow">
                                        {step.icon}
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-semibold text-lg mb-1">
                                            {step.title}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
