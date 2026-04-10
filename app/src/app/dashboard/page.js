"use client";

import "./style.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dataProvider } from "@/data";
import Header from "@/components/Header";

export default function DashboardPage() {
    const router = useRouter();
    const [exercises, setExercises] = useState([]);

    const laodExercises = async () => {
        const _exercises = await dataProvider.exercises.getAll();
        setExercises(_exercises);
    };

    useEffect(() => {
        laodExercises();
    }, [router]);

    return (
        <div id="dashboard">
            <Header />
            <div>
                {exercises.length == 0 && <p>Pas d'exercise trouvé.</p>}
                {exercises.length > 0 && exercises.map(exercice => (
                    <p key={exercice.id}>{exercice.name}</p>
                ))}
            </div>
        </div>
    );
}