"use client";

import "./Header.css";
import { useRouter } from "next/navigation";

import { SettingsIcon, TrainMyBreathIcon } from "./Icons";

export default function Header() {
    const router = useRouter();

    return (
        <header className="row">
            <div className="row" onClick={() => router.push("/dashboard")}>
                { TrainMyBreathIcon }
                Train My Breath
            </div>
            <div className="row">
                <span onClick={() => router.push("/settings")}>{ SettingsIcon }</span>
            </div>
        </header>
    );
} 