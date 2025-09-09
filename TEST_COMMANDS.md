# Comandos de Teste - BJ850 Hercules Clone

## Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Executar aplicação normal
npm start

# Build para todas as plataformas
npm run build

# Build específico por plataforma
npm run build-mac    # macOS
npm run build-win    # Windows
npm run build-linux  # Linux
```

## Comandos para Teste de Rede

### Verificar conectividade com a balança
```bash
# Ping para a balança
ping 192.168.1.100

# Testar conexão TCP (substitua IP da balança)
telnet 192.168.1.100 4001

# No macOS/Linux - verificar portas abertas
nmap -p 4001 192.168.1.100

# Verificar se alguém está usando a porta
lsof -i :4001
```

### Teste manual de comandos (via telnet)
```bash
# Conectar à balança
telnet 192.168.1.100 4001

# Dentro do telnet, testar comandos:
P          # Obter peso
Z          # Zerar
T          # Tarar
S          # Status
I          # Info
^]         # Sair do telnet (Ctrl+])
quit
```

## Comandos para Debug

### Ver logs detalhados
```bash
# Executar com logs de debug
DEBUG=* npm run dev

# No macOS - ver logs do sistema
log show --predicate 'process == "Electron"' --last 1m

# Verificar processos Electron
ps aux | grep -i electron
```

### Limpar cache e reinstalar
```bash
# Limpar node_modules
rm -rf node_modules package-lock.json

# Reinstalar dependências
npm install

# Limpar cache do npm
npm cache clean --force
```

## Estrutura do Projeto

```
BJ850/
├── src/
│   ├── main.js          # Processo principal do Electron
│   ├── preload.js       # Script de preload (ponte IPC)
│   ├── renderer.html    # Interface HTML
│   ├── renderer.js      # Lógica da interface
│   └── styles.css       # Estilos CSS
├── assets/
│   └── icon.svg         # Ícone da aplicação
├── package.json         # Configurações do projeto
├── README.md           # Documentação principal
├── TECHNICAL_GUIDE.md  # Guia técnico detalhado
└── build.sh            # Script de build
```

## Comandos de Balança BJ-850

### Comandos básicos testados:
```
P\r\n      - Solicitar peso atual
Z\r\n      - Zerar balança
T\r\n      - Tarar (remove peso do recipiente)
S\r\n      - Status (estável/instável)
I\r\n      - Informações do dispositivo
R\r\n      - Reset da balança
```

### Comandos avançados (podem variar por modelo):
```
CAL\r\n           - Entrar modo calibração
CAL 1000\r\n      - Calibrar com peso de 1000g
UNIT KG\r\n       - Mudar unidade para KG
UNIT G\r\n        - Mudar unidade para gramas
AUTO ON\r\n       - Ativar envio automático
AUTO OFF\r\n      - Desativar envio automático
FREQ 1000\r\n     - Frequência de envio (1000ms)
SAVE\r\n          - Salvar configurações
```

## Exemplos de Resposta da Balança

### Peso:
```
+00123.456 kg     # Peso positivo
-00001.234 kg     # Peso negativo
+00000.000 kg     # Zero
```

### Status:
```
STABLE            # Peso estável
UNSTABLE          # Peso instável
OVERLOAD          # Sobrecarga
UNDERLOAD         # Subcarga
```

### Erros:
```
ERROR             # Erro genérico
ERR001            # Erro de calibração
ERR002            # Sensor desconectado
ERR003            # Sobrecarga
```

## Configuração de Rede da Balança

### IP Fixo (recomendado):
- IP: 192.168.1.100
- Máscara: 255.255.255.0
- Gateway: 192.168.1.1
- Porta TCP: 4001

### DHCP (alternativo):
- Configure roteador para IP reservado
- Anote o IP atribuído
- Use o IP na aplicação

## Solução de Problemas Comuns

### 1. Não conecta:
```bash
# Verificar rede
ping 192.168.1.100

# Verificar porta
telnet 192.168.1.100 4001

# Verificar firewall
sudo ufw status        # Linux
pfctl -s all          # macOS
```

### 2. Conecta mas não responde:
- Verificar protocolo da balança
- Testar comandos via telnet
- Verificar se balança está em modo servidor

### 3. Caracteres estranhos:
- Verificar encoding (ASCII vs UTF-8)
- Verificar terminadores de linha (\r\n)
- Usar modo hexadecimal para debug

### 4. Aplicação não abre:
```bash
# Verificar dependências
npm list

# Reinstalar Electron
npm install electron --save-dev

# Verificar permissões (macOS)
xattr -d com.apple.quarantine dist/*.app
```

## Performance e Otimização

### Monitoramento:
- Use Activity Monitor (macOS) ou Task Manager (Windows)
- Verifique uso de CPU e memória
- Monitor de rede para tráfego

### Otimização:
- Limite histórico de log (já implementado: 1000 entradas)
- Auto-scroll opcional (já implementado)
- Timeout de conexão configurável

## Desenvolvimento

### Adicionar novos comandos:
1. Edite `src/main.js` - array `commands`
2. Adicione botão em `src/renderer.html`
3. Adicione handler em `src/renderer.js`

### Modificar protocolo:
1. Edite `parseWeightData()` em `src/renderer.js`
2. Adicione novos padrões RegEx
3. Teste com dados reais da balança

### Adicionar features:
1. Implemente no processo principal (`main.js`)
2. Adicione IPC handler se necessário
3. Atualize interface (`renderer.html/js/css`)
