const { app, BrowserWindow, Menu } = require("electron");

function createWindow() {
  let mainwindow = new BrowserWindow({
    width: 400,
    height: 300,
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
        { label: "Show my calculated Time" },
      ],
    },

    {
      label: "D-day✨",
      submenu: [
        {
          label: "Show D-day",
          click: () => {
            mainwindow.webContents.send("show-dday-setup");
          },
        },
        { type: "separator" },
        { label: "Show my D-day list" },
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
