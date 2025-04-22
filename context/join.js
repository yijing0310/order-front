"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import { JOIN_GROUP_POST } from "@/config/api-path";
const JoinContext = createContext();
const emptyJoin = { group_uuid:"",token: "" };
const storageKey = "how-order-guest";

export function JoinContextProvider({ children }) {
    const [join, setJoin] = useState({ ...emptyJoin });

    const joinout = () => {
        localStorage.removeItem(storageKey);
        setJoin({ ...emptyJoin });
    };

    const joinin = async (group_uuid, password) => {
        try {
            const res = await fetch(JOIN_GROUP_POST, {
                method: "POST",
                body: JSON.stringify({ group_uuid, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await res.json();

            if (result.success) {
                localStorage.setItem(storageKey, JSON.stringify({ token: result.token,group_uuid: result.group_uuid }));
                setJoin({ token: result.token, group_uuid });
                return { success: true };
            } else {
                return { success: false, error: result.error, code: result.code };
            }
        } catch (err) {
            return { success: false, error: "連接資料錯誤" };
        }
    };

    const getJoinHeader = () => {
        if (!join.token) return {};
        return { Authorization: "Bearer " + join.token };
    };

    useEffect(() => {
        const data = localStorage.getItem(storageKey);
        if (data) {
            try {
                const joinauthData = JSON.parse(data);
                setJoin(joinauthData || emptyJoin);
            } catch (ex) {
                setJoin(emptyJoin);
            }
        }
    }, []);

    return (
        <JoinContext.Provider value={{ join, joinout, joinin, getJoinHeader }}>
            {children}
        </JoinContext.Provider>
    );
}

export const useJoin = () => useContext(JoinContext);
