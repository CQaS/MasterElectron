// Modules
const {
  app,
  BrowserWindow
} = require('electron')
const bcrypt = require('bcrypt')

/* bcrypt.hash('sha256', 10, (arr, hash) => {
  console.log(hash)
}) */

let mainWindow, segundoWindows

const createWindow = () => {

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    },
    backgroundColor: '#9FEAF9;'
  })

  segundoWindows = new BrowserWindow({
    width: 600,
    height: 300,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    },
    backgroundColor: '#9FEAF9;',
    parent: mainWindow,
    show: false
  })

  mainWindow.loadFile('index.html')
  segundoWindows.loadFile('index_segunda.html')
  /*   mainWindow.loadURL('https://google.com/') */

  setTimeout(() => {
    segundoWindows.show()
    setTimeout(() => {
      segundoWindows.close()
      segundoWindows = null
    }, 3000)
  }, 2000)

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  segundoWindows.on('closed', () => {
    segundoWindows = null
  })
}

app.on('browser-window-blur', () => {
  console.log('App sin foco')
})

app.on('browser-window-focus', () => {
  console.log('App con foco')
})

app.on('ready', () => {
  console.log(app.getPath('desktop'))
  console.log(app.getPath('music'))
  console.log(app.getPath('temp'))
  console.log(app.getPath('userData'))
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})