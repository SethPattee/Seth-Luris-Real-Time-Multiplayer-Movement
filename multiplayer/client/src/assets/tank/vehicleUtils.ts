import { TankProps } from "./TankProps";

export const rotationAmount = 0.1;
export const fowardAmount = 1;

export function moveVehicle(tank: TankProps) {
    const newTank = { ...tank };
  
    if (tank.left) {
        
        newTank.rotation += rotationAmount;
    }

    if (tank.right) {
        console.log("moving tank to turn right")
        console.log(newTank.rotation)
        newTank.rotation -= rotationAmount;
    }

    if (tank.foward) {
        newTank.xPosition += (fowardAmount* Math.cos(newTank.rotation));
        newTank.yPosition += (fowardAmount * Math.sin(newTank.rotation));
    }

    if (tank.backwards) {
        newTank.xPosition -= (fowardAmount* Math.cos(newTank.rotation));
        newTank.yPosition -= (fowardAmount * Math.sin(newTank.rotation));
    }
  
    return newTank;
}
