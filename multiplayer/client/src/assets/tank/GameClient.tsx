import { useEffect } from "react";
import { useGameClient } from "./GameClientContext";
import Tank from "./Tank";
import TankIcon from "./TankIcon";

const GameClient = () => {
  const { tanks, updateTankAction, connectionStatus } = useGameClient();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        // Player 2 (Arrow keys)
        case "ArrowUp":
          updateTankAction(2, "moveForward");
          break;
        case "ArrowDown":
          updateTankAction(2, "moveBackward");
          break;
        case "ArrowLeft":
          updateTankAction(2, "turnLeft");
          break;
        case "ArrowRight":
          updateTankAction(2, "turnRight");
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        // Player 2 (Arrow keys)
        case "ArrowUp":
          updateTankAction(2, "stopForward");
          break;
        case "ArrowDown":
          updateTankAction(2, "stopBackward");
          break;
        case "ArrowLeft":
          updateTankAction(2, "stopLeft");
          break;
        case "ArrowRight":
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

  if (connectionStatus !== 'connected') {
    return (
      <div>
        <h2>Connecting to Game Server</h2>
        <p>Status: {connectionStatus}</p>
      </div>
    );
  }

  return (
    <div>
      {tanks.map((tank) => (
        <TankClient key={tank.id} {...tank} />
      ))}
    </div>
  );
};

export default GameClient;

const TankClient = ({ id }: { id: number }) => {
  const { tanks } = useGameClient();
  const tank = tanks.find((t) => t.id === id);

  if (!tank) return null;

  return (
    <div
      style={{
        position: "absolute",
        width: "50px",
        height: "50px",
        top: `${tank.yPosition}px`,
        left: `${tank.xPosition}px`,
        transform: `rotate(${tank.rotation}deg)`,
        backgroundColor: id === 1 ? "blue" : "red",
      }}
    >
      <TankIcon />
    </div>
  );
};
