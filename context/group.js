"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import {
    ORDER_LIST_GET,
    ORDER_TEMPLATE_GET,
    ORDER_DETAIL_GET,
    PROFILE_GET,
} from "@/config/api-path";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/auth";
import { useJoin } from "@/context/join";

const GroupContext = createContext();

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
    const router = useRouter();
    const { group_uuid } = useParams();
    
    const { auth, getAuthHeader } = useAuth();
    const { join, getJoinHeader } = useJoin();

    const [name, setName] = useState("");
    const [listData, setListData] = useState([]);
    const [templateData, setTemplateData] = useState([]);
    const [announcement, setAnnouncement] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(false);

    const [filterStatus, setFilterStatus] = useState("all");
    const [isSearch, setIsSearch] = useState("");
    const [sorting, setSorting] = useState("");


    useEffect(() => {
        if (
            !join ||
            !join.token ||
            error === "無授權訪問此揪團" ||
            error === "未授權，無法獲取信息"
        ) {
            router.replace("/join-group");
        }
    }, [join, error]);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!auth) return;
            try {
                const r = await fetch(PROFILE_GET, {
                    headers: { ...getAuthHeader() },
                });
                const result = await r.json();
                setError(result.error);
                if (result && !result.error) {
                    setName(result.result.name);
                }
            } catch (err) {
                setError("發送請求時發生錯誤:", err.message);
            }
        };
        fetchProfileData();
    }, [auth]);

    useEffect(() => {
        // 取得訂餐模板
        const getTemplate = async () => {
            try {
                const res = await fetch(
                    `${ORDER_TEMPLATE_GET}?group_uuid=${group_uuid}`,
                    {
                        headers: { ...getJoinHeader() },
                    }
                );
                console.log(data);
                
                const data = await res.json();
                setTemplateData(data?.data || []);
            } catch (err) {
                setError("訂餐模板發送請求時發生錯誤:", err.message);
            }
        };
        getTemplate();
    }, [group_uuid, join]);

    useEffect(() => {
        // 取得揪團詳細資訊
        const getGroupDetail = async () => {
            try {
                const res = await fetch(
                    `${ORDER_DETAIL_GET}?group_uuid=${group_uuid}`,
                    {
                        headers: { ...getJoinHeader() },
                    }
                );
                if (!res.ok) {
                    throw new Error("連接揪團資訊失敗");
                }
                const data = await res.json();
                setError(data.error);
                if (data?.success) {
                    setAnnouncement(data?.data);
                    setIsLoading(false);
                    if (data.data.status === "closed") setIsEnd(true);
                } else if (data.error === "查無此揪團") {
                    router.push("/join-group");
                }
            } catch (err) {
                setError("連接揪團資訊時發生錯誤:", err.message);
            }
        };
        // 取得訂餐列表
        const getOrderList = async () => {
            try {
                const res = await fetch(
                    `${ORDER_LIST_GET}?group_uuid=${group_uuid}`,
                    {
                        headers: { ...getJoinHeader() },
                    }
                );
                if (!res.ok) {
                    throw new Error("取得訂餐列表請求失敗");
                }
                const data = await res.json();
                setListData(data);
            } catch (err) {
                setError("取得訂餐列表失敗:", err.message);
            }
        };

        getGroupDetail();
        getOrderList();
    }, [group_uuid, refresh,join]);

    const filteredList = listData?.data
        ?.filter((item) => {
            if (filterStatus === "all") return true;
            return item.status === filterStatus;
        })
        ?.filter((item) => {
            const keyword = isSearch.toLowerCase();
            return (
                item.name?.toLowerCase().includes(keyword) ||
                item.item_name?.toLowerCase().includes(keyword)
            );
        })
        ?.sort((a, b) => {
            switch (sorting) {
                case "品項名稱":
                    return a.item_name.localeCompare(b.item_name, "zh-Hant", {
                        sensitivity: "base", // 忽略大小寫與重音符號
                        numeric: true, // 數值大小來排序含數字的字串
                    });
                case "訂購人姓名":
                    return a.name.localeCompare(b.name, "zh-Hant", {
                        sensitivity: "base",
                        numeric: true,
                    });
                case "最高金額":
                    return b.price - a.price;
                case "最低金額":
                    return a.price - b.price;
                default:
                    return 0;// 預設不排序
            }
        });
    // 獲取總額總數量
    const getTotalSummary = (data) => {
        if (!data || !Array.isArray(data))
            return { totalQty: 0, totalPrice: 0 };
        return data.reduce(
            (acc, pre) => {
                acc.totalQty += pre.quantity;
                acc.totalPrice += pre.quantity * pre.price;
                if (pre.status === "Paid") acc.paid += pre.quantity * pre.price;
                else acc.unpaid += pre.quantity * pre.price;
                return acc;
            },
            { totalQty: 0, totalPrice: 0, paid: 0, unpaid: 0 }
        );
    };

    const summary = getTotalSummary(listData?.data);

    return (
        <GroupContext.Provider
            value={{
                name,
                listData,
                filteredList,
                templateData,
                filterStatus,
                setFilterStatus,
                setSorting,
                sorting,
                setIsSearch,
                setRefresh,
                refresh,
                isEnd,
                announcement,
                summary,
                isLoading,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
};
