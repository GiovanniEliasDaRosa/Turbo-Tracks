// Setup variables
let imagesLoaded = 0;
let maxImagesToLoad = 0;
let canstartgame = false;
const streetimg = CreateNewImage("street.png");
const wallimg = CreateNewImage("wall.png");
const carimg = CreateNewImage("car.png");

let score = 0;
let wallsnumber = 0;
let scoreInterval = "";
let wallgenerator = "";

let selectedlane = 1;
let y = 0;
let running = 0;
let speed = 1;
let carx = 8 + selectedlane * 16;
let gameover = false;
let botisplaying = true;
let walls = [];

let timeonthree = 0;
scoreText.innerText = 0;

ctx.imageSmoothingEnabled = false;
ctx.imageSmoothingQuality = "low";

async function StarNewGame(who = "user") {
  if (!canstartgame) return;

  let newDraw = gameover;
  Disable(playbutton, false);

  if (who != "bot") {
    botisplaying = false;
    Disable(playbutton);
    scoreText.innerText = 0;
  }

  gameover = false;
  score = 0;
  timeonthree = 0;
  speed = 0.1;
  clearInterval(scoreInterval);

  let timeleft = 10;
  let quant = 0.1;
  let wanted = 1;
  if (botisplaying) {
    timeleft = 15;
    wanted = 1.5;
  }

  let speedupinterval = setInterval(() => {
    speed += quant;
    if (speed > wanted) {
      speed = wanted;
      clearInterval(speedupinterval);
    }
    timeleft += 1 / speed;
  }, 1000 / timeleft);

  walls = [];
  wallsnumber = 0;
  clearInterval(wallgenerator);

  if (newDraw) {
    draw();
  }

  await wait(1000);
  if (botisplaying) {
    Enable(playbutton);
  } else {
    scoreInterval = setInterval(() => {
      if (gameover) {
        clearInterval(wallgenerator);
        clearInterval(scoreInterval);
        scoreText.innerText = Math.round(score);

        setTimeout(() => {
          botisplaying = true;
          Enable(playbutton, false);
          StarNewGame("bot");
        });
        return;
      }
      score += 1 * speed;
      if (speed < 3) {
        speed = Clamp(speed + 0.1, 1, 3);
      } else {
        timeonthree++;
        if (timeonthree > 9) {
          speed = Clamp(speed + 0.1, 3, 8);
        }
      }

      scoreText.innerText = Math.round(score);
    }, 1000);
  }

  wallgenerator = setInterval(() => {
    NewWall();
  }, 800);
}

window.onkeydown = (e) => {
  if ((e.key != "ArrowLeft" && e.key != "ArrowRight") || botisplaying) return;

  if (e.key == "ArrowLeft") {
    if (selectedlane != 0) {
      selectedlane--;
    }
  } else if (e.key == "ArrowRight") {
    if (selectedlane != 2) {
      selectedlane++;
    }
  }
};

function NewWall() {
  let newwall = {
    x: RandomNumber(0, 3),
    y: Math.floor((running + 16) / 16) * -16,
  };
  walls.push(newwall);
  wallsnumber++;
}

function draw() {
  ctx.clearRect(0, 0, canvaswidth, canvasheight);
  y += speed;
  running += speed;
  carx = 8 + selectedlane * 16;
  ctx.drawImage(streetimg, 0, 0 + y);
  ctx.drawImage(streetimg, 0, -256 + y);

  let exclude = [];
  let haswalls = [];
  let closestwall = 0;
  // point(carx, 100, carx, 240);

  for (let i = 0; i < walls.length; i++) {
    const cur = walls[i];
    let xpos = 8 + cur.x * 16;
    let ypos = cur.y + running;
    ctx.drawImage(wallimg, xpos, ypos);

    if (ypos < walls[closestwall].y && ypos < 240) {
      closestwall = i;
    }

    if (ypos > 128) {
      haswalls.push({
        x: cur.x,
        y: cur.y,
      });
    }

    if (cur.y + running > canvasheight) {
      exclude.push(i);
    }

    if (carx == xpos && ypos > 235) {
      if (!botisplaying) {
        gameover = true;
      } else {
        console.warn("Die");
      }
    }
  }

  // if (wallsnumber != 0 && haswalls.length != 0) {
  //   point(carx, walls[closestwall].y + running);
  // }

  if (botisplaying) {
    let foundsomewall = false;
    // point(carx, walls[closestwall].y + running);

    for (let i = 0; i < haswalls.length; i++) {
      let xpos = 8 + haswalls[i].x * 16;
      if (foundsomewall) continue;

      if (carx == xpos) {
        foundsomewall = true;
        let wanted = selectedlane + 1;
        let gothere = false;
        let result = 0;

        if (selectedlane != 2) {
          gothere = true;
          for (let i = 0; i < haswalls.length; i++) {
            if (haswalls[i].x == wanted) {
              gothere = false;
            }
          }
        }

        if (gothere) {
          result = 1;
        } else if (selectedlane != 0) {
          let wanted = selectedlane - 1;
          gothere = true;
          for (let i = 0; i < haswalls.length; i++) {
            if (haswalls[i].x == wanted) {
              gothere = false;
            }
          }
          if (gothere) {
            result = -1;
          }
        }

        if (!gothere) {
          if (closestwall == selectedlane) {
            let closewall = walls[closestwall];

            if (selectedlane != 2) {
              gothere = false;

              for (let i = 0; i < haswalls.length; i++) {
                if (i == closestwall) continue;

                // point(carx, walls[closestwall].y + running, carx, haswalls[i].y + running);
                // console.log(haswalls[i].y + running, closewall.y + running);
                if (haswalls[i].y + running < closewall.y + running) {
                  gothere = true;
                } else {
                  gothere = false;
                }
              }
              if (gothere) {
                console.log(`!gothere ${closestwall} == ${selectedlane} && ${selectedlane} != 2`);
                result = 1;
              }
            } else if (selectedlane != 0) {
              gothere = false;

              for (let i = 0; i < haswalls.length; i++) {
                if (i == closestwall) continue;

                point(carx, walls[closestwall].y + running, carx, haswalls[i].y + running);
                console.log(haswalls[i].y + running, closewall.y + running);
                if (haswalls[i].y + running < closewall.y + running) {
                  gothere = true;
                } else {
                  gothere = false;
                }
              }
              if (gothere) {
                console.log(`!gothere ${closestwall} == ${selectedlane} && ${selectedlane} != 0`);
                result = -1;
              }
            }
          }
        }

        selectedlane += result;
        // console.log(selectedlane, result);
      }
    }
  }

  for (let i = 0; i < exclude.length; i++) {
    walls.splice(i, 1);
  }

  ctx.drawImage(carimg, carx, 240);

  if (y >= 256) {
    y = 0;
  }

  if (!gameover) {
    window.requestAnimationFrame(draw);
  }
}
