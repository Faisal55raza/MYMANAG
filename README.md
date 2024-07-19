

# MyManag

**Overview**

MyManag is a modern blog website built using the MERN stack, featuring separate frontend and backend components. The platform allows users to create, manage, and read blog posts. It includes user authentication, a responsive design, and an admin dashboard to enhance the overall user experience.

**Features**

- User Authentication: Secure registration and login using JWT.
- Post Management: Create, edit, delete, and view blog posts.
- Responsive Design: Optimized for various devices with Tailwind CSS.
- Admin Dashboard: Manage posts and users from an administrative interface.

**Tech Stack**

- Frontend: React, Redux, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)

**Installation**

To set up the project locally, follow these steps:

**Prerequisites**

- Node.js and npm installed
- MongoDB installed and running

**Clone the Repository**

```bash
git clone https://github.com/Faisal55raza/MYMANAG.git
cd MYMANAG
```

**Backend Setup**

1. Navigate to the backend directory and install dependencies.

```bash
cd backend
npm install
```

2. Create a `.env` file in the `backend` directory with the following environment variables:

```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

3. Start the backend server.

```bash
npm start
```

**Frontend Setup**

1. Navigate to the frontend directory and install dependencies.

```bash
cd frontend
npm install
```

2. Start the frontend server.

```bash
npm start
```

**Usage**

- Open your browser and navigate to `http://localhost:3000` for the frontend.
- The backend server runs on `http://localhost:5000`.

**Contributing**

We welcome contributions to improve the project. To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

**License**

This project is licensed under the MIT License. See the LICENSE file for details.

**Acknowledgements**

- Special thanks to all contributors for their hard work and dedication.
- Thanks to the MERN stack community for their support and resources.

---

Feel free to adjust or expand upon this text as needed to better suit your project's specifics.
