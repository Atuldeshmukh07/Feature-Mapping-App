🚗🔧 Feature Mapping Dashboard

A full-stack web application built with Spring Boot (Java) and React.js to manage vehicle features across different markets.
The dashboard allows creating, viewing, updating, and deleting feature mappings, with a clean UI and color-coded status indicators.

✨ Features

📋 Dashboard showing all mappings (Vehicle, Feature, Market, Status)

🎨 Status badges with custom colors (Available, Unavailable, Pending, InProgress)

➕ Add new mapping (via form)

✏️ Update existing mapping

❌ Delete mapping directly from dashboard

🔗 Backend: Spring Boot + JPA + MySQL

💻 Frontend: React.js + Axios + Custom CSS

🛠️ Tech Stack
Backend

Spring Boot (Java)

Spring Data JPA

MySQL

Frontend

React.js

Axios (for API calls)

Custom CSS (with color constants)

⚙️ Setup Instructions
1. Clone Repository
git clone https://github.com/your-username/feature-mapping-dashboard.git
cd feature-mapping-dashboard

2. Backend (Spring Boot)
Navigate to backend folder
cd backend

Configure Database

Create a MySQL database:

CREATE DATABASE feature_mapping_db;

Update application.properties

Instead of exposing secrets, create a file:

spring.datasource.url=jdbc:mysql://localhost:3306/feature_mapping_db
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect


👉 Do not commit real credentials. Provide an application.properties.example with placeholders.

Run Spring Boot App
mvn spring-boot:run


Backend will run at: http://localhost:8080/api/mappings

3. Frontend (React)
Navigate to frontend folder
cd frontend

Install dependencies
npm install

Start frontend
npm start


Frontend will run at: http://localhost:3000

📌 API Endpoints
Method	Endpoint	Description
GET	/api/mappings	Get all mappings
GET	/api/mappings/{id}	Get mapping by ID
POST	/api/mappings	Create new mapping
PUT	/api/mappings/{id}	Update mapping
DELETE	/api/mappings/{id}	Delete mapping

🖼️ Screenshots
Dashboard Example
![Master View](image.png)
![Feature List](image-1.png)
![Dashboard](image-2.png)

(Status colors applied)


🚀 Deployment

Backend can be deployed on Heroku, AWS, or Docker

Frontend can be deployed on Vercel or Netlify

Use environment variables for DB credentials in production

📄 License

This project is open-source and available under the MIT License.