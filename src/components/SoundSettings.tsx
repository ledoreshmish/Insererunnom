import { useState, useEffect } from "react";
import { Howler } from "howler";

const SoundSettings = () => {
    const [volume, setVolume] = useState(() => {
        return parseFloat(localStorage.getItem("volume") || "0.5");
    });

    useEffect(() => {
        Howler.volume(volume);
        localStorage.setItem("volume", volume.toString());
    }, [volume]);

    return (
        <div>
            <label>🔊 Volume :</label>
            <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={volume} 
                onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
        </div>
    );
};

export default SoundSettings;
