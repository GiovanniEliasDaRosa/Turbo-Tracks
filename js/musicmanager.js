let currentmusic = 0;
let musicpaused = false;
let wanttochangetime = false;
let changingmusic = "";

const musicaudios = [...document.querySelectorAll(".musicaudios")];
const music = document.querySelector("#music");
const music__content = document.querySelector("#music__content");

const musicbackward = document.querySelector("#musicbackward");
const musicpause = document.querySelector("#musicpause");
const musicforward = document.querySelector("#musicforward");

const musiccontrolsPercentageSlider = document.querySelector("#musiccontrols__percentage__slider");
const musiccontrolsPercentageFill = document.querySelector("#musiccontrols__percentage__fill");

for (let i = 0; i < musicaudios.length; i++) {
  musicaudios[i].ontimeupdate = () => {
    if (wanttochangetime) {
      return;
    }
    let percentage = (musicaudios[i].currentTime / musicaudios[i].duration) * 100;
    musiccontrolsPercentageFill.style.width = `${percentage}%`;
    musiccontrolsPercentageSlider.value = percentage;
  };
  musicaudios[i].onended = () => {
    musicforward.click();
  };
}

let show = "";
let animating = "";

document.body.addEventListener("click", clickedbody);
Disable(music);

function clickedbody() {
  document.body.removeAttribute("data-clicltoplay");
  currentmusic = RandomNumber(0, musicaudios.length);
  ChangeMusic();
}

function ChangeMusic() {
  musicpaused = false;
  for (let i = 0; i < musicaudios.length; i++) {
    musicaudios[i].currentTime = 0;
    musicaudios[i].pause();
  }

  musicaudios[currentmusic].play();
  document.body.removeEventListener("click", clickedbody);

  clearInterval(show);
  clearInterval(animating);
  Enable(music);

  music.removeAttribute("data-hide");
  music.removeAttribute("data-appear");
  show = setTimeout(() => {
    music.setAttribute("data-appear", "");
  }, 10);

  music__content.innerText = musicaudios[currentmusic].dataset.credits;

  animating = setTimeout(() => {
    music.removeAttribute("data-appear");

    animating = setTimeout(() => {
      music.setAttribute("data-hide", "");
      animating = setTimeout(() => {
        Disable(music);
        music.removeAttribute("data-hide");
      }, 1000);
    }, 4000);
  }, 1500);
}

musicbackward.onclick = () => {
  if (currentmusic == 0) {
    currentmusic = musicaudios.length - 1;
  } else {
    currentmusic--;
  }
  ChangeMusic();
};

musicpause.onclick = () => {
  if (musicpaused) {
    musicpause.classList.remove("play");
    musicpaused = false;
    musicaudios[currentmusic].play();
  } else {
    musicpause.classList.add("play");
    musicpaused = true;
    musicaudios[currentmusic].pause();
  }
};

musicforward.onclick = () => {
  if (currentmusic == musicaudios.length - 1) {
    currentmusic = 0;
  } else {
    currentmusic++;
  }
  ChangeMusic();
};

musiccontrolsPercentageSlider.onchange = (e) => {
  clearInterval(changingmusic);
  wanttochangetime = true;
  musicaudios[currentmusic].pause();

  let savedvalue = musiccontrolsPercentageSlider.value;
  console.log(savedvalue);
  musiccontrolsPercentageFill.style.width = `${savedvalue}%`;
  changingmusic = setTimeout(() => {
    musicaudios[currentmusic].currentTime = (savedvalue / 100) * musicaudios[currentmusic].duration;
    musiccontrolsPercentageFill.style.width = `${savedvalue}%`;
    wanttochangetime = false;
    musicaudios[currentmusic].play();
  }, 100);
};
