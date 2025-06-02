#!/bin/bash

# Criação da rede personalizada Docker
# Essa rede será usada por todos os containers subsequentes
NETWORK_NAME="rede-da-sheila"

# Verifica se a rede já existe
if ! docker network ls | grep -q "$NETWORK_NAME"; then
  echo "Criando a rede $NETWORK_NAME..."
  docker network create "$NETWORK_NAME"
else
  echo "A rede $NETWORK_NAME já existe."
fi
