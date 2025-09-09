# Guia Técnico - Balança Jundiaí BJ-850

## 📋 Especificações da Balança

### Modelo: Jundiaí BJ-850
- **Tipo**: Balança industrial de precisão
- **Conectividade**: Ethernet TCP/IP
- **Protocolo**: ASCII sobre TCP
- **Porta padrão**: 4001
- **Baudrate**: N/A (Ethernet)
- **Timeout recomendado**: 5 segundos

## 🔧 Configuração da Balança

### Configuração de Rede da BJ-850

1. **Acessar Menu de Configuração**:
   - Pressione e segure a tecla de configuração na balança
   - Navegue até "Configurações de Rede" ou "Network Settings"

2. **Configurar IP**:
   - Defina um IP fixo (ex: 192.168.1.100)
   - Configure a máscara de rede (ex: 255.255.255.0)
   - Configure o gateway se necessário

3. **Configurar Porta TCP**:
   - Porta padrão: 4001
   - Protocolo: TCP
   - Modo: Server (a balança aguarda conexões)

4. **Salvar Configurações**:
   - Salve as configurações
   - Reinicie a balança se necessário

### Verificação da Conectividade

Para testar se a balança está acessível via rede:

```bash
# No terminal do macOS/Linux
ping 192.168.1.100

# Testar conexão TCP
telnet 192.168.1.100 4001
```

No Windows:
```cmd
ping 192.168.1.100
telnet 192.168.1.100 4001
```

## 📡 Protocolo de Comunicação

### Comandos Suportados

| Comando | Código | Descrição | Resposta Esperada |
|---------|--------|-----------|-------------------|
| Obter Peso | `P\r\n` | Solicita peso atual | `+00123.456 kg\r\n` |
| Zerar | `Z\r\n` | Zera a balança | `OK\r\n` ou `ZERO\r\n` |
| Tarar | `T\r\n` | Executa tara | `OK\r\n` ou `TARE\r\n` |
| Status | `S\r\n` | Status da balança | `STABLE\r\n` ou `UNSTABLE\r\n` |
| Info | `I\r\n` | Informações | `BJ-850 v1.0\r\n` |
| Reset | `R\r\n` | Reset da balança | `RESET OK\r\n` |

### Formato das Respostas

#### Peso
```
+00123.456 kg
-00001.234 kg
+00000.000 kg
```

#### Status
```
STABLE      - Peso estável
UNSTABLE    - Peso instável  
OVERLOAD    - Sobrecarga
UNDERLOAD   - Subcarga
ERROR       - Erro no sistema
```

#### Códigos de Erro Comuns
```
ERR001 - Erro de calibração
ERR002 - Sensor desconectado
ERR003 - Sobrecarga
ERR004 - Temperatura fora do range
ERR005 - Erro de comunicação interna
```

## 🛠️ Uso da Aplicação

### 1. Conexão Inicial

1. **Verificar Rede**:
   - Certifique-se de que o computador e a balança estão na mesma rede
   - Teste a conectividade com ping

2. **Conectar na Aplicação**:
   - Abra a aplicação BJ850 Hercules Clone
   - Digite o IP da balança (ex: 192.168.1.100)
   - Digite a porta (4001)
   - Clique em "Conectar"

3. **Verificar Status**:
   - O indicador deve ficar verde
   - O texto deve mostrar "Conectado (IP:PORTA)"

### 2. Comandos Rápidos

Use os botões da interface para comandos comuns:

- **📏 Obter Peso**: Mostra o peso atual no painel direito
- **🔄 Zerar**: Zera a balança (use apenas com plataforma vazia)
- **⚖️ Tarar**: Remove o peso do recipiente (use com recipiente na balança)
- **📊 Status**: Verifica se a leitura está estável
- **ℹ️ Info**: Obtém informações do firmware
- **🔄 Reset**: Reinicia a balança (use com cuidado)

### 3. Comandos Avançados

Para comandos específicos não cobertos pelos botões:

1. **Usar Envio Manual**:
   - Digite o comando no campo de texto
   - Selecione formato (Texto ou Hex)
   - Marque "Adicionar CR+LF" se necessário
   - Clique em "Enviar"

2. **Exemplos de Comandos Manuais**:
   ```
   CAL         - Entrar modo calibração
   CAL 1000    - Calibrar com peso de 1000g
   UNIT KG     - Mudar unidade para KG
   UNIT G      - Mudar unidade para gramas
   SAVE        - Salvar configurações
   ```

### 4. Interpretação dos Dados

#### Monitor de Dados
- **Verde (← )**: Dados recebidos da balança
- **Amarelo (→ )**: Dados enviados para a balança
- **Vermelho**: Erros de comunicação

#### Painel de Peso
- **Azul**: Peso normal
- **Verde**: Peso positivo estável
- **Vermelho**: Sobrecarga ou erro
- **Laranja**: Peso instável

## 🔍 Solução de Problemas

### Problema: Não consegue conectar

**Verificações**:
1. Ping para o IP da balança funciona?
2. Balança está ligada e configurada?
3. Porta 4001 está correta?
4. Firewall bloqueando conexão?

**Soluções**:
```bash
# Verificar conectividade
ping 192.168.1.100

# Verificar porta aberta
telnet 192.168.1.100 4001

# No macOS, verificar se não há bloqueio
sudo lsof -i :4001
```

### Problema: Conecta mas não recebe dados

**Verificações**:
1. Comando está correto?
2. Balança está em modo servidor?
3. Formato do comando inclui CR+LF?

**Teste manual**:
```bash
# Conectar via telnet e testar comando
telnet 192.168.1.100 4001
P<Enter>
```

### Problema: Dados incorretos ou caracteres estranhos

**Possíveis causas**:
1. Encoding diferente (ASCII vs UTF-8)
2. Terminadores de linha incorretos
3. Protocolo binário misturado

**Soluções**:
- Use o modo hexadecimal para ver dados brutos
- Verifique manual da balança para protocolo exato
- Teste com diferentes terminadores (\r\n, \n, \r)

### Problema: Peso não atualiza automaticamente

**Configuração necessária**:
1. Configure balança para envio automático:
   ```
   AUTO ON     - Ativar envio automático
   FREQ 1000   - Enviar a cada 1000ms
   CONT ON     - Modo contínuo
   ```

2. Na aplicação:
   - Deixe conexão aberta
   - Monitor mostrará dados automaticamente
   - Peso será atualizado no painel

## 📊 Monitoramento Avançado

### Log de Dados
- Todos os dados são registrados com timestamp
- Use "Mostrar Hex" para debugar protocolos
- Log mantém últimas 1000 entradas

### Estatísticas
- Contador de mensagens enviadas/recebidas
- Timestamp da última atividade
- Status de conexão em tempo real

### Exportação (Futura)
Recursos planejados:
- Salvar log em arquivo
- Exportar dados de peso
- Gráficos de tendência

## ⚙️ Configurações Avançadas

### Personalização de Comandos

Para adicionar comandos específicos, edite o arquivo `src/main.js`:

```javascript
const commands = {
  'custom-command': 'CUSTOM\r\n',
  'set-unit-kg': 'UNIT KG\r\n',
  'continuous-mode': 'CONT ON\r\n'
};
```

### Alteração de Protocolos

Se sua balança usar protocolo diferente, modifique:

1. **Porta padrão** em `src/main.js`:
```javascript
const SCALE_CONFIG = {
  defaultPort: 4001, // Altere aqui
  timeout: 5000,
  reconnectInterval: 3000
};
```

2. **Parsing de peso** em `src/renderer.js`:
```javascript
parseWeightData(data) {
  // Adicione novos padrões RegEx aqui
  const weightPatterns = [
    /([+-]?\d+\.?\d*)\s*kg/i,
    // Seu padrão personalizado
  ];
}
```

## 📞 Suporte Técnico

### Logs de Debug

Para ativar logs detalhados:
1. Execute com `npm run dev`
2. Abra DevTools (Ctrl+Shift+I)
3. Veja logs no Console

### Informações para Suporte

Ao reportar problemas, inclua:
- Modelo exato da balança
- Configuração de rede
- Mensagens de erro específicas
- Log de comunicação
- Sistema operacional

### Contato

- GitHub Issues: Para bugs e melhorias
- Documentação: README.md principal
- Código: Comentado para facilitar modificações
