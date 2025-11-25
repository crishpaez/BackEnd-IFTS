🧩 WebFix – Sistema de Gestión Logística (LogiFlow)
Proyecto Final – Desarrollo Web Backend
Grupo 8 – Silvana Fernández | Cristian Paez | Dante Serruto
📌 Descripción del Proyecto

LogiFlow es una empresa dedicada al transporte y almacenamiento de mercaderías.
Nuestro proyecto consiste en un sistema de gestión interno que optimiza la administración de:

Áreas operativas

Empleados

Roles

Tareas

El objetivo fue mejorar la versión inicial del sistema, reemplazando el almacenamiento en archivos JSON por una base de datos MongoDB Atlas, estructurando el backend bajo el modelo MVC, agregando vistas Pug mejoradas, estilos CSS organizados y realizando pruebas (Thunder Client) para validar las funcionalidades.

🚀 Tecnologías Utilizadas

Node.js

Express.js

MongoDB Atlas + Mongoose

Pug (motor de vistas)

CSS modularizado

Thunder Client (pruebas)

dotenv (variables de entorno)

📂 Estructura del Proyecto (MVC)
BackEnd-IFTS/
│
├── app.js
├── config/
│   └── db.js
│
├── controllers/
│   ├── areasController.js
│   ├── empleadosController.js
│   ├── rolesController.js
│   ├── tareasController.js
│   └── homeController.js
│
├── models/
│   ├── Area.js
│   ├── Empleado.js
│   ├── Rol.js
│   └── Tarea.js
│
├── routes/
│   ├── areasRoutes.js
│   ├── empleadosRoutes.js
│   ├── rolesRoutes.js
│   ├── tareasRoutes.js
│   └── indexRoutes.js
│
├── styles/
│   ├── layout.css
│   ├── home.css
│   ├── empleados/...
│   ├── areas/...
│   ├── roles/...
│   └── tareas/...
│
└── views/
    ├── layout.pug
    ├── home.pug
    ├── empleados/...
    ├── areas/...
    ├── roles/...
    └── tareas/...

⚙️ Instalación y Configuración
1️⃣ Clonar el repositorio
git clone https://github.com/crishpaez/BackEnd-IFTS.git
cd BackEnd-IFTS

2️⃣ Instalar dependencias
npm install

3️⃣ Configurar variables de entorno

Crear un archivo .env en la raíz:

MONGODB_URI=mongodb+srv://<USUARIO>:<PASSWORD>@<CLUSTER>.mongodb.net/logiflow
PORT=3001


⚠️ El usuario debe estar creado en Database Access de MongoDB Atlas.

4️⃣ Levantar el servidor

Modo desarrollo:

npm run dev


Modo producción:

npm start

📌 Funcionalidades
🟦 Módulo Áreas

Crear / Listar / Editar / Eliminar áreas

Manejo vía vistas Pug y vía JSON

Validaciones en formularios

Actualización dinámica en Empleados

🟩 Módulo Empleados

Alta, edición, eliminación

Selección dinámica de rol, área y estado

Validación de campos obligatorios

IDs numéricos secuenciales

🟨 Módulo Roles

Listado y detalle de roles

Integrado en la carga de empleados

🟥 Módulo Tareas

Sistema migrado totalmente a MongoDB

IDs numéricos propios (no ObjectId)

CRUD completo

Vistas mejoradas con CSS modular

🧪 Pruebas (Thunder Client)

Se realizaron pruebas para:

✔ Obtener todas las áreas
✔ Crear nuevas áreas
✔ Modificar áreas existentes
✔ Eliminar áreas y empleados
✔ Crear, editar y eliminar tareas con MongoDB
✔ Peticiones GET/POST/PUT/DELETE con ?formato=json

Todas las capturas están documentadas en el PDF de la entrega final.


G8 - Webfix - Documentación (1)

🔐 Variables de Entorno y Seguridad

El proyecto utiliza dotenv

La URI de Atlas NUNCA debe publicarse en el repo

No se utilizaron sistemas de autenticación (JWT o Passport)
→ Se explica en la documentación por qué no era requerido según el alcance original.

🛠️ Mejoras Implementadas (versión final)

Migración completa de JSON → MongoDB Atlas

Conversión total del proyecto a ES Modules (import/export)

Separación de controladores, rutas y modelos

Manejo de errores centralizado

Validación de formularios y alertas visuales

Estructura de carpetas limpia (MVC + styles + views)

Estilos CSS individuales por módulo

Optimización de rutas, controladores y vistas

Creación de vistas nuevas (Tareas, Roles Detalle, etc.)

Manejo de IDs numéricos coherentes en todas las entidades

📘 Documentación del Proyecto

La documentación completa (PDF) contiene:

Introducción

Objetivos generales y específicos

Roles del equipo

Funcionamiento del sistema

Diagramas

Pruebas en Thunder Client

Mejoras y dificultades

Conclusiones finales

📄 Documento entregado:
"G8 - WebFix - Documentación.pdf"

🎥 Video / Defensa

El video debe incluir:

Explicación de controladores y rutas

Demostración de CRUD en todos los módulos

Pruebas de fallos y validaciones

Explicación del uso de Mongo Atlas

Participación de los 3 integrantes (obligatorio)

🧑‍💻 Autores

Silvana Fernández – Diseño de vistas, estructura inicial, manejo de errores

Cristian Paez – Rutas, controladores de áreas, JSON inicial, migraciones

Dante Serruto – Migración a módulos ES, MongoDB, controladores empleados, documentación