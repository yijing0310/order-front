import SidebarWrapper from "./_components/sidebarWrapper";

export default function RootLayout({ children }) {
    return (
        <>
            <div className="flex">
                <SidebarWrapper />
                <main className="w-full lg:ml-[16.666%] lg:mt-0 mt-10">{children}</main>
            </div>
        </>
    );
}
