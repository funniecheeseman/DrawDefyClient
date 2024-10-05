const { app, BrowserWindow, BrowserView } = require('electron');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Create a new BrowserView
    const view = new BrowserView();

    // Set the BrowserView as the main view
    mainWindow.setBrowserView(view);

    // Set the initial bounds of the BrowserView
    view.setBounds({ x: 0, y: 0, width: mainWindow.getContentBounds().width, height: mainWindow.getContentBounds().height });

    // Load the desired URL
    view.webContents.loadURL('https://www.drawdefy.com'); // Replace with your desired URL

    // Adjust the view size on window resize
    mainWindow.on('resize', () => {
        const { width, height } = mainWindow.getContentBounds();
        view.setBounds({ x: 0, y: 0, width, height });
    });

    // Optional: Adjust the view size on window move
    mainWindow.on('move', () => {
        const { width, height } = mainWindow.getContentBounds();
        view.setBounds({ x: 0, y: 0, width, height });
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});