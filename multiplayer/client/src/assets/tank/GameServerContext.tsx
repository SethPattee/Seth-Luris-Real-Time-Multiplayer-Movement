import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { TankProps } from "./TankProps";
import { moveVehicle } from "./vehicleUtils";

interface GameServerContextType {
  tanks: TankProps[];
  updateTankAction: (
    tankId: number,
    action:
      | "moveForward"
      | "moveBackward"
      | "turnLeft"
      | "turnRight"
      | "stopForward"
      | "stopBackward"
      | "stopLeft"
      | "stopRight"
  ) => void;
}

const GameServerContext = createContext<GameServerContextType | null>(null);

export const GameServerProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialTanks: TankProps[] = [
    { id: 1, xPosition: 100, yPosition: 0, rotation: 0, forward: false, backward: false, left: false, right: false },
    { id: 2, xPosition: 0, yPosition: 100, rotation: 0, forward: false, backward: false, left: false, right: false },
  ];
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  const [tanks, setTanks] = useState<TankProps[]>(initialTanks);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:5000/ws');

    newSocket.addEventListener('open', () => {
      console.log('WebSocket connection opened');
      newSocket.send(JSON.stringify({ type: 'GameState', data: initialTanks }));
    });

    newSocket.addEventListener('message', (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.type === 'TankAction') {
          updateTankAction(message.tankId, message.action);
        }
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
      console.log('WebSocket connection cleanup');
    };
  }, []);

  const sendGameState = (updatedTanks: TankProps[]) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'GameState', data: updatedTanks }));
    }
    else{
      console.log('WebSocket is not open');
    }
  };

  const updateTankAction = (
    tankId: number,
    action:
      | "moveForward"
      | "moveBackward"
      | "turnLeft"
      | "turnRight"
      | "stopForward"
      | "stopBackward"
      | "stopLeft"
      | "stopRight"
  ) => {
    setTanks((prevTanks) =>
      prevTanks.map((tank) => {
        if (tank.id !== tankId) return tank;

        const updatedTank = { ...tank };
        switch (action) {
          case "moveForward":
            updatedTank.forward = true;
            break;
          case "moveBackward":
            updatedTank.backward = true;
            break;
          case "turnLeft":
            updatedTank.left = true;
            break;
          case "turnRight":
            updatedTank.right = true;
            break;
          case "stopForward":
            updatedTank.forward = false;
            break;
          case "stopBackward":
            updatedTank.backward = false;
            break;
          case "stopLeft":
            updatedTank.left = false;
            break;
          case "stopRight":
            updatedTank.right = false;
            break;
        }
        return updatedTank;
      })
    );
  };

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setTanks((prevTanks) => {
        const updatedTanks = prevTanks.map((tank) => moveVehicle(tank));
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: 'GameState', data: updatedTanks }));
        }
        return updatedTanks;
      });
    }, 100);
    return () => clearInterval(gameLoop);
  }, [socket]);

  return (
    <GameServerContext.Provider value={{ tanks, updateTankAction }}>
      {children}
    </GameServerContext.Provider>
  );
};

export const useGameServer = () => {
  const context = useContext(GameServerContext);
  if (!context) {
    throw new Error("useGameServer must be used within a GameServerProvider");
  }
  return context;
};