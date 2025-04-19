"use client";
import { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TbEyeglass2, TbEyeglassFilled } from "react-icons/tb";
import { JOIN_GROUP_POST } from "@/config/api-path";
import Loader from "@/app/_components/loader";
export default function EnterGroup() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [groupId, setGroupId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isloading, setIsloading] = useState(false);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const groupIdFromUrl = params.get("group_id");
        if (groupIdFromUrl) {
            setGroupId(groupIdFromUrl);
        }
    }, []);
    const onSubmit = (e) => {
        e.preventDefault();
        if (!groupId.length) {
            setError({ group_uuid: "請輸入揪團ID" });
            return;
        }
        const fetchJoinGroup = async () => {
            const res = await fetch(JOIN_GROUP_POST, {
                method: "POST",
                body: JSON.stringify({
                    group_uuid: groupId,
                    password: password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                setError("連接資料錯誤");
            }
            const r = await res.json();
            setError(r.error);
            if (r.success == true) {
                setIsloading(true);
                router.push(`/group/${groupId}`);
                setIsloading(false);
                setGroupId("");
                setPassword("");
            }
        };
        fetchJoinGroup();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            {isloading ? (
                <Loader></Loader>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        開始點餐 !
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
                            進入揪團
                        </button>
                    </form>
                    <div className="text-sm text-center text-gray-600 mt-5">
                        想創建屬於自己的團嗎？{" "}
                        <Link
                            href="/login"
                            className="text-primary hover:underline"
                        >
                            登入後立即開團!
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
