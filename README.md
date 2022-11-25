# Sistema para reservación de salas

## Descripción
El sistema cuenta con cuatro módulos encargados de gestionar la autenticación de los usuarios al sistema, gestionar la información de usuarios, gestionar la información de las salas y crear las reservaciones de estas últimas.

### Tecnologias utilizadas
* NodeJS
* NestJS
* MongoDB
* Mikro-ORM
* Passport(JWT)
* Serverless framework(AWS)
* Lambda functions
* Lambda layers
* Webpack (empaquetar funciones lambda)

*************************************************************

## Servicio de autenticación(auth)
Este módulo es el encargado de administrar la autenticación al sistema por medio de tokens(JWT), estos son firmados por el servidor con una secret-key la cual se encuentra como variable de entorno(.env) además de asignarle un tiempo de vida al token. Posteriormente, se solicitará el token en los endpoints que estén protegidos.

### URL del servicio:
```
    local : http://127.0.0.1:8080/auth
    lambda : https://bmdu7w25xpzewq36i22ooqpicm0nyclo.lambda-url.us-east-1.on.aws/auth
```
### Metodos HTTP disponibles:

```
   * POST
```

********************************************************

## Servicio gestion de usuarios(users)
Este módulo es el encargado de administrar la información de cada uno de los usuarios que ingresan al sistema, en este se gestiona el CRUD de los usuarios.  

### URL del servicio:
```
    local : http://127.0.0.1:8080/users
    lambda : https://5ysrhjk7yhwuyftpv35nrib5qu0elkoq.lambda-url.us-east-1.on.aws/users
```
### Metodos HTTP disponibles:

```
   * GET
   * POST
   * PUT
   * DELETE
```
************************************************************

## Servicio gestion de salas(boardrooms)
Este módulo es el encargado de administrar solo la información con respecto a las salas de juntas, este módulo es el encargado de gestionar el CRUD de las salas.

### URL del servicio:
```
    local : http://127.0.0.1:8080/boardroom
    lambda : https://yvxka6iqqacnsrh5epyhysgt5a0wrlqh.lambda-url.us-east-1.on.aws/boardroom
```
### Metodos HTTP disponibles:

```
   * GET
   * POST
   * PUT
   * DELETE
```
**************************************************************

## Servicio para reservaciones(reservations)
Este módulo es el encargado de crear reservaciones para las salas de juntas, se utilizó la librería 'dayjs' para trabajar con las fechas.

Se guardó el tiempo máximo (en segundos) para la reserva de una sala como variable de entorno 'TIME_MAX_RESERV_SECONDS' en este caso 7200 segundos es equivalente a 2hrs.

Se optó por trabajar las reservas de las salas a modo de agenda, con ello se optimiza la gestión de reservas, ya que se pueden ir agendando las reservaciones de una salas a lo largo del tiempo y solo se valida que la fecha de una nueva reservación no coincida con una existente.

Se opto por validar que las nuevas reservaciones solo se pueden hacer para fechas posteriores a la fecha actual, con ello se evita crear datos basura.

### URL del servicio:
```
    local : http://127.0.0.1:8080/reservations
    lambda : https://xnblflufjgj5inky64bpgn5lyy0imrwf.lambda-url.us-east-1.on.aws/reservations
```
### Metodos HTTP disponibles:

```
   * POST

```

***********************************************************
## Servidor local

Instalación de dependencias
``` bash
    npm install
```
Una vez instaladas las dependencias se puede correr el servidor de manera local.
``` bash
    npm run start:dev
```

************************
## Despliegue de funciones lambda

Para realizar el despliegue del código a funciones lambda es necesario instalar serverles framework en el equipo y configurar apropiadamente las credenciales de AWS mediante un usuario IAM para limitar los permisos (revisar doc serverless y IAM aws).

Posteriormente, es necesario instalar las dependencias del proyecto que se encuentran dentro de la carpeta 'layer' las cuales serviran para crear la capa(lambda layer) que usaran todas nuestras funciones lambda como único punto para consumir las dependencias, ahorrando espacio de almacenamiento en s3.

```
    cd layer
    npm i
```

Una vez que se tenga correctamente configurado serverless e instaladas las dependencias de nuestra capa, el siguiente paso es hacer el deploy de nuestras funciones.

```
    serverless deploy --verbose
```

Cabe destacar que el proyecto utilizo webpack para comprimir aún más el peso de nuestras funciones lambda logrando un peso de entre 4-5kB por función.

*NOTA Los archivos correspondientes para testear los endpoints se encuentran dentro de cada módulo con extension .http para la extensión "REST client" de vscode(revisar documentación).