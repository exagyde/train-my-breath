"use client";

import Exercise from "./Exercise";

export default function Exercices({ data }) {
    return (
        <div>
            {data.length == 0 && <p>Pas d'exercice trouvé.</p>}
            <div className="exercices row">
                {data.length > 0 && data.map(exercice => (
                    <Exercise key={exercice.id} data={exercice} />
                ))}
            </div>
        </div>
    );
}