# Deployment Guide - Chat Application

## Backend Deployment (Vercel)

### 1. Push your backend code to GitHub
```bash
cd backend
git init
git add .
git commit -m "Backend ready for deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the `backend` folder as root directory
5. Add Environment Variables:
   - `MONGO_URL` = mongodb+srv://rdptoon:AH20wKmHORtZ6DrK@cluster0.cbpkems.mongodb.net/
   - `PORT` = 8000
   - `FRONTEND_URL` = (leave empty for now, will add after frontend deployment)

6. Click "Deploy"
7. Copy your Vercel backend URL (e.g., https://your-app.vercel.app)

### 3. Update Environment Variable
After deployment, go back to Vercel:
- Settings → Environment Variables
- Update `FRONTEND_URL` with your Netlify URL (from step below)

---

## Frontend Deployment (Netlify)

### 1. Update Frontend Environment Variable
Before deploying, update `frontend-app/.env.production`:
```
REACT_APP_BACKEND_URL=https://your-backend-app.vercel.app
```
Replace with your actual Vercel backend URL.

### 2. Push your frontend code to GitHub
```bash
cd frontend-app
git init
git add .
git commit -m "Frontend ready for deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 3. Deploy to Netlify
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure build settings:
   - Base directory: `frontend-app`
   - Build command: `npm run build`
   - Publish directory: `frontend-app/build`

5. Add Environment Variable:
   - Key: `REACT_APP_BACKEND_URL`
   - Value: Your Vercel backend URL (e.g., https://your-app.vercel.app)

6. Click "Deploy site"
7. Copy your Netlify URL (e.g., https://your-app.netlify.app)

### 4. Update Backend CORS
Go back to Vercel:
- Settings → Environment Variables
- Update `FRONTEND_URL` = Your Netlify URL
- Redeploy the backend

---

## Important Notes

### ⚠️ Socket.IO Limitation on Vercel
**Vercel does NOT support WebSocket connections** (which Socket.IO requires for real-time features).

Your chat app will NOT work properly on Vercel because:
- Vercel uses serverless functions
- WebSocket connections require persistent connections
- Socket.IO will fail to establish real-time communication

### ✅ Alternative Solutions:

#### Option 1: Deploy Backend to Render (Recommended)
1. Go to https://render.com
2. Create a new "Web Service"
3. Connect your GitHub repo
4. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables (same as Vercel)
6. Deploy

Render supports WebSocket connections and is free for basic usage.

#### Option 2: Deploy to Railway
1. Go to https://railway.app
2. Create new project from GitHub
3. Select backend folder
4. Add environment variables
5. Deploy

#### Option 3: Use Heroku
Traditional option that supports WebSockets.

---

## Testing Your Deployment

1. Open your Netlify URL
2. Register a new account
3. Open the same URL in an incognito/private window
4. Register another account
5. Try sending messages between the two accounts
6. Messages should appear in real-time

---

## Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` in backend matches your Netlify URL exactly
- No trailing slash in URLs

### Socket.IO Connection Failed
- If on Vercel: Switch to Render/Railway
- Check browser console for errors
- Verify backend URL in frontend .env.production

### Messages Not Sending
- Check Network tab in browser DevTools
- Verify API routes are correct
- Check backend logs for errors

### Database Connection Issues
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check if MongoDB credentials are correct
- Ensure database user has read/write permissions
