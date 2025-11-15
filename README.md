# Real-Time Chat Application

A **real-time chat app** built with **React (frontend)**, **Node.js/Express (backend)**, **Socket.IO (real-time messaging)**, and **MongoDB (database)**.  
It supports **one-to-one chat**, live message syncing.

---

## Features
- Real-time messaging using **Socket.IO**
- User authentication & session handling
- Chat history stored in **MongoDB**
- Online/offline user status
- Scalable architecture (frontend & backend separated)
- Deployment-ready configuration

---

## Tech Stack
### Frontend:
- React.js
- Axios (API calls)
- Socket.IO Client

### Backend:
- Node.js
- Express.js
- Socket.IO
- MongoDB with Mongoose

---

## Project Structure
chat-app/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── Components/ # ChatContainer, Contacts, InputBar etc.
│ │ ├── utils/APIRoutes.js
│ │ └── App.js
│ └── package.json
│
├── server/ # Node.js backend
│ ├── models/ # Mongoose schemas (User, Messages)
│ ├── routes/ # API routes (auth, messages)
│ ├── index.js # Server entry point
│ └── package.json
│
└── README.md



---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
cd server
npm install
