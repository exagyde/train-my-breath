"use client";

import "./BreathCircle.css";

import { useEffect, useState } from "react";

export default function BreathCircle({ pattern = {phase: "inhale", duration: 4 } }) { 
    const [scale, setScale] = useState(.5);

    const formatPhase = (_phase) => {
        if (_phase == "inhale") return "Inspirer";
        if (_phase == "exhale") return "Expirer";
        if (_phase.toLowerCase().includes("hold")) return "Retenir";
    };

    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            if (pattern.phase == "inhale") setScale(1);
            if (pattern.phase == "exhale") setScale(.5);
        });
        return () => cancelAnimationFrame(raf);
    }), [pattern.phase];

    return (
        <div id="breath-circle">
            <div style={{
                transform: `scale(${scale})`,
                transition: `transform ${pattern.duration+.2}s ease-in-out`
            }}></div>
            <p>{formatPhase(pattern.phase)}</p>
        </div>
    );
}