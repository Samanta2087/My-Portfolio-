import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { logWebVitals } from "./lib/webVitals";

createRoot(document.getElementById("root")!).render(<App />);

// Monitor Web Vitals
logWebVitals();
