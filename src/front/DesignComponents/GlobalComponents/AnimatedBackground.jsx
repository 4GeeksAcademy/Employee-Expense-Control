import React, { useRef, useState } from "react";
import Sketch from "react-p5";

const AnimatedBackground = () => {
  const [logo, setLogo] = useState(null);
  const points = useRef([]);
  const pointCount = 5000;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noStroke();
    p5.frameRate(80);

    const logoImg = p5.loadImage("/src/front/assets/img/ghost.png", (img) => {
      setLogo(img);
    });

    points.current = [];
    for (let i = 0; i < pointCount; i++) {
      let x = p5.random(-p5.width / 1, p5.width / 1);
      let y = p5.random(-p5.height / 1, p5.height / 1);
      let z = p5.random(-60, 60);
      let color = i < pointCount / 2 ? [242, 242, 242, 160] : [68, 143, 115, 160];
      points.current.push({ x, y, z, baseX: x, baseY: y, baseZ: z, color });
    }
  };

  const draw = (p5) => {
    p5.background(13, 13, 13);

    const mouseOffsetX = (p5.mouseX - p5.width / 2) * 0.001;
    const mouseOffsetY = (p5.mouseY - p5.height / 2) * 0.001;

    for (let i = 0; i < points.current.length; i++) {
      const pt = points.current[i];
      let moveX = pt.baseX + pt.z * mouseOffsetX * 40;
      let moveY = pt.baseY + pt.z * mouseOffsetY * 40;

      p5.fill(...pt.color);
      p5.circle(moveX, moveY, 2);
    }

    
    if (logo) {
      const logoW = p5.windowWidth * 0.05;
      const logoH = logoW;
      const margin = 20;
      p5.image(logo, margin, margin, logoW, logoH);
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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default AnimatedBackground;
