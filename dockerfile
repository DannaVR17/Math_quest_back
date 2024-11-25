# Usa la imagen base de Node.js
FROM node:22.11.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que tu aplicación escucha (ajústalo si es diferente)
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]