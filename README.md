# 🚀 BytePost — Your All-in-One Blogging & Docs Platform

BytePost is a modern, fully responsive web app designed for effortless **blogging** and **technical documentation** — all in one place. Whether you're a developer, technical writer, or blogger, BytePost delivers a fast, elegant, and productive writing experience.

🔗 **Live Demo**: [https://byte-post-alpha.vercel.app](https://byte-post-alpha.vercel.app)

---

## 🌄 Project Preview

<div align="center">
  <img src="./preview.png" alt="BytePost Preview" width="800" />
</div>

---

## ✨ Key Features

- 📝 Create and manage blogs or structured documentation from one interface  
- 🧾 Rich text editing with TinyMCE for a professional writing experience  
- 🔐 Secure authentication with protected routes and session handling  
- 📱 Fully responsive design for all screen sizes  
- 🚀 Easy content sharing and publishing options  

---

## 🛠 Tech Stack

| Layer          | Technologies                                      |
|----------------|---------------------------------------------------|
| **Frontend**   | React, Vite, TypeScript                           |
| **State**      | Redux Toolkit (RTK)                               |
| **Backend**    | Appwrite (Auth, Database, File Storage)           |
| **Styling**    | Tailwind CSS, Material UI                         |
| **Routing**    | React Router                                      |
| **Editor**     | TinyMCE Editor                                    |
| **Validation** | Regex-based smart form validations                |
| **Config**     | .env environment configuration                    |

---

## 📁 Project Structure

<pre lang="markdown"> ```bash bytepost/ ├── src/ │ ├── components/ # Reusable UI components │ ├── features/ # Redux slices and logic │ ├── pages/ # App pages (Home, Editor, etc.) │ ├── services/ # Appwrite & API integrations │ ├── utils/ # Helper functions and validators │ ├── App.tsx │ └── main.tsx ├── public/ ├── .env.example ├── vite.config.ts └── README.md ``` </pre>
