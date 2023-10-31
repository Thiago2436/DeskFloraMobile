# Use a imagem oficial do Apache a partir do Docker Hub
FROM httpd:2.4

# Instala o git no contêiner
RUN apt-get update && apt-get install -y git

# Clona o repositório do GitHub para o diretório /app
RUN git clone https://github.com/Thiago2436/DeskFloraMobile /app

# Copia os arquivos HTML, CSS e JS para o diretório padrão do Apache
RUN cp -r /app/* /usr/local/apache2/htdocs/

# Expor a porta 80 para permitir a comunicação com o Apache
EXPOSE 80

# Comando para iniciar o servidor Apache quando o contêiner for iniciado
CMD ["httpd", "-D", "FOREGROUND"]
