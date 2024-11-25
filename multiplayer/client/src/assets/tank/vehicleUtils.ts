import { TankProps } from "./TankProps";

export const rotationSpeed = 5;
export const moveSpeed = 5;

export function moveVehicle(tank: TankProps): TankProps {
  const updatedTank = { ...tank };

  const rotationInRadians = (updatedTank.rotation * Math.PI) / 180;

  if (tank.left) {
    updatedTank.rotation += rotationSpeed;
  }

  if (tank.right) {
    updatedTank.rotation -= rotationSpeed;
  }

  if (tank.forward) {
    updatedTank.xPosition += Math.cos(rotationInRadians) * moveSpeed;
    updatedTank.yPosition += Math.sin(rotationInRadians) * moveSpeed;
  }

  if (tank.backward) {
    updatedTank.xPosition -= Math.cos(rotationInRadians) * moveSpeed;
    updatedTank.yPosition -= Math.sin(rotationInRadians) * moveSpeed;
  }

  return updatedTank;
}
