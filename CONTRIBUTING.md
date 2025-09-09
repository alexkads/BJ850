# 🤝 Guia de Contribuição - BJ850 Hercules Clone

Obrigado por considerar contribuir com o BJ850 Hercules Clone! Este guia vai ajudá-lo a começar.

## 📋 Índice

- [🚀 Como Começar](#-como-começar)
- [🔧 Ambiente de Desenvolvimento](#-ambiente-de-desenvolvimento)
- [📝 Padrões de Código](#-padrões-de-código)
- [🐛 Reportando Bugs](#-reportando-bugs)
- [✨ Sugerindo Funcionalidades](#-sugerindo-funcionalidades)
- [🔄 Processo de Pull Request](#-processo-de-pull-request)
- [📖 Documentação](#-documentação)
- [🌍 Internacionalização](#-internacionalização)

## 🚀 Como Começar

### Tipos de Contribuição

Aceitamos diferentes tipos de contribuição:

- 🐛 **Correção de bugs**
- ✨ **Novas funcionalidades**
- 📖 **Melhoria de documentação**
- 🌍 **Traduções**
- 🧪 **Testes**
- 🎨 **Melhorias de UI/UX**
- 🚀 **Otimizações de performance**

### Primeira Contribuição

1. **Explore o projeto**: Leia o README e execute a aplicação
2. **Encontre uma issue**: Procure por labels `good-first-issue` ou `help-wanted`
3. **Comente na issue**: Informe que pretende trabalhar nela
4. **Faça um fork**: Clone o repositório para sua conta
5. **Implemente**: Desenvolva sua solução
6. **Teste**: Certifique-se de que tudo funciona
7. **Envie PR**: Submeta seu Pull Request

## 🔧 Ambiente de Desenvolvimento

### Pré-requisitos

```bash
# Versões recomendadas
Node.js >= 16.0.0
npm >= 8.0.0
Git >= 2.0.0
```

### Setup do Projeto

```bash
# 1. Fork e clone o repositório
git clone https://github.com/SEUUSUARIO/BJ850.git
cd BJ850

# 2. Instale dependências
npm install

# 3. Execute em modo desenvolvimento
npm run dev

# 4. Execute testes (quando disponíveis)
npm test
```

### Estrutura do Projeto

```
BJ850/
├── src/
│   ├── main.js          # Processo principal Electron
│   ├── preload.js       # Bridge IPC
│   ├── renderer.html    # Interface principal
│   ├── renderer.js      # Lógica da UI
│   └── styles.css       # Estilos CSS
├── assets/              # Recursos (ícones, imagens)
├── docs/               # Documentação adicional
├── tests/              # Testes (futuro)
└── scripts/            # Scripts de build/deploy
```

### Executando a Aplicação

```bash
# Desenvolvimento (com DevTools)
npm run dev

# Produção
npm start

# Build para distribuição
npm run build

# Build por plataforma
npm run build-mac
npm run build-win
npm run build-linux
```

## 📝 Padrões de Código

### JavaScript/ES6+

- Use **const/let** em vez de **var**
- Use **arrow functions** quando apropriado
- Use **template literals** para strings
- Sempre use **ponto e vírgula**
- Prefira **async/await** sobre Promises encadeadas

### Exemplo de Código

```javascript
// ✅ Bom
const sendCommand = async (command) => {
  try {
    const result = await window.electronAPI.sendData(command);
    if (result.success) {
      console.log(`Comando enviado: ${command}`);
    }
  } catch (error) {
    console.error('Erro ao enviar comando:', error);
  }
};

// ❌ Evitar
var sendCommand = function(command) {
  window.electronAPI.sendData(command).then(function(result) {
    if (result.success) {
      console.log("Comando enviado: " + command)
    }
  }).catch(function(error) {
    console.error("Erro ao enviar comando:", error)
  })
}
```

### CSS

- Use **kebab-case** para classes
- Prefira **CSS Grid/Flexbox** para layouts
- Use **variáveis CSS** (custom properties)
- Mantenha **consistência** com o design existente

### HTML

- Use **HTML5 semântico**
- Mantenha **acessibilidade** (alt, aria-labels)
- Use **IDs únicos**
- Mantenha **indentação consistente**

### Comentários

```javascript
// ✅ Bom - explica o "porquê"
// BJ-850 usa protocolo ASCII com terminador CR+LF
const formatCommand = (cmd) => `${cmd}\r\n`;

// ❌ Desnecessário - explica o "o quê"
// Adiciona CR+LF ao comando
const formatCommand = (cmd) => `${cmd}\r\n`;
```

## 🐛 Reportando Bugs

### Antes de Reportar

1. **Verifique issues existentes** - pode já estar reportado
2. **Teste na versão mais recente**
3. **Tente reproduzir** o problema
4. **Colete informações** relevantes

### Template de Bug Report

```markdown
## 🐛 Descrição do Bug
Descrição clara e concisa do problema.

## 🔄 Reprodução
Passos para reproduzir o problema:
1. Conecte à balança IP xxx.xxx.xxx.xxx
2. Clique em 'Obter Peso'
3. Observe o erro

## 📅 Comportamento Esperado
O que deveria acontecer.

## 📱 Ambiente
- SO: [Windows 10 / macOS Big Sur / Ubuntu 20.04]
- Versão da aplicação: [1.0.0]
- Modelo da balança: [BJ-850]
- Configuração de rede: [IP, porta, etc.]

## 📎 Logs/Screenshots
Se aplicável, adicione logs ou screenshots.

## 📋 Informações Adicionais
Qualquer outra informação relevante.
```

## ✨ Sugerindo Funcionalidades

### Template de Feature Request

```markdown
## 🚀 Funcionalidade Solicitada
Descrição clara da funcionalidade desejada.

## 💡 Motivação
Por que esta funcionalidade seria útil?

## 📋 Solução Proposta
Como você imagina que funcionaria?

## 🔄 Alternativas Consideradas
Outras formas de resolver o problema.

## 📊 Impacto
- Usuários beneficiados: [novatos/avançados/todos]
- Complexidade estimada: [baixa/média/alta]
- Breaking changes: [sim/não]
```

## 🔄 Processo de Pull Request

### Antes de Enviar

1. **Fork** o repositório
2. **Crie uma branch** descritiva: `feature/peso-automatico` ou `fix/conexao-timeout`
3. **Implemente** as mudanças
4. **Teste** localmente
5. **Atualize documentação** se necessário
6. **Commit** com mensagens claras

### Padrão de Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Tipos
feat:     # Nova funcionalidade
fix:      # Correção de bug
docs:     # Documentação
style:    # Formatação, espaços, etc.
refactor: # Refatoração de código
test:     # Testes
chore:    # Manutenção, builds, etc.

# Exemplos
feat: adicionar gráfico de peso em tempo real
fix: corrigir timeout de conexão com BJ-850
docs: atualizar guia de instalação
style: ajustar indentação em renderer.js
```

### Template de Pull Request

```markdown
## 📋 Descrição
Breve descrição das mudanças.

## 🔗 Issue Relacionada
Fixes #123

## 🔄 Tipo de Mudança
- [ ] Bug fix (mudança que corrige um problema)
- [ ] Nova funcionalidade (mudança que adiciona funcionalidade)
- [ ] Breaking change (mudança que quebra compatibilidade)
- [ ] Documentação (mudança apenas na documentação)

## 🧪 Como Testar
1. Conecte à balança BJ-850
2. Execute o comando X
3. Verifique o resultado Y

## 📋 Checklist
- [ ] Código segue padrões do projeto
- [ ] Testei as mudanças localmente
- [ ] Adicionei/atualizei documentação
- [ ] Mudanças não quebram funcionalidades existentes

## 📎 Screenshots
Se aplicável, adicione screenshots das mudanças.
```

### Review Process

1. **Automated checks**: GitHub Actions (futuro)
2. **Code review**: Pelo menos 1 aprovação
3. **Testing**: Teste manual se necessário
4. **Merge**: Squash and merge (padrão)

## 📖 Documentação

### Tipos de Documentação

- **README.md**: Visão geral e quick start
- **TECHNICAL_GUIDE.md**: Guia técnico detalhado
- **CONTRIBUTING.md**: Este arquivo
- **API.md**: Documentação de API (futuro)
- **CHANGELOG.md**: Log de mudanças (futuro)

### Padrões de Documentação

- Use **emojis** para categorização visual
- Use **tabelas** para comparações
- Use **código em blocos** para exemplos
- Use **details/summary** para seções opcionais
- Mantenha **links internos** funcionais

### Atualizando Documentação

- **README.md**: Para mudanças que afetam uso básico
- **TECHNICAL_GUIDE.md**: Para detalhes técnicos
- **Comentários no código**: Para lógica complexa
- **JSDoc**: Para funções e classes (futuro)

## 🌍 Internacionalização

### Idiomas Suportados

Atualmente:
- 🇧🇷 **Português** (principal)

Planejados:
- 🇺🇸 **English**
- 🇪🇸 **Español**

### Como Traduzir

1. **Crie arquivo** de idioma: `src/locales/en.json`
2. **Traduza strings** da interface
3. **Teste** com idioma alternativo
4. **Envie PR** com traduções

### Estrutura de Tradução

```json
{
  "connection": {
    "title": "Ethernet Connection",
    "connect": "Connect",
    "disconnect": "Disconnect",
    "status": {
      "connected": "Connected",
      "disconnected": "Disconnected"
    }
  },
  "commands": {
    "getWeight": "Get Weight",
    "zero": "Zero",
    "tare": "Tare"
  }
}
```

## 🧪 Testes

### Estrutura de Testes (Futuro)

```
tests/
├── unit/           # Testes unitários
├── integration/    # Testes de integração
├── e2e/           # Testes end-to-end
└── fixtures/      # Dados de teste
```

### Tipos de Testes Necessários

- **Unit**: Funções individuais
- **Integration**: Comunicação TCP/IP
- **E2E**: Fluxo completo de usuário
- **Mock**: Simulação de balança

## 📊 Métricas e Analytics

### Code Quality

Planejamos implementar:
- **ESLint**: Linting de JavaScript
- **Prettier**: Formatação automática
- **SonarQube**: Análise de qualidade
- **CodeClimate**: Métricas de manutenibilidade

### Performance

- **Bundle size**: Tamanho da aplicação
- **Startup time**: Tempo de inicialização
- **Memory usage**: Uso de memória
- **Network latency**: Latência de rede

## 🎯 Metas de Contribuição

### Curto Prazo (1-3 meses)

- [ ] Sistema de testes automatizados
- [ ] CI/CD com GitHub Actions
- [ ] Linting e formatação automática
- [ ] Documentação da API

### Médio Prazo (3-6 meses)

- [ ] Suporte a múltiplas balanças
- [ ] Interface multi-idioma
- [ ] Gráficos em tempo real
- [ ] Exportação de dados

### Longo Prazo (6+ meses)

- [ ] Plugin system
- [ ] Web version (PWA)
- [ ] Mobile companion app
- [ ] Cloud sync

## 📞 Suporte para Contribuidores

### Dúvidas Técnicas

- 💬 **GitHub Discussions**: Para discussões gerais
- 🐛 **Issues**: Para bugs específicos
- 📧 **Email**: Para questões privadas

### Mentoria

Oferecemos mentoria para:
- 🆕 **Primeiros contribuidores**
- 🎓 **Estudantes**
- 🔄 **Migrações de tecnologia**

### Reconhecimento

- 🏆 **Hall of Fame**: Lista de contribuidores
- 📜 **Certificados**: Para contribuições significativas
- 🎁 **Swag**: Adesivos e brindes (futuro)

---

## 💖 Obrigado!

Toda contribuição é valiosa, desde correções de typos até grandes funcionalidades. Juntos podemos tornar esta ferramenta ainda melhor para a comunidade industrial brasileira!

**Lembre-se**: Se você está inseguro sobre algo, não hesite em perguntar. Estamos aqui para ajudar! 🤝
