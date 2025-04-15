import SideBar from "./_components/side-bar";

export default function RootLayout({ children }) {
    return (
        <>
            <div className="flex">
                <div className="w-48">
                    <SideBar />
                </div>
                {children}
            </div>
        </>
    );
}
