import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { TankProps } from "./TankProps";

interface GameClientContextType {
  tanks: TankProps[];
}

const GameClientContext = createContext<GameClientContextType | null>(null);

export const GameClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tanks, setTanks] = useState<TankProps[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5296/ws");

    socket.addEventListener("message", (event) => {
      try {
        const gameState = JSON.parse(event.data);
        setTanks(gameState);
      } catch (error) {
        console.error("Failed to parse game state:", error);
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <GameClientContext.Provider value={{ tanks }}>
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
