# GigShield — Parametric Micro-Insurance for Delivery Partners

GigShield is a hackathon-ready system that protects delivery partners from disruption-driven income loss using **parametric insurance**.

Judges can evaluate it quickly because it demonstrates the full loop:
- measurable environmental trigger detection
- actuarial premium logic with sustainability guardrails
- fraud-aware claim decisioning
- payout execution (stub-safe by default)

---

## Team OriginX

1. SHRESTHA VERDHAN  
2. ARPIT SINGH  
3. RAMYA PATHAK  
4. ARYABRATA KUNDU

---

## Problem

Delivery partners lose income during heavy rain, heatwaves, pollution spikes, fuel shortages, and similar disruptions. Traditional claims are slow and paperwork-heavy.

## Solution

GigShield automates compensation decisions with objective rules:
1. monitor environmental signals
2. auto-detect threshold breaches
3. generate claims
4. run fraud checks
5. auto-approve low-risk claims, route suspicious claims for manual review

---

## What Is Implemented (Judge Snapshot)

### 1) Parametric trigger system
Supported triggers:
- `heavy_rainfall` (rainfall > 50 mm)
- `extreme_heat` (temperature > 42°C)
- `hazardous_air_quality` (AQI > 300)
- `lpg_shortage` (severity index > 70)
- `flooding` (mock/event-driven)
- `area_curfew` (mock/event-driven)

### 2) Actuarial pricing model
Contextual premium uses:
- selected plan tier
- location risk multiplier
- platform risk multiplier
- seasonality multiplier (summer/monsoon/default)
- loss-ratio guardrails

### 3) Loss ratio & sustainability
Pricing includes target loss-ratio guardrails and reports projected loss-ratio in policy response (`pricingJustification`).

### 4) Risk adjustment & seasonality
Seasonality is reflected in premium computation through explicit seasonal multipliers.

### 5) Partial compensation model
Compensation is severity-based and proportional to disruption intensity; zero-severity claims are rejected.

### 6) Fraud detection system
Multi-layer fraud verification:
- location consistency (GPS vs network)
- activity validation (minutes active)
- weekly claim frequency

High fraud-risk claims are flagged for manual review.

### 7) Claim processing flow
Trigger → claim initiation → exclusion + severity check → fraud check → risk-control checks → payout/manual-review.

### 8) Risk-control mechanisms
Implemented controls:
- event payout cap
- city daily payout circuit breaker

### 9) System integration
- Weather/AQI integrations for trigger detection
- Backend claim APIs
- AI service endpoints
- Razorpay-integrated payout flow (stub-safe default)

### 10) Key insight
GigShield combines transparent trigger logic, explainable pricing, and fraud-aware automation to stay fast and sustainable.

---

## Hackathon Showcase Checklist

### Registration
- UI: `frontend/src/pages/Register.jsx`
- API: `POST /api/delivery-partners/register`

### Policy management
- `POST /api/insurance-policies/subscribe`
- `GET /api/insurance-policies/:policyId`
- `GET /api/insurance-policies/partner/:partnerId`
- `PATCH /api/insurance-policies/:policyId/cancel`

### Claims
- `POST /api/insurance-claims/submit`
- `GET /api/insurance-claims/:claimId`
- `GET /api/insurance-claims/partner/:partnerId`
- `GET /api/insurance-claims/flagged`
- `PATCH /api/insurance-claims/:claimId/review`

### Disruption events
- `POST /api/disruption-events`
- `GET /api/disruption-events`
- `POST /api/disruption-events/check-threshold`
- `POST /api/disruption-events/:eventId/trigger-claims`

### Admin utility
- `POST /api/admin/trigger-weather-check`
- Frontend admin route: `/admin` (protected by `VITE_ADMIN_ACCESS_KEY`)

---

## 3–5 Minute Judge Demo Flow

1. Register a delivery partner.
2. Subscribe to a plan and show returned `pricingJustification`.
3. Trigger a disruption (admin weather check or manual event create).
4. Trigger event claims.
5. Show one auto-approved claim and one flagged/manual-review case.
6. Show updated policy coverage and claim history.

---

## Deployment & Hosting Handoff (Tell Your Friend)

Deploy **3 services**:

1. **Backend (Node/Express, port 5000)**
2. **AI service (Flask, port 5001)**
3. **Frontend (Vite static build)**

### Backend env (`backend/.env`)
- `PORT`
- `NODE_ENV`
- `MONGODB_URI`
- `JWT_SECRET_KEY`
- `ENFORCE_AUTH`
- `AUTH_DEMO_USERNAME`
- `AUTH_DEMO_PASSWORD_HASH` or `AUTH_DEMO_PASSWORD`
- `WEATHER_API_KEY`
- `POLLUTION_API_KEY`
- `WEATHER_API_BASE_URL`
- `POLLUTION_API_BASE_URL`
- `PAYOUT_MODE`
- `ENABLE_PREMIUM_PAYMENT_FLOW`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_ACCOUNT_NUMBER`

### Frontend env (`frontend/.env`)
- `VITE_API_BASE_URL`
- `VITE_AI_BASE_URL`
- `VITE_RAZORPAY_KEY_ID`
- `VITE_ADMIN_ACCESS_KEY`

### Recommended hackathon-safe defaults
- Keep `ENABLE_PREMIUM_PAYMENT_FLOW=false` for direct subscription flow.
- Keep payout in stub-safe mode unless live Razorpay credentials are configured.

### Go-live checklist
- MongoDB reachable from backend runtime
- frontend can reach backend + AI URLs
- CORS allowed for deployed frontend domain
- backend `/api/health` and AI `/health` respond successfully
- CI checks pass

---

## Local Setup

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB (local or Atlas)

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) AI service
```bash
cd ai
pip install -r requirements.txt
python app.py
```

### 3) Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express + Mongoose
- AI Service: Python Flask
- Database: MongoDB
- Integrations: Weather + AQI APIs, Razorpay-compatible payout flow

---

## Validation / CI

Local checks:
```bash
cd backend && npm test
cd frontend && npm run build
```

GitHub Actions CI runs:
- backend: `npm ci && npm test`
- frontend: `npm ci && npm run build`

---

## Demo Assets

- Demo video: https://youtu.be/qJf-wKjICPI
- Architecture diagram: https://github.com/user-attachments/assets/9107d99c-d7ef-4b40-bc98-940dc99d9e12
- Workflow diagram: https://github.com/user-attachments/assets/97824b2b-dddb-4aa1-9db9-ee80a4e600ad
