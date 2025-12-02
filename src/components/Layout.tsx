import type {ReactNode} from "react";

import Logo from "./Logo.tsx";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div
            style={{
                backgroundColor: "var(--carbon)",
                color: "var(--white)",
                minHeight: "100vh",
                padding: "20px",
                fontFamily: "var(--body-font)",
            }}
        >
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                <Logo />
                {children}
            </div>
        </div>
    );
}
