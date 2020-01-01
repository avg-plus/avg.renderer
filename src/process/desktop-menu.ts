import { PlatformService } from "engine/core/platform/platform-service";
const { app, Menu } = require('electron')

export class DesktopMenus {
  static init() {


    const template = [
      // // { role: 'appMenu' }
      // ...(PlatformService.runOnMacOS() ? [{
      //   label: app.name,
      //   submenu: [
      //     { role: 'about' },
      //     { type: 'separator' },
      //     { role: 'services' },
      //     { type: 'separator' },
      //     { role: 'hide' },
      //     { role: 'hideothers' },
      //     { role: 'unhide' },
      //     { type: 'separator' },
      //     { role: 'quit' }
      //   ]
      // }] : []),
      // // { role: 'fileMenu' }
      // {
      //   label: 'File',
      //   submenu: [
      //     PlatformService.runOnMacOS() ? { role: 'close' } : { role: 'quit' }
      //   ]
      // },
      // // { role: 'editMenu' }
      // {
      //   label: 'Edit',
      //   submenu: [
      //     { role: 'undo' },
      //     { role: 'redo' },
      //     { type: 'separator' },
      //     { role: 'cut' },
      //     { role: 'copy' },
      //     { role: 'paste' },
      //     ...(PlatformService.runOnMacOS() ? [
      //       { role: 'pasteAndMatchStyle' },
      //       { role: 'delete' },
      //       { role: 'selectAll' },
      //       { type: 'separator' },
      //       {
      //         label: 'Speech',
      //         submenu: [
      //           { role: 'startspeaking' },
      //           { role: 'stopspeaking' }
      //         ]
      //       }
      //     ] : [
      //         { role: 'delete' },
      //         { type: 'separator' },
      //         { role: 'selectAll' }
      //       ])
      //   ]
      // },
      // // { role: 'viewMenu' }
      // {
      //   label: 'View',
      //   submenu: [
      //     { role: 'reload' },
      //     { role: 'forcereload' },
      //     { role: 'toggledevtools' },
      //     { type: 'separator' },
      //     { role: 'resetzoom' },
      //     { role: 'zoomin' },
      //     { role: 'zoomout' },
      //     { type: 'separator' },
      //     { role: 'togglefullscreen' }
      //   ]
      // },
      // // { role: 'windowMenu' }
      // {
      //   label: 'Window',
      //   submenu: [
      //     { role: 'minimize' },
      //     { role: 'zoom' },
      //     ...(PlatformService.runOnMacOS() ? [
      //       { type: 'separator' },
      //       { role: 'front' },
      //       { type: 'separator' },
      //       { role: 'window' }
      //     ] : [
      //         { role: 'close' }
      //       ])
      //   ]
      // },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click: async () => {
              const { shell } = require('electron')
              await shell.openExternal('https://electronjs.org')
            }
          }
        ]
      }
    ]

    const menu = Menu.buildFromTemplate([
      
    ])
    Menu.setApplicationMenu(menu)
  }
}