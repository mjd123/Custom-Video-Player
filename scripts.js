const vid = document.getElementsByTagName("video");
let slider = document.getElementsByTagName("input");
const playerButtons = document.querySelectorAll(".player__button");


const progressBarFilled = document.querySelector(".progress__filled"); // video duration 596.5
const progressBarUnfilled = document.querySelector(".progress");

let VideoCurrentTime;
let newPos; //new position of progress bar
let scrub = false; //if progress bar is used

vid[0].load();


function playVid(e) { // handles play and pause

  if (vid[0].paused) {
    vid[0].play();

    setInterval(function() {
      let time;

      if (scrub) {
        progressBarFilled.style.flexBasis = newPos + "%";
        scrub = false;
        vid[0].currentTime = newPos / 100 * 596.5;
      } else {
        time = vid[0].currentTime;
        let timeToPercent = time / 596.5 * 100;
        progressBarFilled.style.flexBasis = timeToPercent + "%";
      }
    }, 500);
  } else {
    vid[0].pause();
  }
};

function volumeHandler(e) { //volume
  vid[0].volume = this.value;
};

function speedHandler(e) { //speed
  vid[0].playbackRate = this.value;
};

function rewind() { //rewind 10s
  time = vid[0].currentTime;
  vid[0].currentTime = time - 10;
};

function fastforward() { //ff 25 secs
  time = vid[0].currentTime;
  vid[0].currentTime = time + 25;
};

function bar(e) { //progress bar - changes css depending on where bar is clicked
  let progressBarPercentage = e.offsetX / 640 * 100;

  VideoCurrentTime = progressBarPercentage;

  progressBarFilled.style.flexBasis = VideoCurrentTime + "%";

  scrub = true;
  newPos = e.offsetX / 640 * 100;
};





playerButtons[0].addEventListener("click", playVid);
vid[0].addEventListener("click", playVid);
slider[0].addEventListener("input", volumeHandler);
slider[1].addEventListener("input", speedHandler);
playerButtons[1].addEventListener("click", rewind);
playerButtons[2].addEventListener("click", fastforward);
progressBarUnfilled.addEventListener("mousedown", bar);
