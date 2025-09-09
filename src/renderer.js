class BJ850HerculesClone {
    constructor() {
        this.isConnected = false;
        this.autoScroll = true;
        this.sentCount = 0;
        this.receivedCount = 0;
        this.currentWeight = '---';
        
        this.initializeElements();
        this.attachEventListeners();
        this.setupIPCListeners();
    }

    initializeElements() {
        // Connection elements
        this.hostInput = document.getElementById('host');
        this.portInput = document.getElementById('port');
        this.connectBtn = document.getElementById('connect-btn');
        this.disconnectBtn = document.getElementById('disconnect-btn');
        this.statusIndicator = document.getElementById('status-indicator');
        this.statusText = document.getElementById('status-text');

        // Send elements
        this.sendDataInput = document.getElementById('send-data');
        this.sendFormatSelect = document.getElementById('send-format');
        this.addCrlfCheckbox = document.getElementById('add-crlf');
        this.sendBtn = document.getElementById('send-btn');

        // Monitor elements
        this.dataLog = document.getElementById('data-log');
        this.clearLogBtn = document.getElementById('clear-log');
        this.autoScrollBtn = document.getElementById('auto-scroll');
        this.showTimestampCheckbox = document.getElementById('show-timestamp');
        this.showHexCheckbox = document.getElementById('show-hex');

        // Weight elements
        this.currentWeightEl = document.getElementById('current-weight');
        this.weightStatusEl = document.getElementById('weight-status');

        // Stats elements
        this.statsSent = document.getElementById('stats-sent');
        this.statsReceived = document.getElementById('stats-received');
        this.lastActivity = document.getElementById('last-activity');

        // Command buttons
        this.cmdButtons = document.querySelectorAll('.cmd-btn');
    }

    attachEventListeners() {
        // Connection events
        this.connectBtn.addEventListener('click', () => this.handleConnect());
        this.disconnectBtn.addEventListener('click', () => this.handleDisconnect());

        // Send events
        this.sendBtn.addEventListener('click', () => this.handleSendData());
        this.sendDataInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSendData();
            }
        });

        // Monitor events
        this.clearLogBtn.addEventListener('click', () => this.clearLog());
        this.autoScrollBtn.addEventListener('click', () => this.toggleAutoScroll());

        // Command buttons
        this.cmdButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const command = e.target.getAttribute('data-command');
                this.sendPredefinedCommand(command);
            });
        });

        // Format selection
        this.sendFormatSelect.addEventListener('change', () => {
            this.updateSendPlaceholder();
        });
    }

    setupIPCListeners() {
        // Connection status
        window.electronAPI.onConnectionStatus((event, data) => {
            this.updateConnectionStatus(data);
        });

        // Data received
        window.electronAPI.onDataReceived((event, data) => {
            this.handleDataReceived(data);
        });

        // Data sent
        window.electronAPI.onDataSent((event, data) => {
            this.handleDataSent(data);
        });
    }

    async handleConnect() {
        const host = this.hostInput.value.trim();
        const port = parseInt(this.portInput.value) || 4001;

        if (!host) {
            this.showError('Digite um endereço IP válido');
            return;
        }

        this.connectBtn.disabled = true;
        this.connectBtn.textContent = 'Conectando...';

        try {
            const result = await window.electronAPI.connectScale(host, port);
            if (result.success) {
                this.logMessage(`Tentativa de conexão para ${host}:${port}`, 'info');
            } else {
                this.showError(result.error);
                this.connectBtn.disabled = false;
                this.connectBtn.textContent = 'Conectar';
            }
        } catch (error) {
            this.showError('Erro ao conectar: ' + error.message);
            this.connectBtn.disabled = false;
            this.connectBtn.textContent = 'Conectar';
        }
    }

    async handleDisconnect() {
        try {
            await window.electronAPI.disconnectScale();
            this.logMessage('Desconectado da balança', 'info');
        } catch (error) {
            this.showError('Erro ao desconectar: ' + error.message);
        }
    }

    async handleSendData() {
        let data = this.sendDataInput.value.trim();
        if (!data) return;

        // Convert hex to text if needed
        if (this.sendFormatSelect.value === 'hex') {
            try {
                data = this.hexToString(data);
            } catch (error) {
                this.showError('Formato hexadecimal inválido');
                return;
            }
        }

        // Add CRLF if checkbox is checked
        if (this.addCrlfCheckbox.checked) {
            data += '\r\n';
        }

        try {
            const result = await window.electronAPI.sendData(data);
            if (result.success) {
                this.sendDataInput.value = '';
            } else {
                this.showError(result.error);
            }
        } catch (error) {
            this.showError('Erro ao enviar dados: ' + error.message);
        }
    }

    async sendPredefinedCommand(command) {
        try {
            const result = await window.electronAPI.sendPredefinedCommand(command);
            if (result.success) {
                this.logMessage(`Comando enviado: ${command} (${result.command.trim()})`, 'info');
            } else {
                this.showError(result.error);
            }
        } catch (error) {
            this.showError('Erro ao enviar comando: ' + error.message);
        }
    }

    updateConnectionStatus(data) {
        this.isConnected = data.connected;

        if (data.connected) {
            this.statusIndicator.className = 'status-connected';
            this.statusText.textContent = `Conectado (${data.host}:${data.port})`;
            this.connectBtn.disabled = true;
            this.connectBtn.textContent = 'Conectar';
            this.disconnectBtn.disabled = false;
            this.sendBtn.disabled = false;
            this.cmdButtons.forEach(btn => btn.disabled = false);
            this.logMessage(data.message || 'Conectado com sucesso!', 'success');
        } else {
            this.statusIndicator.className = 'status-disconnected';
            this.statusText.textContent = 'Desconectado';
            this.connectBtn.disabled = false;
            this.connectBtn.textContent = 'Conectar';
            this.disconnectBtn.disabled = true;
            this.sendBtn.disabled = true;
            this.cmdButtons.forEach(btn => btn.disabled = true);
            
            if (data.error) {
                this.logMessage(`Erro de conexão: ${data.error}`, 'error');
            } else if (data.message) {
                this.logMessage(data.message, 'info');
            }
        }
    }

    handleDataReceived(data) {
        this.receivedCount++;
        this.updateStats();
        
        const message = this.formatLogMessage(data, 'received');
        this.logMessage(message, 'received');

        // Try to parse weight data
        this.parseWeightData(data.data);
    }

    handleDataSent(data) {
        this.sentCount++;
        this.updateStats();
        
        const message = this.formatLogMessage(data, 'sent');
        this.logMessage(message, 'sent');
    }

    parseWeightData(data) {
        // Common patterns for weight data from BJ-850
        const weightPatterns = [
            /([+-]?\d+\.?\d*)\s*kg/i,
            /([+-]?\d+\.?\d*)\s*g/i,
            /W[:\s]*([+-]?\d+\.?\d*)/i,
            /([+-]?\d+\.?\d*)/
        ];

        for (const pattern of weightPatterns) {
            const match = data.match(pattern);
            if (match) {
                let weight = parseFloat(match[1]);
                if (!isNaN(weight)) {
                    // Convert grams to kg if needed
                    if (data.toLowerCase().includes('g') && !data.toLowerCase().includes('kg')) {
                        weight = weight / 1000;
                    }
                    
                    this.currentWeight = weight.toFixed(3);
                    this.currentWeightEl.textContent = this.currentWeight;
                    this.weightStatusEl.textContent = 'Peso atualizado';
                    
                    // Update weight status based on value
                    if (weight < 0) {
                        this.currentWeightEl.style.color = 'var(--danger-color)';
                    } else if (weight > 0) {
                        this.currentWeightEl.style.color = 'var(--success-color)';
                    } else {
                        this.currentWeightEl.style.color = 'var(--primary-color)';
                    }
                    break;
                }
            }
        }

        // Check for status messages
        if (data.toLowerCase().includes('stable')) {
            this.weightStatusEl.textContent = 'Estável';
        } else if (data.toLowerCase().includes('unstable')) {
            this.weightStatusEl.textContent = 'Instável';
        } else if (data.toLowerCase().includes('overload')) {
            this.weightStatusEl.textContent = 'Sobrecarga';
            this.currentWeightEl.style.color = 'var(--danger-color)';
        } else if (data.toLowerCase().includes('underload')) {
            this.weightStatusEl.textContent = 'Subcarga';
            this.currentWeightEl.style.color = 'var(--warning-color)';
        }
    }

    formatLogMessage(data, type) {
        let message = '';
        
        if (this.showTimestampCheckbox.checked) {
            const timestamp = new Date(data.timestamp).toLocaleTimeString();
            message += `[${timestamp}] `;
        }

        message += type === 'sent' ? '→ ' : '← ';
        message += data.data;

        if (this.showHexCheckbox.checked) {
            message += ` (${data.hex})`;
        }

        message += ` [${data.length} bytes]`;

        return message;
    }

    logMessage(message, type = 'info') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        
        if (this.showTimestampCheckbox.checked) {
            const timestamp = new Date().toLocaleTimeString();
            entry.innerHTML = `<span class="log-timestamp">[${timestamp}]</span> ${message}`;
        } else {
            entry.textContent = message;
        }

        this.dataLog.appendChild(entry);

        // Auto scroll
        if (this.autoScroll) {
            this.dataLog.scrollTop = this.dataLog.scrollHeight;
        }

        // Limit log entries (keep last 1000)
        while (this.dataLog.children.length > 1000) {
            this.dataLog.removeChild(this.dataLog.firstChild);
        }
    }

    clearLog() {
        this.dataLog.innerHTML = '';
        this.sentCount = 0;
        this.receivedCount = 0;
        this.updateStats();
    }

    toggleAutoScroll() {
        this.autoScroll = !this.autoScroll;
        this.autoScrollBtn.classList.toggle('active', this.autoScroll);
        this.autoScrollBtn.textContent = this.autoScroll ? 'Auto Scroll' : 'Manual Scroll';
    }

    updateStats() {
        this.statsSent.textContent = `Enviados: ${this.sentCount}`;
        this.statsReceived.textContent = `Recebidos: ${this.receivedCount}`;
        this.lastActivity.textContent = `Última atividade: ${new Date().toLocaleTimeString()}`;
    }

    updateSendPlaceholder() {
        if (this.sendFormatSelect.value === 'hex') {
            this.sendDataInput.placeholder = 'Ex: 50 0D 0A (para comando P)';
        } else {
            this.sendDataInput.placeholder = 'Digite comando ou dados...';
        }
    }

    hexToString(hex) {
        // Remove spaces and validate hex
        hex = hex.replace(/\s/g, '');
        if (!/^[0-9A-Fa-f]*$/.test(hex)) {
            throw new Error('Formato hexadecimal inválido');
        }
        
        let result = '';
        for (let i = 0; i < hex.length; i += 2) {
            result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return result;
    }

    showError(message) {
        this.logMessage(`❌ ${message}`, 'error');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new BJ850HerculesClone();
    
    // Make app globally accessible for debugging
    window.bj850App = app;
});
