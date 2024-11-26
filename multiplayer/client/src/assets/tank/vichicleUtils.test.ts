import { expect, test } from "vitest";
import { moveSpeed, moveVehicle, rotationSpeed } from "./vehicleUtils";
import { TankProps } from "./TankProps";

test("rotates 90 degrees", () => {
  const tank: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    left: true,
    right: false,
    forward: false,
    backward: false,
  };
  const compareTank: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: rotationSpeed,
    left: true,
    right: false,
    forward: false,
    backward: false,
  };
  expect(moveVehicle(tank)).toStrictEqual(compareTank);
});

test("rotates 180 degrees", () => {
  const tank2: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    left: true,
    right: false,
    forward: false,
    backward: false,
  };
  const compareTank: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: rotationSpeed * 2,
    left: true,
    right: false,
    forward: false,
    backward: false,
  };
  const newtank = moveVehicle(tank2);
  expect(moveVehicle(newtank)).toStrictEqual(compareTank);
});

test("turns right", () => {
  const tank2: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    left: false,
    right: true,
    forward: false,
    backward: false,
  };
  const compareTank: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: - rotationSpeed * 2,
    left: false,
    right: true,
    forward: false,
    backward: false,
  };
  const newtank = moveVehicle(tank2);
  expect(moveVehicle(newtank)).toStrictEqual(compareTank);
});

test("moves forward", () => {
  const tank2: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    left: false,
    right: false,
    forward: true,
    backward: false,
  };
  const compareTank: TankProps = {
    id: 1,
    xPosition: 1,
    yPosition: 0,
    rotation: 0,
    left: false,
    right: false,
    forward: true,
    backward: false,
  };
  expect(moveVehicle(tank2)).toStrictEqual(compareTank);
})

test("moves forward 2", () => {
  const tank: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    left: false,
    right: false,
    forward: true,
    backward: false,
  };
  const compareTank: TankProps = {
    id: 1,
    xPosition: moveSpeed * 2,
    yPosition: 0,
    rotation: 0,
    left: false,
    right: false,
    forward: true,
    backward: false,
  };
  const tank2 = moveVehicle(tank);
  expect(tank2).toStrictEqual({...compareTank, xPosition: 1});
  expect(moveVehicle(tank2)).toStrictEqual(compareTank);
})


test("does not turn when neither left nor right is true", () => {
  const tank: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    left: false,
    right: false,
    forward: false,
    backward: false,
  };
  const result = moveVehicle(tank);
  expect(result.rotation).toBe(0);
});

test("moves directly on the X-axis", () => {
  const tank: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: 0, 
    left: false,
    right: false,
    forward: true,
    backward: false,
  };
  const result = moveVehicle(tank);
  expect(result.xPosition).toBeCloseTo(moveSpeed);
  expect(result.yPosition).toBeCloseTo(0);
});

test("moves directly on the Y-axis", () => {
  const tank: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    left: false,
    rotation: Math.PI / 2,
    right: false,
    forward: true,
    backward: false,
  };
  const result = moveVehicle(tank);
  expect(result.xPosition).toBeCloseTo(0);
  expect(result.yPosition).toBeCloseTo(moveSpeed);
});

test("moves at a 45-degree angle", () => {
  const tank: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: Math.PI / 4, // 45 degrees
    left: false,
    right: false,
    forward: true,
    backward: false,
  };
  const result = moveVehicle(tank);
  expect(result.xPosition).toBeCloseTo(moveSpeed * Math.cos(Math.PI / 4));
  expect(result.yPosition).toBeCloseTo(moveSpeed * Math.sin(Math.PI / 4));
});

test("moves at a 225-degree angle", () => {
  const tank: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: (5 * Math.PI) / 4, // 225 degrees
    left: false,
    right: false,
    forward: true,
    backward: false,
  };
  const result = moveVehicle(tank);
  expect(result.xPosition).toBeCloseTo(moveSpeed * Math.cos((5 * Math.PI) / 4));
  expect(result.yPosition).toBeCloseTo(moveSpeed * Math.sin((5 * Math.PI) / 4));
});

test("moves at a -45-degree angle", () => {
  const tank: TankProps = {
    id: 1,
    xPosition: 0,
    yPosition: 0,
    rotation: -Math.PI / 4, // -45 degrees 
    left: false,
    right: false,
    forward: true,
    backward: false,
  };
  const result = moveVehicle(tank);
  expect(result.xPosition).toBeCloseTo(moveSpeed * Math.cos(-Math.PI / 4));
  expect(result.yPosition).toBeCloseTo(moveSpeed * Math.sin(-Math.PI / 4));
});
