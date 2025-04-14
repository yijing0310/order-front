"use client";
export default function Feature() {
    const features = [
        {
            title: "📋 自動彙整訂單",
            subtitle: "自動統計每個人的點餐項目與數量",
        },
        {
            title: "🧮 智慧分帳金額",
            subtitle: "自動計算每人應付金額，免去手動麻煩",
        },
        {
            title: "📄 一鍵匯出明細",
            subtitle: "輕鬆複製、分享訂單給外送平台或團員",
        },
        {
            title: "📱 手機也好操作",
            subtitle: "行動裝置友善介面，隨時揪團沒問題",
        },
    ];
    return (
        <>
            <section className="relative isolate px-6 py-14 lg:px-8 text-center  flex flex-col items-center justify-center text-font">
                <h3 className="text-2xl font-semibold tracking-tight text-balance  sm:text-2xl my-8">
                    功能特色，一看就懂！
                </h3>
                {/* feature */}
                <div class="flex  flex-wrap sm:flex-nowrap  items-center justify-center gap-6 w-4/5 mx-auto">
                        {features.map((feature, i) => {
                            return (
                                <div className="border-4 border-third rounded-lg p-4 bg-white w-64 h-32 flex flex-col items-center justify-center">
                                    <h3 className="my-2 font-semibold text-lg">{feature.title}</h3>
                                    <p className="text-sm">{feature.subtitle}</p>
                                </div>
                            );
                        })}
                    </div>
            </section>
        </>
    );
}
