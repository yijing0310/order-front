"use client";
import React, { useRef, useState, useEffect } from "react";
import Sidebar from "./side-bar";
import { gsap } from "gsap";
import { MdOutlineMenu, MdMenuOpen } from "react-icons/md";
export default function SidebarWrapper() {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef();
    const overlayRef = useRef();

    const toggleSidebar = () => {
        if (!isOpen) {
            gsap.to(sidebarRef.current, { x: 0, duration: 0.3 });
            gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 });
        } else {
            gsap.to(sidebarRef.current, { x: -260, duration: 0.3 });
            gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3 });
        }
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                gsap.set(sidebarRef.current, { x: 0 });
                gsap.set(overlayRef.current, { autoAlpha: 0 });
                setIsOpen(true); 
            } else {
                gsap.set(sidebarRef.current, { x: -260 });
                gsap.set(overlayRef.current, { autoAlpha: 0 });
                setIsOpen(false);
            }
        };

        handleResize(); // 初始化就跑一次

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-[100] px-2 py-2 bg-primary  text-white rounded lg:hidden transition-colors duration-200 opacity-70 hover:opacity-100"
            >
                {isOpen ? <MdMenuOpen /> : <MdOutlineMenu />}
            </button>
            <div
                ref={overlayRef}
                onClick={toggleSidebar}
                className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                style={{ display: isOpen ? "block" : "none" }}
            />
            <Sidebar ref={sidebarRef} toggleSidebar={toggleSidebar} />
        </>
    );
}
