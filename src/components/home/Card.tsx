export default function Card({
    title,
    count,
    icon,
    color,
}: {
    title: string;
    count: number;
    icon: React.ReactNode;
    color: string;
}) {
    return (
        <div
            className={`text-white p-4 sm:p-6 rounded-lg ${color} flex flex-col gap-3 justify-center items-center`}
        >
            {icon}
            <div>{title}</div>
            <div className="text-2xl sm:text-4xl font-semibold sm:font-normal p-2 sm:p-3.5 sm:mt-4">{count}</div>
        </div>
    );
}
