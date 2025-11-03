const { ipcRenderer } = require("electron");

const homeContainer = document.getElementById("home-container");
const timerContainer = document.getElementById("timer-container");
const ddayContainer = document.getElementById("dday-container");

const ddaySetup = document.getElementById("dday-setup");
const ddayDisplayResult = document.getElementById("dday-display-result");

const homeSelectTimer = document.getElementById("home-select-timer");
const homeSelectDday = document.getElementById("home-select-dday");

homeSelectTimer.addEventListener("click", () => {
  homeContainer.classList.add("hidden");
  timerContainer.classList.remove("hidden");
});

homeSelectDday.addEventListener("click", () => {
  homeContainer.classList.add("hidden");
  ddayContainer.classList.remove("hidden");
  ddaySetup.classList.remove("hidden");
  ddayDisplayResult.classList.add("hidden");
});

ipcRenderer.on("show-home", () => {
  console.log("Show Home Screen");
  homeContainer.classList.remove("hidden");
  timerContainer.classList.add("hidden");
  ddayContainer.classList.add("hidden");
});

ipcRenderer.on("show-timer", () => {
  console.log("Timer setting mode");
  homeContainer.classList.add("hidden");
  ddayContainer.classList.add("hidden");
  timerContainer.classList.remove("hidden");
});

ipcRenderer.on("show-dday-setup", () => {
  console.log("D-day setting mode");
  homeContainer.classList.add("hidden");
  timerContainer.classList.add("hidden");
  ddayContainer.classList.remove("hidden");

  ddaySetup.classList.remove("hidden");
  ddayDisplayResult.classList.add("hidden");
});

const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

let timer;
let seconds = 0;

function formatTime(sec) {
  const hours = Math.floor(sec / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((sec % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (sec % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function updateTimer() {
  seconds++;
  timerDisplay.textContent = formatTime(seconds);
}
startBtn.addEventListener("click", () => {
  if (!timer) {
    timer = setInterval(updateTimer, 1000);
  }
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

resetBtn.addEventListener("click", () => {
  ipcRenderer.send("add-to-total-time", seconds);

  clearInterval(timer);
  timer = null;
  seconds = 0;
  timerDisplay.textContent = formatTime(seconds);
});

const ddayTitleInput = document.getElementById("dday-title");
const ddayDateInput = document.getElementById("dday-date");
const setDdayBtn = document.getElementById("setDdayBtn");
const ddayResult = document.getElementById("dday-result");
const resetDdayBtn = document.getElementById("resetDdayBtn");

setDdayBtn.addEventListener("click", () => {
  const title = ddayTitleInput.value;
  const date = ddayDateInput.value;
  const targetDate = new Date(date);
  const today = new Date();

  if (!title || !date) {
    ddayResult.textContent = "Set your Event & Date ";
    return;
  }

  const ddayData = { title, date };
  ipcRenderer.send("add-dday", ddayData);

  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const gap = targetDate.getTime() - today.getTime();
  const days = Math.ceil(gap / (1000 * 60 * 60 * 24));

  if (days === 0) {
    ddayResult.textContent = `${title} D-Day 🎉`;
  } else if (days > 0) {
    ddayResult.textContent = `D-${days} until ${title}`;
  } else {
    ddayResult.textContent = `D+${Math.abs(days)} after ${title}`;
  }

  ddaySetup.classList.add("hidden");
  ddayDisplayResult.classList.remove("hidden");
});

resetDdayBtn.addEventListener("click", () => {
  ddaySetup.classList.remove("hidden");
  ddayDisplayResult.classList.add("hidden");
  ddayTitleInput.value = "";
  ddayDateInput.value = "";
});
