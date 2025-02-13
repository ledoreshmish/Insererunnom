import React from "react";
import Game from "./components/Game";
import Ambiance from "./components/Ambiance"; // Ajout de l'ambiance sonore
import SoundSettings from "./components/SoundSettings"; // Ajout du contrôle du volume

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 py-8">
      <Ambiance /> {/* 🎵 Musique de fond */}
      <SoundSettings /> {/* 🎚 Contrôle du volume */}
      <Game />
    </div>
  );
}

export default App;
