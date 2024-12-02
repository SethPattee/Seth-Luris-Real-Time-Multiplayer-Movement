import { useEffect } from "react";
import { useGameServer } from "./GameServerContext";
const PlayerControls = () => {
  const { updateTankAction } = useGameServer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        // Player 1 (WASD)
        case "w":
          updateTankAction(1, "moveForward");
          break;
        case "s":
          updateTankAction(1, "moveBackward");
          break;
        case "a":
          updateTankAction(1, "turnLeft");
          break;
        case "d":
          updateTankAction(1, "turnRight");
          break;

        // Player 2 (IJKL)
        case "i":
          updateTankAction(2, "moveForward");
          break;
        case "k":
          updateTankAction(2, "moveBackward");
          break;
        case "j":
          updateTankAction(2, "turnLeft");
          break;
        case "l":
          updateTankAction(2, "turnRight");
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        // Player 1 (WASD)
        case "w":
          updateTankAction(1, "stopForward");
          break;
        case "s":
          updateTankAction(1, "stopBackward");
          break;
        case "a":
          updateTankAction(1, "stopLeft");
          break;
        case "d":
          updateTankAction(1, "stopRight");
          break;

        // Player 2 (IJKL)
        case "i":
          updateTankAction(2, "stopForward");
          break;
        case "k":
          updateTankAction(2, "stopBackward");
          break;
        case "j":
          updateTankAction(2, "stopLeft");
          break;
        case "l":
          updateTankAction(2, "stopRight");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [updateTankAction]);

  return null;
};

export default PlayerControls;
