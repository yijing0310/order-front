"use client";
import moment from "moment";
export default function Table({ filteredList = [] }) {
    return (
        <>
            <div className="w-full overflow-x-auto">
                {/* 表頭 */}
                <div className="hidden md:flex bg-gray-100 font-medium text-sm border-y border-gray-200 py-3 min-w-[800px]">
                    <div className="w-[5%] px-2">#</div>
                    <div className="w-[20%] px-3">項目</div>
                    <div className="w-[10%] px-3">金額</div>
                    <div className="w-[10%] px-3">數量</div>
                    <div className="w-[15%] px-3">訂購人</div>
                    <div className="w-[10%] px-3">總額</div>
                    <div className="w-[10%] pl-5">狀態</div>
                    <div className="w-[15%] pl-4">備註</div>
                </div>
                {/* 內容 */}
                <div className="max-h-[400px] overflow-y-auto min-w-[800px]">
                    <div
                        tabIndex={0}
                        className="flex flex-col md:flex-row items-start md:items-center text-sm border-b border-gray-100 py-4 hover:bg-gray-50 min-w-[800px]"
                    >
                        <div className="w-full md:w-[5%] px-2">
                            <span className="md:hidden text-gray-500 font-medium">
                                #{" "}
                            </span>
                            1
                        </div>
                        <div className="w-full md:w-[20%] px-3">
                            <span className="md:hidden text-gray-500 font-medium">
                                項目：
                            </span>
                            波霸奶茶
                        </div>
                        <div className="w-full md:w-[10%] px-3">
                            <span className="md:hidden text-gray-500 font-medium">
                                金額：
                            </span>
                            40
                        </div>
                        <div className="w-full md:w-[10%] px-3">
                            <span className="md:hidden text-gray-500 font-medium">
                                數量：
                            </span>
                            1
                        </div>
                        <div className="w-full md:w-[15%] px-3">
                            <span className="md:hidden text-gray-500 font-medium">
                                訂購人：
                            </span>
                            小禎
                        </div>
                        <div className="w-full md:w-[10%] px-3">
                            <span className="md:hidden text-gray-500 font-medium">
                                總額：
                            </span>
                            40
                        </div>
                        <div className="w-full md:w-[10%] pl-5 mt-2 md:mt-0">
                            <span className="py-1 px-2 text-xs text-red-700 bg-red-100 rounded">
                                未付款
                            </span>
                        </div>
                        <div className="w-full md:w-[15%] pl-4 mt-2 md:mt-0">
                            <span className="md:hidden text-gray-500 font-medium">
                                備註：
                            </span>
                            半糖少冰
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
