import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import NavbarUser from "@/components/layouts/NavbarUser";
import PageContainer from "@/components/layouts/PageContainer";

const roboto = Roboto({
    subsets: ["latin"],
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "Concert Reservation System",
    description: "Product for Data Wow Assignment",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <NavbarUser />
            <PageContainer>{children}</PageContainer>
        </main>
    );
}
