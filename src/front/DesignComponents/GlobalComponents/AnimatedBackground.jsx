import React, { useRef, useState } from "react";
import Sketch from "react-p5";
import { useNavigate } from "react-router-dom";

const AnimatedBackground = () => {
  const [logo, setLogo] = useState(null);
  const points = useRef([]);
  const pointCount = 5000;
  const navigate = useNavigate();

  const logoBounds = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.noStroke();
    p5.frameRate(80);
ghost.png
    const logoImg = p5.loadImage("https://res.cloudinary.com/dzcl2whin/image/upload/v1750099848/ghost_g2nv7j.png", (img) => {
      setLogo(img);
    });

    points.current = [];
    for (let i = 0; i < pointCount; i++) {
      let x = p5.random(-p5.width, p5.width);
      let y = p5.random(-p5.height, p5.height);
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

     // Draw logo and track bounds
  if (logo) {
    const logoW = p5.windowWidth * 0.05;
    const logoH = logoW;
    const margin = 20;

    logoBounds.current = { x: margin, y: margin, w: logoW, h: logoH };

    p5.image(logo, margin, margin, logoW, logoH);

    // ✅ Detect hover and change cursor
    if (
      p5.mouseX >= margin &&
      p5.mouseX <= margin + logoW &&
      p5.mouseY >= margin &&
      p5.mouseY <= margin + logoH
    ) {
      p5.cursor("pointer");
    } else {
      p5.cursor("default");
    }
  }
};

  

  const mousePressed = (p5) => {
    const { x, y, w, h } = logoBounds.current;
    if (
      p5.mouseX >= x &&
      p5.mouseX <= x + w &&
      p5.mouseY >= y &&
      p5.mouseY <= y + h
    ) {
      navigate("/"); // or whatever route you want
    }
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mousePressed={mousePressed}
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
        pointerEvents: "auto", // important to allow mouse click
      }}
    />
  );
};

export default AnimatedBackground;
