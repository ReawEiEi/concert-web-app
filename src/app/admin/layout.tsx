import "../globals.css";
import NavbarAdmin from "@/components/layouts/NavbarAdmin";
import PageContainer from "@/components/layouts/PageContainer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <NavbarAdmin />
            <PageContainer>{children}</PageContainer>
        </main>
    );
}
