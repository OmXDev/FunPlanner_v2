# 🧠 FunPlanner

**FunPlanner** is a full-stack event management web application designed for event managers, coordinators, and professional teams. It provides a centralized dashboard to manage clients, vendors, events, internal communication, and productivity tools — all in one place.

Live Demo: 👉 [https://fun-planner.vercel.app](https://fun-planner.vercel.app)

---

## 🚀 Features

- ✅ **Authentication** via Email/Password & Google OAuth  
- 📋 **Client Management** – Add, edit, and manage clients  
- 📆 **Event Management** – Create events under specific clients  
- 🛠️ **Vendor Management** – Assign vendors to events seamlessly  
- 💬 **Messaging System** – Real-time team communication via Socket.io  
- 🗓️ **Personal Calendar** – Mark deadlines, key dates, and tasks  
- 📝 **Todo List** – Track individual or team tasks for better productivity  
- 🔁 **Global State Management** using Redux for clean, scalable app structure  

---

## 🧑‍💻 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS  
- **State Management:** Redux Toolkit  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT, Google OAuth  
- **Real-time:** Socket.io  
- **Cloud Storage:** Cloudinary  

---

## 📁 Folder Structure

```
FunPlanner_v2/
├── client/        # Frontend (React + Vite + Redux)
└── server/        # Backend (Express + MongoDB)
```

---

## ⚙️ Environment Variables

### 🔐 Frontend (`client/.env`)
```env
VITE_BACKEND_URL=
```

### 🔐 Backend (`server/.env`)
```env
MONGO_URI=
JWT_SECRET_KEY=
REFRESH_TOKEN_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SESSION_SECRET=
CLOUDINARY_API_SECRET=
CLOUD_NAME=
CLOUDINARY_API_KEY=
GOOGLE_CALLBACK_URL=
NODE_ENV=
FRONTEND_URL=
```

---

## 🧪 Local Setup

### 🔧 Backend
```bash
cd server
npm install
npm start
```

### 💻 Frontend
```bash
cd client
npm install
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Future Improvements (Open for Contributions)

- ✅ Add automated testing (Jest / Mocha)  
- ✅ Role-based access control (Admin, Manager, Viewer)  
- ✅ Analytics or dashboard charts  
- ✅ Mobile responsiveness refinements  

---

## 📬 Feedback & Contribution

Pull requests, suggestions, and feature ideas are welcome! Feel free to fork the repo and contribute.

---

## 👤 Author

**OmXDev**  
🔗 [GitHub Profile](https://github.com/OmXDev)

---

## 📄 License

MIT – feel free to use, modify, and build upon this project.
