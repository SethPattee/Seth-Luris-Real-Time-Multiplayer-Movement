import { useEffect } from "react";
import { useGameServer } from "./GameServerContext";

function PlayerControls() {
  const gameconst = useGameServer();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      switch (e.key) {
        case "w":
          gameconst.updateVehicle(1, "moveForward");
          break;
        case "s":
          gameconst.updateVehicle(1, "moveBackward");
          break;
        case "a":
          gameconst.updateVehicle(1, "turnLeft");
          break;
        case "d":
          gameconst.updateVehicle(1, "turnRight");
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      console.log(e.key);
      switch (e.key) {
        case "w":
          gameconst.updateVehicle(1, "stopForwards");
          break;
        case "s":
          gameconst.updateVehicle(1, "stopBackwards");
          break;
        case "a":
          gameconst.updateVehicle(1, "stopLeft");
          break;
        case "d":
          gameconst.updateVehicle(1, "stopRight");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameconst]);

  return <> </>;
}

export default PlayerControls;
