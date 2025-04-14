import SideBar from "./_components/side-bar";

export default function RootLayout({ children }) {
    return (
        <>
            <div className="flex">
                <SideBar />
                {children}
            </div>
        </>
    );
}
