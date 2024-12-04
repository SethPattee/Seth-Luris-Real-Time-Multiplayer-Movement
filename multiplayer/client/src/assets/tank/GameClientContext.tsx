// import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
// import { TankProps } from "./TankProps";

// interface GameClientContextType {
//   tanks: TankProps[];
//   updateTankAction: (
//     tankId: number,
//     action:
//       | "moveForward"
//       | "moveBackward"
//       | "turnLeft"
//       | "turnRight"
//       | "stopForward"
//       | "stopBackward"
//       | "stopLeft"
//       | "stopRight"
//   ) => void;
// }

// export const GameClientContext = createContext<GameClientContextType | null>(null);

// export const GameClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
//   const [tanks, setTanks] = useState<TankProps[]>([]);
//   const [socket, setSocket] = useState<WebSocket | null>(null);

//   useEffect(() => {
//     const newSocket = new WebSocket("ws://localhost:5000/ws");

//     newSocket.addEventListener("open", () => {
//       console.log("Client WebSocket connected");
//       setSocket(newSocket);
//     });

//     newSocket.addEventListener("message", (event) => {
//       try {
//         const message = JSON.parse(event.data);
        
//         if (message.type === "GameState") {
//           // Directly update tanks with received game state
//           setTanks(message.data);
//         }
//       } catch (error) {
//         console.error("Failed to parse WebSocket message:", error);
//       }
//     });

//     newSocket.addEventListener("close", () => {
//       console.log("WebSocket connection closed");
//       setSocket(null);
//     });

//     newSocket.addEventListener("error", (error) => {
//       console.error("WebSocket error:", error);
//     });

//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   const updateTankAction = (
//     tankId: number,
//     action:
//       | "moveForward"
//       | "moveBackward"
//       | "turnLeft"
//       | "turnRight"
//       | "stopForward"
//       | "stopBackward"
//       | "stopLeft"
//       | "stopRight"
//   ) => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       // Send tank action to server
//       socket.send(JSON.stringify({ 
//         type: "TankAction", 
//         tankId, 
//         action 
//       }));
//     }
//   };

//   return (
//     <GameClientContext.Provider value={{ tanks, updateTankAction }}>
//       {children}
//     </GameClientContext.Provider>
//   );
// };

// export const useGameClient = () => {
//   const context = useContext(GameClientContext);
//   if (!context) {
//     throw new Error("useGameClient must be used within a GameClientProvider");
//   }
//   return context;
// };

import { createContext, FC, ReactNode, useContext, useEffect, useState, useCallback } from "react";
import { TankProps } from "./TankProps";

interface GameClientContextType {
  tanks: TankProps[];
  connectionStatus: 'connecting' | 'connected' | 'disconnected';
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
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  const connectWebSocket = useCallback(() => {
    console.log(`Attempting to connect to`);

    const newSocket = new WebSocket('ws://localhost:5000/ws');

    newSocket.addEventListener("open", () => {
      console.log("WebSocket connection established");
      setSocket(newSocket);
      setConnectionStatus('connected');
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
      console.log("WebSocket connection closed");
      setSocket(null);
      setConnectionStatus('disconnected');
      setTimeout(connectWebSocket, 3000);
    });

    newSocket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus('disconnected');
    });

    return newSocket;
  }, []);

  useEffect(() => {
    const socket = connectWebSocket();

    return () => {
      socket.close();
    };
  }, [connectWebSocket]);

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
      socket.send(JSON.stringify({ 
        type: "TankAction", 
        tankId, 
        action 
      }));
    }
  };

  return (
    <GameClientContext.Provider value={{ 
      tanks, 
      updateTankAction,
      connectionStatus 
    }}>
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