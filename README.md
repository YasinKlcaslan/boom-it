
# BoomIt! - AI Integrated File Transfer Platform

BoomIt! is a modern, AI-powered file transfer platform. Users can easily upload and share their files, and instantly receive insights about the file type using artificial intelligence.

---

## Features

- Secure and fast file uploads
- Automatic file type detection using AI (Magika)
- Robust storage via AWS S3 integration
- User-friendly modern interface
- AI-powered content type classification
- File download and shareable link generation
---

## Technologies Used

- **Next.js** – Server-side rendering (SSR) and API route support
- **Tailwind CSS** – Fast and flexible UI development
- **Prisma ORM** – Database operations
- **MongoDB** – User and file data storage
- **AWS S3** – File storage service
- **Magika** – AI model from Google for automatic file type detection
- **NextAuth** – Authentication (if used)
- **Zod**, **React Hook Form** – Form handling and validation

---

## AI Integration – Magika

BoomIt uses [Magika](https://github.com/google/magika), an AI-powered file type classification library developed by Google. When a user uploads a file, the system analyzes its content and provides a prediction about its type using AI.

---

## Installation

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/boomit.git
cd boomit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env` file in the root directory and add the following:

```env
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=your-bucket
MONGODB_URI=your-mongo-uri
MAGIKA_API_KEY=your-magika-key
NEXTAUTH_URL=http://localhost:3000
```

### 4. Start the development server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to use the application.

