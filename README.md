# Frontend Labs - Quiz Application

Projekt aplikacji quizowej stworzony w ramach laboratoriów z frameworków frontendowych.

## 🔗 Live Demo

**Link:** [Vercel](https://frameworki-frontendowe-projekt-2-nhiu7mio0.vercel.app)

## 📋 Opis projektu

Aplikacja quizowa z pełnym systemem autentykacji i zarządzania quizami. Użytkownicy mogą tworzyć własne quizy z różnymi typami pytań, zarządzać swoim profilem oraz rozwiązywać quizy demonstracyjne.

## ✨ Funkcjonalności

### Autentykacja (Lab 7-8)
- Rejestracja i logowanie użytkowników
- Weryfikacja email
- Zarządzanie profilem (displayName, photoURL, adres)
- Zmiana hasła
- Chronione trasy

### System Quizów (Lab 9 + rozszerzenia)
- Tworzenie i edycja quizów
- 4 typy pytań:
  - Odpowiedź tekstowa
  - Jednokrotny wybór (Single Choice)
  - Wielokrotny wybór (Multiple Choice)
  - Prawda/Fałsz
- Zarządzanie pytaniami (dodawanie, edycja, usuwanie)
- Automatyczne liczenie pytań

### Komponenty Demo (Lab 7)
- SingleChoice - pytania z jedną poprawną odpowiedzią
- MultipleChoice - pytania z wieloma poprawnymi odpowiedziami
- FillInBlanks - uzupełnianie luk w zdaniach
- MatchPairs - dopasowywanie par

### Wizualizacja Danych (Lab 6)
- Komponent LineChart (SVG)

## 🛠️ Technologie

- **Framework:** Next.js 16 (App Router)
- **Język:** TypeScript
- **Stylowanie:** Tailwind CSS v4
- **Baza danych:** Firebase Firestore
- **Autentykacja:** Firebase Authentication
- **Testy E2E:** Playwright

## 🚀 Uruchomienie projektu

### Wymagania
- Node.js (v18+)
- Konto Firebase

### Instalacja

```bash
# Klonowanie repozytorium
git clone https://github.com/biQte/Frameworki-frontendowe-projekt-2.git
cd Frameworki-frontendowe-projekt-2

# Instalacja zależności
npm install

# Konfiguracja Firebase
# Stwórz plik .env.local i dodaj swoje dane Firebase:
NEXT_PUBLIC_API_KEY=your-api-key
NEXT_PUBLIC_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_PROJECT_ID=your-project-id
NEXT_PUBLIC_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_APP_ID=your-app-id

# Uruchomienie w trybie deweloperskim
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`

### Firebase Setup

1. Utwórz projekt w [Firebase Console](https://console.firebase.google.com)
2. Włącz **Authentication** → Email/Password
3. Utwórz **Firestore Database** (test mode)
4. Dodaj reguły bezpieczeństwa Firestore (patrz dokumentacja)

## 📝 Struktura projektu

```
src/
├── app/
│   ├── (public)/          # Publiczne strony (login, register)
│   ├── (protected)/       # Chronione strony (profile, quizzes)
│   └── lib/               # Firebase config, AuthContext
├── components/
│   ├── quiz/              # Komponenty quizów
│   ├── Navigation.tsx     # Nawigacja
│   └── Footer.tsx         # Stopka
└── tests/                 # Testy Playwright
```

## 🧪 Testowanie

```bash
# Instalacja Playwright
npm install -D @playwright/test
npx playwright install

# Uruchomienie testów
npm test

# Tryb interaktywny
npm run test:ui

# Raport
npm run test:report
```

## 📦 Build

```bash
# Build produkcyjny
npm run build

# Uruchomienie wersji produkcyjnej
npm run start
```
