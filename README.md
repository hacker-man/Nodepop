#Nodepop
API que dará servicio a una app de venta de artículos de segunda mano

## Setup de entrono de desarrollo
Debes tener instalado [nodejs](http://nodejs.org/en) y
con *npm* se debe instalar *express* y *mongoose* utilizando:

`$sudo npm install -g express`

`$sudo npm install mongoose --save`

Para mayor comodidad a la hora de probar cambios podemos instalar nodemon:

`$sudo npm install -g nodemon`

Además si se desea tener datos de prueba en la base de datos Mongo, se puede ejecutar el script *install_db.js* con el siguiente comando:

`$npm run installdb`

 En estos momentos el repositorio cuenta con todas las dependencias necesarias, por lo que no será necesario que las descargues aparte, si en un futuro fueran eliminadas, el comando que necesitarías utilizar ejecutar dentro de la carpeta del proyecto para poder instalarlas sería :

`$npm-install`

### Probar el API

#### 1. Arrancar la base de datos:
`$mongod --dbpath C:\ruta~..\db --directoryperdb`
#### 2. Lanzar nodemon desde la ruta de la aplicación:
`$nodemon`


## Documentación del API:
En el directorio *public* de la aplicación: http://localhost:3000/doc/




## Changelog
### v.1.0.0 - 2016-03-17
### v.1.1.0 - 2016-03-18

* Se ha optimizado el script de carga de datos implementadolo con *promesas*.
