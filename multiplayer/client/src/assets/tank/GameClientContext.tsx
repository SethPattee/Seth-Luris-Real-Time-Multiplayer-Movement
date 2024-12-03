import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { TankProps } from "./TankProps";

interface GameClientContextType {
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

export const GameClientContext = createContext<GameClientContextType | null>(null);

export const GameClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tanks, setTanks] = useState<TankProps[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const newSocket = new WebSocket("ws://localhost:5000/ws");

      newSocket.addEventListener("open", () => {
        setSocket(newSocket);
      });

      newSocket.addEventListener("message", (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === "GameState") {
            setTanks(message.data);
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      });

      newSocket.addEventListener("close", () => {
        setSocket(null);
      });

      newSocket.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
      });

      return () => {
        console.log("Cleaning up WebSocket connection...");
        newSocket.close();
      };
    };

    connectWebSocket();
  }, []);


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
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "TankAction", tankId, action }));
    }
  };

  return (
    <GameClientContext.Provider value={{ tanks, updateTankAction }}>
      {children}
    </GameClientContext.Provider>
  );
};

export const useGameClient = () => {
  const context = useContext(GameClientContext);
  if (!context) {
    throw new Error("useGameClient must be used within a GameClientProvider");
  }
  return context;
};
