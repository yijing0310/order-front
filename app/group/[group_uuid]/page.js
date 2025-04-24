"use client";
import React, { useRef, useState } from "react";
import { useParams } from "next/navigation";
import OrderSelect from "./_components/select";
import GroupTable from "./_components/table";
import Announcement from "./_components/announcement";
import Total from "./_components/total";
import DownloadButton from "./_components/download";
import ShareButton from "./_components/share";
import Search from "./_components/search";
import Sort from "./_components/sort";
import { useGroup } from "@/context/group.js";
import Loader from "@/app/_components/loader";
export default function GroupListPage() {
    const { isLoading, error, setIsSearch, setSorting, announcement, isCheck } =
        useGroup();
    const { group_uuid } = useParams();
    const [isDowload, setIsDowload] = useState(false);

    if (isLoading || !isCheck) {
        return (
            <div className="text-center mt-10">
                <Loader />
            </div>
        );
    }
    if (error === "查無此揪團") {
        return (
            <div className="sm:px-6 w-full text-center text-red-500 mt-10">
                找不到這個揪團，請確認連結是否正確。
            </div>
        );
    }
    return (
        <>
            <Announcement announcement={announcement} />

            <div className="px-4 md:px-8 py-4 md:py-3">
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
                <OrderSelect />
                <div className="mt-7">
                    <GroupTable isDowload={isDowload} setIsDowload={setIsDowload}/>
                </div>
            </div>
        </>
    );
}
