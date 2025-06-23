# 🎬 MovieFlix

MovieFlix is a sleek and responsive movie discovery web application built using **React**, **Tailwind CSS**, **Vite**, and **Appwrite**. It allows users to search for movies, explore trending content, and leverages Appwrite for secure and scalable backend services like database and authentication.

## 🚀 Features

- 🔍 **Search Movies** — Search for movies by name and get instant results.
- 🔥 **Trending Section** — Browse a list of trending movies updated regularly.
- ☁️ **Appwrite Integration** — Store user-related data, favorites, or history securely.
- ⚡ **Blazing Fast** — Powered by Vite for fast development and optimized builds.
- 🎨 **Modern UI** — Built with Tailwind CSS for a clean, mobile-friendly interface.

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend / BaaS**: Appwrite
- **API**: The Movie Database (TMDB) API or similar (if applicable)

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/movieflix.git
cd movieflix


npm install

### 2. Create a .env file in the root and add:

VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_TMDB_API_KEY=your_tmdb_api_key


npm run dev

