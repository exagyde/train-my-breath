"use client";

import "./Header.css";

import { InfoIcon, SettingsIcon, TrainMyBreathIcon } from "./Icons";

export default function Header() {
    return (
        <header className="row">
            <div className="row">
                { TrainMyBreathIcon }
                Train My Breath
            </div>
            <div className="row">
                <span>{ SettingsIcon }</span>
            </div>
        </header>
    );
} 