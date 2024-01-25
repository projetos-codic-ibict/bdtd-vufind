#!/bin/bash

# Diretório alvo
directory_to_clean="tmp/systemd-private-7f7e7faaf3b3451d9f3281ff6ab3b1e5-apache2.service-ydJQ8g/tmp/vufind_sessions"

# Verifica se o diretório existe antes de continuar
if [ -d "$directory_to_clean" ]; then
    # Remove arquivos modificados há mais de um dia
    find "$directory_to_clean" -type f -mtime +1 -delete
    echo "Todos os arquivos modificados há mais de um dia em $directory_to_clean foram removidos."
else
    echo "Diretório não encontrado: $directory_to_clean"
fi

