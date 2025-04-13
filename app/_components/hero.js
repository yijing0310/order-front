"use client";

export default function Hero() {
    return (
        <>
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-12 sm:py-24 lg:py-36">
                    <div className="text-center">
                        <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
                            訂餐不再靠手算！
                        </h1>
                        <p className="my-6 text-base font-medium text-pretty text-gray-500 sm:text-lg/8">
                            團體訂餐太麻煩？How Order Are You 幫你一次解決！
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-button px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-highlight:outline-indigo-600"
                            >
                                開始訂餐
                            </a>
                            <a
                                href="#"
                                className="text-sm/6 font-semibold text-gray-900"
                            >
                                如何使用 <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    />
                </div>
            </div>
        </>
    );
}
