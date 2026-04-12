"use client";

import "./style.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dataProvider } from "@/data";
import Header from "@/components/Header";
import { ActivityIcon, CalendarDaysIcon, CalendarIcon, InfoIcon, TrophyIcon } from "@/components/Icons";
import Exercise from "@/components/Exercise";
import Exercices from "@/components/Exercices";
import Stats from "@/components/Stats";
import Informations from "@/components/Informations";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [setting, setSetting] = useState({});
    const [exercises, setExercises] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [todayExercise, setTodayExercise] = useState({});
    const [tab, setTab] = useState(0);

    const loadUser = async () => {
        const _user = (await dataProvider.users.getAll())[0];
        setUser(_user);
    };

    const loadSetting = async () => {
        const _setting = (await dataProvider.settings.getAll())[0];
        setSetting(_setting);
    };

    const loadExercises = async () => {
        const _exercises = await dataProvider.exercises.getAll();
        setExercises(_exercises.filter(ex => ex.goal == setting.goal));
    };

    const loadSessions = async () => {
        const start = new Date().setHours(0, 0, 0, 0), end = new Date().setHours(24, 0, 0, 0);
        const _sessions = await dataProvider.sessions.getAll();
        setSessions(_sessions.filter(se => {
            return new Date(se.updatedAt) >= start && new Date(se.updatedAt) < end
        }));
    };

    const isStreakBroken = async () => {
        const now = new Date(), last = new Date(user.lastSessionDate);
        now.setHours(0, 0, 0, 0);
        last.setHours(0, 0, 0, 0);

        if ((now-last) / (24*60*60*1000) > 1) {
            await dataProvider.users.update(user.id, { streak: 0 });
        }
    };

    const formatTodayTime = (_sessions) => {
        const totalDuration = _sessions.reduce((sum, _session) => {
            return sum + _session.duration;
        }, 0);
        return Math.floor(totalDuration/60);
    };

    useEffect(() => {
        loadUser();
        loadSetting();
        loadSessions();
    }, [router]);

    useEffect(() => {
        if (user) isStreakBroken();
    }, [user]);

    useEffect(() => {
        if (setting) loadExercises();
    }, [setting]);

    useEffect(() => {
        if (exercises.length > 0) {
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
                        <p>Vous avez complété {formatTodayTime(sessions)} minutes aujourd'hui.</p>
                    </div>
                    <p className="row">{TrophyIcon} Série de {user?.streak ?? 0} jours</p>
                </div>
            </div>
            <div className="column">
                <div className="row">
                    <div className="column">
                        <h3 className="row">{CalendarDaysIcon} Exercice du jour</h3>
                        <p><b>Laissez votre respiration vous guider :</b> inspirez lentement, expirez profondément. Relâchez les tensions et retrouvez un rythme naturel. En respirant en conscience, votre corps devient plus fluide, calme et efficace.</p>
                    </div>
                    {!todayExercise && <p>Pas d'exercice trouvé.</p>}
                    <div className="exercices row">
                        {todayExercise && <Exercise data={todayExercise} />}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="tabs row">
                    <span className={tab === 0 ? "row active" : "row"} onClick={() => setTab(0)}>{ActivityIcon} Exercices</span>
                    <span className={tab === 1 ? "row active" : "row"} onClick={() => setTab(1)}>{CalendarIcon} Statistiques</span>
                    <span className={tab === 2 ? "row active" : "row"} onClick={() => setTab(2)}>{InfoIcon} Informations</span>
                </div>
            </div>
            {tab === 0 && <Exercices data={exercises} />}
            {tab === 1 && <Stats />}
            {tab === 2 && <Informations />}
        </div>
    );
}