import React from "react";
import AthleteList from "./components/AthleteList";
import './App.css'; 
import "bulma/css/bulma.css";
/* Code écrit par moi : 60% */
function App() {
  return (
    <div>
      <h1 
        className="title has-text-centered mt-4" 
        onClick={() => window.location.reload()} 
        style={{ cursor: "pointer" }}
      >
        Bienvenue
      </h1>
      
      <AthleteList />
    </div>
  );
}

export default App;