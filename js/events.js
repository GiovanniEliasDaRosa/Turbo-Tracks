const scoreDiv = document.querySelector("#score");
const scoreText = document.querySelector("#scoreText");
const playbutton = document.querySelector("#playbutton");

const credits = document.querySelector("#credits");
const openCreditsButton = document.querySelector("#openCreditsButton");
const closeCreditsButton = document.querySelector("#closeCreditsButton");
let animateCreditsTimeout = "";

const mobileControls = document.querySelector("#mobileControls");
const leftMobileButton = document.querySelector("#leftMobileButton");
const rightMobileButton = document.querySelector("#rightMobileButton");

Disable(credits);

playbutton.onclick = () => {
  StarNewGame();
};

RecalculateCanvasSize();

openCreditsButton.onclick = () => {
  clearTimeout(animateCreditsTimeout);
  Enable(credits);
  credits.animate(
    {
      opacity: [0, 1],
      transform: ["translateY(1em)", "translateY(0)"],
    },
    {
      fill: "both",
      duration: 500,
      rangeStart: "cover 0%",
      rangeEnd: "cover 100%",
    }
  );
  closeCreditsButton.focus();
};
closeCreditsButton.onclick = () => {
  credits.animate(
    {
      opacity: [1, 0],
      transform: ["translateY(0)", "translateY(1em)"],
    },
    {
      fill: "both",
      duration: 500,
      rangeStart: "cover 0%",
      rangeEnd: "cover 100%",
    }
  );
  clearTimeout(animateCreditsTimeout);
  animateCreditsTimeout = setTimeout(() => {
    Disable(credits);
  }, 500);
  openCreditsButton.focus();
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
