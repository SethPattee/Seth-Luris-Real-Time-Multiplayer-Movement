import { useState } from "react";
import "./App.css";
import { GameServerProvider } from "./assets/tank/GameServerContext";
import { GameClientProvider } from "./assets/tank/GameClientContext";
import PlayerControls from "./assets/tank/PlayerControls";
import Tank from "./assets/tank/Tank";
import GameClient from "./assets/tank/GameClient";

function App() {
  const [role, setRole] = useState<"server" | "client" | null>(null);

  if (role === null) {
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
      <GameClient />
    </GameClientProvider>
  );
}

export default App;
