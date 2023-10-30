# Use a imagem oficial do Nginx a partir do Docker Hub
FROM nginx:latest

# Instala o git no contêiner
RUN apt-get update && apt-get install -y git

# Clona o repositório do GitHub para o diretório /app
RUN git clone https://github.com/Thiago2436/DeskFloraMobile /app

# Copia os arquivos HTML, CSS e JS para a pasta de conteúdo padrão do Nginx
RUN cp -r /app/* /usr/share/nginx/html

# O Nginx padrão na imagem do Docker já expõe a porta 80
# Não é necessário declarar o comando EXPOSE para a porta 80, pois já é feito na imagem base do Nginx

# Comando para iniciar o servidor Nginx quando o contêiner for iniciado
CMD ["nginx", "-g", "daemon off;"]
