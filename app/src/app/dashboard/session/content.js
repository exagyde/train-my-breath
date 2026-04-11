"use client";

import "./style.css";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { dataProvider } from "@/data";
import BreathCircle from "@/components/BreathCircle";
import { PauseIcon, PlayIcon, SquareIcon, Volume2Icon, VolumeOffIcon } from "@/components/Icons";

export default function SessionContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const router = useRouter();
    const [exercice, setExercice] = useState({});
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

    const loadExercise = async () => {
        const _exercise = await dataProvider.exercises.getById(id);
        setExercice(_exercise);
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
        if(!paused.current) setPattern(exercice.pattern[i]);
        if(!paused.current && !isMuted.current) playSound(exercice.pattern[i].phase);
        phase.current = setTimeout(() => playPattern(i+1 > exercice.pattern.length-1 ? 0 : i+1), exercice.pattern[i].duration*1000);
    };

    useEffect(() => {
        loadExercise();
        loadSounds();
        return () => clearTimeout(phase.current);
    }, [router]);

    useEffect(() => {
        if(isStarting) {
            paused.current = false;
            setTimer(exercice.totalDuration);
            setIsPlaying(true);
            playPattern(0);
        }
    }, [isStarting]);

    useEffect(() => {
        paused.current = !isPlaying;
        if (isPlaying && timer <= 0) router.push("/dashboard");
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
            <h2>{exercice.name}</h2>
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
                        <span onClick={() => isMuted.current = !isMuted.current}>{isMuted.current ? VolumeOffIcon : Volume2Icon}</span>
                    </div>
                    <span>{formatTimer(timer)}</span>
                    <div className="row">
                        {isPlaying && <button onClick={() => setIsPlaying(false)}>{PauseIcon}</button>}
                        {!isPlaying && <button onClick={() => setIsPlaying(true)}>{PlayIcon}</button>}
                        <button onClick={() => router.push("/dashboard")}>{SquareIcon}</button>
                    </div>
                </div>
            </>}
        </div>
    );
}