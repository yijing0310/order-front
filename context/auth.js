"use client";
import React, { useState, createContext, useContext } from "react";
import { JWT_LOGIN } from "@/config/api-path";
const AuthContext = createContext();
const emptyAuth = {
    id: 0,
    account: "",
    name: "",
    token: "",
};
const storageKey = "how-order";
export function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({ ...emptyAuth });
    const logout = () => {
        localStorage.removeItem(storageKey);
        setUser({ ...emptyAuth });
    };
    const login = async (account, password) => {
        const r = await fetch(JWT_LOGIN, {
            method: "POST",
            body: JSON.stringify({ account, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await r.json();
        if (result.success) {
            localStorage.setItem(storageKey, JSON.stringify(result.data));
            setAuth(result.data);
            return { success: true };
        } else {
            return { success: false, error: result.error, code: result.code };
        }
    };
    const getAuthHeader = () => {
        if (!auth.token) return {}
        return { Authorization: 'Bearer ' + auth.token }
      }
    useEffect(() => {
        const data = localStorage.getItem(storageKey)
        if (data) {
          try {
            const authData = JSON.parse(data)
            setAuth(authData || emptyAuth)
          } catch (ex) {
            setAuth(emptyAuth)
          }
        }
      }, [])
    return (
        <>
            <AuthContext.Provider value={{ auth, logout, login, getAuthHeader }}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
export const useAuth = () => useContext(AuthContext);
export default AuthContext;
