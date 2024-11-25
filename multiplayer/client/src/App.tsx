import "./App.css";
import { GameServerProvider } from "./assets/tank/GameServerContext";
import PlayerControls from "./assets/tank/PlayerControls";
import Tank from "./assets/tank/Tank";

function App() {
  return (
    <GameServerProvider>
      <PlayerControls/>
        <Tank/>
    </GameServerProvider>
  );
}

export default App;
