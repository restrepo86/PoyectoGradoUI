# UCO-PUPE-UI
###### Version 1.0

## Table of Contents

* [Deployment](#deployment)

## Deployment
Para desplegar los servicios en tu maquina primero debes tener instalado:
  1. https://docs.docker.com/install/  docker
  2. https://docs.docker.com/compose/install/ docker-compose
  
Una vez instalados seguir los siguientes pasos:
  1. Clonar el repo del back [PUPE-HTTP](https://github.com/johncastano/uco-pupe) y sobre el directorio raiz ejecutar `sbt docker:publishLocal`.
  2. Clonar el repo del front [PUPE-UI](https://github.com/restrepo86/PoyectoGradoUI) y sobre el directorio raiz construir la imagen con el comando `docker build . -t pupe-ui`.
  3. Por último parado sobre la raiz del proyecto front en tu maquina, ejecutar `docker-compose up`.

Los 3 contenedores se crean(pupe-http,pupe-ui y postgresql) y los servicios estarán levantados en sus puertos correspondientes. En el navegador ya puedes hacer uso en `localhost:3000`
