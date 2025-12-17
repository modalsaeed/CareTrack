# CareTrack

A clinic management application built with Vue 3 for healthcare receptionists to manage appointments, patients, and visit notes.

---

## How to Run the Project

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

```bash
# Clone and install
git clone <repository-url>
cd CareTrack
npm install

# Start development server
npm run dev
# Open http://localhost:5173

# Build for production
npm run build
npm run preview
```

### Login
Enter any email and password to access the application (demo authentication).

---

## Technologies Used

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Type safety throughout the application
- **Vite** - Fast build tool and development server
- **Pinia** - State management for auth, appointments, patients, and visit notes
- **Vue Router** - Client-side routing with navigation guards
- **LocalStorage** - Data persistence for appointments, visit notes, and preferences
- **CSS Variables** - Dynamic theming for light/dark mode
- **Material Icons** - Icon library

---

## What I Would Improve With More Time

### Backend & Authentication
- Implement real API with REST/GraphQL endpoints
- Add JWT authentication and refresh tokens
- Connect to a database (PostgreSQL/MongoDB)
- Implement proper user roles and permissions

### Testing
- Unit tests with Vitest for stores and composables
- Component tests with Vue Test Utils
- E2E tests with Playwright
- Set up CI/CD pipeline with automated testing

### Validation & Error Handling
- Prevent past date appointments
- Add email and phone number validation
- Implement duplicate detection for appointments
- Better error boundaries and fallback UI

### Features
- Calendar view for appointments
- Patient history timeline
- Export functionality (PDF/CSV reports)
- Email/SMS notifications
- Advanced search and filtering
- Bulk operations
- Pagination for large datasets

### Performance & Optimization
- Lazy load routes and components
- Implement virtual scrolling for large lists
- Code splitting for better initial load
- Image optimization

### Code Quality
- ESLint and Prettier configuration
- Pre-commit hooks with Husky
- Better component documentation
- Accessibility improvements (ARIA attributes, keyboard nav)
- Internationalization (i18n) for multiple languages
