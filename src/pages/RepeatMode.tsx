export default function RepeatMode() {
    return (
        <div>
            <h2>Kleurherhaling</h2>
            <p style={{ color: "#ccc" }}>Herhaal de volgorde van kleuren.</p>

            <div style={{ marginTop: "20px" }}>
                <button style={startButton}>Start spel</button>
            </div>
        </div>
    );
}

const startButton: React.CSSProperties = {
    padding: "12px 20px",
    fontSize: "18px",
    fontWeight: 600,
    backgroundColor: "var(--blue)",
    border: "none",
    borderRadius: "10px",
    color: "white",
};
