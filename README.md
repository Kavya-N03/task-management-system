# 🧠 Task Management System (Backend + Frontend)

A full-stack Task Management application built with Django REST Framework and React.js.
Implements secure authentication, role-based access control, and CRUD operations with a scalable backend structure.

---

## 🚀 Features

### 🔐 Authentication

* User Registration & Login
* JWT-based authentication
* Secure password hashing

### 👥 Role-Based Access

* Admin can view and manage all tasks
* Users can only manage their own tasks

### 🔁 Task Management (CRUD)

* Create, Read, Update, Delete tasks
* Protected APIs (JWT required)

### 📄 API Documentation

* Swagger UI available for testing APIs

### 🎨 Frontend

* Built with React.js + Tailwind CSS
* Login/Register UI
* Dashboard for task management
* Displays success/error messages

---

## 🛠️ Tech Stack

### Backend:

* Python
* Django
* Django REST Framework
* JWT (SimpleJWT)

### Frontend:

* React.js
* Tailwind CSS

### Database:

* PostgreSQL

---

## ⚙️ Backend Setup

```bash
git clone <your-repo-link>
cd task_management_backend
# create virtual environment
python -m venv venv
venv\Scripts\activate   # Windows

# install dependencies
pip install -r requirements.txt
```

### Create `.env` file

```
SECRET_KEY=your-secret-key

DB_NAME=task_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### Run server

```bash
python manage.py migrate
python manage.py runserver
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

### Auth:

* POST `/api/v1/register/`
* POST `/api/v1/login/`

### Tasks:

* GET `/api/v1/tasks/`
* POST `/api/v1/tasks/`
* PUT `/api/v1/tasks/{id}/`
* DELETE `/api/v1/tasks/{id}/`

---

## 📘 API Documentation

Swagger available at:
http://127.0.0.1:8000/swagger/
http://127.0.0.1:8000/redoc/

---

## 🔐 Role-Based Access Logic

* Admin users can access all tasks
* Normal users can only access their own tasks
* Enforced at queryset level in backend

---

## 📈 Scalability Notes

* Modular Django apps (accounts, tasks)
* JWT-based stateless authentication
* Environment-based configuration
* Can be extended with:

  * Redis caching
  * Docker containerization
  * Load balancing
  * Microservices architecture

---

## 🚀 Deployment

Backend deployed on Render

> Uses PostgreSQL database in production via environment variables

