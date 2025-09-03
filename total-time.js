const { ipcRenderer } = require("electron");

const totalTimeDisplay = document.getElementById("total-time-display");

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

ipcRenderer.on("total-time-data", (event, totalSeconds) => {
  console.log("acculated time:", totalSeconds);
  totalTimeDisplay.textContent = formatTime(totalSeconds);
});
