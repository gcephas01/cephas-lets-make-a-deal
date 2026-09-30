"use client";

import { useMemo, useState } from "react";

type Team = {
  name: string;
  score: number;
};

type PrizeType = "add" | "subtract" | "double" | "half" | "zonk";

type Prize = {
  title: string;
  subtitle: string;
  type: PrizeType;
  value: number;
  icon: string;
};

type MysteryChoice = {
  label: string;
  type: "DOOR" | "BOX" | "CURTAIN";
  number: number;
  prize: Prize;
};


const prizePool: Prize[] = [
  {
    title: "250 POINTS",
    subtitle: "Nothing fancy. Money in the bank.",
    type: "add",
    value: 250,
    icon: "💵",
  },
  {
    title: "500 POINTS!",
    subtitle: "A perfectly respectable mystery prize.",
    type: "add",
    value: 500,
    icon: "💰",
  },
  {
    title: "750 POINTS!",
    subtitle: "Okayyy, we see you.",
    type: "add",
    value: 750,
    icon: "✨",
  },
  {
    title: "1,000 POINTS!",
    subtitle: "Four digits. Very classy.",
    type: "add",
    value: 1000,
    icon: "🏆",
  },
  {
    title: "THE ABSOLUTE UNIT",
    subtitle: "A massive 2,000 points!",
    type: "add",
    value: 2000,
    icon: "👑",
  },
  {
    title: "POCKET CHANGE",
    subtitle: "Seventeen glorious points.",
    type: "add",
    value: 17,
    icon: "🪙",
  },
  {
    title: "THE WHOLE 100",
    subtitle: "Exactly 100 points. Spend wisely.",
    type: "add",
    value: 100,
    icon: "💯",
  },
  {
    title: "A LUXURY VACATION!",
    subtitle: "Seven breathtaking nights in +1,250 Points.",
    type: "add",
    value: 1250,
    icon: "🏝️",
  },
  {
    title: "A BRAND-NEW CAR!!!*",
    subtitle: "*Actually 1,500 points. Please stop asking for the keys.",
    type: "add",
    value: 1500,
    icon: "🚗",
  },
  {
    title: "AN ALL-EXPENSE-PAID CRUISE!",
    subtitle: "To absolutely nowhere. But you get 900 points.",
    type: "add",
    value: 900,
    icon: "🚢",
  },
  {
    title: "A FABULOUS DINING PACKAGE!",
    subtitle: "Dinner not included. 650 points are.",
    type: "add",
    value: 650,
    icon: "🍽️",
  },
  {
    title: "DESIGNER LUGGAGE!",
    subtitle: "For carrying home your 800 points.",
    type: "add",
    value: 800,
    icon: "🧳",
  },
  {
    title: "A NEW HOME!",
    subtitle: "Absolutely not. But here's 1,100 points.",
    type: "add",
    value: 1100,
    icon: "🏠",
  },
  {
    title: "THE JACKPOT!",
    subtitle: "2,500 POINTS!",
    type: "add",
    value: 2500,
    icon: "💎",
  },
  {
    title: "STONKS!",
    subtitle: "DOUBLE YOUR ENTIRE SCORE.",
    type: "double",
    value: 0,
    icon: "📈",
  },
  {
    title: "THE MULTIPLIER",
    subtitle: "Your score just doubled.",
    type: "double",
    value: 0,
    icon: "✖️",
  },
  {
    title: "CUT IT IN HALF",
    subtitle: "Half your score just disappeared.",
    type: "half",
    value: 0,
    icon: "✂️",
  },
  {
    title: "WELL... THAT HAPPENED",
    subtitle: "Lose 300 points.",
    type: "subtract",
    value: 300,
    icon: "🫠",
  },
  {
    title: "THE TAX MAN",
    subtitle: "Lose 500 points.",
    type: "subtract",
    value: 500,
    icon: "🧾",
  },
  {
    title: "PARKING TICKET",
    subtitle: "That'll be 200 points.",
    type: "subtract",
    value: 200,
    icon: "🎫",
  },
  {
    title: "UNEXPECTED EXPENSES",
    subtitle: "There goes 750 points.",
    type: "subtract",
    value: 750,
    icon: "💸",
  },

  // ZONKS

  {
    title: "A BRAND-NEW GOAT!!!",
    subtitle: "Congratulations. It is, in fact, a goat.",
    type: "zonk",
    value: 0,
    icon: "🐐",
  },
  {
    title: "ONE SLIGHTLY USED SOCK",
    subtitle: "We could not locate the other one.",
    type: "zonk",
    value: 0,
    icon: "🧦",
  },
  {
    title: "A LIFETIME SUPPLY OF AIR!",
    subtitle: "Available wherever participating atmosphere is found.",
    type: "zonk",
    value: 0,
    icon: "💨",
  },
  {
    title: "THIS BEAUTIFUL ROCK!",
    subtitle: "Locally sourced from outside.",
    type: "zonk",
    value: 0,
    icon: "🪨",
  },
  {
    title: "A POTATO!",
    subtitle: "No points. But look at that potato.",
    type: "zonk",
    value: 0,
    icon: "🥔",
  },
  {
    title: "AN ALL-EXPENSE-PAID TRIP...",
    subtitle: "...back to your seat.",
    type: "zonk",
    value: 0,
    icon: "🪑",
  },
  {
    title: "THE MYSTERY OF NOTHING",
    subtitle: "You have won exactly what the title promised.",
    type: "zonk",
    value: 0,
    icon: "🕳️",
  },
  {
    title: "A BRAND-NEW PENCIL!",
    subtitle: "The points department was unable to contribute.",
    type: "zonk",
    value: 0,
    icon: "✏️",
  },
  {
    title: "ONE FREE HIGH FIVE",
    subtitle: "Redeemable with Mr. Cephas at participating locations.",
    type: "zonk",
    value: 0,
    icon: "✋",
  },
];

const bigDealPrizes: Prize[] = [
  {
    title: "THE LITTLE DEAL",
    subtitle: "750 POINTS",
    type: "add",
    value: 750,
    icon: "🥉",
  },
  {
    title: "THE LITTLE DEAL",
    subtitle: "1,000 POINTS",
    type: "add",
    value: 1000,
    icon: "🥉",
  },
  {
    title: "THE LITTLE DEAL",
    subtitle: "1,250 POINTS",
    type: "add",
    value: 1250,
    icon: "🥉",
  },
  {
    title: "A VERY NICE DEAL",
    subtitle: "1,500 POINTS",
    type: "add",
    value: 1500,
    icon: "🎁",
  },
  {
    title: "THE BETTER DEAL",
    subtitle: "2,000 POINTS",
    type: "add",
    value: 2000,
    icon: "🥈",
  },
  {
    title: "THE BETTER DEAL",
    subtitle: "2,500 POINTS",
    type: "add",
    value: 2500,
    icon: "🥈",
  },
  {
    title: "THE BETTER DEAL",
    subtitle: "3,000 POINTS",
    type: "add",
    value: 3000,
    icon: "🏆",
  },
  {
    title: "THE BIG DEAL!",
    subtitle: "4,000 POINTS",
    type: "add",
    value: 4000,
    icon: "💎",
  },
  {
    title: "THE BIG DEAL!",
    subtitle: "5,000 POINTS",
    type: "add",
    value: 5000,
    icon: "💎",
  },
  {
    title: "THE MEGA DEAL!",
    subtitle: "7,500 POINTS",
    type: "add",
    value: 7500,
    icon: "👑",
  },
  {
    title: "THE ABSOLUTE JACKPOT!",
    subtitle: "10,000 POINTS",
    type: "add",
    value: 10000,
    icon: "🤯",
  },
];

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function createMysteryChoices(): MysteryChoice[] {
  const prizes = shuffle(prizePool).slice(0, 3);

  const styles: Array<"DOOR" | "BOX" | "CURTAIN"> = [
    "DOOR",
    "BOX",
    "CURTAIN",
  ];

  const dealStyle =
    styles[Math.floor(Math.random() * styles.length)];

  return prizes.map((prize, index) => ({
    label: `${dealStyle} #${index + 1}`,
    type: dealStyle,
    number: index + 1,
    prize,
  }));
}

function createBigDealChoices(): MysteryChoice[] {
  const smallDeals = bigDealPrizes.filter(
    (prize) => prize.value >= 750 && prize.value <= 1500
  );

  const mediumDeals = bigDealPrizes.filter(
    (prize) => prize.value >= 2000 && prize.value <= 3000
  );

  const hugeDeals = bigDealPrizes.filter(
    (prize) => prize.value >= 4000
  );

  const smallPrize =
    smallDeals[Math.floor(Math.random() * smallDeals.length)];

  const mediumPrize =
    mediumDeals[Math.floor(Math.random() * mediumDeals.length)];

  const hugePrize =
    hugeDeals[Math.floor(Math.random() * hugeDeals.length)];

  const prizes = shuffle([
    smallPrize,
    mediumPrize,
    hugePrize,
  ]);

  return prizes.map((prize, index) => ({
    label: `DOOR #${index + 1}`,
    type: "DOOR",
    number: index + 1,
    prize,
  }));
}


export default function Home() {
  const [teams, setTeams] = useState<Team[]>([
    { name: "TEAM 1", score: 0 },
    { name: "TEAM 2", score: 0 },
    { name: "TEAM 3", score: 0 },
  ]);

  const [activeTeam, setActiveTeam] = useState(0);
  const [choices, setChoices] = useState<MysteryChoice[]>(() =>
    createMysteryChoices()
  );
const [gameStarted, setGameStarted] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [revealedChoices, setRevealedChoices] = useState<number[]>([]);
  const [offer, setOffer] = useState(500);
  const [offerVisible, setOfferVisible] = useState(false);
  const [dealTaken, setDealTaken] = useState(false);
  const [hostOpen, setHostOpen] = useState(true);

  const [bigDealMode, setBigDealMode] = useState(false);
  const [bigDealChoices, setBigDealChoices] = useState<MysteryChoice[]>([]);
  const [bigDealSelected, setBigDealSelected] = useState<number | null>(null);
  const [bigDealRevealed, setBigDealRevealed] = useState<number[]>([]);

  const activeTeamData = teams[activeTeam];

  const selectedPrize = useMemo(() => {
    if (selectedChoice === null) return null;
    return choices[selectedChoice].prize;
  }, [selectedChoice, choices]);

  function updateTeamScore(teamIndex: number, amount: number) {
    setTeams((current) =>
      current.map((team, index) =>
        index === teamIndex
          ? { ...team, score: Math.max(0, team.score + amount) }
          : team
      )
    );
  }

function getAudioContext() {
  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & {
      webkitAudioContext?: typeof AudioContext;
    }).webkitAudioContext;

  if (!AudioContextClass) return null;

  return new AudioContextClass();
}

function playPrizeSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5];

  notes.forEach((frequency, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;

    const start = now + index * 0.07;

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.18, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(start);
    oscillator.stop(start + 0.32);
  });
}

function playZonkSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "sawtooth";

  oscillator.frequency.setValueAtTime(180, now);
  oscillator.frequency.exponentialRampToValueAtTime(55, now + 0.8);

  gain.gain.setValueAtTime(0.24, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.87);
}

function playDealSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  [440, 554.37, 659.25].forEach((frequency, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    const start = now + index * 0.08;

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.16, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(start);
    oscillator.stop(start + 0.32);
  });
}

function playBigDealSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  [392, 523.25, 659.25, 783.99, 1046.5].forEach(
    (frequency, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.value = frequency;

      const start = now + index * 0.09;

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(
        0.2,
        start + 0.015
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        start + 0.5
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(start);
      oscillator.stop(start + 0.52);
    }
  );
}

  function applyPrize(prize: Prize) {
    setTeams((current) =>
      current.map((team, index) => {
        if (index !== activeTeam) return team;

        let newScore = team.score;

        if (prize.type === "add") {
          newScore += prize.value;
        }

        if (prize.type === "subtract") {
          newScore -= prize.value;
        }

        if (prize.type === "double") {
          newScore *= 2;
        }

        if (prize.type === "half") {
          newScore = Math.floor(newScore / 2);
        }

        return {
          ...team,
          score: Math.max(0, newScore),
        };
      })
    );
  }

  function selectChoice(index: number) {
    if (selectedChoice !== null || dealTaken) return;

    setSelectedChoice(index);
    setOfferVisible(false);
  }

  function showOffer() {
    if (selectedChoice === null) return;
    setOfferVisible(true);
  }

  function takeDeal() {
    if (!offerVisible || selectedChoice === null) return;
    playDealSound();
    updateTeamScore(activeTeam, offer);
    setDealTaken(true);
    setOfferVisible(false);
  }

  function rejectDeal() {
    setOfferVisible(false);
  }

  function revealMystery() {
  if (selectedChoice === null || dealTaken || !selectedPrize) return;

  if (!revealedChoices.includes(selectedChoice)) {
    if (selectedPrize.type === "zonk") {
      playZonkSound();
    } else {
      playPrizeSound();
    }

    setRevealedChoices((current) => [...current, selectedChoice]);
    applyPrize(selectedPrize);
  }
}

  function revealWhatTheyGaveUp() {
  if (selectedChoice === null || !dealTaken || !selectedPrize) return;

  if (!revealedChoices.includes(selectedChoice)) {
    if (selectedPrize.type === "zonk") {
      playZonkSound();
    } else {
      playPrizeSound();
    }

    setRevealedChoices((current) => [...current, selectedChoice]);
  }
}

  function newDeal() {
    setChoices(createMysteryChoices());
    setSelectedChoice(null);
    setRevealedChoices([]);
    setOfferVisible(false);
    setDealTaken(false);
    setOffer(500);
  }

  function enterBigDeal() {
    setBigDealChoices(createBigDealChoices());
    setBigDealSelected(null);
    setBigDealRevealed([]);
    setBigDealMode(true);
  }

  function chooseBigDeal(index: number) {
    if (bigDealSelected !== null) return;
    setBigDealSelected(index);
  }

  function revealBigDeal() {
  if (bigDealSelected === null) return;

  if (!bigDealRevealed.includes(bigDealSelected)) {
    playBigDealSound();

    setBigDealRevealed((current) => [
      ...current,
      bigDealSelected,
    ]);

    applyPrize(bigDealChoices[bigDealSelected].prize);
  }
}

  function revealAllBigDeal() {
    setBigDealRevealed(bigDealChoices.map((_, index) => index));
  }

  function exitBigDeal() {
    setBigDealMode(false);
    newDeal();
  }

function startGame(teamCount: number) {
  const newTeams = Array.from({ length: teamCount }, (_, index) => ({
    name: `TEAM ${index + 1}`,
    score: 0,
  }));

  setTeams(newTeams);
  setActiveTeam(0);
  setChoices(createMysteryChoices());
  setSelectedChoice(null);
  setRevealedChoices([]);
  setOffer(500);
  setOfferVisible(false);
  setDealTaken(false);
  setBigDealMode(false);
  setGameStarted(true);
}

function restartGame() {
  setGameStarted(false);
  setTeams([
    { name: "TEAM 1", score: 0 },
    { name: "TEAM 2", score: 0 },
    { name: "TEAM 3", score: 0 },
  ]);
  setActiveTeam(0);
  setSelectedChoice(null);
  setRevealedChoices([]);
  setOfferVisible(false);
  setDealTaken(false);
  setBigDealMode(false);
}

if (!gameStarted) {
  return (
    <main className="dealScreen">
      <div className="stageGlow" />

      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "10px",
            fontWeight: 900,
            letterSpacing: "5px",
            color: "#ffd65d",
          }}
        >
          MR. CEPHAS&apos; GAME SHOW NETWORK PRESENTS
        </p>

        <div
          className="dealLogo"
          style={{
            marginTop: "25px",
            transform: "rotate(-3deg) scale(1.6)",
          }}
        >
          <small>LET&apos;S MAKE</small>
          <strong>A DEAL</strong>
        </div>

        <p
          style={{
            marginTop: "55px",
            fontSize: "10px",
            fontWeight: 900,
            letterSpacing: "4px",
            color: "rgba(255,255,255,.55)",
          }}
        >
          HOW MANY TEAMS?
        </p>

        <div
          style={{
            display: "flex",
            gap: "18px",
            marginTop: "15px",
          }}
        >
          {[2, 3, 4].map((count) => (
            <button
              key={count}
              onClick={() => startGame(count)}
              style={{
                width: "105px",
                height: "105px",
                border: "3px solid #ffd65d",
                borderRadius: "15px",
                background:
                  "linear-gradient(145deg, #8c176e, #3b0649)",
                boxShadow:
                  "0 8px 0 #26001e, 0 0 25px rgba(255,210,70,.15)",
                color: "#ffd65d",
                fontSize: "42px",
                fontWeight: 1000,
                cursor: "pointer",
              }}
            >
              {count}
            </button>
          ))}
        </div>

        <p
          style={{
            marginTop: "25px",
            fontSize: "9px",
            letterSpacing: "3px",
            color: "rgba(255,255,255,.35)",
          }}
        >
          SELECT TO START THE SHOW
        </p>
      </section>
    </main>
  );
}

  if (bigDealMode) {
    return (
      <main className="bigDealScreen">
        <div className="bigDealGlow" />

        <header className="bigDealHeader">
          <p>MR. CEPHAS&apos; LET&apos;S MAKE A DEAL</p>
          <h1>THE BIG DEAL</h1>
          <span>NO ZONKS. ONE CHOICE. GO BIG.</span>
        </header>

        <section className="bigDealTeam">
          <span>PLAYING FOR</span>
          <strong>{activeTeamData.name}</strong>
          <b>{activeTeamData.score.toLocaleString()} PTS</b>
        </section>

        <section className="bigDoors">
          {bigDealChoices.map((choice, index) => {
            const selected = bigDealSelected === index;
            const revealed = bigDealRevealed.includes(index);

            return (
              <button
                key={index}
                className={`bigDoor ${selected ? "selected" : ""} ${
                  revealed ? "revealed" : ""
                }`}
                onClick={() => chooseBigDeal(index)}
              >
                {revealed ? (
                  <div className="bigPrize">
                    <span>{choice.prize.icon}</span>
                    <strong>{choice.prize.title}</strong>
                    <p>{choice.prize.subtitle}</p>
                  </div>
                ) : (
                  <>
                    <small>DOOR</small>
                    <strong>{index + 1}</strong>
                    {selected && <span className="locked">LOCKED IN</span>}
                  </>
                )}
              </button>
            );
          })}
        </section>

        <section className="bigDealControls">
          <button
            onClick={revealBigDeal}
            disabled={bigDealSelected === null}
          >
            REVEAL THEIR DOOR
          </button>

          <button
            onClick={revealAllBigDeal}
            disabled={bigDealSelected === null}
          >
            REVEAL ALL
          </button>

          <button className="exitBigDeal" onClick={exitBigDeal}>
            RETURN TO GAME
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="dealScreen">
      <div className="stageGlow" />

      <header className="dealHeader">
        <div className="dealLogo">
          <small>LET&apos;S MAKE</small>
          <strong>A DEAL</strong>
        </div>

        <div className="headerTag">
          MR. CEPHAS&apos; GAME SHOW NETWORK
        </div>

        <button className="bigDealButton" onClick={enterBigDeal}>
          ✦ BIG DEAL ✦
        </button>
      </header>

      <section className="teamRow">
        {teams.map((team, index) => (
          <button
            key={index}
            className={`teamCard ${
              activeTeam === index ? "active" : ""
            }`}
            onClick={() => setActiveTeam(index)}
          >
            <span>{activeTeam === index ? "ACTIVE TEAM" : "SELECT TEAM"}</span>
            <strong>{team.name}</strong>
            <b>{team.score.toLocaleString()}</b>
          </button>
        ))}
      </section>

      <section className="dealPrompt">
        {selectedChoice === null ? (
          <>
            <span>{activeTeamData.name}</span>
            <h1>CHOOSE YOUR MYSTERY</h1>
          </>
        ) : dealTaken ? (
          <>
            <span>DEAL ACCEPTED</span>
            <h1>THE MYSTERY STAYS HIDDEN...</h1>
          </>
        ) : (
          <>
            <span>{activeTeamData.name} CHOSE</span>
            <h1>{choices[selectedChoice].label}</h1>
          </>
        )}
      </section>

      <section className="mysteryStage">
        {choices.map((choice, index) => {
          const selected = selectedChoice === index;
          const revealed = revealedChoices.includes(index);

          return (
            <button
              key={index}
              className={`mysteryChoice ${choice.type.toLowerCase()} ${
                selected ? "selected" : ""
              } ${revealed ? "revealed" : ""}`}
              onClick={() => selectChoice(index)}
            >
              {revealed ? (
                <div className="prizeReveal">
                  <span className="prizeIcon">{choice.prize.icon}</span>
                  <strong>{choice.prize.title}</strong>
                  <p>{choice.prize.subtitle}</p>

                  {choice.prize.type === "zonk" && (
                    <b className="zonkLabel">ZONK!</b>
                  )}
                </div>
              ) : (
                <>
                  {choice.type === "DOOR" && (
                    <div className="doorVisual">
                      <span>DOOR</span>
                      <strong>{choice.number}</strong>
                    </div>
                  )}

                  {choice.type === "BOX" && (
                    <div className="boxVisual">
                      <span className="bow">✦</span>
                      <strong>{choice.number}</strong>
                    </div>
                  )}

                  {choice.type === "CURTAIN" && (
                    <div className="curtainVisual">
                      <strong>{choice.number}</strong>
                    </div>
                  )}

                  {selected && (
                    <div className="choiceLocked">LOCKED IN</div>
                  )}
                </>
              )}
            </button>
          );
        })}
      </section>

      {offerVisible && (
        <section className="offerBanner">
          <span>MR. CEPHAS OFFERS</span>
          <strong>{offer.toLocaleString()} POINTS</strong>
          <p>Take the sure thing... or keep the mystery?</p>

          <div>
            <button className="takeDeal" onClick={takeDeal}>
              TAKE THE DEAL
            </button>

            <button className="noDeal" onClick={rejectDeal}>
              NO DEAL
            </button>
          </div>
        </section>
      )}

      <section className={`hostPanel ${hostOpen ? "open" : ""}`}>
        <button
          className="hostToggle"
          onClick={() => setHostOpen((current) => !current)}
        >
          HOST CONTROLS {hostOpen ? "▼" : "▲"}
        </button>

        {hostOpen && (
          <div className="hostControls">
            <div className="hostGroup">
              <label>MAKE AN OFFER</label>

              <div className="offerInput">
                <button
                  onClick={() => setOffer((value) => Math.max(0, value - 100))}
                >
                  −
                </button>

                <input
                  type="number"
                  value={offer}
                  onChange={(event) =>
                    setOffer(Number(event.target.value) || 0)
                  }
                />

                <button onClick={() => setOffer((value) => value + 100)}>
                  +
                </button>
              </div>

              <button
                className="hostPrimary"
                onClick={showOffer}
                disabled={selectedChoice === null || dealTaken}
              >
                SHOW OFFER
              </button>
            </div>

            <div className="hostGroup">
              <label>MYSTERY</label>

              <button
                onClick={revealMystery}
                disabled={selectedChoice === null || dealTaken}
              >
                REVEAL MYSTERY
              </button>

              <button
                onClick={revealWhatTheyGaveUp}
                disabled={!dealTaken}
              >
                REVEAL WHAT THEY GAVE UP
              </button>
            </div>

            <div className="hostGroup">
              <label>MANUAL SCORE</label>

              <div className="quickPoints">
                <button onClick={() => updateTeamScore(activeTeam, -500)}>
                  −500
                </button>
                <button onClick={() => updateTeamScore(activeTeam, -100)}>
                  −100
                </button>
                <button onClick={() => updateTeamScore(activeTeam, 100)}>
                  +100
                </button>
                <button onClick={() => updateTeamScore(activeTeam, 500)}>
                  +500
                </button>
              </div>
            </div>

            <div className="hostGroup newDealGroup">
  <label>GAME</label>

  <button className="newDealButton" onClick={newDeal}>
    NEW DEAL
  </button>

  <button onClick={restartGame}>
    RESTART GAME
  </button>
</div>
          </div>
        )}
      </section>
    </main>
  );
}