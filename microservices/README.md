# Complementario MicroServicios (Proyecto Tecno Service)
## Guía para ejecutar aplicación con docker integrado

Instalación de docker
Paso 1:
- Debes registrarte en la página oficial de Docker  y descargar el instalador para Windows
[![](https://camo.githubusercontent.com/fea941fe5871f2d724f265dd678ca045b1f1f3e3fb2e469beb28f4d3b2315d39/68747470733a2f2f676973742e6769746875622e636f6d2f6d72636f64656465762f38663963336363353639386639386164656366616562643739376235373134652f7261772f353537346364323031656266386231623132386663323030343363633961646533376366346261612f696d6167652d646f636b65722e706e67)](https://hub.docker.com/)

- Una vez descargado, se lo instala como cualquier otro programa, al final de la instalación le pedirá que reinicie su sesión de windows.
- Le aparecerá un mensaje donde le notifica que Docker necesita dos tecnologías necesarias para funcionar docker correctamente, una vez instaladas se reiniciara su equipo y tendrá docker listo para funcionar.

Ejecución de proyecto

Paso 1:
- Iniciar docker 🐋
- Iniciar sesión con tus credenciales de docker (opcional) 💻

Paso 2:
- Abre el código con tu editor de preferencia 👩‍💻
- Una vez dentro, abre una terminal

Paso 3:
- Línea para crear la imagen en docker:
```sh
docker-compose build
```

Paso 4:
- Linea para ejecutar el proyecto desde docker:
```sh
docker-compose up
```
Si abres docker desktop veras que se han creado dos imagenes en el apartado images, las cuales tendrán un identificador verde con la frase "in use" lo cual significa que docker esta corriendo ese contenedor, para ver el contenedor hay un apartado en el sidebar izquierdo con el nombre "containers" y ahi estara el contenedor donde está alojado el proyecto.

Una vez realizados estos pasos, en POSTMAN puedes probar las rutas que estan creadas para los respectivos controladores, a traves del url:

http://localhost:8080/ + la ruta que hayan configurado en el archivo de configuración nginx.conf + la ruta normal de cada microservicio

Ejemplo: 
- http://localhost:8080/TecnoService/api/clientes/listar/
> Nota: Se debe ver el archivo de rutas ubicado en la carpeta routes en cada microservicio

## License

Universidad Laica Eloy Alfaro de Manabí | Paul Quiñonez 2022 | Sexto "B"

**Aplicación bajo derechos de autor**