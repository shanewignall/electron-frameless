'use strict';
const electron = require('electron');

const app = electron.app;

require('electron-debug')();

let mainWindow;

function onClosed() {
	mainWindow = null;
}

function createMainWindow() {
	var frame = ((process.platform !== 'darwin') ? false : true);
	
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400,
		frame: frame,
		titleBarStyle: 'hidden-inset'
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
