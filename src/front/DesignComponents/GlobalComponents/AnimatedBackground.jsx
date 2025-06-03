import React from "react";
import Sketch from "react-p5";

const AnimatedBackground = () => {
  const cols = 40;
  const rows = 30;
  const grid = [];
  let angle = 0;
  let spacingX, spacingY;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(canvasParentRef);
    spacingX = p5.width / cols;
    spacingY = p5.height / rows;
    for (let x = 0; x < cols; x++) {
      grid[x] = [];
      for (let y = 0; y < rows; y++) {
        grid[x][y] = {
          z: 0,
        };
      }
    }
    p5.frameRate(60);
  };

  const draw = (p5) => {
    p5.background(13, 13, 13);
    p5.rotateX(p5.PI / 3);
    p5.translate(-p5.width / 2, -p5.height / 2);
    angle += 0.01;

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let d = p5.dist(x, y, cols / 2, rows / 2);
        let offset = p5.map(d, 0, 10, -p5.PI, p5.PI);
        grid[x][y].z = p5.sin(angle + offset) * 25; // más tenue
      }
    }

    for (let y = 0; y < rows - 1; y++) {
      p5.beginShape(p5.TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        let col = p5.lerpColor(p5.color('#448F73'), p5.color('#f2f2f2'), x / cols);
        col.setAlpha(80); // menos opacidad = más tenue
        p5.stroke(col);
        p5.strokeWeight(0.5); // líneas más finas
        p5.noFill();
        p5.vertex(x * spacingX, y * spacingY, grid[x][y].z);
        p5.vertex(x * spacingX, (y + 1) * spacingY, grid[x][y + 1].z);
      }
      p5.endShape();
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
