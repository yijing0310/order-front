"use client";
import React, { useEffect, useState } from "react";
import ProfileForm from "./_components/profile-form";
import { PROFILE_GET } from "@/config/api-path";
import { useAuth } from "@/context/auth.js";

export default function ProfilePage() {
    const [data, setData] = useState({
        name: "",
        email: "",
        account: "",
    });
    const { auth, getAuthHeader } = useAuth();
    const [error, setError] = useState("");
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
                    setData(result.result);
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
        <div className="sm:px-6 w-full">
            <div className="px-4 md:px-10 py-4 md:py-7">
                <ProfileForm data={data} />
            </div>
        </div>
    );
}
