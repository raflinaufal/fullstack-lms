# 🔌 Simulasi CBT - Backend API

Backend REST API menggunakan **Laravel 12** dengan **Laravel Sanctum** untuk autentikasi.

---

## � Tech Stack

-   **PHP** 8.2+
-   **Laravel** 12.0
-   **Laravel Sanctum** 4.2 (API Authentication)
-   **MySQL** 8.0+
-   **Composer** 2.7+

---

## 📋 Prasyarat

```bash
✅ PHP 8.2+
✅ Composer 2.7+
✅ MySQL 8.0+ / XAMPP
✅ PHP Extensions: pdo_mysql, mbstring, openssl, json, xml, fileinfo
```

---

## 🚀 Instalasi

### 1. Install Dependencies

```bash
composer install
```

### 2. Setup Environment

```bash
# Windows PowerShell
Copy-Item .env.example .env

# Linux/Mac
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 3. Konfigurasi Database

Edit `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=simulasi_cbt
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Buat Database

**Via phpMyAdmin:**

-   Buka http://localhost/phpmyadmin
-   Buat database: `simulasi_cbt`

**Via Command:**

```bash
mysql -u root -e "CREATE DATABASE simulasi_cbt"
```

### 5. Jalankan Migration & Seeder

```bash
php artisan migrate:fresh --seed
```

### 6. Jalankan Server

```bash
php artisan serve
```

Server: http://127.0.0.1:8000

---

## 👤 Akun Demo

```
Student:
Email: student@demo.com
Password: password

Admin/Teacher:
Email: teacher@demo.com
Password: password
```

---

## � API Endpoints

**Base URL:** `http://127.0.0.1:8000/api`

### 🔓 Public

| Method | Endpoint                   | Deskripsi       |
| ------ | -------------------------- | --------------- |
| POST   | `/register`                | Register user   |
| POST   | `/login`                   | Login user      |
| GET    | `/classes`                 | List kelas      |
| GET    | `/exams`                   | List ujian      |
| GET    | `/exams/{id}`              | Detail ujian    |
| GET    | `/exams/{id}/instructions` | Instruksi ujian |
| GET    | `/exams/{id}/questions`    | Soal ujian      |

### 🔒 Protected (Require Token)

| Method | Endpoint                    | Deskripsi       |
| ------ | --------------------------- | --------------- |
| POST   | `/logout`                   | Logout          |
| GET    | `/user`                     | Current user    |
| POST   | `/exam-results`             | Submit jawaban  |
| GET    | `/exam-results/{id}`        | Detail hasil    |
| GET    | `/exam-results/{id}/review` | Review jawaban  |
| POST   | `/exam-results/share`       | Share via email |
| GET    | `/test-history`             | Riwayat tes     |

### 👑 Admin (Require Admin Role)

| Method              | Endpoint           | Deskripsi      |
| ------------------- | ------------------ | -------------- |
| GET/POST/PUT/DELETE | `/admin/users`     | CRUD users     |
| POST/PUT/DELETE     | `/admin/classes`   | CRUD classes   |
| POST/PUT/DELETE     | `/admin/exams`     | CRUD exams     |
| GET/POST/PUT/DELETE | `/admin/questions` | CRUD questions |

---

## 📝 Contoh Request

### Login

```bash
POST /api/login
Content-Type: application/json

{
  "email": "student@demo.com",
  "password": "password"
}

Response:
{
  "success": true,
  "data": {
    "user": {...},
    "token": "1|abc123..."
  }
}
```

### Submit Exam

```bash
POST /api/exam-results
Authorization: Bearer {token}
Content-Type: application/json

{
  "exam_id": 1,
  "answers": [
    {"question_id": 1, "selected_option_id": 1},
    {"question_id": 2, "selected_option_id": 5}
  ],
  "time_spent": 1800
}
```

---

## � Database Schema

### Tabel Utama

```
users
├── id, name, email, password, is_admin

classes
├── id, name, grade, description

exams
├── id, class_id, title, description, duration, total_score

questions
├── id, exam_id, question_text, stimulus_text, stimulus_image, explanation

question_options
├── id, question_id, option_text, is_correct

exam_results
├── id, user_id, exam_id, score, time_spent, correct_answers, wrong_answers

question_reviews
├── id, exam_result_id, question_id, selected_option_id, is_correct

test_histories
├── id, user_id, exam_id, exam_result_id, score, started_at, completed_at

exam_instructions
├── id, exam_id, instruction
```

---

## 📁 Struktur Folder

```
app/
├── Http/Controllers/Api/
│   ├── AuthController.php
│   ├── ClassController.php
│   ├── ExamController.php
│   ├── ExamResultController.php
│   ├── QuestionController.php
│   ├── TestHistoryController.php
│   └── UserController.php
├── Models/
│   ├── User.php
│   ├── ClassModel.php
│   ├── Exam.php
│   ├── Question.php
│   ├── QuestionOption.php
│   ├── ExamResult.php
│   └── TestHistory.php
└── Mail/
    └── ShareResultMail.php

database/
├── migrations/
└── seeders/
    ├── UserSeeder.php
    ├── ClassSeeder.php
    ├── ExamSeeder.php
    └── QuestionSeeder.php

routes/
└── api.php
```

---

## ⚙️ Konfigurasi CORS

Edit `config/cors.php`:

```php
'allowed_origins' => [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
],
'supports_credentials' => true,
```

---

## 🔧 Troubleshooting

**Database error:**

```bash
php artisan migrate:fresh --seed
```

**Permission error:**

```bash
# Windows
icacls storage /grant Users:F /t

# Linux/Mac
chmod -R 775 storage bootstrap/cache
```

**Port sudah digunakan:**

```bash
php artisan serve --port=8001
```

**Test connection:**

```bash
php artisan tinker
>>> DB::connection()->getPdo();
```

---

## 📚 Commands

```bash
# Migrate & Seed
php artisan migrate:fresh --seed

# Cache
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Clear cache
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Run specific seeder
php artisan db:seed --class=UserSeeder
```

---

## 🚀 Production

```bash
# Optimize
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Permissions
chmod -R 775 storage bootstrap/cache
```

---

**Developer:** [@raflinaufal](https://github.com/raflinaufal)  
**Repository:** [fullstack-lms](https://github.com/raflinaufal/fullstack-lms)
