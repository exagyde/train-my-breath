"use client";

import "./Stats.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dataProvider } from "@/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { CheckIcon, XIcon } from "./Icons";

const data = [
  { day: "Apr 06", value: 0 },
  { day: "Apr 07", value: 3.2 },
  { day: "Apr 08", value: 0 },
  { day: "Apr 09", value: 1.5 }, // minutes
  { day: "Apr 10", value: 0 },
  { day: "Apr 11", value: 2 },
  { day: "Apr 12", value: 0 }
];




export default function Stats() {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [exercises, setExercises] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [lastDaysSessions, setLastDaysSessions] = useState([]);

    const loadUser = async () => {
        const _user = (await dataProvider.users.getAll())[0];
        setUser(_user);
    };

    const loadExercises = async () => {
        const _exercises = await dataProvider.exercises.getAll();
        setExercises(_exercises);
    };

    const loadSessions = async () => {
        const start = new Date(
            new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 6
        ).getTime();
        const _sessions = await dataProvider.sessions.getAll();
        setSessions(_sessions);
        setLastDaysSessions(_sessions.filter(se => new Date(se.updatedAt >= start)));
    };

    useEffect(() => {
        loadUser();
        loadExercises();
        loadSessions();
    }, []);

    const formatDuration = (duration) => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;
        return `${hours}h ${minutes}min ${seconds.toString().padStart(2, "0")}s`;
    };

    const getLastDays = () => {
        const last7Days = Array.from({length: 7}, (_, i) => {
            const _date = new Date().setDate(new Date().getDate() - (6-i))
            return { 
                date: new Date(_date).toLocaleDateString("fr-FR", { month: "short", day: "2-digit" }),
                duration: lastDaysSessions.filter(se => {
                    return new Date(se.updatedAt).toDateString() == new Date(_date).toDateString();
                }).reduce((sum, _session) => { return sum + _session.duration; }, 0)
            };
        });
        return last7Days;
    };

    return (
        <div id="stats" className="column">
            <div className="column">
                <h4>Votre voyage (minutes par jour)</h4>
                <ResponsiveContainer>
                    <BarChart data={getLastDays()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(v) => `${Math.round((v/60)*2)/2}m`} />
                        <Tooltip />
                        <Bar dataKey="duration" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="row">
                <div className="column">
                    <h4>Temps total</h4>
                    <span>{formatDuration(user?.totalTime ?? 0)}</span>
                </div>
                <div className="column">
                    <h4>Nombre de sessions</h4>
                    <span>{sessions?.length ?? 0}</span>
                </div>
            </div>
            <div className="column">
                <h4>Historique récent</h4>
                <table>
                    <tbody>
                        {sessions?.length > 0 && sessions.slice(-5).reverse().map(session => (
                            <tr key={session.id}>
                                <td>{new Date(session?.updatedAt ?? Date.now()).toLocaleDateString("fr-FR", {
                                    day: "2-digit", month: "2-digit"
                                })}</td>
                                <td>{exercises.find(ex => ex.id == session.exerciseId)?.name ?? "Pas de nom"}</td>
                                <td><span className={session.completed ? "green" : "red"}>{session.completed ? CheckIcon : XIcon}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
        </div>
    );
}