import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h2 style={{ fontSize: "28px" }}>Welkom bij ColorQuest </h2>

            <p style={{ color: "#ccc" }}>
                Kies een spelmodus om te beginnen.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
                <Link to="/repeat">
                    <button style={buttonStyle}>Kleurherhaling</button>
                </Link>

                <Link to="/reaction">
                    <button style={buttonStyle}>Reactietijd</button>
                </Link>
            </div>
        </div>
    );
}

const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "10px",
    border: "none",
    fontWeight: 600,
    fontSize: "18px",
    backgroundColor: "#1a1a1a",
    color: "var(--white)",
};
