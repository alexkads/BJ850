#!/bin/bash

# Build script para BJ850 Hercules Clone

echo "🏗️  Iniciando build da aplicação BJ850 Hercules Clone..."

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Instale Node.js primeiro."
    exit 1
fi

# Instalar dependências se não existirem
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Build para a plataforma atual
echo "🔨 Construindo aplicação..."
npm run build

echo "✅ Build concluído!"
echo "📁 Arquivos de distribuição estão em: ./dist/"

# Listar arquivos gerados
if [ -d "dist" ]; then
    echo "📋 Arquivos gerados:"
    ls -la dist/
fi
