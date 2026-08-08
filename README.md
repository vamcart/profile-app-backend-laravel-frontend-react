# Profile Application

A full-stack Profile application with Next.js frontend and Laravel backend.

## Project Structure

```
/
├── api/                    # Laravel API backend
│   ├── app/Models/User.php         # User model with additional gender field
│   ├── app/Http/Controllers/ProfileController.php  # Profile Controller
│   ├── app/Http/Controllers/AuthController.php  # Auth Controller
│   ├── routes/api.php              # API routes
│   ├── bootstrap/app.php           # Laravel app config (Sanctum)
│   ├── database/migrations/        # Database migrations
├── client/                  # Next.js frontend
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── pages/
│   │   ├── profile.tsx
│   │   └── register.tsx
└── README.md
```

## Prerequisites

- PHP >= 8.2
- Composer
- Node.js >= 18
- npm

## Installation & Setup

### Backend (Laravel API)

```bash
cd api
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
# SQLite is already configured, migrations run automatically
```

**API Port**: `http://localhost:8000`

### Frontend (Next.js Client)

```bash
cd client
npm install
```

**Client Port**: `http://localhost:3000`

## Running the Application

Terminal 1 - Laravel API Backend:
```bash
cd api
php artisan serve --host=127.0.0.1 --port=8000
```

Terminal 2 - Next.js Frontend:
```bash
cd client
npm run dev
```

Visit `http://localhost:3000` to use the app.

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Profile info (restricted, user must be auth with sanctum token) |
| POST | `/api/registration` | Register User |
| POST | `/api/login` | Auth User |

## License

MIT
