import { GroupProvider } from "@/context/group";
export default function GroupLayout({ children }) {
    return (
        <>
            <GroupProvider>{children}</GroupProvider>
        </>
    );
}
