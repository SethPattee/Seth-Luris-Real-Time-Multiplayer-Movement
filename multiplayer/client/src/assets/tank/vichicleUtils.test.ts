import { expect, test } from "vitest";
import { fowardAmount, moveVehicle, rotationAmount } from "./vehicleUtils";
import { TankProps } from "./TankProps";

test("rotates 90 degrees", () => {
  const tank: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    viewBox: 50,
    stroke: "#000000",
    width: 50,
    left: true,
    right: false,
    foward: false,
    backwards: false,
  };
  const compareTank: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: rotationAmount,
    viewBox: 50,
    stroke: "#000000",
    width: 50,
    left: true,
    right: false,
    foward: false,
    backwards: false,
  };
  expect(moveVehicle(tank)).toStrictEqual(compareTank);
});

test("rotates 180 degrees", () => {
  const tank2: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    viewBox: 50,
    stroke: "#000000",
    width: 50,
    left: true,
    right: false,
    foward: false,
    backwards: false,
  };
  const compareTank: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: rotationAmount * 2,
    viewBox: 50,
    stroke: "#000000",
    width: 50,
    left: true,
    right: false,
    foward: false,
    backwards: false,
  };
  const newtank = moveVehicle(tank2);
  expect(moveVehicle(newtank)).toStrictEqual(compareTank);
});

test("turns right", () => {
  const tank2: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    viewBox: 50,
    stroke: "#000000",
    width: 50,
    left: false,
    right: true,
    foward: false,
    backwards: false,
  };
  const compareTank: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: - rotationAmount * 2,
    viewBox: 50,
    stroke: "#000000",
    width: 50,
    left: false,
    right: true,
    foward: false,
    backwards: false,
  };
  const newtank = moveVehicle(tank2);
  expect(moveVehicle(newtank)).toStrictEqual(compareTank);
});

test("moves forward", () => {
  const tank2: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    viewBox: 50,
    stroke: "#000000",
    width: 50,
    left: false,
    right: false,
    foward: true,
    backwards: false,
  };
  const compareTank: TankProps = {
    xPosition: 1,
    yPosition: 0,
    rotation: 0,
    viewBox: 50,
    stroke: "#000000",
    width: 50,
    left: false,
    right: false,
    foward: true,
    backwards: false,
  };
  expect(moveVehicle(tank2)).toStrictEqual(compareTank);
})

test("moves forward 2", () => {
  const tank: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    viewBox: 50,
    stroke: "#000000",
    width: 50,
    left: false,
    right: false,
    foward: true,
    backwards: false,
  };
  const compareTank: TankProps = {
    xPosition: fowardAmount * 2,
    yPosition: 0,
    rotation: 0,
    viewBox: 50,
    stroke: "#000000",
    width: 50,
    left: false,
    right: false,
    foward: true,
    backwards: false,
  };
  const tank2 = moveVehicle(tank);
  expect(tank2).toStrictEqual({...compareTank, xPosition: 1});
  expect(moveVehicle(tank2)).toStrictEqual(compareTank);
})


test("does not turn when neither left nor right is true", () => {
  const tank: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: 0,
    left: false,
    right: false,
    foward: false,
    backwards: false,
  };
  const result = moveVehicle(tank);
  expect(result.rotation).toBe(0);
});

test("moves directly on the X-axis", () => {
  const tank: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: 0, 
    left: false,
    right: false,
    foward: true,
    backwards: false,
  };
  const result = moveVehicle(tank);
  expect(result.xPosition).toBeCloseTo(fowardAmount);
  expect(result.yPosition).toBeCloseTo(0);
});

test("moves directly on the Y-axis", () => {
  const tank: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: Math.PI / 2,
    right: false,
    foward: true,
    backwards: false,
  };
  const result = moveVehicle(tank);
  expect(result.xPosition).toBeCloseTo(0);
  expect(result.yPosition).toBeCloseTo(fowardAmount);
});

test("moves at a 45-degree angle", () => {
  const tank: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: Math.PI / 4, // 45 degrees
    left: false,
    right: false,
    foward: true,
    backwards: false,
  };
  const result = moveVehicle(tank);
  expect(result.xPosition).toBeCloseTo(fowardAmount * Math.cos(Math.PI / 4));
  expect(result.yPosition).toBeCloseTo(fowardAmount * Math.sin(Math.PI / 4));
});

test("moves at a 225-degree angle", () => {
  const tank: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: (5 * Math.PI) / 4, // 225 degrees
    left: false,
    right: false,
    foward: true,
    backwards: false,
  };
  const result = moveVehicle(tank);
  expect(result.xPosition).toBeCloseTo(fowardAmount * Math.cos((5 * Math.PI) / 4));
  expect(result.yPosition).toBeCloseTo(fowardAmount * Math.sin((5 * Math.PI) / 4));
});

test("moves at a -45-degree angle", () => {
  const tank: TankProps = {
    xPosition: 0,
    yPosition: 0,
    rotation: -Math.PI / 4, // -45 degrees 
    left: false,
    right: false,
    foward: true,
    backwards: false,
  };
  const result = moveVehicle(tank);
  expect(result.xPosition).toBeCloseTo(fowardAmount * Math.cos(-Math.PI / 4));
  expect(result.yPosition).toBeCloseTo(fowardAmount * Math.sin(-Math.PI / 4));
});
