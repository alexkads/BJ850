const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Conexão
  connectScale: (host, port) => ipcRenderer.invoke('connect-scale', { host, port }),
  disconnectScale: () => ipcRenderer.invoke('disconnect-scale'),
  getConnectionStatus: () => ipcRenderer.invoke('get-connection-status'),
  
  // Envio de dados
  sendData: (data) => ipcRenderer.invoke('send-data', data),
  sendPredefinedCommand: (command) => ipcRenderer.invoke('send-predefined-command', command),
  
  // Listeners
  onConnectionStatus: (callback) => ipcRenderer.on('connection-status', callback),
  onDataReceived: (callback) => ipcRenderer.on('data-received', callback),
  onDataSent: (callback) => ipcRenderer.on('data-sent', callback),
  
  // Remover listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});
