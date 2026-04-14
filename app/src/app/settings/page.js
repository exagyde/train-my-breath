"use client";

import "./style.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dataProvider } from "@/data";
import Header from "@/components/Header";
import { CheckIcon } from "@/components/Icons";

export default function DashboardPage() {
    const router = useRouter();
    const [setting, setSetting] = useState({});
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [isVoiceMuted, setIsVoiceMuted] = useState(false);
    const [isNotificationsEnabled, setIsNotificationEnabled] = useState(null);
    const [selectedTime, setSelectedTime] = useState("09:00");

    const goals = [
        { value: "relaxation", label: "Relaxation" },
        { value: "performance", label: "Performance" },
        { value: "endurance", label: "Endurance" }
    ];

    const getICSContent = (startDate) => {
        return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyApp//Calendar Event//EN
BEGIN:VEVENT
UID:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}@trainmybreath.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:Train My Breath
DTSTART:${startDate}
DURATION:PT10M
RRULE:FREQ=DAILY
BEGIN:VALARM
TRIGGER:-PT10M
ACTION:DISPLAY
DESCRIPTION:Rappel exercice de respiration
END:VALARM
END:VEVENT
END:VCALENDAR`;
    }

    const loadSetting = async () => {
        const _setting = (await dataProvider.settings.getAll())[0];
        setSelectedGoal(_setting.goal);
        setIsVoiceMuted(_setting.voiceMuted);
        setSelectedTime(_setting.notificationTime ?? "09;00");
        setSetting(_setting);
    };

    const handleNotifications = async () => {
        const permission = await Notification.requestPermission();
        dataProvider.settings.update(setting.id, { notificationsEnabled: permission == "granted" });
        setIsNotificationEnabled(permission == "granted");
    };

    const handleCalendarDownload = () => {
        const date = new Date(), [hours, minutes] = selectedTime.split(":").map(Number);
        date.setDate(date.getDate() + 1);
        date.setHours(hours, minutes, 0, 0);
        const pad = (n) => String(n).padStart(2, "0");
        const startDate = date.getFullYear()+pad(date.getMonth() + 1)+pad(date.getDate())
             + "T"+pad(date.getHours())+pad(date.getMinutes()) +"00";

        const icsContent = getICSContent(startDate);
        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "train-my-breath.ics";
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleDeleteData = () => {
        if (confirm("Voulez-vous supprimer toutes vos données ?")) {
            indexedDB.deleteDatabase("train-my-breath-hq");
            window.location.href = "/";
        }
    };

    useEffect(() => {
        loadSetting();
        setIsNotificationEnabled(Notification.permission == "granted");
    }, [router]);

    useEffect(() => {
        if (setting?.id && selectedGoal != setting.goal) {
            dataProvider.settings.update(
                setting.id, { goal: selectedGoal }
            );
        }
    }, [selectedGoal]);

    useEffect(() => {
        if (setting?.id && isVoiceMuted != setting.voiceMuted) {
            dataProvider.settings.update(
                setting.id, { voiceMuted: isVoiceMuted }
            );
        }
    }, [isVoiceMuted]);

    useEffect(() => {
        if (setting?.id && selectedTime != setting.notificationTime) {
            dataProvider.settings.update(
                setting.id, { notificationTime: selectedTime }
            );
        }
    }, [selectedTime]);

    return (
        <div id="settings">
            <Header />
            <div className="column">
                <div className="column">
                    <h4>Vos objectifs</h4>
                    <p>Ajustez vos objectifs respiratoires quotidiens.</p>
                    <div className="row">
                        {goals.map((goal) => (
                            <label key={goal.value} className="row">
                                <input type="radio" name="goal" value={goal.value} 
                                    checked={selectedGoal == goal.value} onChange={() => setSelectedGoal(goal.value)} />
                                <span>{goal.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="column">
                    <h4>Rappel quotidien</h4>
                    <p>Gérez vos rappels quotidiens pour ne abandonner votre série de jours.</p>
                    <button onClick={handleNotifications} disabled={isNotificationsEnabled}>
                        {isNotificationsEnabled && CheckIcon}
                        {isNotificationsEnabled ? "Notifications activées" : "Activer les notifications"}
                    </button>
                    <div className="row">
                        <span>Choisissez une heure :</span>
                        <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
                    </div>
                    <button onClick={handleCalendarDownload}>Mettre à jour mon calendrier</button>
                </div>
                <div className="column">
                    <h4>Vos préférences</h4>
                    <p>Personnalisez votre exprience d&apos;entrainement.</p>
                    <div className="row">
                        <span>Accompagnement par la voix :</span>
                        <select value={!isVoiceMuted} onChange={(e) => setIsVoiceMuted(!e.target.value)}>
                            <option value={true}>Activer</option>
                            <option value={false}>Désactiver</option>
                        </select>
                    </div>
                </div>
                <div className="column">
                    <h4>Réinitialiser les données</h4>
                    <p>Pour repartir de zéro, cette action est irréversible.</p>
                    <button onClick={handleDeleteData}>Supprimer mon historique</button>
                </div>
                <button onClick={() => router.push("/dashboard")}>Terminer</button>
            </div>
        </div>
    );
}