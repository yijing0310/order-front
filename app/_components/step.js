"use client";
export default function Step() {
    const features = [
        {
            title: "📌 Step 1",
            subtitle: "建立訂單",
        },
        {
            title: "🧑‍🤝‍🧑 Step 2",
            subtitle: "邀請夥伴填單",
        },
        {
            title: "🎉 Step 3",
            subtitle: "自動統計分帳，搞定！",
        },
    ];
    return (
        <>
            <section className="relative isolate px-6 py-14 lg:px-8 text-center  flex flex-col items-center justify-center text-font ">
                <h3 className="text-2xl font-semibold tracking-tight text-balance  sm:text-2xl my-8">
                簡單三步驟，就能完成訂餐！
                </h3>
                {/* feature */}
                <div class="flex  flex-wrap sm:flex-nowrap  items-center justify-center gap-6 w-4/5 mx-auto">
                        {features.map((feature, i) => {
                            return (
                                <div key={i} className="border-4 border-third rounded-lg p-4 bg-white w-64 h-26 flex flex-col items-center justify-center">
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
