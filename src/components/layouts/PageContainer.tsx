export default function PageContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col justify-center font-roboto">
            {children}
        </div>
    );
}
