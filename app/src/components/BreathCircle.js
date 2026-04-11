"use client";

import "./BreathCircle.css";

export default function BreathCircle({ pattern = {phase: "inhale", duration: 4 } }) { 
    const formatPhase = (_phase) => {
        if(_phase == "inhale") return "Inspirer";
        if(_phase == "exhale") return "Expirer";
        if(_phase.toLowerCase().includes("hold")) return "Retenir";
    };

    return (
        <div id="breath-circle">
            <div className={pattern.phase} 
                style={{animationDuration: `${pattern.duration+.2}s`}}></div>
            <p>{formatPhase(pattern.phase)}</p>
        </div>
    );
}