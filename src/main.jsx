import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const supabase = createClient(
  "https://iztovzposrvynegjbqzo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6dG92enBvc3J2eW5lZ2picXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0NTI1MjgsImV4cCI6MjAwOTAyODUyOH0.O4IjrFVkdHvFuAEn6IhPuGteNyus3PjtnoE-Y7x57bg"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
