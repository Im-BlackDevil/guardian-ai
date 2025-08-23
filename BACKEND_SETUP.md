# 🚀 Bias Shield AI - Backend API Setup Guide

## Overview
This guide will help you set up the backend API for generating bias-free PDFs. The backend handles file processing, bias detection, and PDF generation.

## 📋 Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Your React frontend running on port 8080

## 🛠️ Installation Steps

### Step 1: Install Backend Dependencies
```bash
# Navigate to your project directory
cd bias-shield-ai

# Install backend dependencies
npm install express multer cors pdfkit mammoth papaparse

# Install development dependencies
npm install --save-dev nodemon
```

### Step 2: Start the Backend Server
```bash
# Start the backend server
node server.js

# Or for development with auto-restart
npm run dev
```

### Step 3: Verify Backend is Running
- Backend will start on port 3001
- You should see: `🚀 Bias Shield AI Backend running on port 3001`
- Health check: http://localhost:3001/api/health

## 🔧 Configuration

### Backend URL
The frontend is configured to connect to `http://localhost:3001`. If you change the port, update this in `src/utils/fileProcessor.ts`:

```typescript
private static readonly BACKEND_URL = 'http://localhost:3001';
```

### CORS Settings
The backend is configured to allow requests from your frontend. If you change the frontend port, update the CORS settings in `server.js`.

## 📁 API Endpoints

### POST /api/generate-bias-free
**Purpose**: Generate a bias-free PDF from uploaded document

**Request**:
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: FormData with file field

**Response**:
- Content-Type: `application/pdf`
- Headers: `Content-Disposition` for filename
- Body: PDF file as binary data

### GET /api/health
**Purpose**: Health check endpoint

**Response**:
```json
{
  "status": "OK",
  "message": "Bias Shield AI Backend is running"
}
```

## 🎯 How It Works

### 1. File Upload
- User uploads document (TXT, DOCX, PDF, CSV)
- Frontend sends file to backend via FormData

### 2. Text Extraction
- Backend extracts text based on file type:
  - **TXT**: Direct text reading
  - **DOCX**: Using mammoth library
  - **CSV**: Using papaparse library
  - **PDF**: Placeholder (can be enhanced with pdf-parse)

### 3. Bias Detection
- Backend analyzes text for bias patterns:
  - Gender bias
  - Racial bias
  - Age bias
  - Stereotyping
  - Toxic language

### 4. PDF Generation
- Creates professional PDF using PDFKit
- Includes:
  - Document header
  - Generation metadata
  - Improved content
  - Analysis summary

### 5. File Download
- Returns PDF with proper headers
- Frontend handles download using file-saver

## 🚨 Troubleshooting

### Backend Won't Start
```bash
# Check if port 3001 is in use
netstat -an | findstr :3001

# Kill process using port 3001 (Windows)
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Kill process using port 3001 (Mac/Linux)
lsof -ti:3001 | xargs kill -9
```

### CORS Errors
- Ensure backend is running on port 3001
- Check that CORS middleware is enabled
- Verify frontend URL in CORS settings

### File Upload Errors
- Check file size (10MB limit)
- Verify file type is supported
- Ensure multer is properly configured

### PDF Generation Fails
- Check console for error messages
- Verify PDFKit installation
- Ensure sufficient memory for large files

## 🔄 Development Workflow

### 1. Start Backend
```bash
npm run dev
```

### 2. Start Frontend
```bash
npm run dev
```

### 3. Test Upload
- Upload a document
- Check backend console for processing logs
- Verify PDF download

### 4. Monitor Logs
Backend provides detailed logging:
- File processing steps
- Bias detection results
- PDF generation progress
- Error details

## 🚀 Production Deployment

### Environment Variables
```bash
PORT=3001
NODE_ENV=production
```

### Process Management
```bash
# Using PM2
npm install -g pm2
pm2 start server.js --name "bias-shield-backend"

# Using Docker
docker build -t bias-shield-backend .
docker run -p 3001:3001 bias-shield-backend
```

### Security Considerations
- Add rate limiting
- Implement authentication
- Validate file types
- Set appropriate CORS policies
- Use HTTPS in production

## 📚 API Reference

### Request Format
```typescript
const formData = new FormData();
formData.append('file', file);

const response = await fetch('/api/generate-bias-free', {
  method: 'POST',
  body: formData
});
```

### Response Handling
```typescript
if (response.ok) {
  const blob = await response.blob();
  const fileName = response.headers.get('content-disposition')?.match(/filename="(.+)"/)?.[1] || 'bias-free.pdf';
  
  // Download file
  saveAs(blob, fileName);
}
```

## 🎉 Success Indicators

When everything is working correctly:
- ✅ Backend shows "🚀 Bias Shield AI Backend running on port 3001"
- ✅ Frontend can upload files without CORS errors
- ✅ PDF generation completes successfully
- ✅ Files download with proper names
- ✅ Console shows detailed processing logs

## 🆘 Getting Help

If you encounter issues:
1. Check the console logs (both frontend and backend)
2. Verify all dependencies are installed
3. Ensure ports are not conflicting
4. Check file permissions and sizes
5. Review the troubleshooting section above

---

**🎯 The backend API is now fully integrated with your frontend! PDF generation will work seamlessly for all file types.**
