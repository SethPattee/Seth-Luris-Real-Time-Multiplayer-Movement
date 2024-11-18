import TankIcon from "./TankIcon";



function Tank() {
    const xPosition = 30;
    const yPosition = 30;
    const rotation = 0;
    const viewBox = 50;
  return (
    <>
      <div
        style={{
          position: "fixed",
          rotate: `${rotation}deg`,
          stroke: "#000000",
          width: `${viewBox}px`,
          height: `${viewBox}px`,
          top: `${xPosition}px`,
          left: `${yPosition}px`,
        }}
      >
        <TankIcon />
      </div>
    </>
  );
}

export default Tank;
