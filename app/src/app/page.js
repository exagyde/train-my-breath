"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { dataProvider } from "@/data";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const dataProviderInit = async () => {
            await dataProvider.init();
            router.replace("/dashboard");
        };
        dataProviderInit();
    }, [router]);

    return <p>Loading...</p>;
}