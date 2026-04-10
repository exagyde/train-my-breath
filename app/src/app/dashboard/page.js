"use client";

import "./style.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dataProvider } from "@/data";
import Header from "@/components/Header";
import { ActivityIcon, CalendarDaysIcon, CalendarIcon, InfoIcon, TrophyIcon } from "@/components/Icons";
import Exercise from "@/components/Exercise";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [setting, setSetting] = useState({});
    const [exercises, setExercises] = useState([]);
    const [todayExercise, setTodayExercise] = useState({});

    const loadUser = async () => {
        const _user = (await dataProvider.users.getAll())[0];
        setUser(_user);
    }

    const loadSetting = async () => {
        const _setting = (await dataProvider.settings.getAll())[0];
        setSetting(_setting);
    }

    const loadExercises = async () => {
        const _exercises = await dataProvider.exercises.getAll();
        setExercises(_exercises.filter(ex => ex.goal == setting.goal));
    };

    useEffect(() => {
        loadUser();
        loadSetting();
    }, [router]);

    useEffect(() => {
        if(setting) loadExercises();
    }, [setting]);

    useEffect(() => {
        if(exercises.length > 0) {
            setTodayExercise(() => {
                const _exercises = exercises.filter(ex => ex.type == "daily");
                return _exercises[Math.floor(Math.random()*_exercises.length)];
            });
        }
    }, [exercises]);

    return (
        <div id="dashboard">
            <Header />
            <div>
                <div className="row">
                    <div className="column">
                        <h2>{new Date().getHours() < 18 ? "Bonjour" : "Bonsoir"}</h2>
                        <p>Vous avez complété {Math.floor((user?.totalTime ?? 0)/60)} minutes aujourd'hui.</p>
                    </div>
                    <p className="row">{TrophyIcon} Série de {user?.streak ?? 0} jours</p>
                </div>
            </div>
            <div className="column">
                <div className="row">
                    <div className="column">
                        <h3 className="row">{CalendarDaysIcon} Exercice du jour</h3>
                        <p>Laissez votre respiration vous guider : inspirez lentement, expirez profondément. Relâchez les tensions et retrouvez un rythme naturel. En respirant en conscience, votre corps devient plus fluide, calme et efficace.</p>
                    </div>
                    {!todayExercise && <p>Pas d'exercice trouvé.</p>}
                    <div className="exercices row">
                        {todayExercise && <Exercise data={todayExercise} />}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="tabs row">
                    <span className="row active">{ActivityIcon} Exercices</span>
                    <span className="row">{CalendarIcon} Statistiques</span>
                    <span className="row">{InfoIcon} Informations</span>
                </div>
            </div>
            <div>
                {exercises.length == 0 && <p>Pas d'exercice trouvé.</p>}
                <div className="exercices row">
                    {exercises.length > 0 && exercises.map(exercice => (
                        <Exercise key={exercice.id} data={exercice} />
                    ))}
                </div>
            </div>
        </div>
    );
}