# 🎨 Simulasi CBT - Frontend

Aplikasi simulasi ujian berbasis web menggunakan **Next.js 14** dengan
**TypeScript** dan **Tailwind CSS**.

![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8)

---

## 🛠 Tech Stack

- **Next.js** 14.2.15 (App Router)
- **React** 18.3.1
- **TypeScript** 5.6.3
- **Tailwind CSS** 3.4.1
- **Radix UI** - Accessible components
- **Redux Toolkit** 2.10.1 - State management
- **Axios** 1.13.2 - HTTP client
- **React Hook Form** 7.52.1 - Forms
- **Zod** 3.23.8 - Validation
- **Lucide React** - Icons

---

## 📋 Prasyarat

```bash
✅ Node.js 18.x+
✅ npm / yarn / pnpm
```

---

## 🚀 Instalasi

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

Buat file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

### 3. Jalankan Dev Server

```bash
npm run dev
```

Aplikasi: http://localhost:3000

---

## ✨ Fitur Utama

### 🎓 Untuk Siswa

- ✅ Landing page dengan info ujian
- ✅ Autentikasi (Login/Register)
- ✅ Ujian interaktif dengan timer
- ✅ Navigasi soal (Previous/Next)
- ✅ Grid quick navigation
- ✅ Soal dengan stimulus (text & image)
- ✅ Review jawaban dengan pembahasan
- ✅ Share hasil via email
- ✅ Riwayat semua tes

### 👨‍💼 Untuk Admin

- ✅ Dashboard admin
- ✅ Manajemen users
- ✅ Manajemen classes
- ✅ Manajemen exams
- ✅ Manajemen questions

---

## 📁 Struktur Folder

```
app/
├── page.tsx                    # Landing page
├── layout.tsx                  # Root layout
├── globals.css                 # Global styles
├── login/
│   └── page.tsx
├── register/
│   └── page.tsx
├── exam/
│   └── [id]/
│       └── page.tsx            # Exam page
├── result/
│   └── [id]/
│       └── page.tsx            # Result page
├── history/
│   └── page.tsx                # Test history
└── admin/
    ├── layout.tsx
    ├── page.tsx                # Dashboard
    ├── users/
    ├── classes/
    ├── exams/
    └── questions/

components/
├── exam-navigation.tsx
├── question-card.tsx
├── question-grid.tsx
├── question-grid-dialog.tsx
├── submit-confirmation-dialog.tsx
├── result-modal.tsx
├── score-display.tsx
├── protected-route.tsx
└── ui/                         # Shadcn/UI components
    ├── button.tsx
    ├── dialog.tsx
    ├── input.tsx
    └── ...

lib/
├── types.ts                    # TypeScript types
├── utils.ts
└── redux/
    ├── store.ts
    └── slices/
```

---

## 🔧 Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm run start

# Lint
npm run lint

# Add Shadcn component
npx shadcn@latest add [component-name]
```

---

## 📝 TypeScript Types

`lib/types.ts`:

```typescript
export interface Question {
  id: number;
  title: string;
  options: string[];
  correctAnswer: string;
  stimulusText: string | null;
  stimulusImage: string | null;
  explanation: string;
}

export interface ExamResult {
  id: number;
  score: number;
  correct_answers: number;
  wrong_answers: number;
  unanswered: number;
}
```

---

## 🎨 Tailwind Config

Custom colors (`tailwind.config.js`):

```javascript
colors: {
  "primary-orange": "#FF5702",
  "secondary-gray": "#C2C2C2",
  "btn-light": "#FFEADE",
  "background-light": "#E0EEFF",
}
```

---

## 🔧 Troubleshooting

**Module not found:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**API connection error:**

- Cek `.env.local` sudah benar
- Pastikan backend running di port 8000

**Port 3000 in use:**

```bash
npm run dev -- -p 3001
```

---

## 🚀 Production

### Build & Deploy

```bash
# Build
npm run build

# Test production locally
npm run start
```

### Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable di dashboard:
# NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

---

**Developer:** [@raflinaufal](https://github.com/raflinaufal)  
**Repository:** [fullstack-lms](https://github.com/raflinaufal/fullstack-lms)
