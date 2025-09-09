const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const net = require('net');

let mainWindow;
let tcpClient = null;
let isConnected = false;

// Configurações da balança BJ-850
const SCALE_CONFIG = {
  defaultPort: 4001,
  timeout: 5000,
  reconnectInterval: 3000
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../assets/icon.png'),
    title: 'BJ850 Hercules Clone'
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer.html'));

  // Remove menu bar em produção
  if (!process.argv.includes('--dev')) {
    mainWindow.setMenuBarVisibility(false);
  }

  mainWindow.on('closed', () => {
    if (tcpClient) {
      tcpClient.destroy();
    }
    mainWindow = null;
  });
}

// Função para conectar à balança via TCP
function connectToScale(host, port) {
  return new Promise((resolve, reject) => {
    if (tcpClient) {
      tcpClient.destroy();
    }

    tcpClient = new net.Socket();
    
    tcpClient.setTimeout(SCALE_CONFIG.timeout);

    tcpClient.connect(port, host, () => {
      isConnected = true;
      console.log(`Conectado à balança em ${host}:${port}`);
      mainWindow.webContents.send('connection-status', { 
        connected: true, 
        host, 
        port,
        message: 'Conectado com sucesso!' 
      });
      resolve(true);
    });

    tcpClient.on('data', (data) => {
      const message = data.toString().trim();
      console.log('Dados recebidos:', message);
      mainWindow.webContents.send('data-received', {
        timestamp: new Date().toISOString(),
        data: message,
        hex: data.toString('hex'),
        length: data.length
      });
    });

    tcpClient.on('error', (err) => {
      console.error('Erro de conexão:', err.message);
      isConnected = false;
      mainWindow.webContents.send('connection-status', { 
        connected: false, 
        error: err.message 
      });
      reject(err);
    });

    tcpClient.on('close', () => {
      console.log('Conexão fechada');
      isConnected = false;
      mainWindow.webContents.send('connection-status', { 
        connected: false,
        message: 'Conexão fechada' 
      });
    });

    tcpClient.on('timeout', () => {
      console.log('Timeout de conexão');
      tcpClient.destroy();
      isConnected = false;
      mainWindow.webContents.send('connection-status', { 
        connected: false,
        error: 'Timeout de conexão' 
      });
      reject(new Error('Timeout de conexão'));
    });
  });
}

// Função para enviar dados para a balança
function sendToScale(data) {
  return new Promise((resolve, reject) => {
    if (!tcpClient || !isConnected) {
      reject(new Error('Não conectado à balança'));
      return;
    }

    try {
      tcpClient.write(data);
      mainWindow.webContents.send('data-sent', {
        timestamp: new Date().toISOString(),
        data: data,
        hex: Buffer.from(data).toString('hex'),
        length: data.length
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

// IPC handlers
ipcMain.handle('connect-scale', async (event, { host, port }) => {
  try {
    await connectToScale(host, port || SCALE_CONFIG.defaultPort);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('disconnect-scale', async () => {
  if (tcpClient) {
    tcpClient.destroy();
    tcpClient = null;
    isConnected = false;
  }
  return { success: true };
});

ipcMain.handle('send-data', async (event, data) => {
  try {
    await sendToScale(data);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-connection-status', () => {
  return { connected: isConnected };
});

// Comandos pré-definidos para a balança BJ-850
ipcMain.handle('send-predefined-command', async (event, command) => {
  const commands = {
    'get-weight': 'P\r\n',           // Solicitar peso
    'zero': 'Z\r\n',                // Zerar balança
    'tare': 'T\r\n',                // Tarar
    'get-status': 'S\r\n',          // Status da balança
    'get-info': 'I\r\n',            // Informações da balança
    'calibrate': 'C\r\n',           // Calibrar (se suportado)
    'reset': 'R\r\n'                // Reset
  };

  const commandData = commands[command];
  if (!commandData) {
    return { success: false, error: 'Comando não reconhecido' };
  }

  try {
    await sendToScale(commandData);
    return { success: true, command: commandData };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (tcpClient) {
    tcpClient.destroy();
  }
});
