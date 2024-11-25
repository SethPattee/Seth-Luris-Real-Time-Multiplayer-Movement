import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { TankProps } from "./TankProps";
import { moveVehicle } from "./vehicleUtils";
export interface GameserverContextType {
  tank: TankProps;
  updateVehicle: (
    id: number,
    vehicleAction:
      | "moveForward"
      | "moveBackward"
      | "turnLeft"
      | "turnRight"
      | "stopForwards"
      | "stopBackwards"
      | "stopLeft"
      | "stopRight"
  ) => void;
}

const GameserverContext = createContext<GameserverContextType | null>(null);
const tankid = 1;
export const GameServerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tank, setTank] = useState<TankProps>({
    id: 1, //change this 
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    foward: false,
    backwards: false,
    left: false,
    right: false,
  });

  const updateVehicle = (
    id: number,
    vehicleAction:
      | "moveForward"
      | "moveBackward"
      | "turnLeft"
      | "turnRight"
      | "stopForwards"
      | "stopBackwards"
      | "stopLeft"
      | "stopRight"
  ) => {
    setTank((prevTank) => {
      if (prevTank.id !== id) return prevTank;

      const newTank = { ...prevTank };
      console.log("update vehicle switch")
      switch (vehicleAction) {
        case "moveForward":
          newTank.foward = true;
          break;
        case "moveBackward":
          newTank.backwards = true;
          break;
        case "turnLeft":
          newTank.left = true;
          break;
        case "turnRight":
          console.log("turn right")
          newTank.right = true;
          break;
        case "stopForwards":
          newTank.foward = false;
          break;
        case "stopBackwards":
          newTank.backwards = false;
          break;
        case "stopLeft":
          newTank.left = false;
          break;
        case "stopRight":
          newTank.right = false;
          break;
        default:
          break;
      }

      return moveVehicle(newTank);
    });

  };

  useEffect(() => {
    const runLoop = () => {
      setTank((oldtank) => moveVehicle(oldtank));
      // console.log(tank);
      setTimeout(runLoop, 100);
    };
    runLoop();
  }, []);



  return (
    <GameserverContext.Provider value={{ tank, updateVehicle }}>
      {children}
    </GameserverContext.Provider>
  );
};

export const useGameServer = () => {
  const context = useContext(GameserverContext);
  if (!context) {
    throw new Error("Not in provider");
  }
  return context;
};


// export const updateVehicle = (
//   id: number,
//   vehicleAction:
//     | "moveForward" // 'w' pressed
//     | "moveBackward" // 's' pressed
//     | "turnLeft" // 'a' pressed
//     | "turnRight" // 'd' pressed
//     | "stopForwards" // when user lets go of 'w' key
//     | "stopBackwards" // when user lets go of 's' key
//     | "stopLeft" // when user lets go of 'a' key
//     | "stopRight" // when user lets go of 'd' key
// ) => {
//   switch (vehicleAction) {
//     case "moveForward":
//       console.log("moveForward");
//       break;
//     case "moveBackward":
//       console.log("moveBackward");
//       break;
//     case "turnLeft":
//       console.log("turnLeft");
//       break;
//     case "turnRight":
//       console.log("turnRight");
//       break;
//     case "stopForwards":
//       console.log("stopForwards");
//       break;
//     case "stopBackwards":
//       console.log("stopBackwards");
//       break;
//     case "stopLeft":
//   }
// };
