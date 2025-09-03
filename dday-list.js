const { ipcRenderer } = require("electron");

const ddayListUl = document.getElementById("dday-list-ul");

ipcRenderer.on("dday-list-data", (event, ddayList) => {
  console.log("Received D-day list:", ddayList);

  if (ddayList.length === 0) {
    ddayListUl.innerHTML = "<li>No D-day</li>";
    return;
  }

  const listItems = ddayList
    .map((item) => {
      return `<li>
              <div class="title">${item.title}</div>
              <div class="date">${item.date}</div>
            </li>`;
    })
    .join("");

  ddayListUl.innerHTML = listItems;
});
