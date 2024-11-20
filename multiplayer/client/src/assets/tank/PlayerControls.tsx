import { useEffect } from "react";
import { updateVehicle } from "./GameServerContext";

function PlayerControls() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
          updateVehicle(1, "moveForward");
          break;
        case "s":
          updateVehicle(1, "moveBackward");
          break;
        case "a":
          updateVehicle(1, "turnLeft");
          break;
        case "d":
          updateVehicle(1, "turnRight");
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
          updateVehicle(1, "stopForwards");
          break;
        case "s":
          updateVehicle(1, "stopBackwards");
          break;
        case "a":
          updateVehicle(1, "stopLeft");
          break;
        case "d":
          updateVehicle(1, "stopRight");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return null;
}

export default PlayerControls;
