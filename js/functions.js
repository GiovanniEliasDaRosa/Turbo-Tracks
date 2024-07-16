const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
  document.body.setAttribute("data-mobile", "");
}

// Asign all html elements needed on whole program
const pointelements = [...document.querySelectorAll(".points")];
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const canvaswidth = 64;
const canvasheight = 256;
canvas.width = canvaswidth;
canvas.height = canvasheight;

// --

let scale = 1;
window.onresize = () => {
  RecalculateCanvasSize();
};

function point(x, y, x2 = null, y2 = null) {
  let bound = canvas.getBoundingClientRect();
  pointelements[0].style.left = `${bound.x + x * scale}px`;
  pointelements[0].style.top = `${bound.y + y * scale}px`;
  if (x2 == null || y2 == null) {
    pointelements[1].style.left = "-1em";
    pointelements[1].style.top = "-1em";
    return;
  }
  pointelements[1].style.left = `${bound.x + x2 * scale}px`;
  pointelements[1].style.top = `${bound.y + y2 * scale}px`;
}

function CreateNewImage(img) {
  var newimage = new Image();
  newimage.src = "img/" + img;
  maxImagesToLoad++;
  newimage.onload = () => {
    imagesLoaded++;
    if (imagesLoaded == maxImagesToLoad) {
      canstartgame = true;
      StarNewGame("bot");
      draw();
    }
  };
  return newimage;
}

function RecalculateCanvasSize() {
  let screnWidth = window.innerWidth / canvaswidth;
  let screnHeight = window.innerHeight / canvasheight;
  let result = screnHeight;

  if (screnWidth < screnHeight) {
    result = screnWidth;
  }

  scale = Math.floor(result);

  canvas.style.width = `${scale * canvaswidth}px`;
  canvas.style.height = `${scale * canvasheight}px`;

  // pointelement.style.width = `${8 * scale}px`;
  // pointelement.style.height = `${8 * scale}px`;
  // pointelement.style.border = `solid ${3 * scale}px transparent`;
  // pointelement.style.borderTopColor = `rgba(255, 0, 0, 0.8)`;
  // pointelement.style.borderLeftColor = `rgba(255, 0, 0, 0.8)`;
  scoreDiv.style.width = `${scale * 64}px`;
}

// Useful Funcions

function Enable(element) {
  element.removeAttribute("disabled");
  element.removeAttribute("aria-disabled");
  element.style.display = "";
}

function Disable(element, hide = true) {
  element.setAttribute("disabled", "");
  element.setAttribute("aria-disabled", "");
  if (hide) {
    element.style.display = "none";
  }
}
/* Math Stuff */
function RandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function Clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function Wrap(number, min, max) {
  let result = number;
  if (number > max) {
    result = min;
  } else if (number < min) {
    result = max;
  }
  return result;
}

function Inside(number, min, max) {
  if (number > max) {
    return false;
  } else if (number < min) {
    return false;
  }
  return true;
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
