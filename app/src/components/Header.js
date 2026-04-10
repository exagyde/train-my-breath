"use client";

import { TrainMyBreathIcon } from "./Icons";

const STYLE = {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    textTransform: "uppercase",
    fontSize: "14px",
    fontWeight: 500,
    opacity: 0.8
};

export default function Header() {
    return (
        <header style={STYLE}>
            { TrainMyBreathIcon }
            Train My Breath
        </header>
    );
} 