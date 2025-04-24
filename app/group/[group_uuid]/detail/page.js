"use client";
import React, { useRef, useState } from "react";
import Announcement from "../_components/announcement";
import { useGroup } from "@/context/group.js";
import DownloadButton from "../_components/download";
import ShareButton from "../_components/share";
import Search from "../_components/search";
import Sort from "../_components/sort";
import GroupDetailSelect from "./_components/select";
import GroupDetailTable from "./_components/table";
import GroupDetailTableByItem from "./_components/tableOrder";
import Total from "../_components/total";
import Loader from "@/app/_components/loader";
export default function GroupDetailPage() {
    const {
        announcement,
        setIsSearch,
        setSorting,
        group_uuid,
        isLoading,
        error,
    } = useGroup();
    const [orderBy, setOrderBy] = useState("person");
    const [isDowload, setIsDowload] = useState(false);

    return (
        <>
            {isLoading ? (
                <div className="text-center mt-10">
                    <Loader />
                </div>
            ) : error === "查無此揪團" ? (
                <div className="sm:px-6 w-full ">沒有資料</div>
            ) : (
                <>
                    <Announcement announcement={announcement} />

                    <div className="px-4 md:px-8 py-4 md:py-3 ">
                        <div className="flex flex-col md:flex-row  items-end md:items-center justify-end">
                            <div className="flex items-center justify-end -order-first md:order-1 mt-3 md:mt-0 w-4/5 md:w-2/5">
                                <Search onSearch={setIsSearch} />
                            </div>
                            <div className="flex items-center justify-end -order-last md:order-1">
                                <Sort setSorting={setSorting} />
                                <DownloadButton
                                    onClick={() => {
                                        setIsDowload(true);
                                    }}
                                />
                                <ShareButton group_uuid={group_uuid} />
                            </div>
                        </div>
                    </div>
                    <Total />
                    <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 mb-6">
                        <GroupDetailSelect
                            setOrderBy={setOrderBy}
                            orderBy={orderBy}
                        />
                        <div className="mt-7" >
                            {orderBy === "item" ? (
                                <GroupDetailTableByItem
                                    isDowload={isDowload}
                                    setIsDowload={setIsDowload}
                                />
                            ) : (
                                <GroupDetailTable
                                    isDowload={isDowload}
                                    setIsDowload={setIsDowload}
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
