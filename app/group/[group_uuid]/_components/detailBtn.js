"use client";
import React from "react";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import { MdGroups } from "react-icons/md";
import { FaTable } from "react-icons/fa";
const DetailBtn = () => {
    const pathname = usePathname();
    const router = useRouter();
    const handleLink = () => {
        if (pathname.endsWith("detail")) {
            const newPath = pathname.replace(/\/detail$/, "");
            router.push(newPath);
        } else {
            router.push(`${pathname}/detail`);
        }
    };
    return (
        <StyledWrapper>
            <div className="fixed right-4 bottom-5">
                <button className="Btn " onClick={handleLink}>
                    <span
                        className="svgIcon"
                        viewBox="0 0 384 512"
                        height="0.7em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {pathname.endsWith("detail") ? (
                            <FaTable />
                        ) : (
                            <MdGroups />
                        )}
                    </span>
                    <span className="tooltip">
                        {pathname.endsWith("detail") ? "統計" : "清單"}
                    </span>
                </button>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .Btn {
        margin-left: 10px;
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;
        background-color: #dbb5b5;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        transition-duration: 0.3s;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.11);
        opacity: 0.8;
    }

    .svgIcon {
        color: #fff;
    }
    .tooltip {
        width: 50px;
        font-size: 12px;
        position: absolute;
        top: -40px;
        opacity: 0;
        background-color: #c39898;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition-duration: 0.2s;
        pointer-events: none;
        letter-spacing: 0.5px;
    }

    .tooltip::before {
        position: absolute;
        content: "";
        width: 10px;
        height: 10px;
        background-color: #c39898;
        background-size: 1000%;
        background-position: center;
        transform: rotate(45deg);
        top: 75%;
        transition-duration: 0.3s;
    }

    .Btn:hover .tooltip {
        opacity: 1;
        transition-duration: 0.3s;
    }

    .Btn:hover {
        background-color: #c39898;
        transition-duration: 0.3s;
    }

    .Btn:hover .svgIcon {
        fill: rgb(255, 255, 255);
        animation: slide-in-top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }

    @keyframes slide-in-top {
        0% {
            transform: translateY(-10px);
            opacity: 0;
        }

        100% {
            transform: translateY(0px);
            opacity: 1;
        }
    }
`;

export default DetailBtn;
