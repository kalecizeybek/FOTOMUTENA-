import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tasarım Arşivi | FOTOMUTENA",
    description: "Mimari formlar, dijital dökümler ve deneysel tasarım çalışmalarının premium arşivi. Geleceğin estetiğini keşfedin.",
    openGraph: {
        title: "Tasarım Arşivi | FOTOMUTENA",
        description: "Geleceğin formlarını ve mimari taslakları keşfedin.",
        images: [
            {
                url: "/og-designs.jpg",
                width: 1200,
                height: 630,
            }
        ]
    }
};

export default function DesignsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
