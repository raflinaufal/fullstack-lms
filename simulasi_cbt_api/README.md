# Simulasi CBT API - Laravel 12 Backend

Backend API untuk aplikasi Computer-Based Test (CBT) menggunakan Laravel 12 dan Laravel Sanctum.

## 🚀 Setup & Installation

### Prerequisites

-   PHP 8.2 atau lebih tinggi
-   Composer 2.7+
-   MySQL 8.0+
-   XAMPP (untuk MySQL server)

### Installation Steps

1. **Install Dependencies**

```bash
composer install
```

2. **Environment Configuration**

```bash
cp .env.example .env
php artisan key:generate
```

3. **Database Setup**

-   Start XAMPP MySQL server
-   Database `simulasi_cbt` sudah dibuat otomatis

4. **Run Migrations & Seeders**

```bash
php artisan migrate:fresh --seed
```

5. **Start Development Server**

```bash
php artisan serve
```

Server akan berjalan di: `http://127.0.0.1:8000`

## 👤 Demo Accounts

Setelah menjalankan seeder, tersedia 2 akun demo:

**Student Account:**

-   Email: `student@demo.com`
-   Password: `password`

**Teacher Account:**

-   Email: `teacher@demo.com`
-   Password: `password`

## 📊 Database Schema

### Tables

1. **users** - Data pengguna (student/teacher/admin)
2. **exams** - Data ujian/paket soal
3. **chapters** - Bab/topik soal
4. **questions** - Soal ujian
5. **exam_sessions** - Sesi ujian pengguna
6. **exam_answers** - Jawaban pengguna per soal
7. **test_results** - Hasil ujian
8. **achievements** - Pencapaian pengguna
9. **exam_shares** - Share hasil ujian via email

## 🔌 API Endpoints

Base URL: `http://127.0.0.1:8000/api`

### Authentication Endpoints

#### 1. Register

```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "role": "student",
  "school_name": "SMA Negeri 1",
  "class": "XII IPA 1"
}
```

#### 2. Login

```
POST /auth/login
Content-Type: application/json

{
  "email": "student@demo.com",
  "password": "password"
}
```

#### 3. Logout

```
POST /auth/logout
Authorization: Bearer {token}
```

#### 4. Get Current User

```
GET /auth/user
Authorization: Bearer {token}
```

### Exam Endpoints

#### 5. Get All Exams

```
GET /exams?subject=Matematika&grade=XII
Authorization: Bearer {token}
```

#### 6. Get Exam Details

```
GET /exams/{id}
Authorization: Bearer {token}
```

### Exam Session Endpoints

#### 7. Start Exam Session

```
POST /exam-sessions/start
Authorization: Bearer {token}
Content-Type: application/json

{
  "exam_id": 1
}
```

#### 8. Get Session Details

```
GET /exam-sessions/{sessionId}
Authorization: Bearer {token}
```

#### 9. Submit Exam

```
POST /exam-sessions/{sessionId}/submit
Authorization: Bearer {token}
```

### Question, Answer, Result, History & Chapter Endpoints

Lihat detail lengkap di dokumentasi API atau gunakan Postman/Insomnia untuk testing.

## 🔐 Authentication

API menggunakan **Laravel Sanctum** untuk autentikasi berbasis token.

### Headers Required

```
Authorization: Bearer {your_token}
Accept: application/json
Content-Type: application/json
```

## 🎯 Grading System

Nilai (Grade) ditentukan berdasarkan score:

-   **A**: ≥ 90
-   **B**: 80-89
-   **C**: 70-79
-   **D**: 60-69
-   **E**: < 60

## ⚙️ CORS Configuration

CORS sudah dikonfigurasi untuk:

-   Frontend URL: `http://localhost:3000`
-   Sanctum CSRF Cookie path
-   Supports credentials: `true`

## 📁 Project Structure

```
simulasi_cbt_api/
├── app/
│   ├── Http/Controllers/Api/
│   │   ├── AuthController.php
│   │   ├── ExamController.php
│   │   ├── ExamSessionController.php
│   │   ├── QuestionController.php
│   │   ├── AnswerController.php
│   │   ├── ResultController.php
│   │   ├── HistoryController.php
│   │   └── ChapterController.php
│   └── Models/
├── config/cors.php
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/api.php
└── .env
```

## 📝 Environment Variables

```env
APP_NAME=SimulasiCBT
DB_DATABASE=simulasi_cbt
SANCTUM_STATEFUL_DOMAINS=localhost:3000
FRONTEND_URL=http://localhost:3000
```

## 🔄 Sample Data

Database seeder menyediakan:

-   2 User (student & teacher)
-   2 Exam (Matematika & Fisika)
-   3 Chapter
-   15 Question dengan jawaban lengkap

---

**Version:** 1.0.0  
**Laravel:** 12.0  
**Last Updated:** November 10, 2025

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

-   **[Vehikl](https://vehikl.com/)**
-   **[Tighten Co.](https://tighten.co)**
-   **[WebReinvent](https://webreinvent.com/)**
-   **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
-   **[64 Robots](https://64robots.com)**
-   **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
-   **[Cyber-Duck](https://cyber-duck.co.uk)**
-   **[DevSquad](https://devsquad.com/hire-laravel-developers)**
-   **[Jump24](https://jump24.co.uk)**
-   **[Redberry](https://redberry.international/laravel/)**
-   **[Active Logic](https://activelogic.com)**
-   **[byte5](https://byte5.de)**
-   **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
