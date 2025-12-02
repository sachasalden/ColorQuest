import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RepeatMode from "./pages/RepeatMode";
import ReactionMode from "./pages/ReactionMode";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/repeat" element={<RepeatMode />} />
            <Route path="/reaction" element={<ReactionMode />} />
        </Routes>
    );
}
