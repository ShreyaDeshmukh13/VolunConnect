# VolunConnect – AWT FA-2 (Advanced Features, Testing, Deployment)

Continuation of FA-1 (React + Vite + Bootstrap).

## FA-2 coverage (mapped to the AWT syllabus, Unit 4 + Other)
| Syllabus topic | Where |
|---|---|
| React Router: setup, routes, Link/NavLink, dynamic routes, params | `src/App.jsx`, `pages/OpportunityDetails.jsx` (`:id`, `useParams`) |
| Nested routes (`Outlet`, index route) | `/opportunities/:id` + `Overview` / `Requirements` tabs (`pages/OpportunityTabs.jsx`) |
| Redux: actions, reducers, store, setup | `src/store/actions.js`, `registrationReducer.js`, `store.js`, `<Provider>` in `App.jsx` |
| Handling errors | `ErrorBoundary`, 404 route, login errors, full-drive / duplicate checks |
| JWT token | `src/auth/jwt.js` (HS256 via Web Crypto), `AuthContext.jsx`, `ProtectedRoute.jsx` |
| Captcha / human verification | `components/Captcha.jsx` (arithmetic challenge + honeypot) |
| Hooks / custom hooks (lab) | `useLocalStorage`, `useDebounce`, `useReducer`-style reducer, `useEffect` |
| State management comparison | Redux (registrations) vs Context (auth session) |
| Performance | `React.memo`, `useMemo`, `useCallback`, `React.lazy` + `Suspense`, vendor chunk |
| Testing | Vitest + React Testing Library: reducer/store, JWT, captcha, routing, end-to-end flow |

> JWT note: tokens are signed in the browser for demo purposes only. In production, a backend signs them.

## Run
```
npm install
npm run dev      # http://localhost:3000   (demo password: volunteer123)
npm test
npm run build
```

## Deploy
**Vercel:** push to GitHub, import the repo (framework: Vite). `vercel.json` handles SPA rewrites.
**Netlify:** build `npm run build`, publish `dist` (`public/_redirects` handles SPA routing).
