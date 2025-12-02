import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gameColors } from "../Styles/colors";
import styles from "./RepeatMode.module.css";

type ColorKey = keyof typeof gameColors;
type GameState = "idle" | "showing" | "input" | "gameover";

export default function RepeatMode() {
    const navigate = useNavigate();
    const [gameState, setGameState] = useState<GameState>("idle");
    const [sequence, setSequence] = useState<ColorKey[]>([]);
    const [userInput, setUserInput] = useState<ColorKey[]>([]);
    const [round, setRound] = useState(0);
    const [score, setScore] = useState(0);
    const [showingIndex, setShowingIndex] = useState(-1);
    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

    const colorKeys = Object.keys(gameColors) as ColorKey[];

    // Start nieuwe ronde
    const startNewRound = () => {
        const newColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        const newSequence = [...sequence, newColor];
        setSequence(newSequence);
        setRound(round + 1);
        setUserInput([]);
        setFeedback(null);
        setGameState("showing");
        showSequence(newSequence);
    };

    // Toon de sequentie aan de gebruiker
    const showSequence = (seq: ColorKey[]) => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < seq.length) {
                setShowingIndex(index);
                setTimeout(() => setShowingIndex(-1), 400);
                index++;
            } else {
                clearInterval(interval);
                setGameState("input");
            }
        }, 700);
    };

    // Verwerk gebruikersklik
    const handleColorClick = (color: ColorKey) => {
        if (gameState !== "input") return;

        const newUserInput = [...userInput, color];
        setUserInput(newUserInput);

        // Check of de kleur correct is
        if (color !== sequence[newUserInput.length - 1]) {
            // Fout!
            setFeedback("wrong");
            setGameState("gameover");
            return;
        }

        // Check of de sequentie compleet is
        if (newUserInput.length === sequence.length) {
            // Ronde succesvol voltooid!
            setFeedback("correct");
            setScore(score + 1);
            setTimeout(() => {
                startNewRound();
            }, 1000);
        }
    };

    // Start het spel
    const startGame = () => {
        setSequence([]);
        setUserInput([]);
        setRound(0);
        setScore(0);
        setFeedback(null);
        startNewRound();
    };

    return (
        <div className={styles.container}>
            {/* Header met score */}
            <div className={styles.header}>
                <button onClick={() => navigate("/")} className={styles.backButton}>
                    ← Terug
                </button>
                {gameState !== "idle" && (
                    <div className={styles.score}>
                        Ronde: {round} | Score: {score}
                    </div>
                )}
            </div>

            <h2 className={styles.title}>Kleurherhaling</h2>

            {/* Idle State - Uitleg en Start */}
            {gameState === "idle" && (
                <div className={styles.instructionsContainer}>
                    <p className={styles.instructionText}>
                          <strong>Spelregels:</strong>
                    </p>
                    <ul className={styles.list}>
                        <li>Het systeem toont een reeks kleuren</li>
                        <li>Herhaal de exacte volgorde door op de kleuren te klikken</li>
                        <li>Elke ronde wordt een nieuwe kleur toegevoegd</li>
                        <li>Het spel eindigt bij een fout</li>
                    </ul>
                    <button onClick={startGame} className={styles.startButton}>
                          Start Spel
                    </button>
                </div>
            )}

            {/* Showing State - Toon sequentie */}
            {gameState === "showing" && (
                <div className={styles.status}>
                    <p className={styles.statusText}>Let op! Onthoud de volgorde...</p>
                    <div className={styles.progress}>
                        {showingIndex + 1} / {sequence.length}
                    </div>
                </div>
            )}

            {/* Input State - Gebruiker mag klikken */}
            {gameState === "input" && (
                <div className={styles.status}>
                    <p className={styles.statusText}>Jouw beurt! Herhaal de volgorde</p>
                    <div className={styles.progress}>
                        {userInput.length} / {sequence.length}
                    </div>
                </div>
            )}

            {/* Game Over State */}
            {gameState === "gameover" && (
                <div className={styles.gameOverContainer}>
                    <h3 className={styles.gameOverTitle}>Spel Afgelopen!</h3>
                    <div className={styles.finalScore}>
                        <p>Totaal aantal rondes: <strong>{score}</strong></p>
                        <p>Langste reeks: <strong>{sequence.length} kleuren</strong></p>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button onClick={startGame} className={styles.startButton}>
                            Opnieuw Spelen
                        </button>
                        <button onClick={() => navigate("/")} className={styles.homeButton}>
                            Naar Home
                        </button>
                    </div>
                </div>
            )}

            {/* Kleur Grid */}
            {(gameState === "showing" || gameState === "input") && (
                <div className={styles.grid}>
                    {colorKeys.map((colorKey) => {
                        const isShowing = sequence[showingIndex] === colorKey;
                        const isActive = gameState === "input";

                        return (
                            <button
                                key={colorKey}
                                onClick={() => handleColorClick(colorKey)}
                                disabled={!isActive}
                                className={`${styles.tile} ${
                                    isShowing ? styles.tileShowing :
                                        isActive ? styles.tileActive :
                                            styles.tileInactive
                                }`}
                                style={{
                                    backgroundColor: gameColors[colorKey],
                                    boxShadow: isShowing ? `0 0 30px ${gameColors[colorKey]}` : "none",
                                }}
                            >
                                <span className={styles.colorLabel}>{colorKey}</span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Feedback */}
            {feedback && (
                <div className={`${styles.feedback} ${
                    feedback === "correct" ? styles.feedbackCorrect : styles.feedbackWrong
                }`}>
                    {feedback === "correct" ? "✓ Correct!" : "✗ Fout!"}
                </div>
            )}
        </div>
    );
}