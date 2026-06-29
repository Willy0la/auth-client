# Auth Client

A full-stack authentication frontend built with Next.js and Tailwind CSS. Connects to a production NestJS backend with signup, login, and a protected dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS |
| Form Handling | React Hook Form |
| Validation | Zod |
| HTTP | Fetch API |
| Auth | JWT (localStorage) |
| JWT Decode | jwt-decode |

---

## Getting Started

### Prerequisites

- Node.js v18+
- Auth API running (local or deployed)

### Installation

```bash
git clone https://github.com/Willy0la/auth-client.git
cd auth-client
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production point to your deployed API:

```env
NEXT_PUBLIC_API_URL=https://auth-api-a2pr.onrender.com
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Pages

| Route | Description | Auth |
|---|---|---|
| `/` | Landing page | None |
| `/signup` | Create a new account | None |
| `/login` | Login with password or PIN | None |
| `/dashboard` | Protected dashboard with user profile | Required |

---

## Key Features

**Signup**
Full form validation with Zod  name, username, email, password, PIN, and Nigerian phone number. On success the JWT token is stored and the user is redirected straight to the dashboard.

**Login with Password or PIN Toggle**
Users can switch between password and PIN login. React Hook Form's `unregister` removes the unused field so Zod never validates an empty optional field solving the cross-field validation problem cleanly.

**Protected Dashboard**
On load the dashboard checks localStorage for a token. If missing, the user is redirected to login. If present, the token is decoded with `jwt-decode` to extract the user ID, then the user profile is fetched from the API using the token in the Authorization header.

**Active Link Styling**
Sidebar nav uses `usePathname()` from Next.js to highlight the current active route without needing React Router's NavLink.

**Logout**
Clears the JWT token from localStorage and redirects to login.

---

## Backend

This client connects to the Auth API:

- Local: `http://localhost:5000`
- Production: `https://auth-api-a2pr.onrender.com`
- Swagger docs: `https://auth-api-a2pr.onrender.com/api`

GitHub: [github.com/Willy0la/auth-api](https://github.com/Willy0la/auth-api)

---

## Planned Improvements

- `useContext` for global user state — avoid prop drilling
- Loading skeletons while fetching user data
- Password reset flow
- Toast notifications instead of inline error messages
- Unit tests with React Testing Library