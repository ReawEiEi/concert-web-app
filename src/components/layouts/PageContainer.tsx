export default function PageContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="font-roboto min-h-screen flex flex-col font-roboto transition-all duration-300 ease-in-out lg:ml-60 px-4 py-6">
            {children}
        </div>
    );
}
