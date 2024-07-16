const scoreDiv = document.querySelector("#score");
const scoreText = document.querySelector("#scoreText");
const playbutton = document.querySelector("#playbutton");

const credits = document.querySelector("#credits");
const openCreditsButton = document.querySelector("#openCreditsButton");
const closeCreditsButton = document.querySelector("#closeCreditsButton");

const mobileControls = document.querySelector("#mobileControls");
const leftMobileButton = document.querySelector("#leftMobileButton");
const rightMobileButton = document.querySelector("#rightMobileButton");

Disable(credits);

playbutton.onclick = () => {
  StarNewGame();
};

RecalculateCanvasSize();

openCreditsButton.onclick = () => {
  Enable(credits);
};
closeCreditsButton.onclick = () => {
  Disable(credits);
};

if (!isMobile) {
  Disable(mobileControls);
}

leftMobileButton.onclick = () => {
  if (selectedlane != 0) {
    selectedlane--;
  }
};

rightMobileButton.onclick = () => {
  if (selectedlane != 2) {
    selectedlane++;
  }
};
