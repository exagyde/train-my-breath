"use client";

import "./Exercise.css";

import { useRouter } from "next/navigation";
import { SportShoeIcon, TargetIcon, WindIcon } from "@/components/Icons";

export default function Exercise({ data }) {
    const router = useRouter();

    const formatDuration = (duration) => {
        const minutes = Math.floor(duration/60), seconds = duration % 60;
        return `${minutes}min ${seconds.toString().padStart(2, "0")}s`
    };

    const formatType = (type) => {
        if(type == "daily") return <>{WindIcon} Journalier</>;
        if(type == "focus") return <>{TargetIcon} Concentration</>;
        if(type == "training") return <>{SportShoeIcon} Entrainement</>;
    };
    
    return (
        <div className="exercise column">
            <div className="row">
                <span className="row">{formatType(data.type)}</span>
                <small>{formatDuration(data.totalDuration)}</small>
            </div>
            <h4>{data.name}</h4>
            <p>{data.description}</p>
            <div className="row">
                <button onClick={() => router.push(`/dashboard/session?id=${data.id}`)}>Démarrer l'exercice</button>
            </div>
        </div>
    );
}