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
      <PlayerControls/>
      <Tank id={tank1.id} xPosition={tank1.xPosition} yPosition={tank1.yPosition} rotation={tank1.rotation} forward={tank1.forward} backward={tank1.backward} left={tank1.left} right={tank1.right} />
      <Tank id={tank2.id} xPosition={tank2.xPosition} yPosition={tank2.yPosition} rotation={tank2.rotation} forward={tank2.forward} backward={tank2.backward} left={tank2.left} right={tank2.right} />
    </GameServerProvider>
  );
}

export default App;
