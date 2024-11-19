export interface TankProps {
    id?:number;
    xPosition: number;
    yPosition: number;
    rotation: number;
    viewBox?: number;
    stroke?: string;
    width?: number;
    left?: boolean;
    right?: boolean;
    foward: boolean;
    backwards: boolean;
}