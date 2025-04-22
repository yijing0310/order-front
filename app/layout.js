import "./globals.css";
import { AuthContextProvider } from "@/context/auth.js";
import { JoinContextProvider } from "@/context/join";
import Header from "./_components/header";

export const metadata = {
    title: "HOW ORDER 最棒的訂餐系統",
    description: "自動彙整訂單、智慧分帳金額、一鍵匯出明細、手機也好操作",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthContextProvider>
                    <JoinContextProvider>
                        <Header />
                        {children}
                    </JoinContextProvider>
                </AuthContextProvider>
            </body>
        </html>
    );
}
