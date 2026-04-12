"use client";

import "./style.css";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { dataProvider } from "@/data";
import { createSession } from "@/data/models/session.model";
import BreathCircle from "@/components/BreathCircle";
import { PauseIcon, PlayIcon, SquareIcon, Volume2Icon, VolumeOffIcon } from "@/components/Icons";

export default function SessionContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const router = useRouter();
    const [user, setUser] = useState({});
    const [setting, setSetting] = useState({});
    const [exercise, setExercise] = useState({});
    const [isReady, setIsReady] = useState(() => {
        setTimeout(() => setIsReady(true), 4000);
        return false;
    });
    const phase = useRef(null);

    const audioContext = useRef(null);
    const buffers = useRef({});
    const isMuted = useRef(false);

    const [isStarting, setIsStarting] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const paused = useRef(false);
    const [pattern, setPattern] = useState(null);
    const [timer, setTimer] = useState(0);
    const [breathTime, setBreathTime] = useState(0);

    const loadUser = async () => {
        const _user = (await dataProvider.users.getAll())[0];
        setUser(_user);
    };

    const loadSetting = async () => {
        const _setting = (await dataProvider.settings.getAll())[0];
        isMuted.current = _setting?.voiceMuted ?? false;
        setSetting(_setting);
    }

    const loadExercise = async () => {
        const _exercise = await dataProvider.exercises.getById(id);
        setExercise(_exercise);
    };

    const isToday = (_date) => {
        const d1 = new Date(), d2 = new Date(_date);
        return d1.toDateString() === d2.toDateString();
    };

    const saveSession = async () => {
        const _session = createSession({ 
            exerciseId: exercise.id,
            completed: timer <= 0,
            duration: exercise.totalDuration-timer
        });
        await dataProvider.sessions.create(_session);

        await dataProvider.users.update(user.id, { 
            streak: user.streak+(isToday(user.lastSessionDate) ? 0 : 1),
            lastSessionDate: Date.now(),
            totalTime: user.totalTime+_session.duration
        });
        router.push("/dashboard");
    };

    const muteVoice = async () => {
        isMuted.current = !isMuted.current;
        await dataProvider.settings.update(setting.id, {
            voiceMuted: isMuted.current
        });
    };

    const loadSounds = async () => {
        if (!audioContext.current) audioContext.current = new AudioContext();
        const files = ["inhale", "hold", "exhale"];
        for (const name of files) {
            const res = await fetch(`/audio/${name}.wav`);
            const arrayBuffer = await res.arrayBuffer();
            buffers.current[name] = await audioContext.current.decodeAudioData(arrayBuffer);
        }
    };

    const playSound = (name) => {
        const source = audioContext.current.createBufferSource();
        source.buffer = buffers.current[name];
        source.connect(audioContext.current.destination);
        source.start(0);
    };

    const playPattern = (i = 0) => {
        if (!paused.current) setPattern(exercise.pattern[i]);
        if (!paused.current && !isMuted.current) playSound(exercise.pattern[i].phase);
        phase.current = setTimeout(() => playPattern(i+1 > exercise.pattern.length-1 ? 0 : i+1), exercise.pattern[i].duration*1000);
    };

    useEffect(() => {
        loadUser();
        loadSetting();
        loadExercise();
        loadSounds();
        return () => clearTimeout(phase.current);
    }, [router]);

    useEffect(() => {
        if (isStarting) {
            paused.current = false;
            setTimer(exercise.totalDuration);
            setIsPlaying(true);
            playPattern(0);
        }
    }, [isStarting]);

    useEffect(() => {
        paused.current = !isPlaying;
        if (isPlaying && timer <= 0) saveSession();
        if (!isPlaying || timer <= 0) return;
        const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [isPlaying, timer]);

    useEffect(() => {
        if (!isPlaying || breathTime <= 0) return;
        const interval = setInterval(() => setBreathTime(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [isPlaying, breathTime]);

    const formatTimer = (duration) => {
        const minutes = Math.floor(duration/60), seconds = duration % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    };

    return (
        <div id="session">
            <h2>{exercise.name}</h2>
            {!isStarting && <>
                <p className="fadeIn">
                    {"Préparez-vous...".split("").map((char, i) => (
                        <span key={i} style={{animationDelay: `${i*.3}s`}}>{char}</span>
                    ))}
                </p>
                <button onClick={() => setIsStarting(true)} disabled={!isReady}>Commencer</button>
            </>}
            {isStarting && <>
                <BreathCircle pattern={pattern ?? {phase: "inhale", duration: 3}} />
                <div className="column">
                    <div className="row">
                        <span onClick={() => muteVoice()}>{isMuted.current ? VolumeOffIcon : Volume2Icon}</span>
                    </div>
                    <span>{formatTimer(timer)}</span>
                    <div className="row">
                        {isPlaying && <button onClick={() => setIsPlaying(false)}>{PauseIcon}</button>}
                        {!isPlaying && <button onClick={() => setIsPlaying(true)}>{PlayIcon}</button>}
                        <button onClick={() => saveSession()}>{SquareIcon}</button>
                    </div>
                </div>
            </>}
        </div>
    );
}