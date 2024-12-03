

import { useGameClient } from "./GameClientContext";
import Tank from "./Tank";

const GameClient = () => {
  const { tanks } = useGameClient();

  return (
    <div>
      {tanks.map((tank) => (
        <Tank key={tank.id} {...tank} />
      ))}
    </div>
  );
};

export default GameClient;