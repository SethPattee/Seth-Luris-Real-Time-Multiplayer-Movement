import { useGameServer } from "./GameServerContext";
import TankIcon from "./TankIcon";

const Tank = () => {
  const { tank } = useGameServer();

  return (

    <div
      style={{
        position: "absolute",
        width: "50px",
        height: "50px",
        top: `${tank.yPosition}px`,
        left: `${tank.xPosition}px`,
        transform: `rotate(${tank.rotation}deg)`,
      }}>

      <TankIcon />
    </div>
  );
};

export default Tank;
