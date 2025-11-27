🌐 WebFix – Sistema de Gestión Logística (LogiFlow)
🧩 Proyecto Final – Desarrollo Web Backend (IFTS)
👥 Grupo 8 – Silvana Fernández | Cristian Paez | Dante Serruto
📌 Descripción del Proyecto

LogiFlow es una aplicación web destinada a digitalizar y optimizar la gestión interna de una empresa logística.
El sistema implementa:

📁 Gestión de Áreas operativas

👥 Gestión de Empleados

🔐 Gestión de Roles (precargados, sin CRUD)

📝 Gestión de Tareas

El proyecto comenzó usando archivos JSON, pero fue mejorado para:

✔ Migrar completamente a MongoDB Atlas
✔ Aplicar arquitectura MVC
✔ Implementar vistas con Pug
✔ Modularizar estilos en CSS
✔ Realizar pruebas con Thunder Client
✔ Documentar el desarrollo e integrar prácticas de Ingeniería de Software

🚀 Tecnologías Utilizadas
| Tecnología           | Uso                  |
| -------------------- | -------------------- |
| **Node.js**          | Backend / servidor   |
| **Express.js**       | Routing, middlewares |
| **MongoDB Atlas**    | Base de datos        |
| **Mongoose**         | Modelado de datos    |
| **Pug**              | Motor de vistas      |
| **CSS modularizado** | Diseño               |
| **dotenv**           | Variables de entorno |
| **Thunder Client**   | Pruebas HTTP         |

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
│   ├── Rol.js        ← precargado (sin CRUD)
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
│   ├── empleados/
│   ├── areas/
│   ├── roles/
│   └── tareas/
│
└── views/
    ├── layout.pug
    ├── home.pug
    ├── empleados/
    ├── areas/
    ├── roles/
    └── tareas/


⚙️ Instalación y Configuración

1️⃣ Clonar el repositorio
git clone https://github.com/crishpaez/BackEnd-IFTS.git
cd BackEnd-IFTS

2️⃣ Instalar dependencias
npm install

3️⃣ Crear archivo .env
MONGODB_URI={cadena de conexión}
PORT=3001

⚠️ El usuario debe existir en Database Access en MongoDB Atlas.

4️⃣ Ejecutar el servidor

Modo desarrollo:
npm run dev

Modo producción:
npm start

📌 Funcionalidades
🟦 Módulo Áreas

Crear / Editar / Listar / Eliminar

Formularios con validaciones

Vistas Pug + soporte JSON (?formato=json)

🟩 Módulo Empleados

CRUD completo

Selección dinámica de Rol y Área

Estado (activo/inactivo)

ID numérico secuencial

🟨 Módulo Roles (precargados, sin modificaciones)

Los roles disponibles son:

| ID | Rol            |
| -- | -------------- |
| 1  | Administrativo |
| 2  | Operario       |
| 3  | Chofer         |

✔ Se listan
✔ Se muestra el detalle
❌ No se pueden crear, editar o eliminar

🟥 Módulo Tareas

CRUD completo con MongoDB

ID numérico propio (no ObjectId)

Vistas con CSS modular

🧪 Pruebas Realizadas (Thunder Client)

Se probaron las operaciones:

✔ GET /areas — Listado
✔ POST /areas — Crear área
✔ PUT /areas/editar/:id — Editar
✔ DELETE /areas/eliminar/:id — Eliminar

✔ GET /empleados
✔ POST /empleados/nuevo
✔ PUT /empleados/editar/:id
✔ DELETE /empleados/eliminar/:id

✔ CRUD de tareas vía MongoDB
✔ Manejo de ?formato=json
✔ Validaciones y casos de error

📄 Todas las capturas se encuentran incluidas en el PDF de documentación.
Archivo: “G8 - WebFix - Documentación.pdf” 

G8 - Webfix - Documentación

🔐 Seguridad y Variables de Entorno

Se usa dotenv para la conexión Atlas.

🛠️ Mejoras Implementadas

Migración completa de JSON → MongoDB Atlas

Conversión a ES Modules

Limpieza y modularización del backend

Estilos CSS específicos por módulo

Manejo de errores mejorado

Alertas y validaciones en formularios

Nuevas vistas (detalle roles, tareas)

IDs numéricos consistentes en todas las entidades

📘 Documentación del Proyecto

Incluye:

Objetivos

Funcionalidades

Diagramas

Pruebas

Roles del equipo

Mejoras realizadas

Conclusiones y dificultades

Uso de IA

Bibliografía

Archivo incluido: PROYECTO LogiFlow.pdf

🎥 Video de Defensa

Explicación técnica del backend

Demostración de CRUD

Explicación MongoDB Atlas


👥 Autores
| Integrante            | Aportes                                                                       |
| --------------------- | ----------------------------------------------------------------------------- |
| **Silvana Fernández** | Diseño UI, vistas Pug, estructura inicial, manejo de errores                  |
| **Cristian Paez**     | Controladores y rutas de áreas, datos JSON iniciales, migraciones             |
| **Dante Serruto**     | Migración a ES Modules, MongoDB Atlas, controladores empleados, documentación |
