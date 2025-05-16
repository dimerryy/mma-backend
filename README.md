# 🥋 MMA GraphQL API Backend (NestJS + PostgreSQL)

This project is a backend API for managing MMA fighters, events, fights, and dynamic rankings. It's built with **NestJS**, **TypeORM**, and **GraphQL**, following **CLEAN Architecture** principles.

---

## 📦 Features

- CRUD for Fighters, Events, Fights, Rankings
- Auto-updating fighter stats (wins, losses, finishes, streaks)
- Automated ranking system with custom algorithm
- Validations for all relations and inputs
- GraphQL Playground with custom queries
- PostgreSQL relational schema

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/dimerryy/mma-backend.git
cd mma-backend
npm install
```

### 2. Configure Environment
Create a `.env` file:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=mma_db
```

### 3. Start the App
```bash
npm run start:dev
```
Visit: [http://localhost:3000/graphql](http://localhost:3000/graphql)

---

## 🧠 GraphQL API Examples

### ➕ Create Fighter
```graphql
mutation {
  createFighter(data: {
    firstName: "Jon"
    lastName: "Jones"
    age: 36
    weightClass: "Light Heavyweight"
    wins: 27
    losses: 1
    draws: 0
    finishes: 10
    winStreak: 5
  }) {
    id
  }
}
```

### 🥊 Create Fight
```graphql
mutation {
  createFight(data: {
    eventId: 1
    fighterAId: 1
    fighterBId: 2
    winnerId: 1
    method: "KO"
    rounds: 3
    duration: "2:45"
  }) {
    id
    winner { firstName }
  }
}
```

### 📈 Get Rankings
```graphql
query {
  getAllRankings {
    fighter { firstName }
    points
    rankPosition
  }
}
```

### 📅 Upcoming Events with Fight Cards
```graphql
query {
  getUpcomingEvents {
    name
    date
    fights {
      fighterA { firstName }
      fighterB { firstName }
    }
  }
}
```

---

## 🧮 Ranking Algorithm

Points are calculated as:
- Win via KO/Sub = 4 pts
- Win via Decision = 3 pts
- Draw = 1 pt
- Loss = 0 pts
- Finishes (KO/Sub) +1 bonus
- Win streak: +0.5 per win

Tiebreakers: Win % and recent activity.

Rankings update immediately **after every fight** in the background.

---

## 🗂️ Project Structure
```
src/
├── fighter/
├── event/
├── fight/
├── ranking/
├── shared/utils/ranking-calculator.service.ts
└── app.module.ts
```

---

## 📊 ERD & Schema

See [`ERD.png`](ERD.png) and [`schema.sql`](./schema.sql) for database design.

---

## 🧪 Testing
You can run example queries using the GraphQL Playground at `/graphql` 

---

## 📬 Submission Checklist
- ✅ GraphQL CRUD (Fighter, Event, Fight, Ranking)
- ✅ Fight stats & history
- ✅ Upcoming events & cards
- ✅ ERD + SQL Schema
- ✅ Ranking algorithm auto-updates
- ✅ Validation & error handling
- ✅ Documented test cases

---

## 👤 Author
**Dimukhamed Ibadulla**  
Backend Developer — 2025
