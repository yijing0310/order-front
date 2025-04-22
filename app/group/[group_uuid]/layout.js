import GroupHeader from "./_components/header";
import DetailBtn from "./_components/detailBtn";
export default function RootLayout({ children }) {
    return (
        <>
            <div className="sm:px-6 w-full ">
                <GroupHeader />
                {children}
                <DetailBtn/>
            </div>
        </>
    );
}
