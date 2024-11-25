import { useEffect } from "react";
import { useGameServer } from "./GameServerContext";

const PlayerControls = () => {
  const { updateTankAction } = useGameServer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
          updateTankAction("moveForward");
          break;
        case "s":
          updateTankAction("moveBackward");
          break;
        case "a":
          updateTankAction("turnLeft");
          break;
        case "d":
          updateTankAction("turnRight");
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
          updateTankAction("stopForward");
          break;
        case "s":
          updateTankAction("stopBackward");
          break;
        case "a":
          updateTankAction("stopLeft");
          break;
        case "d":
          updateTankAction("stopRight");
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
