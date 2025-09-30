# 🚀 ECOMMERCE API BACKEND | NestJS, TypeORM, PostgreSQL

![Banner o Logo del Proyecto (Placeholder)](https://github.com/user-attachments/assets/0b4d13d8-ac9c-4da8-93ce-1345eb593597)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

**API de Backend** para una plataforma de eCommerce, desarrollada utilizando el *framework* **NestJS** (Node.js) con **TypeScript**. La API sigue una arquitectura modular y escalable, implementando autenticación robusta con **JSON Web Tokens (JWT)** y documentación exhaustiva a través de **Swagger**.


---

## ✅ Características Principales

* **Arquitectura:** Modular y escalable, basada en NestJS.
* **Autenticación Segura:** Implementación de flujo de registro (`signup`) e inicio de sesión (`signin`) con **JWT**.
* **Autorización por Roles:** Diferenciación de acceso para usuarios con roles **`user`** y **`admin`** mediante `Guards` y `Decorators` personalizados.
* **Base de Datos:** Persistencia de datos utilizando **PostgreSQL** y el ORM **TypeORM**.
* **Gestión de Archivos:** Carga de imágenes (*upload*) de productos a través del servicio **Cloudinary**.
* **Documentación Interactiva:** Interfaz de usuario interactiva y documentación completa de todos los *endpoints* generada automáticamente con **Swagger**.
* **Validaciones:** Uso de **`bcrypt`** para el *hashing* de contraseñas y validadores personalizados (`MatchPassword`).
* **Logging:** *Middleware* personalizado para registrar las peticiones de entrada (`método`, `URL`, `fecha/hora`, `IP`).

---

## 💻 Módulos y Funcionalidades (Endpoints)

| Módulo | Descripción | Endpoints Principales | Acceso |
| :--- | :--- | :--- | :--- |
| **`auth`** | Manejo de la autenticación de usuarios. | `POST /auth/signin` (Login), `POST /auth/signup` (Registro) | Público |
| **`users`** | Gestión de usuarios (CRUD y Paginación). | `GET /users` (Paginado - Solo Admin), `GET /users/:id`, `PUT /users/:id`, `DELETE /users/:id` | Protegido (JWT) |
| **`products`** | Gestión del catálogo de productos (CRUD y Paginación). | `GET /products`, `POST /products`, `PUT /products/:id` (Solo Admin), `DELETE /products/:id` | Mixto (Público y Protegido) |
| **`categories`** | Consulta de categorías de productos. | `GET /categories` | Público |
| **`orders`** | Creación y consulta de pedidos. | `POST /orders`, `GET /orders/:id` | Protegido (JWT) |
| **`files`** | Carga de imágenes. | `POST /files/uploadImage/:id` (Para producto, con validación de 200kb y tipo de archivo) | Protegido (JWT) |

---

## 🛠️ Requisitos e Instalación

### Requisitos Previos

* **Node.js**
* **npm**
* **PostgreSQL** (Servidor de base de datos en ejecución)
* Una cuenta de **Cloudinary** (para la carga de imágenes).

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/tiagoisi/eccommerce-tiagoisi.git
    cd ecommerce-tiagoisi
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

3.  Crea el archivo de variables de entorno `.env` en la raíz del proyecto y configúralo:

    ```bash
    # Configuración de la API
    PORT=3000

    # Configuración de PostgreSQL (TypeORM)
    DB_NAME=db-name
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=db-username
    DB_PASSWORD=db-password

    # Configuración de JWT
    JWT_SECRET=jwt-secret

    # Configuración de Cloudinary (para carga de imágenes)
    CLOUDINARY_CLOUD_NAME=cloudinary-cloud-name
    CLOUDINARY_API_SECRET=cloudinary-api-secret
    CLOUDINARY_API_KEY=cloudinary-api-key
    ```
    ***Nota:** Debes rellenar los valores para la conexión a tu DB y las credenciales de Cloudinary y JWT.*

---

## ▶️ Ejecución

### Ejecución Local (Desarrollo)

Para iniciar la API en modo desarrollo (con *hot-reload*):

```bash
npm run start:dev
