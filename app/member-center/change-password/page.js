"use client";
import React from "react";
import ChangePasswordForm from "./_components/change-password";

export default function ProfilePage() {
    

    return (
        <div className="sm:px-6 w-full">

            <div className="px-4 md:px-10 py-4 md:py-7">
                <div className="flex items-center justify-between mb-4">
                    <p
                        tabIndex={0}
                        className="focus:outline-none text-base sm:text-lg md:text-xl  font-bold leading-normal w-full"
                    >
                        變更密碼
                    </p>
                </div>
                <ChangePasswordForm />
            </div>
        </div>
    );
}
