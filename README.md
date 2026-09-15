# 🌍 AI Travel Planner & Agentic Travel Concierge Platform

> An intelligent, multi-agent AI travel concierge that curates personalized itineraries, optimizes budgets, predicts crowd levels, fetches live weather, and plots interactive maps in real-time.

---

## 📋 Table of Contents
- [✨ Features](#-features)
- [🏗️ System Architecture](#-system-architecture)
- [📦 Prerequisites](#-prerequisites)
- [🚀 Quick Clone & Setup Guide](#-quick-clone--setup-guide)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup (Flask + AI Agents)](#2-backend-setup-flask--ai-agents)
  - [3. Frontend Setup (React + Vite)](#3-frontend-setup-react--vite)
- [⚙️ Environment Variables](#️-environment-variables)
- [🗄️ Database Setup & Migrations](#️-database-setup--migrations)
- [🔌 API Endpoints Summary](#-api-endpoints-summary)
- [🛠️ Troubleshooting & FAQ](#️-troubleshooting--faq)

---

## ✨ Features

- 🤖 **Agentic Multi-Agent Orchestration**: Specialized AI agents for Preferences, Budgeting, Route planning, Weather forecasting, Crowd analytics, and Travel Tips powered by Google Gemini.
- 🗺️ **Interactive Maps**: Geoapify and Leaflet-powered maps showing daily routes and geo-located attractions.
- 💰 **Budget Optimizer**: Dynamic cost breakdown across lodging, dining, transit, and activities.
- ☀️ **Live Weather Analysis**: Forecast-aware activity planning and packing advice.
- 👥 **Crowd Predictor**: Congestion risk scoring and optimal time-of-day recommendations.
- 📱 **Responsive Modern UI**: Built with React, Tailwind CSS, Lucide icons, and Framer Motion animations.

---

## 🏗️ System Architecture

```
AI-Travel-Planner/
├── Backend/                 # Python Flask REST API & Agentic Engine
│   ├── app/
│   │   ├── agents/          # Budget, Crowd, Preference, Route, Weather agents
│   │   ├── orchestrators/   # Travel orchestrator coordinating multi-agent pipeline
│   │   ├── external/        # Gemini Client, Geoapify API, Weather API
│   │   ├── models/          # SQLAlchemy Database Models (User, Trip, Itinerary)
│   │   ├── routes/          # REST Endpoints (Auth, Trips, Chat, Budget)
│   │   └── prompts/         # Structured Agent System Prompts
│   ├── migrations/          # Alembic DB Migrations
│   ├── requirements.txt     # Python Dependencies
│   ├── .env.example         # Backend Environment Template
│   └── run.py               # Flask Application Entrypoint (Port 5000)
│
└── Frontend/                # React (Vite) Web Application
    ├── src/
    │   ├── components/      # UI Components (Map, Cards, Modal, Navbar, Timeline)
    │   ├── pages/           # Landing, PlanTrip, Dashboard, TripResult, Profile
    │   ├── context/         # AuthContext & TripContext
    │   └── services/        # Axios API Client
    ├── package.json         # Node Dependencies & Scripts
    ├── .env.example         # Frontend Environment Template
    └── vite.config.ts       # Vite & Tailwind Configuration (Port 3000 / 5173)
```

---

## 📦 Prerequisites

Before starting, ensure you have the following installed on your machine:

1. **Git**: [Download Git](https://git-scm.com/)
2. **Node.js** (v18.x or higher) & **npm**: [Download Node.js](https://nodejs.org/)
3. **Python** (v3.10 or higher) & **pip**: [Download Python](https://www.python.org/)
4. **PostgreSQL** (v14+ recommended) or SQLite for development.
5. **API Keys**:
   - **Google Gemini API Key**: [Get from Google AI Studio](https://aistudio.google.com/) *(Required)*
   - **Geoapify API Key**: [Get from Geoapify](https://www.geoapify.com/) *(Required for maps & geocoding)*
   - **OpenWeather API Key**: [Get from OpenWeatherMap](https://openweathermap.org/api) *(Required for live weather)*

---

## 🚀 Quick Clone & Setup Guide

### 1. Clone Repository

```bash
git clone https://github.com/Riaa-stack/AI-Travel-Planner-Agentic-Travel-Concierge-Platform.git
cd AI-Travel-Planner-Agentic-Travel-Concierge-Platform
```

---

### 2. Backend Setup (Flask + AI Agents)

#### Step 2.1: Navigate to Backend Directory
```bash
cd Backend
```

#### Step 2.2: Create and Activate a Python Virtual Environment
- **Windows (PowerShell / Command Prompt)**:
  ```powershell
  python -m venv venv
  .\venv\Scripts\activate
  ```
- **macOS / Linux**:
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

#### Step 2.3: Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### Step 2.4: Set Up Backend Environment Variables
Create a `.env` file inside the `Backend/` folder:
```bash
# On Windows (PowerShell):
Copy-Item .env.example .env

# On macOS/Linux:
cp .env.example .env
```

Open `Backend/.env` and update your values:
```ini
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your_super_secret_session_key
JWT_SECRET_KEY=your_jwt_secret_signing_key

# PostgreSQL database URL (or use SQLite: sqlite:///travel_planner.db)
DATABASE_URL=postgresql://postgres:password@localhost:5432/travel_planner_db

# AI & APIs
GEMINI_API_KEY=your_actual_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
GEOAPIFY_API_KEY=your_actual_geoapify_api_key
OPENWEATHER_API_KEY=your_actual_openweather_api_key
```

#### Step 2.5: Apply Database Migrations (or Initialize Database)
If using PostgreSQL, create the database first:
```sql
CREATE DATABASE travel_planner_db;
```
Then run the migration upgrade:
```bash
flask db upgrade
```

#### Step 2.6: Start the Flask Backend Server
```bash
python run.py
```
> The Backend will start running on **`http://127.0.0.1:5000`**

---

### 3. Frontend Setup (React + Vite)

Open a **new terminal tab/window**:

#### Step 3.1: Navigate to Frontend Directory
```bash
cd Frontend
```

#### Step 3.2: Install Node Dependencies
```bash
npm install
```

#### Step 3.3: Set Up Frontend Environment Variables
Create a `.env` file inside the `Frontend/` folder:
```bash
# On Windows (PowerShell):
Copy-Item .env.example .env

# On macOS/Linux:
cp .env.example .env
```

Ensure `Frontend/.env` contains:
```ini
VITE_API_URL=http://127.0.0.1:5000/api
```

#### Step 3.4: Start the Frontend Development Server
```bash
npm run dev
```
> The Frontend application will launch at **`http://localhost:3000`** (or `http://localhost:5173`).

---

## ⚙️ Environment Variables

### Backend (`Backend/.env`)

| Variable | Description | Required | Example / Default |
| :--- | :--- | :--- | :--- |
| `FLASK_APP` | Flask entry point | Yes | `run.py` |
| `FLASK_ENV` | Environment mode | Yes | `development` |
| `SECRET_KEY` | Flask secret session key | Yes | `any_random_string` |
| `JWT_SECRET_KEY` | JWT signing secret | Yes | `any_random_string` |
| `DATABASE_URL` | PostgreSQL or SQLite connection URI | Yes | `postgresql://postgres:password@localhost:5432/travel_planner_db` |
| `GEMINI_API_KEY` | Google Gemini AI API Key | Yes | `AIzaSy...` |
| `GEMINI_MODEL` | Gemini LLM Model | No | `gemini-2.5-flash` |
| `GEOAPIFY_API_KEY` | Geoapify Maps & Places Key | Yes | `c8bf...` |
| `OPENWEATHER_API_KEY` | OpenWeatherMap API Key | Yes | `125d...` |

### Frontend (`Frontend/.env`)

| Variable | Description | Required | Default |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | Backend API base endpoint | Yes | `http://127.0.0.1:5000/api` |

---

## 🗄️ Database Setup & Migrations

If you need to make changes to database models or initialize tables:
```bash
# Inside Backend directory with venv activated:
flask db init       # Run only if initializing migrations for the first time
flask db migrate -m "migration description"
flask db upgrade    # Applies all pending migrations to the database
```

---

## 🔌 API Endpoints Summary

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user & get JWT token
- `GET /api/auth/me` - Get current authenticated user profile

### Trips & AI Planner (`/api/trips`)
- `POST /api/trips/plan` - Generate multi-agent AI travel itinerary
- `GET /api/trips` - List saved user itineraries
- `POST /api/trips` - Save a generated itinerary
- `GET /api/trips/:id` - Fetch itinerary details by ID
- `PUT /api/trips/:id` - Update an existing trip
- `DELETE /api/trips/:id` - Delete a trip

---

## 🛠️ Troubleshooting & FAQ

### 1. `ModuleNotFoundError` on Backend
- Make sure your virtual environment is active (`(venv)` shown in terminal prompt).
- Run `pip install -r requirements.txt`.

### 2. Database Connection Error (`psycopg2.OperationalError`)
- Ensure PostgreSQL server is running locally on port 5432.
- Verify username, password, and database name in `Backend/.env`.
- To test with SQLite instead, set: `DATABASE_URL=sqlite:///travel_planner.db`.

### 3. CORS Issues
- The backend has `Flask-Cors` configured to accept cross-origin requests from frontend on `http://localhost:3000` / `http://localhost:5173`.
- Ensure `VITE_API_URL` in `Frontend/.env` points to `http://127.0.0.1:5000/api`.

### 4. Port 5000 or 3000 already in use
- **Backend**: Change port in `Backend/run.py` (e.g., `port=5001`).
- **Frontend**: Update `VITE_API_URL` to match the new backend port.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
