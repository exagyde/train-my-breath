"use client";

import "./Informations.css";

export default function Informations() {
    return (
        <div id="informations" className="column">
            <div className="column">
                <h3>Pourquoi entraîner sa respiration ?</h3>
                <p>La respiration est la seule fonction autonome que vous pouvez contrôler consciemment. En entraînant votre respiration, vous pouvez influencer votre fréquence cardiaque, votre tension artérielle et votre niveau de stress.</p>
                <p>Pour les athlètes, l’entraînement respiratoire améliore la tolérance au CO₂, ce qui vous permet de fournir un effort plus intense plus longtemps sans vous sentir « à bout de souffle ».</p>
            </div>
            <hr />
            <div className="column">
                <h3>Conseils pour réussir</h3>
                <ul>
                    <li>Pratiquez dans un endroit calme où vous ne serez pas dérangé.</li>
                    <li>Asseyez-vous droit ou allongez-vous confortablement.</li>
                    <li>Respirez toujours par le nez sauf indication contraire.</li>
                    <li>Commencez par 5 minutes par jour et augmentez progressivement.</li>
                </ul>
            </div>
        </div>
    );
}