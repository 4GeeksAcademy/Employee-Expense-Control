import React from "react";
import Sketch from "react-p5";

const AnimatedBackground = () => {
  let nodes = [];
  const nodeCount = 220;
  let maxDist = 120;
  const grays = [
    [220, 220, 220],
    [160, 160, 160],
    [80, 80, 80],
    [40, 40, 40],
  ];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        vx: p5.random(-0.5, 0.5),
        vy: p5.random(-0.5, 0.5),
        s: p5.random(2, 6),
        c: p5.random(grays),
      });
    }
  };

  const draw = (p5) => {
    p5.background(12, 12, 12, 225);
    for (let i = 0; i < nodes.length; i++) {
      let n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > p5.width) n.vx *= -1;
      if (n.y < 0 || n.y > p5.height) n.vy *= -1;
      for (let j = i + 1; j < nodes.length; j++) {
        let m = nodes[j];
        let d = p5.dist(n.x, n.y, m.x, m.y);
        if (d < maxDist) {
          let alpha = p5.map(d, 0, maxDist, 110, 0);
          let w = p5.map(d, 0, maxDist, 2.2, 0.2);
          p5.stroke(p5.lerpColor(p5.color(n.c), p5.color(m.c), 0.5), alpha);
          p5.strokeWeight(w + 0.5 * p5.sin(p5.frameCount * 0.01 + d));
          p5.line(n.x, n.y, m.x, m.y);
        }
      }
      p5.noStroke();
      let glow = 19 + 13 * p5.sin(p5.frameCount * 0.017 + i * 0.23);
      p5.fill(n.c[0], n.c[1], n.c[2], 65 + glow * 2.5);
      p5.ellipse(n.x, n.y, n.s + glow * 0.13);
    }
    let t = p5.millis() / 900;
    let mouseInfluence = p5.map(p5.dist(p5.mouseX, p5.mouseY, p5.width / 2, p5.height / 2), 0, p5.width / 2, 1.65, 0.5);
    maxDist = 95 * mouseInfluence + 22 * p5.sin(t * 1.6);
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