import React, { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import MovieList from "./components/MovieList";

function App() {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="App">
      <header className="App-header">Fontend React Test</header>
      <div className="main-container">
        <nav className="sidebar">
          <ul>
            <li>
              <button
                onClick={() => setActiveView("dashboard")}
                className={activeView === "dashboard" && "active-view"}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView("movieList")}
                className={activeView === "movieList" && "active-view"}
              >
                List
              </button>
            </li>
          </ul>
        </nav>
        <main className="content">
          {activeView === "dashboard" && <Dashboard />}
          {activeView === "movieList" && <MovieList />}
        </main>
      </div>
    </div>
  );
}

export default App;
