# Desafío Banco Ripley
Proyecto realizado en NODE JS que contiene un Chatbot Básico para Desafío Banco Ripley

## Bienvenidos a Asistente Virtual Banco Ripley

El siguiente proyecto se compone de 4 elementos principales para hacer de la experiencia del desarrollador un poco más cómoda.

Para inicializar el proyecto asegurese de tener todos los paquetes instalados, los cualquier puede obtener usando:
```
  npm install
```
los cuales incluyen:
```
"dependencies": {
  "ejs": "^3.1.6",
  "express": "^4.17.1",
  "morgan": "^1.10.0"
},
"devDependencies": {
  "nodemon": "^2.0.7"
}
```
Para poder iniciar el proyecto y además ver la ejecución en consola se recomienda utilizar:

```
  npm run dev
```

En caso de querer solo ejecutar:
```
  npm run start  
```
y posteriormente desde su navegador ingresar a localhost:8080/

La estructura de archivos considerada se compone de:
```
├── clientes.json (Base de datos que contiene clientes con su respectivo rut y saldo)
├── node_modules
├── package-lock.json
├── package.json (paquetes de inicialización)
└── src (estructura base del proyecto)
    ├── index.js (archivo raíz del proyecto)
    ├── public
    │   ├── css (Código CSS propio del proyecto)
    │   │   └── main.css
    │   └── js (Código JS propio del proyecto)
    │       └── main.js
    ├── routes
    │   └── index.js (Configuración de Puerto e inicialización básica)
    └── views
        ├── index.html (Página principal del Chat)
        └── partials
            ├── head.html (Librerías CSS)
            └── scripts.html (Librerías JS)

```

###### Contacto
- Jonathan Andrés Galassi Palavicino
- 18.585.361-6
- jonathan.galassi.p@gmail.com
- 996284455
