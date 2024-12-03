import { useGameServer } from "./GameServerContext";
import TankIcon from "./TankIcon";

const Tank = ({ id }: { id: number }) => {
  const { tanks } = useGameServer();
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

export default Tank;
