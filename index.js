// Electron boilerplate code

const { app, BrowserWindow } = require('electron')

let win

function createWindow(){
	win = new BrowserWindow({ width: 800, height: 600 })
	win.loadFile('index.html')
	
	win.setMenu(null)
	
	//win.webContents.openDevTools();
	//win.maximize();
	//win.setFullScreen(true);
	
	win.on('closed', () => {
		win = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if(process.platform !== 'darwin'){
		app.quit()
	}
})

app.on('activate', () => {
	if(win === null){
		createWindow()
	}
})