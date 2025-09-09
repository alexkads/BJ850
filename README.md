# BJ850 Hercules Clone

Um clone do Hercules Setup Utility especificamente desenvolvido para comunicação com a balança Jundiaí BJ-850 via conexão Ethernet.

![BJ850 Hercules Clone](assets/screenshot.png)

## 🚀 Funcionalidades

- **Conexão Ethernet**: Conecte-se à balança BJ-850 via TCP/IP
- **Comandos Rápidos**: Botões pré-configurados para comandos comuns da balança
- **Envio Manual**: Envie comandos personalizados em texto ou hexadecimal
- **Monitor em Tempo Real**: Visualize dados enviados e recebidos
- **Exibição de Peso**: Mostra o peso atual da balança em tempo real
- **Log Detalhado**: Histórico completo de comunicação com timestamps
- **Interface Intuitiva**: Design limpo e responsivo

## 🛠️ Comandos Suportados

A aplicação inclui comandos pré-definidos para a balança BJ-850:

- **📏 Obter Peso**: Solicita o peso atual (`P\r\n`)
- **🔄 Zerar**: Zera a balança (`Z\r\n`)
- **⚖️ Tarar**: Executa tara (`T\r\n`)
- **📊 Status**: Solicita status da balança (`S\r\n`)
- **ℹ️ Info**: Solicita informações da balança (`I\r\n`)
- **🔄 Reset**: Reset da balança (`R\r\n`)

## 🔧 Instalação

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. Clone ou baixe este repositório
2. Instale as dependências:

```bash
npm install
```

3. Execute a aplicação:

```bash
npm start
```

## 🏗️ Build

Para criar executáveis para diferentes plataformas:

```bash
# Build para todas as plataformas
npm run build

# Build específico para macOS
npm run build-mac

# Build específico para Windows
npm run build-win

# Build específico para Linux
npm run build-linux
```

## 🌐 Configuração de Rede

### Configuração da Balança BJ-850

1. Configure o endereço IP da balança (geralmente através do painel da balança)
2. Configure a porta de comunicação (padrão: 4001)
3. Certifique-se de que a balança está na mesma rede ou acessível via IP

### Configuração da Aplicação

1. Insira o IP da balança no campo "Endereço IP"
2. Insira a porta (padrão: 4001)
3. Clique em "Conectar"

## 📋 Uso

### Conectando à Balança

1. Abra a aplicação
2. Digite o IP da balança (ex: 192.168.1.100)
3. Digite a porta (padrão: 4001)
4. Clique em "Conectar"
5. O status mudará para "Conectado" quando a conexão for estabelecida

### Comandos Rápidos

Use os botões de comandos rápidos para executar ações comuns:
- Clique em qualquer botão para enviar o comando correspondente
- O resultado aparecerá no monitor de dados

### Envio Manual

1. Digite o comando no campo "Dados para enviar"
2. Escolha o formato (Texto ou Hexadecimal)
3. Marque "Adicionar CR+LF" se necessário
4. Clique em "Enviar"

### Monitor de Dados

- **Limpar Log**: Remove todas as entradas do log
- **Auto Scroll**: Rola automaticamente para a última entrada
- **Mostrar Timestamp**: Inclui timestamp nas entradas
- **Mostrar Hex**: Mostra representação hexadecimal dos dados

## 🔍 Interpretação de Dados

A aplicação automaticamente interpreta respostas da balança:

- **Peso**: Extraído automaticamente e exibido no painel de peso
- **Status**: Interpreta estados como "estável", "instável", etc.
- **Erros**: Detecta condições como sobrecarga ou subcarga

## 🐛 Solução de Problemas

### Não consegue conectar

1. Verifique se o IP da balança está correto
2. Verifique se a porta está correta (padrão: 4001)
3. Certifique-se de que a balança está ligada e na rede
4. Verifique firewall e configurações de rede

### Não recebe dados

1. Verifique se a balança está configurada para enviar dados via Ethernet
2. Teste com comandos manuais primeiro
3. Verifique se não há problemas de comunicação na rede

### Dados incorretos

1. Verifique o protocolo de comunicação da balança
2. Teste diferentes formatos de comando
3. Consulte o manual da balança BJ-850

## 📖 Protocolo de Comunicação

A balança BJ-850 geralmente usa protocolo ASCII via TCP/IP:

- **Comandos**: Terminados com CR+LF (`\r\n`)
- **Respostas**: Formato texto com dados de peso e status
- **Porta padrão**: 4001
- **Timeout**: 5 segundos

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

Para suporte e dúvidas:

- Abra uma issue no GitHub
- Consulte a documentação da balança BJ-850
- Verifique as configurações de rede

## 🔮 Próximas Funcionalidades

- [ ] Salvamento de configurações
- [ ] Múltiplas conexões simultâneas
- [ ] Gráficos de peso em tempo real
- [ ] Exportação de dados
- [ ] Configuração de comandos personalizados
- [ ] Suporte a outros modelos de balança

---

**Nota**: Esta aplicação foi desenvolvida especificamente para a balança Jundiaí BJ-850. Para outras balanças, podem ser necessários ajustes no protocolo de comunicação.
