import { useState } from "react";
import "./App.css";
import { GameServerProvider } from "./assets/tank/GameServerContext";
import PlayerControls from "./assets/tank/PlayerControls";
import Tank from "./assets/tank/Tank";
import { TankProps } from "./assets/tank/TankProps";
import GameClient from "./assets/tank/GameClient";
import { GameClientProvider } from "./assets/tank/GameClientContext";

function App() {
  const [role, setRole] = useState<"server" | "client" | null>(null);

  if (!role) {
    return (
      <div>
        <h1>Select Role</h1>
        <button onClick={() => setRole("server")}>Start as Server</button>
        <button onClick={() => setRole("client")}>Join as Client</button>
      </div>
    );
  }

  return role === "server" ? (
    <GameServerProvider>
      <PlayerControls />
      <Tank id={1} />
      <Tank id={2} />
    </GameServerProvider>
  ) : (
    <GameClientProvider>
    <GameClient>
      {/* <PlayerControls />  need a client version of this */} 
    </GameClient>
    </GameClientProvider>
  );
}

export default App;