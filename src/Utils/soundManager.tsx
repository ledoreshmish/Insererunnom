import { Howl } from "howler";

// 📢 Déclaration des sons
const sounds = {
    ambiance: new Howl({ src: ["/sounds/ambiance.wav"], loop: true, volume: 0.3 }),
    click: new Howl({ src: ["/sounds/click.wav"], volume: 0.5 }),
    fail: new Howl({ src: ["/sounds/fail.wav"], volume: 0.5 }),
    film: new Howl({ src: ["/sounds/film.wav"], volume: 0.5 }),
    win: new Howl({ src: ["/sounds/win.wav"], volume: 0.5 }),
    pisse: new Howl({ src: ["/sounds/pisse.wav"], volume: 0.7 }),
    chat: new Howl({ src: ["/sounds/chat.wav"], volume: 0.8 }),
};

// Fonction pour jouer un son
export const playSound = (soundName: keyof typeof sounds) => {
    sounds[soundName]?.play();
};
