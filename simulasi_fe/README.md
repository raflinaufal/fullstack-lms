# Simulasi CBT (Computer Based Test)

Aplikasi simulasi ujian berbasis komputer (CBT) untuk mata pelajaran IPS kelas 4
SD dengan antarmuka yang interaktif dan user-friendly.

![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8)

## 📋 Daftar Isi

- [Tentang Aplikasi](#tentang-aplikasi)
- [Fitur Utama](#fitur-utama)
- [Teknologi](#teknologi)
- [Instalasi](#instalasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Struktur Folder](#struktur-folder)
- [Halaman & Fitur](#halaman--fitur)
- [Komponen](#komponen)
- [Data & Types](#data--types)
- [Kustomisasi](#kustomisasi)
- [Development](#development)
- [Build & Deploy](#build--deploy)

---

## 🎯 Tentang Aplikasi

Aplikasi CBT ini dirancang untuk membantu siswa kelas 4 SD dalam berlatih
mengerjakan soal-soal IPS dengan topik "Kenampakan Alam dan Pemanfaatannya".
Aplikasi ini menyediakan pengalaman ujian yang mirip dengan ujian sebenarnya
dengan fitur navigasi soal, timer, dan pembahasan lengkap.

### Target Pengguna

- Siswa kelas 4 SD
- Guru untuk evaluasi pembelajaran
- Orang tua untuk memantau perkembangan belajar anak

---

## ✨ Fitur Utama

### 1. **Landing Page**

- Tampilan awal yang menarik dengan informasi mata pelajaran
- Dua tombol utama: "Mulai CBT" dan "Riwayat Nilai Tes"
- Desain responsif dan user-friendly

### 2. **Halaman Ujian (Exam)**

- 20 soal pilihan ganda interaktif
- Navigasi soal (Previous/Next)
- Grid nomor soal untuk quick navigation
- Indikator soal yang sudah dijawab
- Soal dengan stimulus (teks dan gambar)
- Konfirmasi sebelum submit
- Dialog sukses setelah submit

### 3. **Halaman Hasil (Result)**

- Tampilan nilai ujian
- Statistik jawaban benar/salah
- Form untuk membagikan nilai via email
- Pembahasan lengkap setiap soal
- Visual indikator (hijau=benar, merah=salah, abu-abu=tidak dijawab)
- Penjelasan jawaban yang benar
- Tombol untuk mengerjakan ulang atau kembali

### 4. **Riwayat Nilai (History)**

- Daftar semua hasil ujian yang pernah dikerjakan
- Informasi detail: nilai, waktu mulai/selesai, durasi
- Filter berdasarkan bab (upcoming feature)
- Card-based layout yang informatif

---

## 🛠 Teknologi

### Framework & Library Utama

- **Next.js 14.2.15** - React framework dengan App Router
- **React 18.3.1** - Library UI
- **TypeScript 5.6.3** - Type safety
- **Tailwind CSS 3.4.1** - Styling
- **Radix UI** - Komponen UI primitif yang accessible

### UI Components Library

- `@radix-ui/react-*` - Dialog, Dropdown, Tabs, dll
- `lucide-react` - Icon library
- `class-variance-authority` - Styling variants
- `clsx` & `tailwind-merge` - Class name utilities

### Form & Validation

- `react-hook-form` - Form management
- `@hookform/resolvers` - Form validation
- `zod` - Schema validation

### Tools

- `ESLint` - Code linting
- `PostCSS` - CSS processing
- `Autoprefixer` - CSS vendor prefixes

---

## 📥 Instalasi

### Prerequisites

- Node.js versi 18.x atau lebih tinggi
- npm, yarn, atau pnpm

### Langkah Instalasi

1. **Clone repository**

```bash
git clone <repository-url>
cd simulasi_app/simulasi_fe
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. **Setup environment (jika diperlukan)**

```bash
cp .env.example .env.local
```

---

## 🚀 Menjalankan Aplikasi

### Development Mode

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Aplikasi akan berjalan di `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## 📁 Struktur Folder

```
simulasi_fe/
├── app/                        # Next.js App Router
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   ├── exam/                  # Halaman ujian
│   │   ├── page.tsx           # Main exam page
│   │   └── [sessionId]/       # Dynamic exam session
│   ├── history/               # Riwayat nilai
│   │   └── page.tsx
│   ├── result/                # Hasil ujian
│   │   ├── page.tsx
│   │   └── [sessionId]/       # Dynamic result page
│   └── auth/                  # Authentication (planned)
│       ├── login/
│       └── register/
│
├── components/                # React components
│   ├── exam-navigation.tsx   # Navigation buttons
│   ├── question-card.tsx     # Kartu soal
│   ├── question-grid.tsx     # Grid nomor soal
│   ├── question-grid-dialog.tsx
│   ├── submit-confirmation-dialog.tsx
│   ├── success-dialog.tsx
│   ├── result-modal.tsx
│   ├── score-display.tsx
│   ├── test-score-card.tsx
│   └── ui/                    # Reusable UI components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── card.tsx
│       └── ...                # 40+ UI components
│
├── data/                      # JSON data files
│   ├── exam-questions.json   # Data soal ujian
│   ├── exam-results.json     # Data hasil ujian
│   ├── landing-data.json     # Data landing page
│   └── test-history.json     # Data riwayat tes
│
├── lib/                       # Utilities & types
│   ├── types.ts              # TypeScript type definitions
│   └── utils.ts              # Helper functions
│
├── hooks/                     # Custom React hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── public/                    # Static assets
│
├── styles/                    # Additional styles
│   └── globals.css
│
├── components.json            # shadcn/ui config
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript config
├── next.config.mjs            # Next.js config
└── package.json               # Dependencies
```

---

## 📄 Halaman & Fitur

### 1. Landing Page (`/`)

**File:** `app/page.tsx`

**Fitur:**

- Header dengan judul mata pelajaran
- Deskripsi singkat
- 2 tombol navigasi utama
- Responsive design

**Data Source:** `data/landing-data.json`

### 2. Exam Page (`/exam`)

**File:** `app/exam/page.tsx`

**Fitur:**

- Header informasi ujian
- Question Card dengan:
  - Soal pilihan ganda
  - Stimulus teks/gambar
  - 4 pilihan jawaban (A-D)
- Navigation buttons (Previous/Next)
- Grid dialog untuk jump ke soal tertentu
- Submit confirmation dialog
- Success dialog setelah submit
- Tracking jawaban yang sudah dipilih

**State Management:**

```typescript
- currentQuestion: number
- selectedAnswers: Record<number, string>
- showQuestionGrid: boolean
- showSubmitConfirm: boolean
- showSuccess: boolean
```

**Data Source:** `data/exam-questions.json`

### 3. Result Page (`/result`)

**File:** `app/result/page.tsx`

**Fitur:**

- Tampilan nilai dengan animasi
- Statistik jawaban (benar/salah/tidak dijawab)
- Form bagikan nilai (nama sekolah, kelas, email)
- Pembahasan soal interaktif:
  - Grid nomor soal dengan color coding
  - Detail pertanyaan dan jawaban
  - Penjelasan jawaban yang benar
- Tombol aksi: Kerjakan Ulang & Kembali ke Kelas

**Data Source:** `data/exam-results.json`

### 4. History Page (`/history`)

**File:** `app/history/page.tsx`

**Fitur:**

- Header dengan informasi mata pelajaran
- Tombol kembali
- Filter bab (dropdown)
- Grid cards hasil ujian
- Informasi per card:
  - Judul/topik ujian
  - Nilai
  - Waktu mulai & selesai
  - Status

**Data Source:** `data/test-history.json`

---

## 🧩 Komponen

### Core Components

#### 1. **QuestionCard**

`components/question-card.tsx`

Komponen untuk menampilkan soal ujian.

**Props:**

```typescript
{
  questionNumber: number
  title: string
  options: string[]
  stimulusTitle?: string | null
  stimulusImage?: string | null
  stimulusText?: string | null
  questionAfterImage?: string
  selectedAnswer?: string
  onSelectAnswer: (answer: string) => void
}
```

**Fitur:**

- Support stimulus teks dan gambar
- Highlight jawaban yang dipilih
- Responsive layout
- Border dan styling yang menarik

#### 2. **ExamNavigation**

`components/exam-navigation.tsx`

Navigasi untuk berpindah antar soal.

**Props:**

```typescript
{
  currentQuestion: number
  totalQuestions: number
  onPrevious: () => void
  onNext: () => void
  onSubmit?: () => void
  isLastQuestion?: boolean
}
```

**Fitur:**

- Disabled state untuk soal pertama
- Berubah jadi "Kumpulkan" di soal terakhir
- Icon ChevronLeft & ChevronRight
- Responsive button sizing

#### 3. **QuestionGridDialog**

`components/question-grid-dialog.tsx`

Dialog untuk menampilkan grid semua nomor soal.

**Fitur:**

- Grid responsive 5 kolom (mobile) sampai 10 kolom (desktop)
- Color coding:
  - Biru = soal aktif
  - Hijau = sudah dijawab
  - Abu-abu = belum dijawab
- Quick navigation ke soal tertentu

#### 4. **SubmitConfirmationDialog**

`components/submit-confirmation-dialog.tsx`

Konfirmasi sebelum submit jawaban.

**Fitur:**

- Informasi jumlah soal yang belum dijawab
- Warning jika masih ada soal kosong
- Tombol Batal & Kumpulkan

#### 5. **SuccessDialog**

`components/success-dialog.tsx`

Dialog sukses setelah submit.

**Fitur:**

- Icon centang hijau
- Pesan konfirmasi
- Auto redirect ke halaman hasil

#### 6. **TestScoreCard**

`components/test-score-card.tsx`

Card untuk menampilkan riwayat hasil ujian.

**Props:**

```typescript
{
  title: string;
  score: number;
  description: string;
  startTime: string;
  endTime: string;
}
```

### UI Components

Folder `components/ui/` berisi 40+ reusable components dari Radix UI:

- **Layout:** Card, Separator, Aspect Ratio
- **Form:** Button, Input, Textarea, Checkbox, Radio, Select, Switch
- **Overlay:** Dialog, Alert Dialog, Popover, Tooltip, Dropdown Menu
- **Feedback:** Alert, Toast, Progress, Spinner
- **Navigation:** Tabs, Accordion, Navigation Menu, Breadcrumb
- **Data Display:** Table, Badge, Avatar
- Dan lainnya...

Semua komponen sudah di-style dengan Tailwind CSS dan mendukung dark mode.

---

## 📊 Data & Types

### Data Files

#### 1. **exam-questions.json**

Berisi data soal ujian.

```json
{
  "examInfo": {
    "title": "ESPS IPS 4 SD KELAS IV",
    "subtitle": "Kemampakan Alam dan Pemanfaatannya",
    "totalQuestions": 20,
    "duration": 60,
    "subject": "IPS",
    "grade": "4 SD"
  },
  "questions": [
    {
      "id": 1,
      "title": "Pertanyaan...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctAnswer": "C. ...",
      "stimulusText": null,
      "stimulusImage": null,
      "explanation": "Penjelasan..."
    }
  ]
}
```

#### 2. **exam-results.json**

Berisi data hasil ujian untuk halaman result.

```json
{
  "examResult": {
    "examInfo": {...},
    "score": 75.00,
    "totalQuestions": 20,
    "answeredCorrect": 15,
    "answeredIncorrect": 5,
    "percentage": 75,
    "status": "Lulus",
    "feedback": "Selamat! Kamu sudah berhasil..."
  },
  "questionReview": [
    {
      "questionNumber": 1,
      "question": "...",
      "options": [...],
      "userAnswer": "C. Gunung",
      "correctAnswer": "C. Gunung",
      "isCorrect": true,
      "explanation": "..."
    }
  ]
}
```

#### 3. **test-history.json**

Berisi riwayat semua tes yang pernah dikerjakan.

```json
{
  "historyInfo": {
    "title": "Riwayat Nilai Tes",
    "subtitle": "Semua hasil ujian kamu",
    "subject": "IPS",
    "grade": "4 SD"
  },
  "testResults": [
    {
      "id": 1,
      "title": "Kenampakan Alam - Percobaan 1",
      "score": 75.0,
      "description": "Lulus",
      "startTime": "10:00 WIB",
      "endTime": "11:00 WIB",
      "totalQuestions": 20,
      "correctAnswers": 15,
      "duration": 60,
      "status": "completed",
      "examDate": "2024-01-15",
      "chapter": "Bab 1"
    }
  ]
}
```

#### 4. **landing-data.json**

Berisi data untuk landing page.

```json
{
  "landingPage": {
    "title": "ESPS IPS 4 SD KELAS IV",
    "subtitle": "Kenampakan Alam dan Pemanfaatannya",
    "subject": "IPS",
    "grade": "4 SD",
    "description": "Simulasi Computer Based Test..."
  },
  "examInfo": {
    "totalQuestions": 20,
    "duration": 60,
    "instructions": [...]
  },
  "achievements": {...}
}
```

### TypeScript Types

**File:** `lib/types.ts`

```typescript
// Question types
export interface Question {
  id: number;
  title: string;
  options: string[];
  correctAnswer: string;
  stimulusText: string | null;
  stimulusImage: string | null;
  questionAfterImage?: string | null;
  explanation: string;
}

export interface ExamInfo {
  title: string;
  subtitle: string;
  totalQuestions: number;
  duration: number;
  subject: string;
  grade: string;
}

export interface ExamData {
  examInfo: ExamInfo;
  questions: Question[];
}

// Result types
export interface QuestionReview {
  questionNumber: number;
  question: string;
  options: string[];
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

export interface ExamResultData {
  examResult: {
    examInfo: ExamInfo;
    score: number;
    totalQuestions: number;
    answeredCorrect: number;
    answeredIncorrect: number;
    percentage: number;
    status: string;
    startTime: string;
    endTime: string;
    duration: number;
    timeSpent: number;
    grade: string;
    feedback: string;
  };
  questionReview: QuestionReview[];
}

// History types
export interface TestResult {
  id: number;
  title: string;
  score: number;
  description: string;
  startTime: string;
  endTime: string;
  totalQuestions: number;
  correctAnswers: number;
  duration: number;
  status: string;
  examDate: string;
  chapter: string;
}

export interface TestHistoryData {
  historyInfo: HistoryInfo;
  testResults: TestResult[];
  chapters: Chapter[];
}
```

---

## 🎨 Kustomisasi

### Tailwind Configuration

**File:** `tailwind.config.js`

#### Custom Colors

```javascript
colors: {
  "primary-orange": "#FF5702",
  "secondary-gray": "#C2C2C2",
  "btn-light": "#FFEADE",
  "btn-light-hover": "#FFD4B8",
  "background-light": "#E0EEFF",
}
```

#### Breakpoints

```javascript
screens: {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1400px",
}
```

### Font Configuration

**File:** `app/layout.tsx`

Menggunakan **Poppins** dari Google Fonts dengan semua weights (100-900).

```typescript
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
```

### Global Styles

**File:** `app/globals.css`

Berisi:

- Tailwind base, components, utilities
- CSS variables untuk theming
- Custom animations
- Utility classes

---

## 🔧 Development

### Menambah Soal Baru

1. Edit file `data/exam-questions.json`
2. Tambahkan object soal baru:

```json
{
  "id": 21,
  "title": "Pertanyaan baru...",
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "correctAnswer": "A. ...",
  "stimulusText": null,
  "stimulusImage": null,
  "explanation": "Penjelasan jawaban..."
}
```

3. Update `totalQuestions` di `examInfo`

### Menambah Komponen UI Baru

Menggunakan shadcn/ui:

```bash
npx shadcn@latest add [component-name]
```

Contoh:

```bash
npx shadcn@latest add badge
npx shadcn@latest add calendar
npx shadcn@latest add form
```

### Custom Hooks

**File:** `hooks/use-mobile.ts`

Hook untuk detect mobile screen:

```typescript
const isMobile = useMobile();
```

**File:** `hooks/use-toast.ts`

Hook untuk menampilkan toast notifications:

```typescript
const { toast } = useToast();

toast({
  title: "Success",
  description: "Jawaban berhasil disimpan",
});
```

### Utility Functions

**File:** `lib/utils.ts`

```typescript
// Merge Tailwind classes
cn("class1", "class2", conditionalClass && "class3");

// Format date
formatDate(date, "dd MMM yyyy");

// Calculate score
calculateScore(correctAnswers, totalQuestions);
```

---

## 📦 Build & Deploy

### Build untuk Production

```bash
npm run build
```

Menghasilkan folder `.next/` yang berisi optimized production build.

### Start Production Server

```bash
npm run start
```

### Deploy ke Vercel (Recommended)

1. Push code ke GitHub
2. Import repository di [Vercel](https://vercel.com)
3. Vercel akan auto-detect Next.js dan deploy

Atau via CLI:

```bash
npm install -g vercel
vercel
```

### Deploy ke Platform Lain

#### Netlify

```bash
npm run build
# Upload folder .next ke Netlify
```

#### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🐛 Troubleshooting

### Error: Module not found

```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors saat Build

Config `next.config.mjs` sudah set `ignoreBuildErrors: true`, tapi untuk
production sebaiknya diperbaiki error-nya.

### Styling tidak muncul

```bash
# Pastikan Tailwind config sudah benar
# Clear browser cache
# Restart dev server
npm run dev
```

---

## 📝 Best Practices

### 1. **Component Structure**

- Gunakan `"use client"` hanya jika komponen membutuhkan client-side
  interactivity
- Pisahkan logic dan UI
- Buat komponen yang reusable

### 2. **State Management**

- Gunakan `useState` untuk local state
- Pertimbangkan Context API atau Zustand untuk global state

### 3. **Type Safety**

- Selalu define TypeScript interfaces
- Gunakan type inference sebisa mungkin
- Avoid `any` type

### 4. **Performance**

- Lazy load komponen berat
- Optimize images dengan Next.js Image
- Memoize expensive calculations

### 5. **Accessibility**

- Gunakan semantic HTML
- Tambahkan aria-labels
- Test dengan keyboard navigation
- Radix UI sudah accessible by default

---

## 🚀 Future Enhancements

### Planned Features

- [ ] Timer countdown untuk ujian
- [ ] Authentication system (login/register)
- [ ] Admin dashboard untuk manage soal
- [ ] Multiple choice dengan gambar
- [ ] Export hasil ke PDF
- [ ] Leaderboard & ranking
- [ ] Achievement system
- [ ] Dark mode
- [ ] Multi-bahasa support
- [ ] Offline mode dengan PWA
- [ ] Analytics & reporting
- [ ] Integrase dengan backend API

### Technical Improvements

- [ ] Add unit testing (Jest, React Testing Library)
- [ ] Add E2E testing (Playwright/Cypress)
- [ ] Implement proper error boundaries
- [ ] Add loading states & skeletons
- [ ] Optimize bundle size
- [ ] Add Storybook untuk dokumentasi komponen
- [ ] Implement proper caching strategy
- [ ] Add monitoring (Sentry)

---

## 👥 Contributing

Jika ingin berkontribusi:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

Project ini menggunakan lisensi [MIT License](LICENSE).

---

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk pendidikan Indonesia

**Contact:**

- GitHub: [@raflinaufal](https://github.com/raflinaufal)
- Repository: [simulasi_app](https://github.com/raflinaufal/simulasi_app)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vercel](https://vercel.com/)

---

**Happy Coding! 🚀**

Jika ada pertanyaan atau butuh bantuan, silakan buka issue di repository ini.
