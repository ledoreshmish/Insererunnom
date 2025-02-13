import { useEffect } from "react";
import { playSound } from "../utils/soundManager";

const Ambiance = () => {
    useEffect(() => {
        playSound("ambiance"); // Joue l'ambiance au chargement

        return () => {
            // Arrête l'ambiance si le composant est démonté
        };
    }, []);

    return null; // Pas besoin d'affichage
};

export default Ambiance;
