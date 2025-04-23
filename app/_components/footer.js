"use client";
import Link from "next/link";
export default function Footer() {
    return (
        <>
         <footer className="bg-third text-white py-10 px-4 mt-20">
  <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
    {/* Logo + 標語 */}
    <div>
      <h2 className="text-2xl font-bold tracking-widest">HOW ORDER ARE YOU ! 點餐小幫手 </h2>
      <p className="text-sm mt-2 text-white/80">
        一起點餐．一起分帳．不再混亂 🍽️
      </p>
    </div>

    {/* 導覽連結 */}
    <div className="flex flex-wrap justify-center gap-6 text-sm text-white/90">
      <Link href="/register" className="hover:underline">加入揪團</Link>
      <Link href="/join-group" className="hover:underline">開始點餐</Link>
      <Link href="#" className="hover:underline">使用說明</Link>
    </div>

    {/* 底部版權區 */}
    <div className="text-xs text-white/60 mt-4 border-t border-white/20 pt-4 w-full">
      © {new Date().getFullYear()}  HOW ORDER ARE YOU. 點餐小幫手
    </div>
  </div>
</footer>

        </>
    );
}
