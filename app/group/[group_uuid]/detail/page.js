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
    // 下載內容
    const pdfRef = useRef();

    const handleDownload = async () => {
        const html2pdf = (await import("html2pdf.js")).default;
        const element = pdfRef.current;
        const opt = {
            margin: 0.4,
            filename: `${announcement.title}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().set(opt).from(element).save();
    };
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
                                <DownloadButton onClick={handleDownload} />
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
                        <div className="mt-7" ref={pdfRef}>
                            {orderBy === "item" ? (
                                <GroupDetailTableByItem />
                            ) : (
                                <GroupDetailTable />
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
