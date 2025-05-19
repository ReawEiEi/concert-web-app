import "../globals.css";
import NavbarUser from "@/components/layouts/NavbarUser";
import PageContainer from "@/components/layouts/PageContainer";

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
