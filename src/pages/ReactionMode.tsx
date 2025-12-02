import { gameColors } from "../Styles/colors";

export default function ReactionMode() {
    return (
        <div>
            <h2>Reactietijd</h2>
            <p style={{ color: "#ccc" }}>Klik zo snel mogelijk op de juiste kleur.</p>

            <div style={grid}>
                {Object.values(gameColors).map((color) => (
                    <div key={color} style={{ ...tile, backgroundColor: color }} />
                ))}
            </div>
        </div>
    );
}

const grid: React.CSSProperties = {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
};

const tile: React.CSSProperties = {
    height: "90px",
    borderRadius: "12px",
    cursor: "pointer",
};
