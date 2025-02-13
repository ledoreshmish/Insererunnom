import React, { useState } from 'react';
import { playSound } from "../utils/soundManager"; // 🎧 Gestionnaire de sons

interface Choice {
  text: string;
  nextScene: number;
}

interface Scene {
  id: number;
  text: string;
  image: string;
  choices: Choice[];
  endingMessage?: string;
  result?: "win" | "loss" | "hub";
}

const story: Scene[] = [
  {
    id: 0,
    text: "Vous vous trouvez devant Frenchie Shore.",
    image: "https://i.imgur.com/CbMw9lL.png",
    choices: [
      { text: "Continuer de regarder Frenchie Shore", nextScene: 1 },
      { text: "Arrêter de regarder Frenchie Shore", nextScene: 100 }
    ]
  },
  {
    id: 1,
    text: "Après avoir longuement regardé Frenchie Shore, vous décidez qu'il est temps d'explorer la ville.",
    image: "https://i.imgur.com/d7mWvFe.png",
    choices: [
      { text: "Aller au musée de Confluence", nextScene: 2 },
      { text: "Aller dans un bistrot local", nextScene: 10 },
      { text: "Explorer un immeuble ancien", nextScene: 20 },
      { text: "Se promener dans le quartier animé", nextScene: 30 }
    ]
  },
  {
    id: 2,
    text: "Après avoir loupé l'exposition centrale, vous décidez d'aller au cinéma. Pendant la séance, un homme se met à pisser au milieu de la salle.",
    image: "https://i.imgur.com/ytgn1Tz.png",
    choices: [
      { text: "Confronter l'homme", nextScene: 3 },
      { text: "Ignorer l'incident", nextScene: 4 }
    ]
  },
  {
    id: 3,
    text: "Dommage, il vous pisse dessus et vous finissez par détester l'endroit – retour au début.",
    image: "https://i.imgur.com/kLdeaRb.png",
    choices: [],
    endingMessage: "Vous avez perdu ! Recommencez l'aventure.",
    result: "loss"
  },
  {
    id: 4,
    text: "Vous choisissez d'ignorer l'incident et restez concentré sur le film. Bientôt, l'atmosphère se fait lourde et un SDF excentrique surgit dans le couloir en criant...",
    image: "https://i.imgur.com/BhK3IVN.png",
    choices: [
      { text: "Sortir pour écouter le SDF", nextScene: 5 },
      { text: "Rester et finir le film", nextScene: 6 }
    ]
  },
  {
    id: 5,
    text: "Le SDF se précipite vers vous et vous raconte une histoire incroyable sur un trésor caché. Mais avant qu'il ne puisse finir, un homme crie :\n\n\"Salam khoya, j'arrive pas à chier, mes toilettes sont bouchées, viens chez moi s'il te plaît !\"",
    image: "https://i.imgur.com/Fni7DCS.png",
    choices: [
      { text: "L'aider", nextScene: 7 },
      { text: "L'ignorer", nextScene: 8 }
    ]
  },
  {
    id: 6,
    text: "Malgré l'homme pipi, votre film s'est très bien passé mais vous avez envie de plus d'expériences.",
    image: "https://i.imgur.com/5Rg5i3j.png",
    choices: [
      { text: "Continuer", nextScene: 1 }
    ],
    result: "hub"
  },
  {
    id: 7,
    text: "Bravo, votre aide fut exemplaire, vous avez gagné un cadeau surprise avec 1 jour de retard.",
    image: "https://i.imgur.com/ZuFzJvi.png",
    choices: [],
    endingMessage: "Bravo, recommencez l'aventure !",
    result: "win"
  },
  {
    id: 8,
    text: "Vous n'avez pas honte de ne pas aider ce pauvre homme ? – retour au début.",
    image: "https://i.imgur.com/XA1wBJ9.png",
    choices: [],
    endingMessage: "Vous avez perdu ! Recommencez l'aventure.",
    result: "loss"
  },
  {
    id: 10,
    text: "Dans un bistrot local, un homme très gourmand vous propose de regarder son spectacle.",
    image: "https://i.imgur.com/x08AbqZ.png",
    choices: [
      { text: "Ecouter le gourmand parler", nextScene: 11 },
      { text: "Admirer le jonglage d'un gourmand", nextScene: 12 }
    ]
  },
  {
    id: 11,
    text: "Vous avez rigolé, le patron vous vire et vous reprenez votre excursion.",
    image: "https://i.imgur.com/0EoybXa.png",
    choices: [
      { text: "Continuer", nextScene: 1 }
    ],
    result: "hub"
  },
  {
    id: 12,
    text: "Un gourmand se met à jongler avec de l'air, une scène absurde qui vous fait sourire…",
    image: "https://i.imgur.com/cMs1vsE.png",
    choices: [
      { text: "Observer la performance", nextScene: 13 }
    ]
  },
  {
    id: 13,
    text: "Le gourmand vous offre un soupçon d'air parfumé, vous transportant dans un univers parallèle de saveurs et de couleurs. Le spectacle du gourmand vous a émerveillé, mais votre aventure n'est pas terminée.",
    image: "https://i.imgur.com/qGxlzhz.png",
    choices: [
      { text: "Continuer", nextScene: 1 }
    ],
    result: "hub"
  },
  {
    id: 20,
    text: "Dans cet immeuble, une aveugle du 6ème étage provoque un incendie en renversant un chandelier.",
    image: "https://i.imgur.com/WRKk3Ds.png",
    choices: [
      { text: "Appeler les pompiers", nextScene: 21 },
      { text: "Ne rien faire", nextScene: 22 }
    ]
  },
  {
    id: 21,
    text: "Bravo, vous êtes un bon citoyen ! Les pompiers interviennent et maîtrisent le feu.",
    image: "https://i.imgur.com/Q2iLztf.png",
    choices: [
      { text: "Continuer", nextScene: 1 }
    ],
    result: "hub"
  },
  {
    id: 22,
    text: "L'incendie se propage et vous êtes englouti par une fumée aux effluves de marshmallows grillés… Vous recommencez depuis le début.",
    image: "https://i.imgur.com/BFM0KJn.png",
    choices: [],
    endingMessage: "Vous avez perdu ! Recommencez l'aventure.",
    result: "loss"
  },
  {
    id: 30,
    text: "Dans une rue vibrante, un individu raciste vous aborde en anglais, persuadé que vous êtes étranger malgré vos racines vietnamiennes.",
    image: "https://i.imgur.com/s0yjcGx.png",
    choices: [
      { text: "Le taper", nextScene: 31 },
      { text: "Continuer votre route", nextScene: 32 }
    ]
  },
  {
    id: 31,
    text: "Étonnamment, il fait moins le malin en vous voyant vous approcher de lui, il s'excuse…",
    image: "https://i.imgur.com/cFQyHDF.png",
    choices: [
      { text: "Continuer", nextScene: 1 }
    ],
    result: "hub"
  },
  {
    id: 32,
    text: "La rue se mue en une piste de danse improvisée où les passants vous acclament… Sauf le SDF du coin. Vous décidez de partir.",
    image: "https://i.imgur.com/mH3lW4t.png",
    choices: [
      { text: "Continuer", nextScene: 1 }
    ],
    result: "hub"
  },
  {
    id: 100,
    text: "Vous décidez d'arrêter de regarder Frenchie Shore. Soudain, une fissure spatio-temporelle s'ouvre sous vos pieds et vous aspire dans un vortex étrange.",
    image: "https://i.imgur.com/AJwaDtx.png",
    choices: [
      { text: "Explorer le portail du vortex", nextScene: 101 },
      { text: "Commander un bò bún interdimensionnel", nextScene: 110 }
    ]
  },
  {
    id: 101,
    text: "Dans le vortex, vous rencontrez Benito Mussolini, qui ne s'exprime qu'avec ses mains. Il vous fait signe de le suivre dans un monde où la logique se transforme en énigme.",
    image: "https://i.imgur.com/ouROqoO.png",
    choices: [
      { text: "Essayer de comprendre ses gestes", nextScene: 102 },
      { text: "Ignorer ses signaux et avancer seul", nextScene: 103 }
    ]
  },
  {
    id: 102,
    text: "En décryptant les gestes de Benito, vous êtes conduit vers un labyrinthe d'énigmes et de mystères.",
    image: "https://i.imgur.com/4toeFeg.png",
    choices: [
      { text: "Résoudre les énigmes", nextScene: 104 },
      { text: "Suivre votre intuition", nextScene: 105 }
    ]
  },
  {
    id: 104,
    text: "Perdu, malheureusement résoudre des casse-têtes n'a jamais été votre fort.",
    image: "https://i.imgur.com/jgkTCbW.png",
    choices: [],
    endingMessage: "Vous avez perdu ! Recommencez l'aventure.",
    result: "loss"
  },
  {
    id: 105,
    text: "Après 5 minutes au téléphone avec votre intuition, vous décidez de revenir en arrière.",
    image: "https://i.imgur.com/RJvJhP2.png",
    choices: [
      { text: "Continuer", nextScene: 100 }
    ],
    result: "hub"
  },
  {
    id: 103,
    text: "En avançant seul, vous tombez sur un imposant chat roux, musclé et mystérieux, qui vous observe avec intensité.",
    image: "https://i.imgur.com/xGAFpwb.png",
    choices: [
      { text: "S'approcher du chat", nextScene: 106 },
      { text: "L'ignorer et continuer", nextScene: 107 }
    ]
  },
  {
    id: 106,
    text: "Le chat vous accueille dans sa demeure luxuriante, regorgeant de trésors étranges.",
    image: "https://i.imgur.com/WVcpU96.png",
    choices: [
      { text: "Discuter avec le chat", nextScene: 108 },
      { text: "Entrer discrètement", nextScene: 109 }
    ]
  },
  {
    id: 107,
    text: "Perdu, on n'ignore pas un chat roux.",
    image: "https://i.imgur.com/xGAFpwb.png",
    choices: [],
    endingMessage: "Vous avez perdu ! Recommencez l'aventure.",
    result: "loss"
  },
  {
    id: 108,
    text: "Les révélations du chat vous intriguent. Il était soldat SS avant de déménager en Argentine.",
    image: "https://i.imgur.com/94corje.png",
    choices: [
      { text: "Le dénoncer à la police", nextScene: 111 },
      { text: "En faire un exemple à la télévision", nextScene: 112 }
    ]
  },
  {
    id: 111,
    text: "Vous n'êtes qu'un vulgaire collaborateur. Vous recommencez depuis le début.",
    image: "https://i.imgur.com/gJeLAm1.png",
    choices: [],
    endingMessage: "Vous avez perdu ! Recommencez l'aventure.",
    result: "loss"
  },
  {
    id: 112,
    text: "Bravo, vous venez de sauver la nation par votre exemplarité – vous gagnez, avec un cadeau en retard et un bisou quand même !",
    image: "https://i.imgur.com/2Rd8Wo1.png",
    choices: [],
    endingMessage: "Bravo, recommencez l'aventure !",
    result: "win"
  },
  {
    id: 109,
    text: "En entrant discrètement dans la demeure du chat, vous découvrez avec horreur que celui-ci a fait caca de partout.",
    image: "https://i.imgur.com/chgKWK9.png",
    choices: [
      { text: "Aider le chat à nettoyer", nextScene: 113 },
      { text: "S'en aller rapidement", nextScene: 114 }
    ]
  },
  {
    id: 113,
    text: "En aidant le chat à nettoyer, vous découvrez un sous-sol secret où se trame une fête interstellaire. Vous tombez de nouveau dans une faille spatiotemporelle.",
    image: "https://i.imgur.com/wG1u30r.png",
    choices: [
      { text: "Continuer", nextScene: 100 }
    ],
    result: "hub"
  },
  {
    id: 114,
    text: "Vos deux réalités se sont rencontrées, c'est impossible, recommencez.",
    image: "https://i.imgur.com/6vvb7am.png",
    choices: [],
    endingMessage: "Vous avez perdu ! Recommencez l'aventure.",
    result: "loss"
  },
  {
    id: 110,
    text: "Ce bò bún aux saveurs improbables vous transporte dans l'absurdité de votre vie…",
    image: "https://i.imgur.com/9SwLcfs.png",
    choices: [],
    endingMessage: "Même les choix les plus simples peuvent mener à des expériences extraordinaires. Ce bò bún était bien plus qu'un simple repas...",
    result: "loss"
  }
];

export default function Game() {
  const [currentScene, setCurrentScene] = useState(0);

  const handleChoice = (nextScene: number) => {
    playSound("click"); // 🔊 Son de clic général pour chaque choix

    // 🎵 Ajout des sons spécifiques aux événements
    if (nextScene === 3) {
      playSound("sdfPisse"); // 🔊 Son du SDF qui pisse
    }
    if (nextScene === 106) {
      playSound("chatMiaule"); // 🔊 Son du chat qui miaule
    }

    setCurrentScene(nextScene);
  };

  const scene = story.find((s) => s.id === currentScene) || story[0];

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Game Container */}
        <div className="bg-black pixel-corners overflow-hidden">
          {/* Game Header */}
          <div className="bg-gradient-to-r from-[#ff69b4] to-[#6441A5] p-6">
            <h1 className="game-title text-2xl font-normal text-center text-white">
              Insérer nom du jeu
            </h1>
          </div>

          {/* Scene Image */}
          <div className="relative h-96 pixel-border">
            <img
              src={scene.image}
              alt="Scene"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
          </div>

          {/* Dialogue Box */}
          <div className="dialogue-box p-6">
            {/* Scene Text */}
            <div className="scene-text mb-6 text-base leading-relaxed whitespace-pre-line">
              {scene.text}
            </div>

            {/* Ending Message */}
            {scene.endingMessage && (
              <div className="ending-message mb-6 p-4 rounded">
                <p className="text-base italic">
                  {scene.endingMessage}
                </p>
              </div>
            )}

            {/* Choices or Restart */}
            <div className="space-y-4">
              {scene.choices.length > 0 ? (
                scene.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice.nextScene)}
                    className="choice-button w-full text-left rounded"
                  >
                    ▶ {choice.text}
                  </button>
                ))
              ) : (
                <button
                onClick={() => {
                  if (scene.result === "win") {
                    playSound("win"); // 🔊 Son de victoire
                  } else if (scene.result === "loss") {
                    playSound("fail"); // 🔊 Son d'échec
                  } else if (scene.result === "hub") {
                    playSound("hubReturn"); // 🔊 Son de retour au hub
                  }
                  setCurrentScene(0);
                }}
                className="restart-button w-full p-4 text-center rounded"
              >
                  {scene.result === "win"
                    ? "★ Bravo, recommencez l'aventure ! ★"
                    : "✗ Vous avez perdu ! Recommencez l'aventure ✗"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}