Hello There!
# PDF Summarizer App

This is a full-stack project built with **Next.js (frontend)** and **Express.js (backend)**.  
It allows users to upload PDF files, which are then processed on the backend using **AI (Gemini API)** to generate a summary of the content.

---

## 🚀 Tech Stack

### Frontend
- **Next.js 14 (App Router)** – React framework for server-side rendering and API routes.
- **Axios** – for making API requests to the backend.
- **TypeScript/JavaScript** – frontend code.
- **TailwindCSS (optional)** – for styling (if used).

### Backend
- **Express.js** – Node.js framework for handling API requests.
- **Multer** – for handling file uploads.
- **pdf-parse** – for reading PDF content.
- **Google Generative AI (Gemini API)** – for summarizing extracted text.
- **CORS** – to allow frontend-backend communication.

### Deployment
- **Frontend** → [Vercel](https://vercel.com)  
- **Backend** → [Render](https://render.com) (free tier used)

---

## ⚙️ Workflow

1. **Frontend (Next.js)**  
   - User uploads a PDF file via an upload form.  
   - The file is sent to the backend using `axios` with `FormData`.
   - <img width="1872" height="872" alt="image" src="https://github.com/user-attachments/assets/9e8a3225-da41-4b73-b1d1-ab56c534aeba" />


2. **Backend (Express.js)**  
   - The backend receives the uploaded file using **Multer**.  
   - Extracts text from the PDF using **pdf-parse**.  
   - Passes extracted text to **Google Gemini API**.  
   - Generates a summarized output and sends it back as JSON.

3. **Frontend (Next.js)**  
   - Displays the summary to the user in a clean UI.  
   - Handles error cases (e.g., no file, backend not running, API timeout).
   - <img width="1412" height="708" alt="Screenshot 2025-08-17 154722" src="https://github.com/user-attachments/assets/19fa5f01-0a4a-4afc-b4ab-14da19c10b8f" />
   - summarized pdf content
   - you can chat with it
   - <img width="1213" height="845" alt="Screenshot 2025-08-17 154923" src="https://github.com/user-attachments/assets/798a06ac-513c-4f43-a6e7-2c311a7209c8" />



---

## 🛠️ Development Setup

### Run Backend
**bash**
  - cd backend
- npm install
- npm start

### Run Frontend
**bash**
  - cd frontend
- npm install
- npm start
