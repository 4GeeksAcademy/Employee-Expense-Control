import React, { useRef } from "react";
import Sketch from "react-p5";

const AnimatedBackground = () => {
  const points = useRef([]);
  const pointCount = 5000;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noStroke();
    p5.frameRate(60);

    // Crear puntos con forma general de rostro ovalado
    for (let i = 0; i < pointCount; i++) {
      let angle = p5.random(p5.TWO_PI);
      let radiusX = p5.random(160, 160);
      let radiusY = p5.random(200, 200);
      let x = p5.cos(angle) * radiusX;
      let y = p5.sin(angle) * radiusY;

      // Simulación 3D con Z y variación
      let z = p5.random(-20, 20);

      points.current.push({ x, y, z, baseX: x, baseY: y, baseZ: z });
    }
  };

  const draw = (p5) => {
    p5.background(13, 13, 13);
    p5.translate(p5.width / 2, p5.height / 2);

    const mouseOffsetX = (p5.mouseX - p5.width / 2) * 0.002;
    const mouseOffsetY = (p5.mouseY - p5.height / 2) * 0.002;

    for (let i = 0; i < points.current.length; i++) {
      const pt = points.current[i];

      // Simular movimiento de cabeza con el puntero
      let moveX = pt.baseX + pt.z * mouseOffsetX * 60;
      let moveY = pt.baseY + pt.z * mouseOffsetY * 60;

      // Color tipo estrella tenue
      p5.fill(242, 242, 242, 200); // ghost white
      p5.circle(moveX, moveY, 1.5);
    }
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
};

export default AnimatedBackground;
