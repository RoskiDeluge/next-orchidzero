import OrchidsList from "./OrchidsList";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex">
            <div>
                {/* @ts-ignore */}
                <OrchidsList />
            </div> 
            <div className="flex-1">{children}</div>
        </main>
    );
}