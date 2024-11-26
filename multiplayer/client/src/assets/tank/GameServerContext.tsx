import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { TankProps } from "./TankProps";
import { moveVehicle } from "./vehicleUtils";





interface GameServerContextType {
  tank: TankProps;
  updateTankAction: (
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
  // addTank: (tank: TankProps) => void;
}

const GameServerContext = createContext<GameServerContextType | null>(null);

export const GameServerProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {

  const tank1: TankProps = {
    id: 1,
    xPosition: 100,
    yPosition: 0,
    rotation: 0,
    forward: false,
    backward: false,
    left: false,
    right: false
  }
  
  const tank2: TankProps = {
    id: 2,
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    forward: false,
    backward: false,
    left: false,
    right: false
  }
  const [tanks, setTanks] = useState<TankProps[]>([tank1, tank2]);
  const [tank, setTank] = useState<TankProps>({
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const updateTankAction = (
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
    setTank((prevTank) => {
      const updatedTank = { ...prevTank };
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
        default:
          break;
      }
      return updatedTank;
    });
  };

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setTank((prevTank) => moveVehicle(prevTank));
    }, 100);

    return () => clearInterval(gameLoop);
  }, []);

  // const addTank = () => {
  //   setTank((prevTank) => {
  //     return {
  //       id: prevTank.id + 1,
  //       xPosition: 0,
  //       yPosition: 0,
  //       rotation: 0,
  //       forward: false,
  //       backward: false,
  //       left: false,
  //       right: false,
  //     };
  //   });
  // }

  return (
    <GameServerContext.Provider value={{ tank, updateTankAction }}>
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
