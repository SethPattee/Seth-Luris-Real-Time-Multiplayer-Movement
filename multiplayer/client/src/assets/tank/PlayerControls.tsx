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