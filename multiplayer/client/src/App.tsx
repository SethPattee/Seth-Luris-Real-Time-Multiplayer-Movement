import "./App.css";
import { GameServerProvider } from "./assets/tank/GameServerContext";
import PlayerControls from "./assets/tank/PlayerControls";
import Tank from "./assets/tank/Tank";
import { TankProps } from "./assets/tank/TankProps";

const tank1: TankProps = {
  id: 1,
  xPosition: 100,
  yPosition: 0,
  rotation: 0,
  forward: false,
  backward: false,
  left: false,
  right: false
}

const tank2: TankProps = {
  id: 2,
  xPosition: 0,
  yPosition: 0,
  rotation: 0,
  forward: false,
  backward: false,
  left: false,
  right: false
}
function App() {
  return (
    <GameServerProvider>
      <PlayerControls />
      <Tank id={1} />
      <Tank id={2} />
    </GameServerProvider>
  );
}

export default App;


