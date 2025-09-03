const { app, BrowserWindow, Menu, ipcMain } = require("electron");

const ddayList = [];
let totalTimerSeconds = 0;
let mainwindow;
ipcMain.on("add-to-total-time", (event, sessionSeconds) => {
  totalTimerSeconds += sessionSeconds;
  console.log(
    `Accumulated Time added : ${sessionSeconds}s/ Total accumulated Time: ${totalTimerSeconds}s`
  );
});

ipcMain.on("add-dday", (event, ddayData) => {
  ddayList.push(ddayData);
  console.log("Add new D-day:", ddayData);
});

function createWindow() {
  mainwindow = new BrowserWindow({
    width: 400,
    height: 350,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainwindow.loadFile("index.html");

  const template = [
    {
      label: "Timer⏰",
      submenu: [
        {
          label: "Show Timer",
          click: () => {
            mainwindow.webContents.send("show-timer");
          },
        },
        { type: "separator" },
        {
          label: "Show my calculated Time",
          click: () => {
            const totalTimeWindow = new BrowserWindow({
              width: 300,
              height: 250,
              title: "Total accumulated",
              webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
              },
            });

            totalTimeWindow.loadFile("total-time.html");

            totalTimeWindow.webContents.once("dom-ready", () => {
              totalTimeWindow.webContents.send(
                "total-time-data",
                totalTimerSeconds
              );
            });
          },
        },
      ],
    },

    {
      label: "D-day✨",
      submenu: [
        {
          label: "D-day Setup",
          click: () => {
            mainwindow.webContents.send("show-dday-setup");
          },
        },
        { type: "separator" },
        {
          label: "Show my D-day list",
          click: () => {
            const listWindow = new BrowserWindow({
              width: 300,
              height: 400,
              title: "My D-day list",
              webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
              },
            });
            listWindow.loadFile("dday-list.html");

            listWindow.webContents.once("dom-ready", () => {
              listWindow.webContents.send("dday-list-data", ddayList);
            });
          },
        },
      ],
    },

    {
      label: "App",
      submenu: [{ role: "quit" }],
    },
  ];

  const customMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(customMenu);
}

app.whenReady().then(createWindow);
