# UCO-PUPE-UI
###### Version 1.0

## Table of Contents

* [Deployment](#deployment)

## Deployment
Para desplegar los servicios en tu maquina primero debes tener instalado:
  1. https://docs.docker.com/install/  docker
  2. https://docs.docker.com/compose/install/ docker-compose
  
Una vez instalados seguir los siguientes pasos:
  1. Clonar el repo del back [PUPE-HTTP](git@github.com:johncastano/uco-pupe.git)
    Una vez clonado el repo debes crear la imagen de este ejecutando el `sbt docker:publishLocal` sobre el proyecto.
  2. Clonar el repo del front [PUPE-UI](git@github.com:restrepo86/PoyectoGradoUI.git)
    Una vez clanado debes construir la imagen con el comando `docker build . -t pupe-ui`
  3. Por último parado sobre este proyecto en tu maquina ejecutar `docker-compose up`

Los contenedores de el servicio del back(PUPE-HTTP),front(PUPE-UI) y postgres se levantan y puedes hacer uso de la app en localhost:3000 
