"use client";

import { useRouter } from "next/navigation";

const STYLE = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    height: "100%",
    fontSize: "24px",
    fontWeight: "700"
}

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <div style={STYLE}>
            <p>404 not found</p>
            <button onClick={() => router.push("/")}>Revenir en lieu sûr</button>
        </div>
    );
}